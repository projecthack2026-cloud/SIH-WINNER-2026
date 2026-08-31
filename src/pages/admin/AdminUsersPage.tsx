import React from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { AdminUserTable } from '../../components/dashboard/AdminUserTable';

export const AdminUsersPage: React.FC = () => {
  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">USER & SCOPE PROVISIONING</span>
              <span className="text-xs text-slate-500 font-mono">NIC Credential Management</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Platform User & Scope Management
            </h1>
            <p className="text-xs text-slate-500">
              Provision official government accounts, assign geographic scope boundaries, and lock credentials.
            </p>
          </div>
        </div>

        <AdminUserTable />

      </div>
    </AppShell>
  );
};
