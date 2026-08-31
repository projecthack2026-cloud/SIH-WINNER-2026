import React from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { ShieldCheck } from 'lucide-react';

export const MpCitizenIssuesPage: React.FC = () => {
  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">PUBLIC FEEDBACK AGGREGATION</span>
              <span className="text-xs text-slate-500 font-mono">Masked Privacy Layer</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Aggregated Citizen Issues & Demands
            </h1>
            <p className="text-xs text-slate-500">
              Categorized infrastructure demand trends in Pune Constituency (No personal citizen identity exposed).
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>DPDP Encrypted Identity Protection</span>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <span className="text-slate-500 text-xs font-semibold">Road & Paving</span>
              <p className="font-extrabold text-3xl text-slate-900 mt-1">19</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <span className="text-slate-500 text-xs font-semibold">Storm Drainage</span>
              <p className="font-extrabold text-3xl text-slate-900 mt-1">8</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <span className="text-slate-500 text-xs font-semibold">Drinking Water</span>
              <p className="font-extrabold text-3xl text-slate-900 mt-1">7</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <span className="text-slate-500 text-xs font-semibold">Public Health</span>
              <p className="font-extrabold text-3xl text-slate-900 mt-1">6</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <span className="text-slate-500 text-xs font-semibold">School Facilities</span>
              <p className="font-extrabold text-3xl text-slate-900 mt-1">8</p>
            </div>
          </div>
        </div>

      </div>
    </AppShell>
  );
};
