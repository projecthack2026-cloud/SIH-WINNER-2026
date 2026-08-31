// API Client for MPLADS AI Monitor REST Backend
import type { MockProject } from '../types/complaint';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'https://sih-winner-2026.onrender.com';
const cleanBaseUrl = rawBaseUrl.replace(/\/+$/, '');
const API_BASE_URL = cleanBaseUrl.endsWith('/api') ? cleanBaseUrl : `${cleanBaseUrl}/api`;

export interface DashboardSummary {
  total_projects: number;
  recommended_projects: number;
  sanctioned_projects: number;
  ongoing_projects: number;
  completed_projects: number;
  partially_completed_projects: number;
  total_recommended_amount: number;
  total_sanctioned_amount: number;
  total_expenditure: number;
  total_completed_amount: number;
  number_of_vendors: number;
  number_of_expenditure_transactions: number;
  number_of_states: number;
  number_of_constituencies: number;
  number_of_mps: number;
  overall_utilization_rate?: number;
}

export interface ApiProject {
  id: number;
  canonical_work_id: string;
  work_category?: string;
  work_title: string;
  work_description?: string;
  state?: string;
  district?: string;
  ida?: string;
  mp_name?: string;
  constituency?: string;
  recommended_date?: string;
  sanction_date?: string;
  completion_date?: string;
  recommended_amount: number;
  sanctioned_amount: number;
  completed_amount: number;
  current_status: string;
}

export interface ApiProjectFinancial {
  project_id: number;
  canonical_work_id: string;
  sanctioned_amount: number;
  total_expenditure: number;
  remaining_amount: number;
  utilization_percentage: number;
  expenditure_transaction_count: number;
  vendor_count: number;
  average_transaction_value: number;
}

export interface ApiProjectTimeline {
  project_id: number;
  canonical_work_id: string;
  recommended_date?: string;
  sanction_date?: string;
  completion_date?: string;
  recommendation_to_sanction_days?: number;
  sanction_to_completion_days?: number;
  project_duration_days?: number;
}

export interface MpAllocationItem {
  id: number;
  state?: string;
  mp_name?: string;
  constituency?: string;
  allocated_amount: number;
}

export interface CalamityConsentItem {
  id: number;
  calamity_type?: string;
  calamity_name?: string;
  mp_name?: string;
  consent_date?: string;
  consent_amount: number;
}

export interface StateRanking {
  state: string;
  total_districts: number;
  total_projects: number;
  sanctioned_amount: number;
  expenditure_amount: number;
  completed_projects: number;
  ongoing_projects: number;
  completion_rate: number;
  utilization_rate: number;
  high_risk_count: number;
  overall_risk_score: number;
}

export interface DistrictRanking {
  district: string;
  state: string;
  total_projects: number;
  sanctioned_amount: number;
  expenditure_amount: number;
  completed_projects: number;
  ongoing_projects: number;
  completion_rate: number;
  utilization_rate: number;
  high_risk_count: number;
}

export interface ApiMapProject {
  project_id: number;
  canonical_work_id: string;
  title: string;
  description?: string;
  work_category?: string;
  status: string;
  latitude: number;
  longitude: number;
  sanctioned_amount: number;
  expenditure?: number;
  financial_utilization: number;
  state?: string;
  district?: string;
  constituency?: string;
  mp?: string;
  location_text?: string;
  village?: string;
  locality?: string;
  location_accuracy?: string;
  confidence_score?: string;
  location_status?: string;
  source?: string;
  verified?: boolean;
}

export interface ApiLocationQualitySummary {
  total_projects: number;
  locations_extracted: number;
  geocoded: number;
  verified_exact: number;
  village_level: number;
  approximate: number;
  unmapped: number;
}

export interface ApiLocationProcessingStats {
  total_projects: number;
  locations_extracted: number;
  geocoding_success: number;
  geocoding_failed: number;
  ambiguous_locations: number;
  coordinates_available: number;
  coordinates_missing: number;
}

export interface ApiDistrictSummary {
  district: string;
  state?: string;
  project_count: number;
  completed_count: number;
  ongoing_count: number;
  partial_count: number;
  sanctioned_count: number;
  sanctioned_amount: number;
  expenditure: number;
  utilization_rate: number;
  mapped_projects: number;
  unmapped_projects: number;
}

export interface ApiDistrictItem {
  state?: string;
  district: string;
  project_count: number;
  mapped_count: number;
  unmapped_count: number;
}

