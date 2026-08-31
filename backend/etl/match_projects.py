from etl.normalize_datasets import extract_canonical_work_id, normalize_entity_name, normalize_mp_name

class ProjectMatcher:
    """
    Project matching strategy.
    Primary: Exact match on canonical_work_id.
    Secondary: Multi-attribute controlled matching (state + constituency + mp + work_title + amount)
    Audit: Flag soft candidates in duplicate_candidates table.
    """
    def __init__(self):
        self.project_by_canonical_id = {}
        self.soft_match_index = {}

    def register_project(self, canonical_id: str, project_dict: dict):
        self.project_by_canonical_id[canonical_id] = project_dict

    def find_match(self, raw_work: str, state: str = None, constituency: str = None, mp_name: str = None) -> str | None:
        canonical_id = extract_canonical_work_id(raw_work)
        if canonical_id and canonical_id in self.project_by_canonical_id:
            return canonical_id
        return None
