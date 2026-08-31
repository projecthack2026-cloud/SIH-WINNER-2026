import React from 'react';
import { getProjectRiskDetail } from '../../data/dashboardMockData';
import { ShieldAlert } from 'lucide-react';

interface Props {
  projectId: string;
}

export const RiskBreakdownCard: React.FC<Props> = ({ projectId }) => {
  const detail = getProjectRiskDetail(projectId);

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">Explainable AI Risk Breakdown</h4>
            <p className="text-[11px] text-slate-400">Multi-layer anomaly neural evaluation</p>
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
