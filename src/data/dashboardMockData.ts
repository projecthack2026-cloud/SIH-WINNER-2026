import type { MockProject } from '../types/complaint';
import type { 
  DuplicateWorkCandidate, 
  DistrictPerformance, 
  StatePerformance, 
  SystemServiceHealth, 
  SystemAuditLog, 
  OfficialAlert,
  ProjectRiskDetail
} from '../types/dashboard';
import type { UserAuthSession, StakeholderRole } from '../types/auth';

export const DEMO_USERS: Record<StakeholderRole, UserAuthSession> = {
  mp: {
    userId: 'usr-mp-01',
    role: 'mp',
    officialId: 'MP-LS-2024-ND',
    name: 'Shri S. K. Kulkarni',
    email: 'mp.pune@sansad.nic.in',
    designation: 'Member of Parliament (Lok Sabha)',
    jurisdiction: 'Pune Constituency',
    scopeLevel: 'Constituency',
    authenticatedAt: new Date().toISOString(),
    status: 'Active'
  },
  district: {
    userId: 'usr-da-01',
    role: 'district',
    officialId: 'DA-MH-PUNE-01',
    name: 'Dr. Rajesh Deshmukh, IAS',
    email: 'collector.pune@maharashtra.gov.in',
    designation: 'District Magistrate & Nodal Officer',
    jurisdiction: 'Pune District',
    scopeLevel: 'District',
    authenticatedAt: new Date().toISOString(),
    status: 'Active'
  },
  state: {
    userId: 'usr-sna-01',
    role: 'state',
    officialId: 'SNA-MH-MUMBAI-09',
    name: 'Smt. Manisha Verma, IAS',
    email: 'planning.secretary@maharashtra.gov.in',
    designation: 'Secretary, State Planning Dept',
    jurisdiction: 'Maharashtra',
    scopeLevel: 'State',
    authenticatedAt: new Date().toISOString(),
    status: 'Active'
  },
  ministry: {
    userId: 'usr-mospi-01',
    role: 'ministry',
    officialId: 'MOSPI-HQ-DELHI-001',
    name: 'Shri Alok Kumar, ISS',
    email: 'dg.monitoring@mospi.gov.in',
    designation: 'Director General (Monitoring)',
    jurisdiction: 'India (National Headquarters)',
    scopeLevel: 'National',
    authenticatedAt: new Date().toISOString(),
    status: 'Active'
  },
  admin: {
    userId: 'usr-sysadmin-01',
    role: 'admin',
    officialId: 'SYS-ADMIN-CORE-001',
    name: 'Vikramaditya Sharma',
    email: 'sysadmin@mplads-ai.internal',
    designation: 'Chief System Architect & Security Officer',
    jurisdiction: 'Platform Technical Infrastructure',
    scopeLevel: 'Platform',
    authenticatedAt: new Date().toISOString(),
    status: 'Active'
  }
};

