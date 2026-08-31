import React from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { AlertCenterTable } from '../../components/dashboard/AlertCenterTable';

export const MinistryAlertsPage: React.FC = () => {
  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-danger text-[10px] uppercase font-bold">NATIONAL COMPLIANCE DESK</span>
              <span className="text-xs text-slate-500 font-mono">Central Anomaly Alerts</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              National Alert & Compliance Center
            </h1>
            <p className="text-xs text-slate-500">
              Systemic risk alerts requiring national policy intervention or state escalation.
            </p>
          </div>
        </div>

        <AlertCenterTable />

      </div>
    </AppShell>
  );
};
