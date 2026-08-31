import type { RiskLevel } from './complaint';

export interface DashboardKpi {
  id: string;
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
  color: 'blue' | 'emerald' | 'amber' | 'rose' | 'purple' | 'slate';
}

export interface RiskFactor {
  name: string;
  score: number; // e.g. 35 out of 100
  weight: string;
  explanation: string;
}

export interface ProjectRiskDetail {
  projectId: string;
  overallScore: number; // 0 - 100
  riskLevel: RiskLevel;
  factors: RiskFactor[];
  summary: string;
  recommendedAction: string;
}

export interface DuplicateWorkCandidate {
  id: string;
  similarityScore: number; // e.g. 91%
  projectA: {
    id: string;
    title: string;
    location: string;
    sanctionedAmount: string;
    agency: string;
    sanctionedYear: string;
  };
  projectB: {
    id: string;
    title: string;
    location: string;
    sanctionedAmount: string;
    agency: string;
    sanctionedYear: string;
  };
  similarityFactors: {
    description: number;
    location: number;
    cost: number;
    agency: number;
  };
  status: 'Pending Review' | 'Flagged for Audit' | 'Not Duplicate';
}

export interface DistrictPerformance {
  district: string;
  state: string;
  totalProjects: number;
  completionRate: number; // e.g. 74%
  utilizationRate: number; // e.g. 82%
  highRiskCount: number;
  delayedCount: number;
  overallRiskScore: number;
}

export interface StatePerformance {
  state: string;
  totalDistricts: number;
  totalProjects: number;
  completionRate: number;
  utilizationRate: number;
  highRiskCount: number;
  overallRiskScore: number;
}

export interface SystemServiceHealth {
  name: string;
  category: 'Database' | 'API' | 'AI Engine' | 'Maps' | 'Satellite' | 'Notifications';
  status: 'HEALTHY' | 'DEGRADED' | 'DOWN';
  latencyMs: number;
  uptime: string;
  lastChecked: string;
}

export interface SystemAuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
}

export interface OfficialAlert {
  id: string;
  projectId?: string;
  title: string;
  category: 'Payment Anomaly' | 'Progress Mismatch' | 'Delay Risk' | 'Cost Overrun' | 'Duplicate Work' | 'Compliance';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  jurisdiction: string;
  createdAt: string;
  status: 'New' | 'Under Review' | 'Investigating' | 'Resolved' | 'Escalated';
  assignedTo?: string;
  description: string;
  remarks?: { timestamp: string; note: string; author: string }[];
}
