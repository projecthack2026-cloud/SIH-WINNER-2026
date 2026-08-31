from flask import Flask, render_template, request, jsonify, abort
from data_service import get_dashboard_stats
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

SAMPLE_WORKS = {
    101: {
        "id": 101,
        "title": "Drainage and Road Resurfacing - Ward 17",
        "state": "Maharashtra",
        "constituency": "Pune",
        "agency": "Pune Municipal Corporation",
        "category": "Roads & Drainage",
        "status": "In Progress",
        "sanction_amount": 2450000,
        "expenditure": 1325000,
        "utilization": 54,
        "risk_score": 87,
        "progress": 58,
        "start_date": "2024-02-14",
        "deadline": "2025-06-30",
        "contractor": "Shivam Infra Projects",
        "beneficiary": "Ward 17 residents",
        "location": "Kharadi, Pune",
        "lifecycle": [
            {"stage": "Proposal", "date": "2023-11-08", "status": "completed"},
            {"stage": "Sanction", "date": "2024-01-18", "status": "completed"},
            {"stage": "Tender", "date": "2024-02-03", "status": "completed"},
            {"stage": "Execution", "date": "2024-02-14", "status": "active"},
            {"stage": "Inspection", "date": "2024-08-10", "status": "pending"},
            {"stage": "Payment", "date": "2024-10-15", "status": "pending"}
        ],
        "budget_breakdown": [
            {"label": "Earthwork", "value": 520000},
            {"label": "Road resurfacing", "value": 760000},
            {"label": "Drainage pipes", "value": 610000},
            {"label": "Labor & supervision", "value": 360000},
            {"label": "Miscellaneous", "value": 200000}
        ],
        "observations": [
            "Material quantity variation exceeds the 10% tolerance band for road resurfacing work.",
            "Two vendor entries share the same GST number and beneficiary address pattern.",
            "Payment milestones are advancing faster than the physical progress percentage."
        ],
        "recommendations": [
            "Reconcile earthwork and drainage expenses with site measurement sheets.",
            "Flag this work for additional engineer verification before next installment release.",
            "Cross-check related works in the same corridor for possible fragmentation or split bidding."
        ],
        "related_complaints": ["CMP-3047", "CMP-3108"]
    },
    102: {
        "id": 102,
        "title": "Drinking Water Pipeline Extension",
        "state": "Uttar Pradesh",
        "constituency": "Lucknow",
        "agency": "Lucknow Jal Nigam",
        "category": "Water Supply",
        "status": "Delayed",
        "sanction_amount": 1830000,
        "expenditure": 970000,
        "utilization": 53,
        "risk_score": 76,
        "progress": 44,
        "start_date": "2023-12-01",
        "deadline": "2025-03-31",
        "contractor": "Riverbend Utilities",
        "beneficiary": "Ashiyana locality",
        "location": "Lucknow East",
        "lifecycle": [
            {"stage": "Proposal", "date": "2023-09-15", "status": "completed"},
            {"stage": "Sanction", "date": "2023-11-02", "status": "completed"},
            {"stage": "Tender", "date": "2023-12-07", "status": "completed"},
            {"stage": "Execution", "date": "2024-01-05", "status": "active"},
            {"stage": "Inspection", "date": "2024-07-15", "status": "pending"},
            {"stage": "Payment", "date": "2024-09-28", "status": "pending"}
        ],
        "budget_breakdown": [
            {"label": "Pipeline supply", "value": 680000},
            {"label": "Jointing & material", "value": 420000},
            {"label": "Pump station works", "value": 350000},
            {"label": "Labor & supervision", "value": 260000},
            {"label": "Contingency", "value": 120000}
        ],
        "observations": [
            "Progress is 18% behind the planned schedule for the current quarter.",
            "Multiple change orders were approved without corresponding geo-tagged site updates.",
            "One vendor contract was renewed within the same district under a different entity name."
        ],
        "recommendations": [
            "Request a physical verification report from district engineering staff.",
            "Review change order approvals against original sanction limits.",
            "Assess whether overlapping utility works indicate scope duplication."
        ],
        "related_complaints": ["CMP-2912", "CMP-3020"]
    }
}

SAMPLE_COMPLAINTS = [
    {
        "id": "CMP-3047",
        "title": "Road quality and drainage concerns",
        "status": "Under Review",
        "severity": "High",
        "district": "Pune",
        "constituency": "Pune",
        "submitted_on": "2025-01-09",
        "source": "Citizen Portal",
        "summary": "Residents reported incomplete road resurfacing and blocked drainage after heavy rain.",
        "work_id": 101,
        "attachments": 3,
        "field_visit": "Scheduled for 2025-01-16"
    },
    {
        "id": "CMP-3108",
        "title": "Unclear fund utilization for ward works",
        "status": "Escalated",
        "severity": "Medium",
        "district": "Pune",
        "constituency": "Pune",
        "submitted_on": "2025-01-18",
        "source": "WhatsApp",
        "summary": "Citizen asks for justification of repeated excavation and payment milestones within same corridor.",
        "work_id": 101,
        "attachments": 2,
        "field_visit": "Pending"
    },
    {
        "id": "CMP-2912",
        "title": "Water supply pipeline delay",
        "status": "In Progress",
        "severity": "High",
        "district": "Lucknow",
        "constituency": "Lucknow",
        "submitted_on": "2024-12-28",
        "source": "Call Center",
        "summary": "Residents complain that water supply work has not reached the planned block despite payment milestones.",
        "work_id": 102,
        "attachments": 4,
        "field_visit": "Completed on 2025-01-03"
    }
]

@app.route('/')
def index():
    return render_template('dashboard.html')

@app.route('/investigate')
def investigate_page():
    target = request.args.get('target', '')
    return render_template('investigate.html', target_region=target)

@app.route('/work/<int:work_id>')
def work_detail(work_id):
    work = SAMPLE_WORKS.get(work_id)
    if work is None:
        abort(404)
    return render_template('work_detail.html', work=work)

@app.route('/complaints')
def complaints_page():
    return render_template('complaints.html', complaints=SAMPLE_COMPLAINTS)

@app.route('/api/stats', methods=['GET'])
def api_stats():
    house = request.args.get('house', 'LS')
    region = request.args.get('region', 'National')
    stats = get_dashboard_stats(house, region)
    return jsonify(stats)

@app.route('/api/work/<int:work_id>')
def api_work_detail(work_id):
    work = SAMPLE_WORKS.get(work_id)
    if work is None:
        return jsonify({"error": "Work not found"}), 404
    return jsonify(work)

@app.route('/api/complaints')
def api_complaints():
    return jsonify(SAMPLE_COMPLAINTS)

@app.route('/api/investigate', methods=['POST'])
def api_investigate():
    data = request.json
    trigger_id = data.get('target_id')
    return jsonify({
        "status": "success",
        "steps": [
            {"action": "Called query_database", "result": f"Fetching records for {trigger_id}..."},
            {"action": "Called check_vendor_history", "result": "Vendor X has 65% concentration in this region."},
            {"action": "Called find_similar_works", "result": "Found 5 identically priced works sanctioned on same day."},
            {"action": "Called devil_advocate", "result": "Tested innocent explanations (phased project). Rejected due to ₹4.95L exact threshold clustering."}
        ],
        "final_finding": "Probable contract fragmentation (smurfing) detected to bypass ₹5.0L e-tendering limit."
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
