import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { KpiCard } from '../../components/dashboard/KpiCard';
import { ProjectTable } from '../../components/dashboard/ProjectTable';
import { ProjectDetailModal } from '../../components/dashboard/ProjectDetailModal';
import type { MockProject } from '../../types/complaint';
import { api, mapApiProjectToMockProject, formatINR, type MpSummary } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { DollarSign, TrendingUp, BarChart3, RefreshCw, AlertCircle } from 'lucide-react';

export const MpFinancialPage: React.FC = () => {
  const { user } = useAuth();
  const mpName = user?.name || 'S. K. Kulkarni';
  const [selectedProject, setSelectedProject] = useState<MockProject | null>(null);
  const [mpSummary, setMpSummary] = useState<MpSummary | null>(null);
  const [projects, setProjects] = useState<MockProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFinancials = async () => {
    setLoading(true);
    setError(null);
    try {
      const [sumRes, projRes] = await Promise.all([
        api.getMpSummary(mpName),
        api.getProjects({ mp: mpName, limit: 100 }).then(r => r.length > 0 ? r : api.getProjects({ limit: 100 }))
      ]);
      setMpSummary(sumRes);
      setProjects((projRes || []).map(mapApiProjectToMockProject));
    } catch (err: any) {
      setError("Unable to load MP financial metrics from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancials();
  }, [mpName]);

  const totalSanctioned = mpSummary ? formatINR(mpSummary.total_sanctioned_amount) : '—';
  const totalSpent = mpSummary ? formatINR(mpSummary.total_expenditure) : '—';

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">FUND ACCOUNTABILITY</span>
              <span className="text-xs text-slate-500 font-mono">MPLADS Sanctions & Disbursements</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Financial Overview — Hon'ble MP {mpName}
            </h1>
            <p className="text-xs text-slate-500">
              Sanctioned funds, actual expenditure, and utilization rates across recommended works.
            </p>
          </div>

          <button
            onClick={fetchFinancials}
            disabled={loading}
            className="btn btn-outline btn-sm text-xs flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh API</span>
          </button>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-900 p-4 rounded-2xl text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>{error}</span>
            </div>
            <button onClick={fetchFinancials} className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold">Retry</button>
          </div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <KpiCard kpi={{ id: '1', title: 'Total Sanctioned Fund', value: totalSanctioned, description: 'PostgreSQL Sanction Records', color: 'blue' }} icon={DollarSign} />
          <KpiCard kpi={{ id: '2', title: 'Disbursed Expenditure', value: totalSpent, change: `${mpSummary?.utilization_percentage || 0}% Utilization`, trend: 'up', color: 'emerald' }} icon={TrendingUp} />
          <KpiCard kpi={{ id: '3', title: 'Utilization Rate', value: `${mpSummary?.utilization_percentage || 0}%`, change: `${mpSummary?.total_projects || 0} Total Works`, trend: 'up', color: 'emerald' }} icon={BarChart3} />
        </div>

        {/* Project Table */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-slate-900 text-base">Constituency Financial Vouchers</h3>
          {loading ? (
            <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
              <span>Loading constituency financial records...</span>
            </div>
          ) : (
            <ProjectTable
              projects={projects}
              onSelectProject={(p) => setSelectedProject(p)}
            />
          )}
        </div>

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
