import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { KpiCard } from '../../components/dashboard/KpiCard';
import { ProjectTable } from '../../components/dashboard/ProjectTable';
import { ProjectDetailModal } from '../../components/dashboard/ProjectDetailModal';
import type { MockProject } from '../../types/complaint';
import { api, mapApiProjectToMockProject, formatINR, type DashboardSummary } from '../../services/api';
import { DollarSign, TrendingUp, BarChart3, RefreshCw, AlertCircle } from 'lucide-react';

export const MinistryFinancialPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<MockProject | null>(null);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [projects, setProjects] = useState<MockProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFinancials = async () => {
    setLoading(true);
    setError(null);
    try {
      const [sumRes, projRes] = await Promise.all([
        api.getDashboardSummary(),
        api.getProjects({ limit: 100 })
      ]);
      setSummary(sumRes);
      setProjects((projRes || []).map(mapApiProjectToMockProject));
    } catch (err: any) {
      setError("Unable to load national financial metrics from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancials();
  }, []);

  const totalSanctioned = summary ? formatINR(summary.total_sanctioned_amount) : '—';
  const totalSpent = summary ? formatINR(summary.total_expenditure) : '—';

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">NATIONAL FINANCIAL ACCOUNTING</span>
              <span className="text-xs text-slate-500 font-mono">MoSPI Budgetary Division</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              National Financial Intelligence
            </h1>
            <p className="text-xs text-slate-500">
              India-wide sanction vs expenditure tracking calculated directly from database records.
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
          <KpiCard kpi={{ id: '1', title: 'National Sanction Pool', value: totalSanctioned, description: 'PostgreSQL Ingested Sanctions', color: 'blue' }} icon={DollarSign} />
          <KpiCard kpi={{ id: '2', title: 'National Expenditure', value: totalSpent, change: `${summary?.overall_utilization_rate || 0}% Utilization`, trend: 'up', color: 'emerald' }} icon={TrendingUp} />
          <KpiCard kpi={{ id: '3', title: 'Total Ingested Works', value: summary?.total_projects || projects.length, description: 'Canonical Work Records', color: 'purple' }} icon={BarChart3} />
        </div>

        {loading ? (
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
            <span>Loading national financial project records...</span>
          </div>
        ) : (
          <ProjectTable
            projects={projects}
            onSelectProject={(p) => setSelectedProject(p)}
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
