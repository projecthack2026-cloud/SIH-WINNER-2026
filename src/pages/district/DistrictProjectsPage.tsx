import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../../components/dashboard/AppShell';
import { KpiCard } from '../../components/dashboard/KpiCard';
import { ProjectTable } from '../../components/dashboard/ProjectTable';
import type { MockProject } from '../../types/complaint';
import { api, mapApiProjectToMockProject } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { FolderKanban, CheckCircle2, Clock, RefreshCw, AlertCircle } from 'lucide-react';

export const DistrictProjectsPage: React.FC = () => {
  const { user } = useAuth();
  const districtName = user?.jurisdiction || 'Pune';
  const navigate = useNavigate();

  const [projects, setProjects] = useState<MockProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getProjects({ district: districtName, limit: 100 });
      setProjects((res || []).map(mapApiProjectToMockProject));
    } catch (err: any) {
      setError("Unable to load district project records from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [districtName]);

  const completedCount = projects.filter(p => p.status === 'Completed').length;
  const ongoingCount = projects.filter(p => p.status === 'Ongoing').length;

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Page Title & Scope Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">DISTRICT SCOPE: {districtName.toUpperCase()} DISTRICT</span>
              <span className="text-xs text-slate-500 font-mono">Nodal Officer Action Desk</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              District Projects
            </h1>
            <p className="text-xs text-slate-500">
              Monitor and manage MPLADS works across {districtName} District.
            </p>
          </div>

          <button
            onClick={fetchProjects}
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
            <button onClick={fetchProjects} className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold">Retry</button>
          </div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <KpiCard kpi={{ id: '1', title: 'Total Works Tracked', value: projects.length, description: 'PostgreSQL Ingested', color: 'blue' }} icon={FolderKanban} />
          <KpiCard kpi={{ id: '2', title: 'Completed Works', value: completedCount, description: 'PostgreSQL Ingested', color: 'emerald' }} icon={CheckCircle2} />
          <KpiCard kpi={{ id: '3', title: 'Ongoing Works', value: ongoingCount, description: 'Active Execution', color: 'blue' }} icon={Clock} />
        </div>

        {/* Project Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base">All District Development Works</h3>
            <span className="text-xs text-slate-500 font-mono">{projects.length} Records Loaded</span>
          </div>

          {loading ? (
            <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
              <span>Loading district project records...</span>
            </div>
          ) : (
            <ProjectTable
              projects={projects}
              onSelectProject={(p) => navigate(`/projects/${p.id}`)}
            />
          )}
        </div>

      </div>
    </AppShell>
  );
};
