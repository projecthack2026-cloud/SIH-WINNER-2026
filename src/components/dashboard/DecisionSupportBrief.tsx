import React, { useState } from 'react';
import { Cpu, Download, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface Props {
  scope: 'State' | 'National';
  regionName: string;
}

export const DecisionSupportBrief: React.FC<Props> = ({ scope, regionName }) => {
  const [downloading, setDownloading] = useState(false);

  const handleExport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`Executive ${scope} AI Monitoring Brief for ${regionName} exported as PDF.`);
    }, 1000);
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
                EXECUTIVE AI BRIEFING
              </span>
              <span className="badge badge-success text-[10px]">Real-Time Synthesis</span>
            </div>
            <h3 className="text-xl font-extrabold text-white tracking-tight mt-0.5">
              {scope} Monitoring & Decision Support Brief — {regionName}
            </h3>
          </div>
        </div>

        <button
          onClick={handleExport}
          disabled={downloading}
          className="btn btn-accent btn-sm shadow flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
        >
          <Download className="w-4 h-4" />
          <span>{downloading ? 'Generating PDF...' : 'Export Executive Brief'}</span>
        </button>
      </div>

      {/* Bulleted Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> Key Risk Findings
          </h4>
          <ul className="space-y-2 text-xs text-slate-300 leading-relaxed list-disc pl-5">
            <li><strong>8.4% of active works</strong> show physical vs financial progress mismatch exceeding 25%.</li>
            <li>Delays are primarily concentrated in 3 priority districts undergoing culvert/drainage upgrades.</li>
            <li><strong>2 duplicate work candidates</strong> flagged across municipal boundaries requiring cross-agency verification.</li>
            <li>Average fund utilization rate is <strong>79%</strong> against sanctioned annual allocation.</li>
          </ul>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Recommended Strategic Actions
          </h4>
          <ul className="space-y-2 text-xs text-slate-300 leading-relaxed list-disc pl-5">
            <li>Issue formal inquiry for <strong>High-Risk projects in Pune and Nagpur</strong> districts.</li>
            <li>Freeze next installment release for projects with physical execution lag &gt; 30%.</li>
            <li>Initiate joint field audit with District Collectorate for flagged duplicate candidates.</li>
            <li>Accelerate utilization certificate submissions before upcoming fiscal quarter.</li>
          </ul>
        </div>

      </div>

    </div>
  );
};
