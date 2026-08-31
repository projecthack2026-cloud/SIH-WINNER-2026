import React from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { AdminAuditLogTable } from '../../components/dashboard/AdminAuditLogTable';

export const AdminAuditPage: React.FC = () => {
  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">IMMUTABLE LOGS</span>
              <span className="text-xs text-slate-500 font-mono">Cryptographic Trail</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Immutable Security Audit Logs
            </h1>
            <p className="text-xs text-slate-500">
              Audit trail of administrative credential changes, scope updates, and AI model deployments.
            </p>
          </div>
        </div>

        <AdminAuditLogTable />

      </div>
    </AppShell>
  );
};
