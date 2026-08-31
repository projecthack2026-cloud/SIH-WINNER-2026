import type { Complaint, MockProject } from '../types/complaint';
import type { RoleInfo } from '../types/auth';

export const ROLES: RoleInfo[] = [
  {
    id: 'mp',
    title: 'Member of Parliament (MP)',
    shortTitle: 'Member of Parliament',
    subtitle: 'Monitor constituency development works & funds',
    description: 'Access real-time progress reports, recommend new works, track fund utilization, and review AI anomaly flags for your constituency.',
    iconName: 'Building2',
    badge: 'Constituency Level',
    path: '/signin/mp',
    sampleId: 'MP-LS-2024-ND',
    authorityLevel: 'Lok Sabha / Rajya Sabha MP',
    scopeLevel: 'Constituency'
  },
  {
    id: 'district',
    title: 'District Authority',
    shortTitle: 'District Collectorate / Authority',
    subtitle: 'Manage and monitor district-level implementation',
    description: 'Oversee sanctioning, inspect work sites, verify citizen complaints, upload progress evidence, and release fund installments.',
    iconName: 'Building',
    badge: 'District Level',
    path: '/signin/district',
    sampleId: 'DA-MH-PUNE-01',
    authorityLevel: 'District Magistrate / Nodal Officer',
    scopeLevel: 'District'
  },
  {
    id: 'state',
    title: 'State Nodal Authority',
    shortTitle: 'State Nodal Authority',
    subtitle: 'Monitor state-wide MPLADS implementation & coordination',
    description: 'Track inter-district fund flow, monitor state-wide completion benchmarks, analyze aggregate AI risk patterns, and resolve cross-district delays.',
    iconName: 'Landmark',
    badge: 'State Level',
    path: '/signin/state',
    sampleId: 'SNA-MH-MUMBAI-09',
    authorityLevel: 'State Planning Dept / Secretary',
    scopeLevel: 'State'
  },
  {
    id: 'ministry',
    title: 'Ministry / MoSPI',
    shortTitle: 'Ministry of Statistics & Programme Implementation',
    subtitle: 'National-level monitoring, policy & fraud intelligence',
    description: 'National oversight dashboard powered by macro AI analytics, duplicate work cross-checking across states, and fund compliance auditing.',
    iconName: 'ShieldAlert',
    badge: 'National Level',
    path: '/signin/ministry',
    sampleId: 'MOSPI-HQ-DELHI-001',
    authorityLevel: 'Central Ministry Oversight',
    scopeLevel: 'National'
  },
  {
    id: 'admin',
    title: 'System Administrator',
    shortTitle: 'System Administrator',
    subtitle: 'Technical platform health, RBAC & AI model management',
    description: 'Technical platform administration layer for infrastructure health telemetry, user account provisioning, security audit logs, and AI model deployments.',
    iconName: 'Activity',
    badge: 'Platform Level',
    path: '/signin/admin',
    sampleId: 'SYS-ADMIN-CORE-001',
    authorityLevel: 'Platform Technical Architect',
    scopeLevel: 'Platform'
  }
];

