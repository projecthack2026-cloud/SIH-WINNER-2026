import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { DigitalTwinMap } from '../../components/dashboard/DigitalTwinMap';
import type { MockProject } from '../../types/complaint';
import { api, mapApiProjectToMockProject } from '../../services/api';
import { RefreshCw } from 'lucide-react';

export const MinistryDigitalTwinPage: React.FC = () => {
  const [projects, setProjects] = useState<MockProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await api.getProjects({ limit: 100 });
        setProjects((res || []).map(mapApiProjectToMockProject));
      } catch (err) {
        console.error("Ministry digital twin API error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">INDIA GEOSPATIAL COMMAND</span>
              <span className="text-xs text-slate-500 font-mono">National Ingested Dataset</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              India Geospatial Digital Twin
            </h1>
            <p className="text-xs text-slate-500">
              Nationwide GIS project monitoring across Lok Sabha constituencies.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
            <span>Loading national GIS digital twin from database...</span>
          </div>
        ) : (
          <DigitalTwinMap
            projects={projects}
            title="India Geospatial Digital Twin Command Center"
            scopeLabel="National Geographic Scope"
          />
        )}

      </div>
    </AppShell>
  );
};
