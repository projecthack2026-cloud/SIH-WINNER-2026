import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { api, formatINR, type DistrictRanking } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { RefreshCw, AlertCircle } from 'lucide-react';

export const StateDistrictsPage: React.FC = () => {
  const { user } = useAuth();
  const stateName = user?.jurisdiction || 'Maharashtra';
  const [rankings, setRankings] = useState<DistrictRanking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRankings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getDistrictRankings(stateName);
      setRankings(res || []);
    } catch (err: any) {
      setError("Unable to load district rankings from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, [stateName]);

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">STATE SUPERVISION</span>
              <span className="text-xs text-slate-500 font-mono">{rankings.length} District Scorecards</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              District Performance & Utilization Rankings
            </h1>
            <p className="text-xs text-slate-500">
              Comparative governance scorecard calculated from database records for {stateName}.
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
            <span>Loading district rankings from database...</span>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="p-3">Rank & District</th>
                    <th className="p-3">State</th>
                    <th className="p-3">Total Works</th>
                    <th className="p-3">Completed Works</th>
                    <th className="p-3">Ongoing Works</th>
                    <th className="p-3">Sanctioned Amount</th>
                    <th className="p-3">Expenditure</th>
                    <th className="p-3">Utilization %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rankings.map((d, i) => (
                    <tr key={d.district} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold text-slate-900">#{i + 1} {d.district}</td>
                      <td className="p-3 text-slate-600">{d.state}</td>
                      <td className="p-3 font-mono font-bold text-slate-900">{d.total_projects}</td>
                      <td className="p-3 font-mono text-emerald-700 font-bold">{d.completed_projects}</td>
                      <td className="p-3 font-mono text-blue-700 font-bold">{d.ongoing_projects}</td>
                      <td className="p-3 font-mono font-bold text-slate-900">{formatINR(d.sanctioned_amount)}</td>
                      <td className="p-3 font-mono font-bold text-slate-900">{formatINR(d.expenditure_amount)}</td>
                      <td className="p-3 font-bold text-blue-700">{d.utilization_rate}%</td>
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
