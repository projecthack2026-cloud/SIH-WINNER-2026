import React, { useState } from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { Download, FileText, BarChart3, ShieldAlert } from 'lucide-react';

export const MpReportsPage: React.FC = () => {
  const [downloading, setDownloading] = useState(false);

  const handleExport = (name: string) => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`Report "${name}" exported as PDF.`);
    }, 800);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">REPRESENTATIVE REPORTS</span>
              <span className="text-xs text-slate-500 font-mono">Constituency Performance PDF</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Constituency Reports & Audits
            </h1>
            <p className="text-xs text-slate-500">
              Download official progress, expenditure, and utilization briefs for Pune Constituency.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-800 w-fit">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Constituency Progress Report</h3>
            <p className="text-xs text-slate-600">Full physical milestone breakdown of all recommended projects.</p>
            <button
              onClick={() => handleExport('Constituency Progress Report')}
              disabled={downloading}
              className="btn btn-primary btn-sm text-xs w-full flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Downloading...' : 'Export PDF'}</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-800 w-fit">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Fund Utilization Statement</h3>
            <p className="text-xs text-slate-600">Sanctioned allocation vs actual expenditure certificate summary.</p>
            <button
              onClick={() => handleExport('Fund Utilization Statement')}
              disabled={downloading}
              className="btn btn-primary btn-sm text-xs w-full flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Downloading...' : 'Export PDF'}</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="p-3 rounded-2xl bg-rose-50 text-rose-800 w-fit">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">AI Risk Flag Digest</h3>
            <p className="text-xs text-slate-600">Summary of projects requiring physical field verification by District Collector.</p>
            <button
              onClick={() => handleExport('AI Risk Flag Digest')}
              disabled={downloading}
              className="btn btn-primary btn-sm text-xs w-full flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Downloading...' : 'Export PDF'}</span>
            </button>
          </div>
        </div>

      </div>
    </AppShell>
  );
};
