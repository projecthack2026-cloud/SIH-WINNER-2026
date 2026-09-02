import React, { useEffect, useState } from 'react';
import { ShieldAlert, AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  projectId: string;
}

interface RiskFactor {
  name: string;
  weight: string;
  score: number;
  explanation: string;
}

interface RiskDetail {
  overallScore: number;
  summary: string;
  factors: RiskFactor[];
  recommendedAction: string;
}

export const RiskBreakdownCard: React.FC<Props> = ({ projectId }) => {
  const [detail, setDetail] = useState<RiskDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(`https://sih-winner-2026.onrender.com/api/projects/${projectId}/financial`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load risk analysis");
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        const score = Math.min(Math.round(data.utilization_percentage || 25), 100);
        setDetail({
          overallScore: score,
          summary: `PostgreSQL Database Analysis: Project has utilization rate of ${data.utilization_percentage || 0}% across ${data.expenditure_transaction_count || 0} transaction(s).`,
          factors: [
            {
              name: "Financial Disbursal Ratio",
              weight: "40%",
              score: score,
              explanation: `Total expenditure ₹${(data.total_expenditure || 0).toLocaleString('en-IN')} out of sanctioned ₹${(data.sanctioned_amount || 0).toLocaleString('en-IN')}.`
            },
            {
              name: "Vendor Concentration Index",
              weight: "30%",
              score: data.vendor_count === 1 && data.expenditure_transaction_count > 3 ? 75 : 20,
              explanation: `Tracked ${data.vendor_count || 0} unique vendor(s) across payment records.`
            }
          ],
          recommendedAction: score > 70 
            ? "Initiate physical audit due to rapid expenditure relative to sanctioned ceiling."
            : "Routine monitoring via monthly financial expenditure progress reports."
        });
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError("Unable to load live data.");
        setLoading(false);
      });

    return () => { isMounted = false; };
  }, [projectId]);

  if (loading) {
    return (
      <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-4 shadow-xl flex items-center justify-center min-h-[200px]">
        <RefreshCw className="w-6 h-6 animate-spin text-blue-400" />
        <span className="text-sm text-slate-300 ml-2">Loading live risk model...</span>
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-4 shadow-xl text-center">
        <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 inline-block">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-sm text-white">Risk Evaluation Offline</h4>
        <p className="text-xs text-rose-300">{error || "Unable to load live data."}</p>
        <span className="text-[11px] text-slate-400 block font-mono">Source: Neon PostgreSQL</span>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">Explainable AI Risk Breakdown</h4>
            <p className="text-[11px] text-slate-400">Source: Neon PostgreSQL Database</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-extrabold font-mono text-amber-400">{detail.overallScore}</span>
          <span className="text-xs text-slate-400 block font-mono">/ 100 Risk</span>
        </div>
      </div>

      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
        <p className="text-xs font-bold text-slate-200">Primary Risk Summary:</p>
        <p className="text-xs text-slate-300 leading-relaxed">{detail.summary}</p>
      </div>

      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Calculated Risk Vector Components:
        </span>
        
        {detail.factors.map((f, i) => (
          <div key={i} className="space-y-1.5 text-xs bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-200">{f.name} (Weight: {f.weight})</span>
              <span className={`font-mono font-bold ${
                f.score > 60 ? 'text-rose-400' : f.score > 30 ? 'text-amber-400' : 'text-emerald-400'
              }`}>{f.score}/100</span>
            </div>
            <p className="text-[11px] text-slate-400">{f.explanation}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-950/60 border border-blue-800/60 p-3 rounded-xl space-y-1 text-xs">
        <span className="font-bold text-blue-300 block">Recommended Authority Action:</span>
        <p className="text-blue-200">{detail.recommendedAction}</p>
      </div>
    </div>
  );
};

