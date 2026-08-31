import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { KpiCard } from '../../components/dashboard/KpiCard';
import { ProjectTable } from '../../components/dashboard/ProjectTable';
import { ProjectDetailModal } from '../../components/dashboard/ProjectDetailModal';
import { DigitalTwinMap } from '../../components/dashboard/DigitalTwinMap';
import type { MockProject } from '../../types/complaint';
import { useAuth } from '../../context/AuthContext';
import { Landmark, CheckCircle2, Clock, Users, RefreshCw, AlertCircle } from 'lucide-react';
import { api, mapApiProjectToMockProject, formatINR, type MpSummary } from '../../services/api';

export const MpDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const mpName = user?.name || 'S. K. Kulkarni';
  const [selectedProject, setSelectedProject] = useState<MockProject | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'recommended' | 'map'>('overview');

  const [mpSummary, setMpSummary] = useState<MpSummary | null>(null);
  const [projects, setProjects] = useState<MockProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMpData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [summaryRes, projRes] = await Promise.all([
        api.getMpSummary(mpName),
        api.getProjects({ mp: mpName, limit: 100 }).then(res => res.length > 0 ? res : api.getProjects({ limit: 100 }))
      ]);
      setMpSummary(summaryRes);
      setProjects((projRes || []).map(mapApiProjectToMockProject));
    } catch (err: any) {
      console.error("FastAPI backend MP data connection error:", err.message);
      setError("Unable to load data from the monitoring system. Please check database connection and retry.");
      setProjects([]);
      setMpSummary(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMpData();
  }, [mpName]);

  const allocatedAmt = mpSummary ? formatINR(mpSummary.allocated_amount) : '—';
  const sanctionedAmt = mpSummary ? formatINR(mpSummary.total_sanctioned_amount) : '—';
  const expenditureAmt = mpSummary ? formatINR(mpSummary.total_expenditure) : '—';

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-success text-[10px] uppercase font-bold">MEMBER OF PARLIAMENT PORTAL</span>
              <span className="text-xs text-slate-500 font-mono">18th Lok Sabha Constituency Desk</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Constituency Command Center — {user?.jurisdiction || mpSummary?.constituency || 'Constituency'}
            </h1>
            <p className="text-xs text-slate-500">
              Hon'ble MP: {mpName} (Lok Sabha)
            </p>
          </div>

          <button
            onClick={fetchMpData}
            disabled={loading}
            className="btn btn-outline btn-sm text-xs flex items-center gap-1.5 shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync REST API</span>
          </button>
        </div>

        {/* Error Callout */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-900 p-4 rounded-2xl text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
            <button 
              onClick={fetchMpData}
              className="px-3 py-1 bg-rose-600 text-white rounded-lg font-bold text-[11px] hover:bg-rose-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="p-4 text-center bg-white rounded-2xl border border-slate-200 shadow-sm text-xs font-semibold text-slate-500 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
            <span>Fetching MP recommendation dataset from PostgreSQL API...</span>
          </div>
        )}

        {/* MP KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            kpi={{ id: '1', title: 'Allocated Limit', value: allocatedAmt, description: 'PostgreSQL Allocation Table', color: 'blue' }}
            icon={Landmark}
          />
          <KpiCard
            kpi={{ id: '2', title: 'Total Sanctioned', value: sanctionedAmt, description: `${mpSummary?.total_projects || projects.length} Works Tracked`, color: 'emerald' }}
            icon={CheckCircle2}
          />
          <KpiCard
            kpi={{ id: '3', title: 'Total Expenditure', value: expenditureAmt, change: `${mpSummary?.utilization_percentage || 0}% Financial Util.`, trend: 'up', color: 'emerald' }}
            icon={Clock}
          />
          <KpiCard
            kpi={{ id: '4', title: 'Completed Works', value: `${mpSummary?.completed_projects || 0} Works`, change: 'PostgreSQL Ingested', trend: 'neutral', color: 'purple' }}
            icon={Users}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold overflow-x-auto">
          {[
            { id: 'overview', label: `Recommended & Sanctioned Works (${projects.length})` },
            { id: 'recommended', label: 'Under District Authority Review' },
            { id: 'map', label: 'Constituency Digital Twin' }
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

        {activeTab === 'recommended' && (
          <ProjectTable
            projects={projects.filter(p => p.status === 'Under Review' || p.status === 'Ongoing')}
            onSelectProject={(p) => setSelectedProject(p)}
          />
        )}

        {activeTab === 'map' && (
          <DigitalTwinMap
            projects={projects}
            title="Constituency Infrastructure Digital Twin"
            scopeLabel="Hon'ble MP Constituency Scope"
          />
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
