import re
from typing import Optional, Dict, Any

class LocationExtractionService:
    """
    Natural Language Location Extraction Service for MPLADS Work Descriptions.
    Extracts village, locality, landmark, taluka, and road endpoints without modifying original description text.
    """

    INFRASTRUCTURE_PREFIXES = [
        r"^(?:construction|development|renovation|repair|laying|paving|installation|providing|supply|erection|installing)\s+of\s+buildings?\s+for\s+community\s+cultural\s+activities[-:\s]*",
        r"^(?:construction|development|renovation|repair|laying|paving|installation|providing|supply|erection|installing)\s+of\s+community\s+(?:bhavan|hall)\s*",
        r"^(?:construction|development|renovation|repair|laying|paving|installation|providing|supply|erection|installing)\s+of\s+(?:cc\s+)?roads?\s*",
        r"^(?:construction|development|renovation|repair|laying|paving|installation|providing|supply|erection|installing)\s+of\s+drainage\s+(?:line|system)\s*",
        r"^(?:construction|development|renovation|repair|laying|paving|installation|providing|supply|erection|installing)\s+of\s+school\s+buildings?\s*",
        r"^(?:construction|development|renovation|repair|laying|paving|installation|providing|supply|erection|installing)\s+of\s+paver\s+blocks?\s*",
        r"^(?:construction|development|renovation|repair|laying|paving|installation|providing|supply|erection|installing)\s+of\s+compound\s+walls?\s*",
        r"^(?:construction|development|renovation|repair|laying|paving|installation|providing|supply|erection|installing)\s+of\s*",
        r"^providing\s+and\s+laying\s+of\s*",
        r"^supply\s+and\s+installation\s+of\s*",
        r"^installing\s+",
        r"^providing\s+"
    ]

    @classmethod
    def strip_infrastructure_prefix(cls, text: str) -> str:
        cleaned = text.strip()
        for pattern in cls.INFRASTRUCTURE_PREFIXES:
            cleaned = re.sub(pattern, "", cleaned, flags=re.IGNORECASE).strip()
        return cleaned

    @classmethod
    def clean_token(cls, token: Optional[str]) -> Optional[str]:
        if not token:
            return None
        cleaned = re.sub(r"^[\s\.\:\,\-]+|[\s\.\:\,\-]+$", "", token).strip()
        cleaned = re.sub(r"\s+(?:dist|district|state)\b.*$", "", cleaned, flags=re.IGNORECASE).strip()
        if len(cleaned) < 2:
            return None
        return cleaned

    @classmethod
    def extract_location(
        cls, 
        work_description: Optional[str], 
        district: Optional[str] = None, 
        state: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Parses work_description to extract structured location metadata.
        """
        result = {
            "location_text": None,
            "village": None,
            "locality": None,
            "taluka": None,
            "from_location": None,
            "to_location": None,
            "confidence_score": "UNKNOWN",
            "location_status": "NOT_PROCESSED"
        }

        if not work_description or not work_description.strip():
            return result

        raw_desc = work_description.strip()
        body_text = cls.strip_infrastructure_prefix(raw_desc)

        village = None
        locality = None
        taluka = None
        from_loc = None
        to_loc = None

        # 1. Extract Taluka / Tehsil / Block / Tq
        taluka_match = re.search(r"\b(?:tq|taluka|tehsil|block)\.?\s*([A-Za-z0-9\s\-]+?)(?=\s*(?:dist|district|\.|\,|$))", raw_desc, re.IGNORECASE)
        if taluka_match:
            taluka = cls.clean_token(taluka_match.group(1))

        # 2. Extract Road Endpoints ("from X to Y", "from X towards Y", "between X and Y")
        road_match = re.search(r"\b(?:from)\s+([A-Za-z0-9\s\.\-]+?)\s+(?:to|towards|to\s+words)\s+([A-Za-z0-9\s\.\-]+?)(?=\s*(?:at|tq|taluka|dist|district|\.|\,|$))", raw_desc, re.IGNORECASE)
        if road_match:
            from_loc = cls.clean_token(road_match.group(1))
            to_loc = cls.clean_token(road_match.group(2))

        # 3. Extract Village / Gram / Locality / Ward / At. <Locality>
        at_match = re.search(r"\bAt\.?\s+([A-Za-z0-9\s\.\-\/]+?)(?=\s+(?:Tq|Taluka|Tehsil|Block|Dist|District|Near|In|On|From|Towards|\.|\,|$))", raw_desc, re.IGNORECASE)
        if at_match:
            cand = cls.clean_token(at_match.group(1))
            if cand and cand.lower() not in ["community", "road", "roads", "open jim", "building", "school", "hall"]:
                village = cand

        if not village:
            v_match = (
                re.search(r"\b(?:village|gram|panchayat|basti|nagar|ward)\.?\s+([A-Za-z0-9\s\-]+?)(?=\s*(?:tq|taluka|dist|district|\.|\,|$))", raw_desc, re.IGNORECASE) or
                re.search(r"\b([A-Za-z0-9\s\-]+?)\s+(?:village|gram|panchayat|basti|nagar|ward)\b", raw_desc, re.IGNORECASE)
            )
            if v_match:
                cand = cls.clean_token(v_match.group(1))
                if cand and cand.lower() not in ["the", "this", "main", "govt", "open"]:
                    village = cand

        near_match = re.search(r"\b(?:near|opposite|behind|in)\s+([A-Za-z0-9\s\.\-]+?)(?=\s*(?:at|tq|taluka|dist|district|\.|\,|$))", raw_desc, re.IGNORECASE)
        if near_match:
            cand = cls.clean_token(near_match.group(1))
            if cand and cand.lower() not in ["the", "this", "main"]:
                locality = cand

        # Construct primary location_text
        primary_parts = []
        if village:
            primary_parts.append(village)
        elif locality:
            primary_parts.append(locality)
        elif from_loc and to_loc:
            primary_parts.append(f"From {from_loc} to {to_loc}")
        elif from_loc:
            primary_parts.append(f"From {from_loc}")

        if not primary_parts and taluka:
            primary_parts.append(taluka)

        if primary_parts:
            base_loc = primary_parts[0]
            context_parts = [base_loc]
            if taluka and taluka.lower() not in base_loc.lower():
                context_parts.append(f"Taluka {taluka}")
            if district:
                context_parts.append(district)
            if state:
                context_parts.append(state)

            full_loc_text = ", ".join(context_parts)

            result["location_text"] = full_loc_text
            result["village"] = village or base_loc
            result["locality"] = locality
            result["taluka"] = taluka
            result["from_location"] = from_loc
            result["to_location"] = to_loc
            result["confidence_score"] = "HIGH" if (village and taluka) else "MEDIUM"
            result["location_status"] = "LOCATION_EXTRACTED"
            return result

        return result