export const STATES_AND_DISTRICTS: Record<string, string[]> = {
  'Maharashtra': ['Pune', 'Mumbai City', 'Nagpur', 'Nashik', 'Thane', 'Chhatrapati Sambhajinagar'],
  'Delhi (NCT)': ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi'],
  'Karnataka': ['Bengaluru Urban', 'Mysuru', 'Dharwad', 'Dakshina Kannada', 'Belagavi'],
  'Uttar Pradesh': ['Varanasi', 'Lucknow', 'Kanpur Nagar', 'Gorakhpur', 'Prayagraj', 'Agra'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
  'West Bengal': ['Kolkata', 'Howrah', 'North 24 Parganas', 'Darjeeling', 'Murshidabad']
};

export const MOCK_PROJECTS: MockProject[] = [
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
    status: 'Delayed',
    riskLevel: 'High',
    lat: 12.9716,
    lng: 77.5946,
    anomalyFlags: [
      'Cost overrun vs physical milestone imbalance.',
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
    status: 'Under Review',
    riskLevel: 'Medium',
    lat: 13.0827,
    lng: 80.2707,
    anomalyFlags: ['Duplicate proposal check pending against municipal scheme.'],
    mpName: 'Dr. T. Sumathy'
  }
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    complaintId: 'MPL-CMP-2026-001284',
    anonymousCitizenId: 'CIT-7F82X',
    category: 'Road / Street',
    description: 'Sub-standard concrete paving laid on Sector 4 Main Access Road. Heavy cracking visible within 3 weeks of execution. Material quality appears compromised.',
    whenNoticed: '2026-08-10',
    isOngoing: 'Yes',
    state: 'Maharashtra',
    district: 'Pune',
    locality: 'Kothrud Sector 4',
    landmark: 'Near Shivaji Secondary School',
    latitude: 18.5074,
    longitude: 73.8077,
    submittedAt: '2026-08-14T10:30:00Z',
    evidence: [
      {
        id: 'ev-1',
        name: 'road_cracks_sector4.jpg',
        url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80',
        type: 'image/jpeg',
        size: 2450000,
        aiCheckResults: {
          metadataConsistent: true,
          manipulationRisk: 'Low',
          aiGeneratedRisk: 'Low',
          locationConsistent: true,
          confidenceScore: 94,
          notes: ['Authentic camera EXIF detected', 'Geospatial coordinates match report area', 'No digital manipulation signatures']
        }
      }
    ],
    citizenVerificationStatus: 'Verified Citizen',
    evidenceVerificationStatus: 'Verified / Low Concern',
    riskLevel: 'Medium',
    complaintStatus: 'Forwarded to District Authority',
    assignedAuthority: 'District Magistrate Office, Pune',
    updatesHistory: [
      {
        timestamp: '2026-08-14T10:30:00Z',
        status: 'Submitted',
        note: 'Report submitted by verified citizen via encrypted portal.',
        updatedBy: 'Citizen Portal'
      },
      {
        timestamp: '2026-08-14T10:32:00Z',
        status: 'Under Verification',
        note: 'AI Evidence Verification completed. EXIF & visual integrity confirmed.',
        updatedBy: 'AI Monitoring Engine'
      },
      {
        timestamp: '2026-08-15T09:00:00Z',
        status: 'Forwarded to District Authority',
        note: 'Forwarded to Pune District Nodal Officer for physical inspection.',
        updatedBy: 'State Routing Service'
      }
    ]
  },
  {
    complaintId: 'MPL-CMP-2026-000912',
    anonymousCitizenId: 'CIT-9B21Y',
    category: 'Drainage',
    description: 'Constructed storm drain left uncovered without protective grates or safety culverts, causing flooding and hazard during rains.',
    whenNoticed: '2026-08-01',
    isOngoing: 'Yes',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    locality: 'Jayanagar 4th Block',
    submittedAt: '2026-08-05T14:15:00Z',
    evidence: [],
    citizenVerificationStatus: 'Verified Citizen',
    evidenceVerificationStatus: 'Unable to Verify',
    riskLevel: 'High',
    complaintStatus: 'Under Investigation',
    assignedAuthority: 'BBMP / District Collectorate',
    updatesHistory: [
      {
        timestamp: '2026-08-05T14:15:00Z',
        status: 'Submitted',
        note: 'Complaint registered.',
        updatedBy: 'Citizen Portal'
      },
      {
        timestamp: '2026-08-07T11:00:00Z',
        status: 'Under Investigation',
        note: 'Assigned to field inspector due to high safety risk.',
        updatedBy: 'District Nodal Desk'
      }
    ]
  }
];

export const getStoredComplaints = (): Complaint[] => {
  try {
    const data = localStorage.getItem('mplads_complaints');
    if (!data) {
      localStorage.setItem('mplads_complaints', JSON.stringify(INITIAL_COMPLAINTS));
      return INITIAL_COMPLAINTS;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_COMPLAINTS;
  }
};

export const saveComplaint = (complaint: Complaint): void => {
  try {
    const list = getStoredComplaints();
    const updated = [complaint, ...list];
    localStorage.setItem('mplads_complaints', JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save complaint to localStorage', e);
  }
};

export const generateComplaintId = (): string => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `MPL-CMP-2026-${randomNum}`;
};

export const generateCitizenId = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `CIT-${result}`;
};

export const simulateAiEvidenceCheck = (file: File) => {
  const isImage = file.type.startsWith('image/');

  if (!isImage) {
    return {
      status: 'Unable to Verify' as const,
      metadataConsistent: false,
      locationConsistent: false,
      confidenceScore: 45,
      manipulationRisk: 'High' as const,
      aiGeneratedRisk: 'Medium' as const,
      notes: [
        'Non-standard image format provided.',
        'EXIF metadata parsing returned empty attributes.',
        'Manual inspection by District Authority required.'
      ]
    };
  }

  const score = Math.floor(88 + Math.random() * 10);
  return {
    status: 'Verified / Low Concern' as const,
    metadataConsistent: true,
    locationConsistent: true,
    confidenceScore: score,
    manipulationRisk: 'Low' as const,
    aiGeneratedRisk: 'Low' as const,
    notes: [
      'Image structural metadata matches mobile camera hardware.',
      'Zero visual splice or pixel manipulation artifacts detected.',
      'Generative AI probability score < 3.2% (authentic photograph).',
      'Geospatial pixel consistency validated against local terrain elevation.'
    ]
  };
};
