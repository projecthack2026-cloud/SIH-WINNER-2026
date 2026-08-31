import React from 'react';
import { AUDIT_LOGS } from '../../data/dashboardMockData';

export const AdminAuditLogTable: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-extrabold text-slate-900 text-base">Immutable Security & Administrative Audit Log</h3>
          <p className="text-xs text-slate-500">Cryptographically verifiable log of all administrative & model deployment actions</p>
        </div>
        <span className="badge badge-info text-xs font-mono font-bold">AUDIT ACTIVE</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse font-mono">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
              <th className="p-3">Log ID & Timestamp</th>
              <th className="p-3">Actor & Role</th>
              <th className="p-3">Action</th>
              <th className="p-3">Resource Affected</th>
              <th className="p-3">Operation Details</th>
              <th className="p-3 text-right">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {AUDIT_LOGS.map(log => (
              <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3">
                  <span className="font-bold text-slate-900 block">{log.id}</span>
                  <span className="text-[10px] text-slate-400">{new Date(log.timestamp).toLocaleTimeString()}</span>
                </td>
                <td className="p-3">
                  <span className="font-bold text-slate-900 block">{log.actor}</span>
                  <span className="text-[10px] text-blue-700 uppercase font-bold">{log.role}</span>
                </td>
                <td className="p-3 font-bold text-emerald-800">{log.action}</td>
                <td className="p-3 text-slate-700">{log.resource}</td>
                <td className="p-3 font-sans text-slate-600 max-w-xs">{log.details}</td>
                <td className="p-3 text-right text-slate-500">{log.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
