import os
import sys
import re
import pandas as pd
from sqlalchemy import text

sys.stdout.reconfigure(encoding='utf-8')

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.database import engine, SessionLocal
from app.models.models import (
    Project, ProjectRecommendation, ProjectSanction, ProjectCompletion
)

DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "src", "data"))

def clean_str(val):
    if pd.isna(val) or val is None:
        return ''
    return str(val).strip()

def normalize_text(val):
    if pd.isna(val) or val is None:
        return ''
    return re.sub(r'[^A-Z0-9]', '', str(val).upper())

def run_analysis():
    s = SessionLocal()
    rec_df = pd.read_csv(os.path.join(DATA_DIR, 'Works Recommended.csv'), encoding='utf-8')

    # Get all 216 null project_id recommendations from DB
    null_recs = s.query(ProjectRecommendation).filter(ProjectRecommendation.project_id.is_(None)).all()
    print(f"Total NULL recommendations in DB: {len(null_recs)}")

    # Map original_sr_no -> CSV row
    csv_map = {}
    for _, row in rec_df.iterrows():
        sr = str(row['Sr. No.']).strip()
        csv_map[sr] = row

    # Fetch all master projects from DB
    projects = s.query(Project).all()
    print(f"Total master projects in DB: {len(projects)}")

    # Index projects by normalized title
    title_to_projs = {}
    for p in projects:
        if p.work_title:
            norm_t = normalize_text(p.work_title)
            if norm_t:
                if norm_t not in title_to_projs:
                    title_to_projs[norm_t] = []
                title_to_projs[norm_t].append(p)

    high_conf = []
    possible = []
    no_match = []

    former_4048_srs = {
        '4499', '4502', '4503', '4504', '6178', '6182', '9330', '9769',
        '10110', '10116', '10117', '243', '2543'
    }
    former_4048_analysis = {}

    for pr in null_recs:
        sr = str(pr.original_sr_no).strip()
        c_row = csv_map.get(sr)

        raw_work = pr.raw_work_value or ''
        state = clean_str(c_row.get('State')) if c_row is not None else ''
        ida = clean_str(c_row.get('IDA')) if c_row is not None else ''
        constituency = clean_str(c_row.get('Constituency')) if c_row is not None else ''
        mp = clean_str(c_row.get("Hon'ble Members of Parliament")) if c_row is not None else ''
        rec_date = clean_str(c_row.get('Recommended date')) if c_row is not None else ''
        category_work_code = clean_str(c_row.get('WORK')) if c_row is not None else ''

        amount = 0.0
        if c_row is not None and pd.notna(c_row.get('RECOMMENDED AMOUNT   ( ₹ )')):
            try:
                amount = float(str(c_row.get('RECOMMENDED AMOUNT   ( ₹ )')).replace('₹', '').replace(',', '').strip())
            except ValueError:
                amount = 0.0

        norm_work = normalize_text(raw_work)

        candidate = None
        match_level = None
        confidence = None
        reason = None

        # LEVEL 1: Embedded WS ID in WORK column
        m = re.search(r'WS/\s*MP\d+/\d{4}-\d{4}/\d+', category_work_code)
        if m:
            ws_id = m.group(0).replace('\t', '').replace(' ', '').strip()
            matched_p = s.query(Project).filter(Project.canonical_work_id == ws_id).first()
            if matched_p:
                candidate = matched_p
                match_level = 'LEVEL 1 (WS Code Match)'
                confidence = 'HIGH-CONFIDENCE MATCH'
                reason = f"Exact embedded WS work code match: {ws_id}"

        # LEVEL 2: Exact/Normalized Work Description Match + Strong Context (State + District/IDA + Amount/MP)
        if not candidate and norm_work and len(norm_work) > 10:
            candidates_by_title = title_to_projs.get(norm_work, [])
            if candidates_by_title:
                # Filter candidates by State
                state_candidates = [
                    p for p in candidates_by_title
                    if normalize_text(p.state) == normalize_text(state) or normalize_text(state) in normalize_text(p.state)
                ]
                if len(state_candidates) == 1:
                    candidate = state_candidates[0]
                    match_level = 'LEVEL 2 (Exact Title + State Match)'
                    confidence = 'HIGH-CONFIDENCE MATCH'
                    reason = f"Exact normalized title match in State ({candidate.state})"
                elif len(state_candidates) > 1:
                    # Filter by District/IDA or Constituency
                    ida_candidates = [
                        p for p in state_candidates
                        if normalize_text(p.ida) == normalize_text(ida) or normalize_text(p.constituency) == normalize_text(constituency)
                    ]
                    if len(ida_candidates) == 1:
                        candidate = ida_candidates[0]
                        match_level = 'LEVEL 2 (Exact Title + State + District Match)'
                        confidence = 'HIGH-CONFIDENCE MATCH'
                        reason = f"Exact title match in District ({candidate.ida})"
                    elif len(ida_candidates) > 1:
                        candidate = ida_candidates[0]
                        match_level = 'LEVEL 2 (Multiple Title Candidates in District)'
                        confidence = 'POSSIBLE MATCH — NEEDS REVIEW'
                        reason = f"{len(ida_candidates)} candidate projects exist in same District with identical title"

        # LEVEL 3: Cross-source Reconciliation (Search ProjectSanction & ProjectCompletion in same District)
        if not candidate and norm_work and len(norm_work) > 12:
            # Find projects in same State & District that share a significant title overlap
            district_projs = [
                p for p in projects
                if normalize_text(p.state) == normalize_text(state) and
                (normalize_text(p.ida) == normalize_text(ida) or normalize_text(p.constituency) == normalize_text(constituency))
            ]
            for p in district_projs:
                p_norm = normalize_text(p.work_title)
                if p_norm and (norm_work in p_norm or p_norm in norm_work):
                    candidate = p
                    match_level = 'LEVEL 3 (Title Substring Match in District)'
                    confidence = 'POSSIBLE MATCH — NEEDS REVIEW'
                    reason = f"Substring title match in District ({p.ida}): candidate title '{p.work_title[:40]}'"
                    break

        res_obj = {
            'sr_no': sr,
            'category_work_code': category_work_code,
            'raw_work_value': raw_work,
            'state': state,
            'constituency': constituency,
            'ida': ida,
            'mp': mp,
            'amount': amount,
            'candidate_id': candidate.id if candidate else None,
            'candidate_canonical_id': candidate.canonical_work_id if candidate else None,
            'candidate_title': candidate.work_title if candidate else None,
            'match_level': match_level,
            'confidence': confidence or 'NO SAFE MATCH',
            'reason': reason or "No unique project match found in same State/District"
        }

        if sr in former_4048_srs or category_work_code.upper() == 'NA-CONSTRUCTION OF COMMUNITY CENTERS AND COMMUNITY HALLS':
            former_4048_analysis[sr] = res_obj

        if confidence == 'HIGH-CONFIDENCE MATCH':
            high_conf.append(res_obj)
        elif confidence == 'POSSIBLE MATCH — NEEDS REVIEW':
            possible.append(res_obj)
        else:
            no_match.append(res_obj)

    print("\n==================================================")
    print("216 NULL RECOMMENDATIONS CLASSIFICATION SUMMARY")
    print("==================================================")
    print(f"Total NULL Recommendations Analyzed : {len(null_recs)}")
    print(f"A. HIGH-CONFIDENCE MATCHES          : {len(high_conf)}")
    print(f"B. POSSIBLE MATCHES — NEEDS REVIEW   : {len(possible)}")
    print(f"C. NO SAFE MATCH                    : {len(no_match)}")

    print("\n==================================================")
    print("ANALYSIS OF FORMER PROJECT 4048 RECORDS")
    print("==================================================")
    print(f"Total records analyzed in former Project 4048 category: {len(former_4048_analysis)}")
    for sr_key in sorted(former_4048_analysis.keys(), key=lambda x: int(x) if x.isdigit() else 999999):
        item = former_4048_analysis[sr_key]
        cand_info = f"Project {item['candidate_id']} ({item['candidate_canonical_id']})" if item['candidate_id'] else "NO CANDIDATE (NULL)"
        print(f"SR {item['sr_no']:<5} | State: {item['state']:<12} | District: {item['ida'][:20]:<20} | Amount: ₹{item['amount']:>10,.2f} | Title: {item['raw_work_value'][:30]:<30} | Classification: {item['confidence']}")
        if item['candidate_id']:
            print(f"       --> Match Method: {item['match_level']} | Candidate Title: {item['candidate_title'][:50]}")

    s.close()

if __name__ == "__main__":
    run_analysis()
