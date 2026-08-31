import React from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { Settings } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">SYSTEM PREFERENCES</span>
              <span className="text-xs text-slate-500 font-mono">Platform Configuration</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              System Settings & Maintenance Controls
            </h1>
            <p className="text-xs text-slate-500">
              Configure global system flags, maintenance windows, and official notification gateways.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 text-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Settings className="w-5 h-5 text-blue-700" />
            <h3 className="font-bold text-slate-900 text-base">Global Environment Toggles</h3>
          </div>

          <div className="space-y-3 max-w-lg">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900">Enforce Multi-Factor Authentication (MFA)</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900">DPDP Citizen Identity Masking Engine</span>
              <input type="checkbox" defaultChecked disabled className="toggle" />
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900">Automatic Sentinel-2 Ingestion Stream</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
          </div>
        </div>

      </div>
    </AppShell>
  );
};
