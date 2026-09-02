import React, { useEffect, useState } from 'react';
import type { OfficialAlert } from '../../types/dashboard';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export const AlertCenterTable: React.FC = () => {
  const [alerts, setAlerts] = useState<OfficialAlert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch('https://sih-winner-2026.onrender.com/api/analytics/anomalies?limit=50')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch anomaly alerts");
        return res.json();
      })
      .then((data: any[]) => {
        if (!isMounted) return;
        const mapped: OfficialAlert[] = data.map((item) => ({
          id: `ALT-${item.id}`,
          title: item.anomaly_type || "Potential Anomaly",
          description: item.description || "AI Anomaly detection trigger.",
          severity: item.severity === 'HIGH' || item.severity === 'CRITICAL' ? 'Critical' : 'Medium',
          category: 'Payment Anomaly',
          jurisdiction: `${item.district || item.state || 'National'} (MP: ${item.mp_name || 'N/A'})`,
          status: 'Investigating',
          date: item.created_at ? item.created_at.split('T')[0] : '2026-09-02',
          createdAt: item.created_at ? item.created_at.split('T')[0] : '2026-09-02'
        }));
        setAlerts(mapped);
        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Unable to load live data.");
        setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  const handleUpdateStatus = (id: string, newStatus: OfficialAlert['status']) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex items-center justify-center min-h-[200px]">
        <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
        <span className="text-sm font-semibold text-slate-700 ml-3">Fetching live database anomaly alerts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-rose-200 shadow-sm p-6 text-center space-y-2">
        <AlertTriangle className="w-8 h-8 text-rose-500 mx-auto" />
        <h3 className="font-extrabold text-slate-900 text-base">Alert Center Offline</h3>
        <p className="text-xs text-rose-600 font-semibold">{error}</p>
        <span className="text-[11px] text-slate-400 block font-mono">Source: Neon PostgreSQL</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-extrabold text-slate-900 text-base">Official Alert & Compliance Center</h3>
          <p className="text-xs text-slate-500">Source: Neon PostgreSQL Database — AI Anomaly Engine</p>
        </div>
        <span className="badge badge-danger text-xs font-bold">{alerts.length} Active Alerts</span>
      </div>

      {alerts.length === 0 ? (
        <div className="text-center py-8 text-slate-500 text-xs font-medium">
          No active risk anomalies detected in the database.
        </div>
      ) : (
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
                      a.severity === 'Critical' ? 'badge-danger' : 'badge-warning'
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
      )}
    </div>
  );
};