export const EXTENDED_MOCK_PROJECTS: (MockProject & { physicalProgress: number; financialProgress: number; riskScore: number })[] = [
  {
    id: 'MPL-PRJ-2025-8801',
    title: 'Community Healthcare & Diagnostic Facility',
    constituency: 'Pune Constituency',
    district: 'Pune',
    state: 'Maharashtra',
    category: 'Healthcare Infrastructure',
    sanctionedAmount: '₹45,00,000',
    spentAmount: '₹32,40,000',
    progressPercentage: 72,
    physicalProgress: 72,
    financialProgress: 72,
    riskScore: 48,
    status: 'Ongoing',
    riskLevel: 'Medium',
    lat: 18.5204,
    lng: 73.8567,
    anomalyFlags: ['Minor timeline variance detected by AI satellite imagery.'],
    mpName: 'Shri S. K. Kulkarni'
  },
  {
    id: 'MPL-PRJ-2025-9104',
    title: 'Solar Powered Public Library & Digital Center',
    constituency: 'Varanasi Constituency',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    category: 'School / Education Infrastructure',
    sanctionedAmount: '₹28,00,000',
    spentAmount: '₹28,00,000',
    progressPercentage: 100,
    physicalProgress: 100,
    financialProgress: 100,
    riskScore: 12,
    status: 'Completed',
    riskLevel: 'Low',
    lat: 25.3176,
    lng: 82.9739,
    mpName: 'Shri N. D. Modi'
  },
  {
    id: 'MPL-PRJ-2024-4112',
    title: 'High-Density Storm Drain & Culvert Works',
    constituency: 'Bengaluru South',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    category: 'Drainage',
    sanctionedAmount: '₹60,00,000',
    spentAmount: '₹55,00,000',
    progressPercentage: 45,
    physicalProgress: 45,
    financialProgress: 91,
    riskScore: 89,
    status: 'Delayed',
    riskLevel: 'High',
    lat: 12.9716,
    lng: 77.5946,
    anomalyFlags: [
      'Progress-Expenditure Mismatch: Physical (45%) vs Financial (91%).',
      'Citizen reports indicate incomplete excavation.'
    ],
    mpName: 'Shri T. Surya'
  },
  {
    id: 'MPL-PRJ-2025-1029',
    title: 'Rural Drinking Water Overhead Reservoir & Pipeline',
    constituency: 'Nagpur Constituency',
    district: 'Nagpur',
    state: 'Maharashtra',
    category: 'Water Infrastructure',
    sanctionedAmount: '₹35,00,000',
    spentAmount: '₹29,75,000',
    progressPercentage: 85,
    physicalProgress: 85,
    financialProgress: 85,
    riskScore: 22,
    status: 'Ongoing',
    riskLevel: 'Low',
    lat: 21.1458,
    lng: 79.0882,
    mpName: 'Shri N. Gadkari'
  },
  {
    id: 'MPL-PRJ-2025-3349',
    title: 'Smart Anganwadi Center & Nutrition Hub',
    constituency: 'Chennai South',
    district: 'Chennai',
    state: 'Tamil Nadu',
    category: 'Community Building',
    sanctionedAmount: '₹22,00,000',
    spentAmount: '₹14,00,000',
    progressPercentage: 60,
    physicalProgress: 60,
    financialProgress: 63,
    riskScore: 54,
    status: 'Under Review',
    riskLevel: 'Medium',
    lat: 13.0827,
    lng: 80.2707,
    anomalyFlags: ['Potential duplicate proposal check pending against municipal scheme.'],
    mpName: 'Dr. T. Sumathy'
  },
  {
    id: 'MPL-PRJ-2025-5091',
    title: 'Concrete Paving & Main Access Road Reconstruction',
    constituency: 'Pune Constituency',
    district: 'Pune',
    state: 'Maharashtra',
    category: 'Road / Street',
    sanctionedAmount: '₹50,00,000',
    spentAmount: '₹42,50,000',
    progressPercentage: 52,
    physicalProgress: 52,
    financialProgress: 85,
    riskScore: 82,
    status: 'Delayed',
    riskLevel: 'High',
    lat: 18.5074,
    lng: 73.8077,
    anomalyFlags: ['Progress-expenditure mismatch: 33% gap.', 'Citizen crack reports filed.'],
    mpName: 'Shri S. K. Kulkarni'
  }
];

export const MOCK_DUPLICATES: DuplicateWorkCandidate[] = [
  {
    id: 'DUP-2026-901',
    similarityScore: 92,
    projectA: {
      id: 'MPL-PRJ-2025-3349',
      title: 'Smart Anganwadi Center & Nutrition Hub',
      location: 'Ward 12, Chennai South, Tamil Nadu',
      sanctionedAmount: '₹22,00,000',
      agency: 'District Rural Development Agency',
      sanctionedYear: '2025'
    },
    projectB: {
      id: 'MC-CHE-2024-881',
      title: 'Integrated Child Nutrition & Care Center',
      location: 'Ward 12, Chennai South, Tamil Nadu',
      sanctionedAmount: '₹21,50,000',
      agency: 'Chennai Municipal Corporation',
      sanctionedYear: '2024'
    },
    similarityFactors: {
      description: 94,
      location: 98,
      cost: 92,
      agency: 65
    },
    status: 'Pending Review'
  },
  {
    id: 'DUP-2026-904',
    similarityScore: 87,
    projectA: {
      id: 'MPL-PRJ-2025-5091',
      title: 'Concrete Paving & Main Access Road Reconstruction',
      location: 'Kothrud Sector 4, Pune, Maharashtra',
      sanctionedAmount: '₹50,00,000',
      agency: 'Public Works Department (PWD)',
      sanctionedYear: '2025'
    },
    projectB: {
      id: 'PMC-RD-2024-112',
      title: 'Sector 4 Internal Road Asphalt Resurfacing',
      location: 'Kothrud Sector 4, Pune, Maharashtra',
      sanctionedAmount: '₹48,00,000',
      agency: 'Pune Municipal Corporation',
      sanctionedYear: '2024'
    },
    similarityFactors: {
      description: 85,
      location: 96,
      cost: 90,
      agency: 55
    },
    status: 'Pending Review'
  }
];

