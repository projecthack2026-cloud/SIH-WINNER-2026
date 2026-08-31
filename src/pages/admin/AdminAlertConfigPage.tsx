import React from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { Bell } from 'lucide-react';

export const AdminAlertConfigPage: React.FC = () => {
  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">ALERT ENGINE CONFIG</span>
              <span className="text-xs text-slate-500 font-mono">Sensitivity Thresholds</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Alert Configuration & Thresholds
            </h1>
            <p className="text-xs text-slate-500">
              Set automated trigger rules for physical-financial progress gaps and cost overruns.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 text-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Bell className="w-5 h-5 text-blue-700" />
            <h3 className="font-bold text-slate-900 text-base">Active Trigger Rules</h3>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900 block">Progress-Expenditure Mismatch Trigger</span>
                <span className="text-slate-500">Flag alert if financial disbursement outpaces physical execution by &gt; 25%.</span>
              </div>
              <span className="badge badge-danger text-[10px]">CRITICAL SEVERITY</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900 block">Duplicate Proposal NLP Match Trigger</span>
                <span className="text-slate-500">Flag alert if description + location similarity score &gt; 85%.</span>
              </div>
              <span className="badge badge-warning text-[10px]">HIGH SEVERITY</span>
            </div>
          </div>
        </div>

      </div>
    </AppShell>
  );
};
