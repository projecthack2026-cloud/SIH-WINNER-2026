import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { KpiCard } from '../../components/dashboard/KpiCard';
import { ProjectTable } from '../../components/dashboard/ProjectTable';
import { ProjectDetailModal } from '../../components/dashboard/ProjectDetailModal';
import { DigitalTwinMap } from '../../components/dashboard/DigitalTwinMap';
import { DecisionSupportBrief } from '../../components/dashboard/DecisionSupportBrief';
import { AlertCenterTable } from '../../components/dashboard/AlertCenterTable';
import type { MockProject } from '../../types/complaint';
import { useAuth } from '../../context/AuthContext';
import { Landmark, CheckCircle2, ShieldAlert, DollarSign, RefreshCw, AlertCircle } from 'lucide-react';
import { api, mapApiProjectToMockProject, formatINR, type DashboardSummary, type StateRanking, type ApiAnomaly } from '../../services/api';

export const MinistryDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedProject, setSelectedProject] = useState<MockProject | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'states' | 'ai' | 'map' | 'alerts'>('overview');
  
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [projects, setProjects] = useState<MockProject[]>([]);
  const [stateRankings, setStateRankings] = useState<StateRanking[]>([]);
  const [anomalies, setAnomalies] = useState<ApiAnomaly[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [sumRes, projRes, statesRes, anomalyRes] = await Promise.all([
        api.getDashboardSummary(),
        api.getProjects({ limit: 100 }),
        api.getStateRankings(),
        api.getAnomalies({ limit: 100 })
      ]);
      setSummary(sumRes);
      setProjects((projRes || []).map(mapApiProjectToMockProject));
      setStateRankings(statesRes || []);
      setAnomalies(anomalyRes || []);
    } catch (err: any) {
      console.error("FastAPI backend connection error:", err.message);
      setError("Unable to load data from the monitoring system. Please check database connection and retry.");
      setProjects([]);
      setStateRankings([]);
      setAnomalies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalWorks = summary ? summary.total_projects.toLocaleString() : '—';
  const totalExpenditure = summary ? formatINR(summary.total_expenditure) : '—';
  const totalSanctioned = summary ? formatINR(summary.total_sanctioned_amount) : '—';
  const totalStates = summary ? summary.number_of_states : 0;
  const anomalyCount = anomalies.length;

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">NATIONAL HEADQUARTERS</span>
              <span className="text-xs text-slate-500 font-mono">Ministry of Statistics & Programme Implementation</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              National Intelligence Dashboard — India (MoSPI HQ)
            </h1>
            <p className="text-xs text-slate-500">
              Director General (Monitoring): {user?.name}
            </p>
          </div>
          
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="btn btn-outline btn-sm text-xs flex items-center gap-1.5 shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh API Data</span>
          </button>
        </div>

        {/* Error State Callout */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-900 p-4 rounded-2xl text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
            <button 
              onClick={fetchDashboardData}
              className="px-3 py-1 bg-rose-600 text-white rounded-lg font-bold text-[11px] hover:bg-rose-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State Skeleton */}
        {loading && (
          <div className="p-4 text-center bg-white rounded-2xl border border-slate-200 shadow-sm text-xs font-semibold text-slate-500 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
            <span>Fetching live database telemetry from PostgreSQL / SQLite REST API...</span>
          </div>
        )}

        {/* National KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            kpi={{ id: '1', title: 'Total National Works', value: totalWorks, description: `Across ${totalStates} States/UTs`, color: 'blue' }}
            icon={Landmark}
          />
          <KpiCard
            kpi={{ id: '2', title: 'Total Expenditure', value: totalExpenditure, change: `${summary?.number_of_expenditure_transactions || 0} Txns Ingested`, trend: 'up', color: 'emerald' }}
            icon={CheckCircle2}
          />
          <KpiCard
            kpi={{ id: '3', title: 'Sanctioned Pool', value: totalSanctioned, description: 'PostgreSQL Dataset Verified', color: 'emerald' }}
            icon={DollarSign}
          />
          <KpiCard
            kpi={{ id: '4', title: 'Systemic Anomaly Flag', value: `${anomalyCount} Works`, change: 'Rule Engine Verified', trend: 'neutral', color: 'rose' }}
            icon={ShieldAlert}
          />
        </div>

        {/* Executive AI Brief Panel */}
        <DecisionSupportBrief scope="National" regionName="India (MoSPI)" />

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold overflow-x-auto">
          {[
            { id: 'overview', label: `All National Projects (${projects.length})` },
            { id: 'states', label: `State & UT Performance Rankings (${stateRankings.length})` },
            { id: 'ai', label: `National AI Anomaly Results (${anomalyCount})` },
            { id: 'map', label: 'India Digital Twin' },
            { id: 'alerts', label: 'National Alert Desk' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2.5 border-b-2 font-bold whitespace-nowrap transition-colors ${
                activeTab === t.id ? 'border-blue-600 text-blue-800' : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Views */}
        {activeTab === 'overview' && (
          <ProjectTable
            projects={projects}
            onSelectProject={(p) => setSelectedProject(p)}
          />
        )}

        {activeTab === 'states' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">State & Union Territory Performance Rankings</h3>
                <p className="text-xs text-slate-500">Calculated directly from imported database records</p>
              </div>
            </div>

            {stateRankings.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 font-medium">No state ranking data available.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                      <th className="p-3">Rank & State</th>
                      <th className="p-3">Districts</th>
                      <th className="p-3">Total Works</th>
                      <th className="p-3">Completed Works</th>
                      <th className="p-3">Sanctioned Amount</th>
                      <th className="p-3">Expenditure Amount</th>
                      <th className="p-3">Utilization %</th>
                      <th className="p-3">High Risk Count</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stateRankings.map((s, i) => (
                      <tr key={s.state} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3">
                          <span className="font-bold text-slate-900">#{i + 1} {s.state}</span>
                        </td>
                        <td className="p-3 font-semibold text-slate-700">{s.total_districts}</td>
                        <td className="p-3 font-mono font-bold text-slate-900">{s.total_projects}</td>
                        <td className="p-3 font-mono text-emerald-700 font-bold">{s.completed_projects}</td>
                        <td className="p-3 font-mono font-bold text-slate-900">{formatINR(s.sanctioned_amount)}</td>
                        <td className="p-3 font-mono font-bold text-slate-900">{formatINR(s.expenditure_amount)}</td>
                        <td className="p-3 font-bold text-blue-700">{s.utilization_rate}%</td>
                        <td className="p-3">
                          <span className="badge badge-danger text-[10px] font-bold">{s.high_risk_count}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-900 leading-relaxed">
              <strong>National Anomaly Detection Engine:</strong> Displaying {anomalies.length} rule-derived anomaly flags imported from the database engine.
            </div>

            {anomalies.length === 0 ? (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                No anomaly results detected in database.
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                        <th className="p-3">Canonical Work ID</th>
                        <th className="p-3">Work Title</th>
                        <th className="p-3">State / District</th>
                        <th className="p-3">Anomaly Type</th>
                        <th className="p-3">Rule Code</th>
                        <th className="p-3">Description</th>
                        <th className="p-3">Severity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {anomalies.map((a) => (
                        <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-mono font-bold text-blue-700">{a.canonical_work_id}</td>
                          <td className="p-3 font-medium text-slate-900 max-w-xs truncate">{a.work_title}</td>
                          <td className="p-3 text-slate-600">{a.state} / {a.district}</td>
                          <td className="p-3 font-bold text-amber-800">{a.anomaly_type}</td>
                          <td className="p-3 font-mono text-slate-500">{a.rule_code}</td>
                          <td className="p-3 text-slate-700 max-w-sm">{a.description}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              a.severity === 'HIGH' || a.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {a.severity}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'map' && (
          <DigitalTwinMap
            projects={projects}
            title="India Geospatial Digital Twin"
            scopeLabel="National Geographic Scope"
          />
        )}

        {activeTab === 'alerts' && (
          <AlertCenterTable />
        )}

        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

      </div>
    </AppShell>
  );
};