export const DISTRICT_RANKINGS: DistrictPerformance[] = [
  { district: 'Pune', state: 'Maharashtra', totalProjects: 128, completionRate: 74, utilizationRate: 82, highRiskCount: 8, delayedCount: 12, overallRiskScore: 42 },
  { district: 'Mumbai City', state: 'Maharashtra', totalProjects: 145, completionRate: 81, utilizationRate: 88, highRiskCount: 5, delayedCount: 9, overallRiskScore: 31 },
  { district: 'Nagpur', state: 'Maharashtra', totalProjects: 96, completionRate: 68, utilizationRate: 75, highRiskCount: 11, delayedCount: 15, overallRiskScore: 58 },
  { district: 'Nashik', state: 'Maharashtra', totalProjects: 112, completionRate: 62, utilizationRate: 71, highRiskCount: 14, delayedCount: 18, overallRiskScore: 65 },
  { district: 'Chhatrapati Sambhajinagar', state: 'Maharashtra', totalProjects: 88, completionRate: 55, utilizationRate: 64, highRiskCount: 18, delayedCount: 22, overallRiskScore: 74 }
];

export const STATE_RANKINGS: StatePerformance[] = [
  { state: 'Tamil Nadu', totalDistricts: 38, totalProjects: 1840, completionRate: 84, utilizationRate: 91, highRiskCount: 42, overallRiskScore: 28 },
  { state: 'Gujarat', totalDistricts: 33, totalProjects: 1620, completionRate: 82, utilizationRate: 89, highRiskCount: 48, overallRiskScore: 32 },
  { state: 'Maharashtra', totalDistricts: 36, totalProjects: 2450, completionRate: 72, utilizationRate: 79, highRiskCount: 124, overallRiskScore: 45 },
  { state: 'Karnataka', totalDistricts: 31, totalProjects: 1780, completionRate: 69, utilizationRate: 76, highRiskCount: 118, overallRiskScore: 52 },
  { state: 'Uttar Pradesh', totalDistricts: 75, totalProjects: 4120, completionRate: 64, utilizationRate: 71, highRiskCount: 295, overallRiskScore: 61 }
];

export const SYSTEM_SERVICES: SystemServiceHealth[] = [
  { name: 'Primary PostgreSQL Database', category: 'Database', status: 'HEALTHY', latencyMs: 12, uptime: '99.98%', lastChecked: '1 min ago' },
  { name: 'Core REST API Gateway', category: 'API', status: 'HEALTHY', latencyMs: 24, uptime: '99.95%', lastChecked: 'Just now' },
  { name: 'AI Anomaly & Risk Engine', category: 'AI Engine', status: 'HEALTHY', latencyMs: 140, uptime: '99.85%', lastChecked: '2 mins ago' },
  { name: 'GIS Vector & Map Tile API', category: 'Maps', status: 'HEALTHY', latencyMs: 45, uptime: '99.90%', lastChecked: 'Just now' },
  { name: 'Sentinel-2 Satellite Pipeline', category: 'Satellite', status: 'HEALTHY', latencyMs: 310, uptime: '99.60%', lastChecked: '15 mins ago' },
  { name: 'SMS & Email Alert Gateway', category: 'Notifications', status: 'HEALTHY', latencyMs: 85, uptime: '99.99%', lastChecked: 'Just now' }
];