export interface ApiStateItem {
  state: string;
  district_count: number;
  project_count: number;
}

export interface ApiUnmappedProject {
  project_id: number;
  canonical_work_id: string;
  title: string;
  description?: string;
  work_category?: string;
  status: string;
  state?: string;
  district?: string;
  constituency?: string;
  mp?: string;
  sanctioned_amount: number;
  financial_utilization: number;
  location_text?: string;
  location_status?: string;
}

export interface ApiGlobalMapSummary {
  mapped_projects: number;
  unmapped_projects: number;
  completed: number;
  ongoing: number;
  partial: number;
  sanctioned: number;
}

export interface ApiBhuvanConfig {
  bhuvan_configured: boolean;
  satellite_configured: boolean;
  geocoding_configured: boolean;
  active_map_provider: string;
  wms_url?: string;
  wmts_url?: string;
  geocoding_url?: string;
  supported_layers: string[];
}

export interface ApiAnomaly {
  anomaly_id: number;
  id?: number;
  canonical_work_id: string;
  project_title: string;
  work_title?: string;
  rule_triggered: string;
  rule_code?: string;
  risk_level: string;
  severity?: string;
  explanation: string;
  description?: string;
  anomaly_type?: string;
  confidence_score: number;
  state?: string;
  district?: string;
  mp_name?: string;
  created_at?: string;
}

export type AnomalyResponse = ApiAnomaly;

export interface MpSummary {
  mp_name: string;
  constituency?: string;
  state?: string;
  allocated_amount: number;
  total_projects: number;
  sanctioned_projects: number;
  completed_projects: number;
  ongoing_projects: number;
  total_sanctioned_amount: number;
  total_expenditure: number;
  remaining_allocation: number;
  utilization_percentage: number;
}

export function formatINR(val: number): string {
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  }
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} L`;
  }
  return `₹${val.toLocaleString('en-IN')}`;
}

export function mapApiProjectToMockProject(p: ApiProject): MockProject & { 
  financialUtilization: number;
  physicalProgressAvailable: boolean;
  coordinatesAvailable: boolean;
  riskAssessmentStatus: string;
} {
  const sancAmt = p.sanctioned_amount > 0 ? p.sanctioned_amount : p.recommended_amount;
  const compAmt = p.completed_amount;
  const financialUtil = sancAmt > 0 ? Math.min(Math.round((compAmt / sancAmt) * 100), 100) : 0;
  
  let mappedStatus: 'Completed' | 'Ongoing' | 'Delayed' | 'Under Review' = 'Completed';
  if (p.current_status.toLowerCase().includes('ongoing') || p.current_status.toLowerCase().includes('sanctioned')) {
    mappedStatus = 'Ongoing';
  } else if (p.current_status.toLowerCase().includes('recommended')) {
    mappedStatus = 'Under Review';
  } else if (p.current_status.toLowerCase().includes('partially')) {
    mappedStatus = 'Delayed';
  }

  return {
    id: p.canonical_work_id || `MPLADS-${p.id}`,
    title: p.work_title,
    category: p.work_category || 'Infrastructure',
    district: p.district || p.ida || 'District HQ',
    state: p.state || 'State Authority',
    constituency: p.constituency || 'Constituency',
    mpName: p.mp_name || 'Hon\'ble Member of Parliament',
    sanctionedAmount: formatINR(sancAmt),
    spentAmount: formatINR(compAmt),
    status: mappedStatus,
    riskLevel: 'Low',
    physicalProgress: undefined,
    financialUtilization: financialUtil,
    physicalProgressAvailable: false,
    coordinatesAvailable: false,
    riskAssessmentStatus: 'Risk score not available',
    progressPercentage: financialUtil,
    lat: undefined,
    lng: undefined,
    anomalyFlags: []
  };
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText || response.statusText}`);
  }
  return response.json();
}

