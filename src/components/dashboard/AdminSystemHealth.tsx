import React from 'react';
import { SYSTEM_SERVICES } from '../../data/dashboardMockData';
import { Activity } from 'lucide-react';

export const AdminSystemHealth: React.FC = () => {
  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          <h3 className="font-extrabold text-base text-white">System Infrastructure Telemetry</h3>
        </div>
        <span className="badge badge-success text-[10px]">All Systems Operational</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SYSTEM_SERVICES.map((s, idx) => (
          <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">{s.category}</span>
              <span className="badge badge-success text-[9px] font-mono">{s.status}</span>
            </div>
            <p className="font-bold text-sm text-slate-100">{s.name}</p>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-900">
              <span>Latency: <strong className="text-emerald-400">{s.latencyMs}ms</strong></span>
              <span>Uptime: <strong className="text-blue-400">{s.uptime}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
