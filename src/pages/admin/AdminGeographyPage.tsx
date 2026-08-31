import React from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { MapPin } from 'lucide-react';

export const AdminGeographyPage: React.FC = () => {
  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">JURISDICTION HIERARCHY</span>
              <span className="text-xs text-slate-500 font-mono">Boundaries Configuration</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Geographic Scope Hierarchy
            </h1>
            <p className="text-xs text-slate-500">
              National &gt; State &gt; District &gt; Constituency boundary mappings for security scoping.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 text-xs">
          <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base border-b border-slate-100 pb-3">
            <MapPin className="w-5 h-5 text-blue-700" />
            <span>Active Geographic Boundary Nodes</span>
          </div>

          <div className="space-y-3 font-mono">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
              <span>National Node: <strong>INDIA (MoSPI HQ)</strong></span>
              <span className="badge badge-success text-[10px]">543 Constituencies</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center ml-4">
              <span>State Node: <strong>Maharashtra State</strong></span>
              <span className="badge badge-info text-[10px]">36 Districts</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center ml-8">
              <span>District Node: <strong>Pune District</strong></span>
              <span className="badge badge-warning text-[10px]">128 Active Works</span>
            </div>
          </div>
        </div>

      </div>
    </AppShell>
  );
};
