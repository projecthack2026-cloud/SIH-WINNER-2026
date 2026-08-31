import React, { useState } from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { Download, FileText, BarChart3, ShieldAlert } from 'lucide-react';

export const MinistryReportsPage: React.FC = () => {
  const [downloading, setDownloading] = useState(false);

  const handleExport = (name: string) => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`National Report "${name}" exported as PDF.`);
    }, 800);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">NATIONAL AUDIT & POLICY</span>
              <span className="text-xs text-slate-500 font-mono">MoSPI Annual Reporting</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              National Monitoring & Policy Reports
            </h1>
            <p className="text-xs text-slate-500">
              Download nationwide progress digests, state performance rankings, and AI risk reports.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-800 w-fit">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">National Annual Progress Summary</h3>
            <p className="text-xs text-slate-600">Full physical milestone compilation across all 543 Lok Sabha seats.</p>
            <button
              onClick={() => handleExport('National Annual Progress Summary')}
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
            <h3 className="font-extrabold text-slate-900 text-lg">State Performance Scorecard</h3>
            <p className="text-xs text-slate-600">State-by-state fund utilization certificate and completion rate index.</p>
            <button
              onClick={() => handleExport('State Performance Scorecard')}
              disabled={downloading}
              className="btn btn-primary btn-sm text-xs w-full flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Exporting...' : 'Export PDF'}</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="p-3 rounded-2xl bg-rose-50 text-rose-800 w-fit">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Systemic Risk & Fraud Digest</h3>
            <p className="text-xs text-slate-600">National summary of AI-flagged anomaly clusters and cross-state duplicates.</p>
            <button
              onClick={() => handleExport('Systemic Risk & Fraud Digest')}
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
