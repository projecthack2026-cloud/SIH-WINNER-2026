export type StakeholderRole = 'mp' | 'district' | 'state' | 'ministry' | 'admin';

export type GeographicScopeLevel = 'Constituency' | 'District' | 'State' | 'National' | 'Platform';

export interface RoleInfo {
  id: StakeholderRole;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  iconName: string;
  badge: string;
  path: string;
  sampleId: string;
  authorityLevel: string;
  scopeLevel: GeographicScopeLevel;
}

export interface UserAuthSession {
  userId: string;
  role: StakeholderRole;
  officialId: string;
  name: string;
  email: string;
  designation: string;
  jurisdiction: string; // e.g. "Pune Constituency", "Pune District", "Maharashtra", "India", "Platform HQ"
  scopeLevel: GeographicScopeLevel;
  authenticatedAt: string;
  avatarUrl?: string;
  status: 'Active' | 'Locked' | 'Suspended';
}
