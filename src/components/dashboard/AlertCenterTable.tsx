import React, { useState } from 'react';
import { MOCK_ALERTS } from '../../data/dashboardMockData';
import type { OfficialAlert } from '../../types/dashboard';

export const AlertCenterTable: React.FC = () => {
  const [alerts, setAlerts] = useState<OfficialAlert[]>(MOCK_ALERTS);

  const handleUpdateStatus = (id: string, newStatus: OfficialAlert['status']) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-extrabold text-slate-900 text-base">Official Alert & Compliance Center</h3>
          <p className="text-xs text-slate-500">Automated AI anomaly alerts requiring governance action</p>
        </div>
        <span className="badge badge-danger text-xs font-bold">{alerts.length} Active Alerts</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
              <th className="p-3">Alert ID</th>
              <th className="p-3">Alert Summary</th>
              <th className="p-3">Category</th>
              <th className="p-3">Severity</th>
              <th className="p-3">Jurisdiction</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {alerts.map(a => (
              <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-mono font-bold text-slate-900">{a.id}</td>
                <td className="p-3">
                  <p className="font-bold text-slate-900">{a.title}</p>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{a.description}</p>
                </td>
                <td className="p-3 font-semibold text-slate-700">{a.category}</td>
                <td className="p-3">
                  <span className={`badge ${
                    a.severity === 'High' || a.severity === 'Critical' ? 'badge-danger' : 'badge-warning'
                  } text-[10px] font-bold`}>
                    {a.severity}
                  </span>
                </td>
                <td className="p-3 text-slate-700">{a.jurisdiction}</td>
                <td className="p-3">
                  <span className="badge badge-info text-[10px] font-bold">{a.status}</span>
                </td>
                <td className="p-3 text-right space-x-1">
                  {a.status !== 'Resolved' && (
                    <button
                      onClick={() => handleUpdateStatus(a.id, 'Resolved')}
                      className="btn btn-outline btn-sm text-[10px] py-1 px-2 text-emerald-700 hover:bg-emerald-50"
                    >
                      Resolve
                    </button>
                  )}
                  {a.status !== 'Escalated' && (
                    <button
                      onClick={() => handleUpdateStatus(a.id, 'Escalated')}
                      className="btn btn-accent btn-sm text-[10px] py-1 px-2"
                    >
                      Escalate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
