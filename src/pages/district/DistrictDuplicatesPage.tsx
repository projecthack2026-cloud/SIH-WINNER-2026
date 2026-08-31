import React from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { KpiCard } from '../../components/dashboard/KpiCard';
import { CopyCheck, AlertTriangle, Eye, CheckCircle2 } from 'lucide-react';

export const DistrictDuplicatesPage: React.FC = () => {
  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Page Title & Scope Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-warning text-[10px] uppercase font-bold">CROSS-DATABASE AUDIT</span>
              <span className="text-xs text-slate-500 font-mono">NLP & Proximity Scanner</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Duplicate & Irregular Work Detection
            </h1>
            <p className="text-xs text-slate-500">
              Identify potentially duplicated or highly similar development works across municipal and state schemes.
            </p>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard kpi={{ id: '1', title: 'Potential Duplicate Cases', value: 0, description: 'Flagged by NLP', color: 'amber' }} icon={CopyCheck} />
          <KpiCard kpi={{ id: '2', title: 'High Similarity (>90%)', value: 0, description: 'Critical match', color: 'rose' }} icon={AlertTriangle} />
          <KpiCard kpi={{ id: '3', title: 'Under Investigation', value: 0, description: 'Field Audit Desk', color: 'blue' }} icon={Eye} />
          <KpiCard kpi={{ id: '4', title: 'Resolved / Cleared', value: 0, description: 'Verified Unique', color: 'emerald' }} icon={CheckCircle2} />
        </div>

        <div className="bg-white p-10 rounded-3xl border border-slate-200 text-center text-xs space-y-2">
          <p className="font-extrabold text-slate-900 text-sm">No duplicate candidates detected</p>
          <p className="text-slate-500 max-w-md mx-auto">
            District NLP & Cosine Similarity screening across database project records found zero duplicate candidates.
          </p>
        </div>

      </div>
    </AppShell>
  );
};