export const api = {
  getDashboardSummary: async (params?: { state?: string; district?: string; constituency?: string; mp?: string }): Promise<DashboardSummary> => {
    const query = new URLSearchParams();
    if (params?.state) query.append('state', params.state);
    if (params?.district) query.append('district', params.district);
    if (params?.constituency) query.append('constituency', params.constituency);
    if (params?.mp) query.append('mp', params.mp);

    const res = await fetch(`${API_BASE_URL}/dashboard/summary?${query.toString()}`);
    return handleResponse<DashboardSummary>(res);
  },

  getProjects: async (params?: {
    state?: string;
    district?: string;
    constituency?: string;
    mp?: string;
    status?: string;
    search?: string;
    skip?: number;
    limit?: number;
  }): Promise<ApiProject[]> => {
    const query = new URLSearchParams();
    if (params?.state) query.append('state', params.state);
    if (params?.district) query.append('district', params.district);
    if (params?.constituency) query.append('constituency', params.constituency);
    if (params?.mp) query.append('mp', params.mp);
    if (params?.status) query.append('status', params.status);
    if (params?.search) query.append('search', params.search);
    if (params?.skip !== undefined) query.append('skip', params.skip.toString());
    if (params?.limit !== undefined) query.append('limit', params.limit.toString());

    const url = `${API_BASE_URL}/projects?${query.toString()}`;
    const res = await fetch(url);
    return handleResponse<ApiProject[]>(res);
  },

  getProjectById: async (id: number): Promise<ApiProject> => {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`);
    return handleResponse<ApiProject>(res);
  },

  getProjectFinancial: async (id: number): Promise<ApiProjectFinancial> => {
    const res = await fetch(`${API_BASE_URL}/projects/${id}/financial`);
    return handleResponse<ApiProjectFinancial>(res);
  },

  getProjectTimeline: async (id: number): Promise<ApiProjectTimeline> => {
    const res = await fetch(`${API_BASE_URL}/projects/${id}/timeline`);
    return handleResponse<ApiProjectTimeline>(res);
  },

  getStateRankings: async (): Promise<StateRanking[]> => {
    const res = await fetch(`${API_BASE_URL}/analytics/state-rankings`);
    return handleResponse<StateRanking[]>(res);
  },

  getDistrictRankings: async (state?: string): Promise<DistrictRanking[]> => {
    const query = new URLSearchParams();
    if (state) query.append('state', state);
    const res = await fetch(`${API_BASE_URL}/analytics/district-rankings?${query.toString()}`);
    return handleResponse<DistrictRanking[]>(res);
  },

  getAnomalies: async (params?: { state?: string; district?: string; mp?: string; limit?: number }): Promise<ApiAnomaly[]> => {
    const query = new URLSearchParams();
    if (params?.state) query.append('state', params.state);
    if (params?.district) query.append('district', params.district);
    if (params?.mp) query.append('mp', params.mp);
    if (params?.limit) query.append('limit', params.limit.toString());

    const res = await fetch(`${API_BASE_URL}/analytics/anomalies?${query.toString()}`);
    return handleResponse<ApiAnomaly[]>(res);
  },

  getMpSummary: async (mp: string, constituency?: string): Promise<MpSummary> => {
    const query = new URLSearchParams();
    query.append('mp', mp);
    if (constituency) query.append('constituency', constituency);

    const res = await fetch(`${API_BASE_URL}/mp/summary?${query.toString()}`);
    return handleResponse<MpSummary>(res);
  },

  getFinancialSummary: async () => {
    const res = await fetch(`${API_BASE_URL}/financial/summary`);
    return handleResponse<any>(res);
  },

  getExpenditures: async (params?: { state?: string; constituency?: string; mp?: string; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.state) query.append('state', params.state);
    if (params?.constituency) query.append('constituency', params.constituency);
    if (params?.mp) query.append('mp', params.mp);
    if (params?.limit) query.append('limit', params.limit.toString());

    const res = await fetch(`${API_BASE_URL}/financial/expenditure?${query.toString()}`);
    return handleResponse<any[]>(res);
  },

  getMpAllocations: async (params?: { state?: string; mp?: string; limit?: number }): Promise<MpAllocationItem[]> => {
    const query = new URLSearchParams();
    if (params?.state) query.append('state', params.state);
    if (params?.mp) query.append('mp', params.mp);
    if (params?.limit) query.append('limit', params.limit.toString());

    const res = await fetch(`${API_BASE_URL}/mp/allocations?${query.toString()}`);
    return handleResponse<MpAllocationItem[]>(res);
  },

  getCalamities: async (params?: { calamity_type?: string; mp?: string }): Promise<CalamityConsentItem[]> => {
    const query = new URLSearchParams();
    if (params?.calamity_type) query.append('calamity_type', params.calamity_type);
    if (params?.mp) query.append('mp', params.mp);

    const res = await fetch(`${API_BASE_URL}/calamities?${query.toString()}`);
    return handleResponse<CalamityConsentItem[]>(res);
  },

  getDuplicates: async () => {
    const res = await fetch(`${API_BASE_URL}/analytics/duplicates`);
    return handleResponse<any>(res);
  },

  getCompliance: async () => {
    const res = await fetch(`${API_BASE_URL}/analytics/compliance`);
    return handleResponse<any>(res);
  },

  getBhuvanConfig: async (): Promise<ApiBhuvanConfig> => {
    const res = await fetch(`${API_BASE_URL}/map/bhuvan/config`);
    return handleResponse<ApiBhuvanConfig>(res);
  },

  getMapStates: async (): Promise<ApiStateItem[]> => {
    const res = await fetch(`${API_BASE_URL}/map/states`);
    return handleResponse<ApiStateItem[]>(res);
  },

  getMapDistricts: async (state?: string): Promise<ApiDistrictItem[]> => {
    const query = new URLSearchParams();
    if (state) query.append('state', state);
    const res = await fetch(`${API_BASE_URL}/map/districts?${query.toString()}`);
    return handleResponse<ApiDistrictItem[]>(res);
  },

  getDistrictMapSummary: async (district: string, state?: string): Promise<ApiDistrictSummary> => {
    const query = new URLSearchParams();
    if (state) query.append('state', state);
    const res = await fetch(`${API_BASE_URL}/map/district/${encodeURIComponent(district)}/summary?${query.toString()}`);
    return handleResponse<ApiDistrictSummary>(res);
  },

  getMapProjects: async (params?: {
    state?: string;
    district?: string;
    status?: string;
    category?: string;
    mp?: string;
    constituency?: string;
    location_quality?: string;
    search?: string;
    limit?: number;
  }): Promise<ApiMapProject[]> => {
    const query = new URLSearchParams();
    if (params?.state) query.append('state', params.state);
    if (params?.district) query.append('district', params.district);
    if (params?.status) query.append('status', params.status);
    if (params?.category) query.append('category', params.category);
    if (params?.mp) query.append('mp', params.mp);
    if (params?.constituency) query.append('constituency', params.constituency);
    if (params?.location_quality) query.append('location_quality', params.location_quality);
    if (params?.search) query.append('search', params.search);
    if (params?.limit) query.append('limit', params.limit.toString());

    const res = await fetch(`${API_BASE_URL}/map/projects?${query.toString()}`);
    return handleResponse<ApiMapProject[]>(res);
  },

  getLocationQualitySummary: async (params?: { state?: string; district?: string }): Promise<ApiLocationQualitySummary> => {
    const query = new URLSearchParams();
    if (params?.state) query.append('state', params.state);
    if (params?.district) query.append('district', params.district);

    const res = await fetch(`${API_BASE_URL}/map/location-quality-summary?${query.toString()}`);
    return handleResponse<ApiLocationQualitySummary>(res);
  },

  processLocations: async (limit?: number): Promise<ApiLocationProcessingStats> => {
    const query = new URLSearchParams();
    if (limit) query.append('limit', limit.toString());

    const res = await fetch(`${API_BASE_URL}/map/process-locations?${query.toString()}`, { method: 'POST' });
    return handleResponse<ApiLocationProcessingStats>(res);
  },

  getGlobalMapSummary: async (params?: { state?: string; district?: string }): Promise<ApiGlobalMapSummary> => {
    const query = new URLSearchParams();
    if (params?.state) query.append('state', params.state);
    if (params?.district) query.append('district', params.district);

    const res = await fetch(`${API_BASE_URL}/map/summary?${query.toString()}`);
    return handleResponse<ApiGlobalMapSummary>(res);
  },

  getUnmappedProjects: async (params?: {
    state?: string;
    district?: string;
    skip?: number;
    limit?: number;
  }): Promise<ApiUnmappedProject[]> => {
    const query = new URLSearchParams();
    if (params?.state) query.append('state', params.state);
    if (params?.district) query.append('district', params.district);
    if (params?.skip !== undefined) query.append('skip', params.skip.toString());
    if (params?.limit !== undefined) query.append('limit', params.limit.toString());

    const res = await fetch(`${API_BASE_URL}/map/unmapped-projects?${query.toString()}`);
    return handleResponse<ApiUnmappedProject[]>(res);
  },

  getMapDebug: async (): Promise<{
    database_connected: boolean;
    project_table: string;
    total_projects: number;
    projects_with_work_description: number;
    locations_processed: number;
    locations_identified: number;
    projects_with_coordinates: number;
    project_locations_count: number;
    bhuvan_configured: boolean;
  }> => {
    const res = await fetch(`${API_BASE_URL}/map/debug`);
    return handleResponse<any>(res);
  }
};