export const AUDIT_LOGS: SystemAuditLog[] = [
  { id: 'LOG-8801', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), actor: 'Vikramaditya Sharma', role: 'admin', action: 'DEPLOY_MODEL', resource: 'AI Anomaly Model v2.4', details: 'Updated delay probability neural weights.', ipAddress: '10.240.12.89', severity: 'INFO' },
  { id: 'LOG-8802', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), actor: 'Dr. Rajesh Deshmukh', role: 'district', action: 'UPDATE_COMPLAINT', resource: 'MPL-CMP-2026-001284', details: 'Status changed to Forwarded for Physical Audit.', ipAddress: '14.139.120.4', severity: 'INFO' },
  { id: 'LOG-8803', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), actor: 'System Auto Guard', role: 'admin', action: 'SECURITY_LOCK', resource: 'User: usr-temp-99', details: 'Account locked due to 5 consecutive failed login attempts.', ipAddress: '182.73.91.10', severity: 'WARNING' }
];

export const MOCK_ALERTS: OfficialAlert[] = [
  {
    id: 'ALT-2026-101',
    projectId: 'MPL-PRJ-2024-4112',
    title: 'Severe Physical vs Financial Progress Mismatch',
    category: 'Progress Mismatch',
    severity: 'High',
    jurisdiction: 'Bengaluru Urban, Karnataka',
    createdAt: '2026-08-20T09:30:00Z',
    status: 'Investigating',
    assignedTo: 'District Magistrate Office, Bengaluru Urban',
    description: 'Financial disbursement stands at 91% (₹55L) while physical progress is only 45% on ground.'
  },
  {
    id: 'ALT-2026-104',
    projectId: 'MPL-PRJ-2025-5091',
    title: 'Potential Duplicate Paving Work Detected',
    category: 'Duplicate Work',
    severity: 'High',
    jurisdiction: 'Pune, Maharashtra',
    createdAt: '2026-08-22T14:10:00Z',
    status: 'New',
    assignedTo: 'Pune Nodal Collectorate Desk',
    description: '91% description & geospatial match with municipal PMC resurfacing scheme.'
  }
];

export const getProjectRiskDetail = (projectId: string): ProjectRiskDetail => {
  const prj = EXTENDED_MOCK_PROJECTS.find(p => p.id === projectId) || EXTENDED_MOCK_PROJECTS[0];
  const mismatch = prj.financialProgress - prj.physicalProgress;

  return {
    projectId: prj.id,
    overallScore: prj.riskScore,
    riskLevel: prj.riskLevel || 'Low',
    summary: prj.anomalyFlags?.[0] || 'Physical execution aligns with approved financial disbursement timeline.',
    recommendedAction: prj.riskLevel === 'High'
      ? 'Issue immediate field inspection order & halt further installment release until physical audit.'
      : prj.riskLevel === 'Medium'
      ? 'Request updated geotagged site photos from contractor.'
      : 'Maintain standard quarterly progress monitoring.',
    factors: [
      {
        name: 'Progress-Expenditure Alignment',
        score: mismatch > 20 ? 85 : 20,
        weight: '35%',
        explanation: `Financial disbursement (${prj.financialProgress}%) vs physical execution (${prj.physicalProgress}%). Difference: ${mismatch}%.`
      },
      {
        name: 'Milestone Delay Probability',
        score: prj.status === 'Delayed' ? 90 : 30,
        weight: '25%',
        explanation: 'Historical timeline completion velocity indicates potential milestone slippage.'
      },
      {
        name: 'Duplicate Syntax & Geolocation Match',
        score: prj.anomalyFlags?.some(f => f.includes('duplicate')) ? 88 : 10,
        weight: '20%',
        explanation: 'Natural language cross-check against state & municipal scheme records.'
      },
      {
        name: 'Cost Deviation Variance',
        score: prj.riskScore > 60 ? 65 : 15,
        weight: '20%',
        explanation: 'Unit cost per kilometer/meter compared against PWD standard schedule of rates.'
      }
    ]
  };
};
