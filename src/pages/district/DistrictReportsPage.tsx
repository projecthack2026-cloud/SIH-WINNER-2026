import React, { useState } from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { Download, FileText, BarChart3, ShieldAlert, Users, Bell, Eye } from 'lucide-react';

export const DistrictReportsPage: React.FC = () => {
  const [exportingId, setExportingId] = useState<string | null>(null);

  const reportCategories = [
    {
      id: 'REP-DIST-01',
      title: 'District Physical Progress Summary Report',
      description: 'Comprehensive milestone compilation for all 128 ongoing and completed works in Pune District.',
      icon: FileText,
      lastGenerated: 'Today, 09:30 AM',
      color: 'blue'
    },
    {
      id: 'REP-FIN-02',
      title: 'Financial Utilization & Voucher Audit Report',
      description: 'Detailed sanction vs expenditure breakdown, cost deviation audit, and Treasury voucher trail.',
      icon: BarChart3,
      lastGenerated: 'Yesterday',
      color: 'emerald'
    },
    {
      id: 'REP-RISK-03',
      title: 'AI Anomaly & Physical-Financial Mismatch Brief',
      description: 'Explainable neural network risk scores and flagged progress-expenditure gap vector analysis.',
      icon: ShieldAlert,
      lastGenerated: '2 days ago',
      color: 'rose'
    },
    {
      id: 'REP-CMP-04',
      title: 'Aggregated Citizen Grievance Audit Trail',
      description: 'Categorized issue resolution statistics maintaining 100% citizen identity protection.',
      icon: Users,
      lastGenerated: '3 days ago',
      color: 'purple'
    },
    {
      id: 'REP-ALT-05',
      title: 'Official Compliance & Escalation History Log',
      description: 'Audit history of critical alerts, officer assignments, and field inspection workflows.',
      icon: Bell,
      lastGenerated: '1 week ago',
      color: 'amber'
    }
  ];

  const handleExport = (id: string, title: string) => {
    setExportingId(id);
    setTimeout(() => {
      setExportingId(null);
      alert(`Report "${title}" exported as official signed PDF.`);
    }, 1000);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Page Title & Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">EXECUTIVE COMPILATION DESK</span>
              <span className="text-xs text-slate-500 font-mono">Automated PDF Report Generator</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Reports & AI Insights
            </h1>
            <p className="text-xs text-slate-500">
              Generate, preview, and export official district progress, financial, and AI risk reports for Pune District.
            </p>
          </div>
        </div>

        {/* Informational Callout */}
        <div className="bg-slate-900 text-slate-200 p-5 rounded-3xl border border-slate-800 space-y-1 text-xs">
          <p className="font-bold text-amber-400">Official Reporting System Note:</p>
          <p className="text-slate-300">
            Generated reports are cryptographically timestamped and formatted according to Ministry of Statistics & Programme Implementation (MoSPI) compliance standards.
          </p>
        </div>

        {/* Report Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportCategories.map(r => {
            const Icon = r.icon;
            const isExporting = exportingId === r.id;

            return (
              <div key={r.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-blue-50 text-blue-800">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400">{r.id}</span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-lg leading-snug">{r.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{r.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">Last: {r.lastGenerated}</span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`Previewing report ${r.title}`)}
                      className="btn btn-outline btn-sm text-xs flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => handleExport(r.id, r.title)}
                      disabled={isExporting}
                      className="btn btn-primary btn-sm text-xs flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{isExporting ? 'Generating PDF...' : 'Export PDF'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </AppShell>
  );
};
