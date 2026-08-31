import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { DigitalTwinMap } from '../../components/dashboard/DigitalTwinMap';
import type { MockProject } from '../../types/complaint';
import { api, mapApiProjectToMockProject } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { RefreshCw } from 'lucide-react';

export const StateDigitalTwinPage: React.FC = () => {
  const { user } = useAuth();
  const stateName = user?.jurisdiction || 'Maharashtra';
  const [projects, setProjects] = useState<MockProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await api.getProjects({ state: stateName, limit: 100 });
        setProjects((res || []).map(mapApiProjectToMockProject));
      } catch (err) {
        console.error("State digital twin API error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [stateName]);

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">STATE GEOSPATIAL COMMAND</span>
              <span className="text-xs text-slate-500 font-mono">{stateName} Digital Mesh</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              State Digital Twin
            </h1>
            <p className="text-xs text-slate-500">
              Interactive GIS project monitoring across {stateName}.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
            <span>Loading state GIS digital twin from database...</span>
          </div>
        ) : (
          <DigitalTwinMap
            projects={projects}
            title={`${stateName} State Geospatial Command Twin`}
            scopeLabel={`${stateName} Geographic Scope`}
          />
        )}

      </div>
    </AppShell>
  );
};
