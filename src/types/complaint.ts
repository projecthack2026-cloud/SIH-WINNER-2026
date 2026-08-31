export type IssueCategory =
  | 'Road / Street'
  | 'Drainage'
  | 'Water Infrastructure'
  | 'School / Education Infrastructure'
  | 'Healthcare Infrastructure'
  | 'Community Building'
  | 'Public Facility'
  | 'Electricity / Lighting'
  | 'Sanitation'
  | 'Other';

export type CitizenVerificationStatus = 'Verified Citizen' | 'Verification Pending' | 'Rejected';

export type EvidenceVerificationStatus = 'Verified / Low Concern' | 'Review Required' | 'Unable to Verify';

export type ComplaintStatus =
  | 'Submitted'
  | 'Under Verification'
  | 'Forwarded to District Authority'
  | 'Under Investigation'
  | 'Action Taken'
  | 'Resolved'
  | 'Rejected';

export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface EvidenceFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  aiCheckResults?: {
    metadataConsistent: boolean;
    manipulationRisk: 'Low' | 'Medium' | 'High';
    aiGeneratedRisk: 'Low' | 'Medium' | 'High';
    locationConsistent: boolean;
    confidenceScore: number; // e.g. 92%
    notes: string[];
  };
}

export interface Complaint {
  complaintId: string; // e.g. MPL-CMP-2026-001284
  anonymousCitizenId: string; // e.g. CIT-7F82X
  category: IssueCategory;
  description: string;
  whenNoticed: string;
  isOngoing: 'Yes' | 'No' | 'Not Sure';
  state: string;
  district: string;
  locality: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;
  submittedAt: string;
  evidence: EvidenceFile[];
  citizenVerificationStatus: CitizenVerificationStatus;
  evidenceVerificationStatus: EvidenceVerificationStatus;
  riskLevel: RiskLevel;
  complaintStatus: ComplaintStatus;
  assignedAuthority: string;
  updatesHistory?: {
    timestamp: string;
    status: ComplaintStatus;
    note: string;
    updatedBy: string;
  }[];
}

export interface MockProject {
  id: string;
  title: string;
  constituency: string;
  district: string;
  state: string;
  category: string;
  sanctionedAmount: string;
  spentAmount: string;
  progressPercentage?: number;
  physicalProgress?: number;
  financialUtilization?: number;
  status: 'Ongoing' | 'Completed' | 'Delayed' | 'Under Review';
  riskLevel?: 'Low' | 'Medium' | 'High';
  lat?: number;
  lng?: number;
  anomalyFlags?: string[];
  mpName: string;
}
