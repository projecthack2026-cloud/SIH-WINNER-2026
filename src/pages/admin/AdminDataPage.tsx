import React from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { Database } from 'lucide-react';

export const AdminDataPage: React.FC = () => {
  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">DATA PIPELINE ENGINE</span>
              <span className="text-xs text-slate-500 font-mono">Ingestion & ETL Health</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Data Management & Ingestion Pipelines
            </h1>
            <p className="text-xs text-slate-500">
              Monitor ETL sync jobs from Public Works Department (PWD), Treasury Vouchers, and Municipal datasets.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-700" />
              <h3 className="font-bold text-slate-900 text-base">ETL Synchronization Status</h3>
            </div>
            <span className="badge badge-success text-xs font-mono">ETL ACTIVE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block">State PWD Works Sync</span>
              <p className="text-slate-600">Last Synced: 15 mins ago</p>
              <span className="badge badge-success text-[10px]">100% Records Validated</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block">District Treasury Vouchers</span>
              <p className="text-slate-600">Last Synced: 1 hour ago</p>
              <span className="badge badge-success text-[10px]">100% Records Validated</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block">Municipal Scheme Proposals</span>
              <p className="text-slate-600">Last Synced: 3 hours ago</p>
              <span className="badge badge-success text-[10px]">NLP Vectorized</span>
            </div>
          </div>
        </div>

      </div>
    </AppShell>
  );
};
