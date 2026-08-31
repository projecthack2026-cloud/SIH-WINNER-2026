import React, { useState } from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { DecisionSupportBrief } from '../../components/dashboard/DecisionSupportBrief';
import { Download, FileText, BarChart3 } from 'lucide-react';

export const StateReportsPage: React.FC = () => {
  const [downloading, setDownloading] = useState(false);

  const handleExport = (name: string) => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`State Report "${name}" exported as PDF.`);
    }, 800);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">STATE NODAL REPORTS</span>
              <span className="text-xs text-slate-500 font-mono">Executive Briefing System</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              State Progress & Compliance Reports
            </h1>
            <p className="text-xs text-slate-500">
              State-wide district performance, fund utilization, and AI Decision Support Briefs.
            </p>
          </div>
        </div>

        <DecisionSupportBrief scope="State" regionName="Maharashtra State" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-800 w-fit">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">State District Ranking Scorecard</h3>
            <p className="text-xs text-slate-600">Comparative milestone execution and fund utilization for 36 districts.</p>
            <button
              onClick={() => handleExport('State District Ranking Scorecard')}
              disabled={downloading}
              className="btn btn-primary btn-sm text-xs w-full flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Exporting...' : 'Export PDF'}</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-800 w-fit">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">State Nodal Account Financial Audit</h3>
            <p className="text-xs text-slate-600">Audited State Nodal Account (SNA) disbursements and pending UCs.</p>
            <button
              onClick={() => handleExport('State Nodal Account Financial Audit')}
              disabled={downloading}
              className="btn btn-primary btn-sm text-xs w-full flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Exporting...' : 'Export PDF'}</span>
            </button>
          </div>
        </div>

      </div>
    </AppShell>
  );
};
