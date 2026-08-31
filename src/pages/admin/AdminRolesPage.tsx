import React from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { Shield } from 'lucide-react';

export const AdminRolesPage: React.FC = () => {
  const roles = [
    { name: 'Member of Parliament (MP)', code: 'mp', scope: 'Constituency', permissions: ['View Projects', 'View Risk', 'View Financial', 'View Citizen Summaries', 'Export Reports'] },
    { name: 'District Authority', code: 'district', scope: 'District', permissions: ['View & Manage Projects', 'Investigate Anomalies', 'Process Complaints', 'Resolve Alerts', 'Audit Duplicate Works'] },
    { name: 'State Nodal Authority', code: 'state', scope: 'State', permissions: ['State Supervision', 'Rank Districts', 'Review Risk Heatmaps', 'Escalate Alerts', 'Generate Decision Briefs'] },
    { name: 'Ministry / MoSPI', code: 'ministry', scope: 'National', permissions: ['National Monitoring', 'Macro Intelligence', 'Cross-State Duplicate Clusters', 'Policy Brief Generator'] },
    { name: 'System Administrator', code: 'admin', scope: 'Platform', permissions: ['Platform Health Telemetry', 'User Provisioning', 'RBAC Scoping', 'AI Model Deployment', 'Audit Logs'] }
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">RBAC MATRIX</span>
              <span className="text-xs text-slate-500 font-mono">Role Boundary Rules</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Roles & Access Permissions
            </h1>
            <p className="text-xs text-slate-500">
              Role-Based Access Control (RBAC) permission vectors and geographic scoping boundaries.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map(r => (
            <div key={r.code} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-700" />
                  <span className="font-bold text-slate-900 text-sm">{r.name}</span>
                </div>
                <span className="badge badge-info font-mono text-[10px] uppercase">{r.scope}</span>
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-700 block">Granted Permissions:</span>
                <ul className="space-y-1 pl-4 list-disc text-slate-600">
                  {r.permissions.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </AppShell>
  );
};
