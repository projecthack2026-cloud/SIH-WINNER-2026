import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { api, formatINR, type StateRanking } from '../../services/api';
import { RefreshCw, AlertCircle } from 'lucide-react';

export const MinistryStatesPage: React.FC = () => {
  const [rankings, setRankings] = useState<StateRanking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRankings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getStateRankings();
      setRankings(res || []);
    } catch (err: any) {
      setError("Unable to load state rankings from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">NATIONAL SCORECARD</span>
              <span className="text-xs text-slate-500 font-mono">{rankings.length} States & UTs Ingested</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              State & Union Territory Performance Rankings
            </h1>
            <p className="text-xs text-slate-500">
              National MPLADS execution scorecard calculated from database records.
            </p>
          </div>

          <button
            onClick={fetchRankings}
            disabled={loading}
            className="btn btn-outline btn-sm text-xs flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh API</span>
          </button>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-900 p-4 rounded-2xl text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>{error}</span>
            </div>
            <button onClick={fetchRankings} className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold">Retry</button>
          </div>
        )}

        {loading ? (
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
            <span>Loading state performance rankings from database...</span>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="p-3">Rank & State</th>
                    <th className="p-3">Districts</th>
                    <th className="p-3">Total Works</th>
                    <th className="p-3">Completed Works</th>
                    <th className="p-3">Sanctioned Amount</th>
                    <th className="p-3">Expenditure</th>
                    <th className="p-3">Utilization %</th>
                    <th className="p-3">High Risk Count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rankings.map((s, i) => (
                    <tr key={s.state} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold text-slate-900">#{i + 1} {s.state}</td>
                      <td className="p-3 font-semibold text-slate-700">{s.total_districts}</td>
                      <td className="p-3 font-mono font-bold text-slate-900">{s.total_projects}</td>
                      <td className="p-3 font-mono text-emerald-700 font-bold">{s.completed_projects}</td>
                      <td className="p-3 font-mono font-bold text-slate-900">{formatINR(s.sanctioned_amount)}</td>
                      <td className="p-3 font-mono font-bold text-slate-900">{formatINR(s.expenditure_amount)}</td>
                      <td className="p-3 font-bold text-blue-700">{s.utilization_rate}%</td>
                      <td className="p-3">
                        <span className="badge badge-danger text-[10px] font-bold">{s.high_risk_count}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
};
