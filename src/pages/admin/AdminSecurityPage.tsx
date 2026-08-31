import React from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { Lock, ShieldCheck } from 'lucide-react';

export const AdminSecurityPage: React.FC = () => {
  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">PLATFORM SECURITY</span>
              <span className="text-xs text-slate-500 font-mono">NIC Security Standards</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Security & Identity Protection Center
            </h1>
            <p className="text-xs text-slate-500">
              DPDP Citizen identity encryption standards, session timeout rules, and TLS 1.3 encryption parameters.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 text-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Lock className="w-5 h-5 text-blue-700" />
            <h3 className="font-bold text-slate-900 text-base">Active Encryption Policies</h3>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex justify-between items-center text-emerald-900">
              <div>
                <span className="font-bold block">DPDP Act Citizen Identity Masking Engine</span>
                <span className="text-emerald-800">All citizen complaint submitter identities are cryptographically hashed into pseudonyms (e.g., CIT-7F82X).</span>
              </div>
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center text-slate-800">
              <div>
                <span className="font-bold block">JWT Session Token Expiry</span>
                <span className="text-slate-600">Official sessions expire after 15 minutes of inactivity.</span>
              </div>
              <span className="badge badge-info font-mono text-[10px]">15 MIN TIMEOUT</span>
            </div>
          </div>
        </div>

      </div>
    </AppShell>
  );
};
