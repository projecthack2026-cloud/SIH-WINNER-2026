import React from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { KpiCard } from '../../components/dashboard/KpiCard';
import { CitizenComplaintsTable } from '../../components/dashboard/CitizenComplaintsTable';
import { ShieldCheck, FileText, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

export const DistrictComplaintsPage: React.FC = () => {
  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Page Title & Scope Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">CITIZEN GRIEVANCE DESK</span>
              <span className="text-xs text-slate-500 font-mono">100% Identity Protected Layer</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Citizen Complaints Management
            </h1>
            <p className="text-xs text-slate-500">
              Review and act on infrastructure issues reported by verified citizens across Pune District.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>DPDP Encrypted Identity Layer</span>
          </div>
        </div>

        {/* Top Complaint KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <KpiCard kpi={{ id: '1', title: 'New Reports', value: 4, description: 'Submitted Today', color: 'blue' }} icon={FileText} />
          <KpiCard kpi={{ id: '2', title: 'Under Verification', value: 3, description: 'AI Evidence Check', color: 'amber' }} icon={Clock} />
          <KpiCard kpi={{ id: '3', title: 'Under Investigation', value: 6, description: 'Field Audit Desk', color: 'purple' }} icon={AlertTriangle} />
          <KpiCard kpi={{ id: '4', title: 'Action Required', value: 3, change: 'High Priority', trend: 'down', color: 'rose' }} icon={AlertTriangle} />
          <KpiCard kpi={{ id: '5', title: 'Resolved Reports', value: 2, description: 'Remediated Works', color: 'emerald' }} icon={CheckCircle2} />
        </div>

        {/* Interactive Complaints Table */}
        <CitizenComplaintsTable />

      </div>
    </AppShell>
  );
};
