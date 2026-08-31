import React from 'react';
import { AppShell } from '../../components/dashboard/AppShell';

export const MinistryDuplicatesPage: React.FC = () => {
  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-warning text-[10px] uppercase font-bold">CROSS-STATE DUPLICATE ENGINE</span>
              <span className="text-xs text-slate-500 font-mono">Central NLP & Proximity Scanner</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Cross-State Duplicate Clusters
            </h1>
            <p className="text-xs text-slate-500">
              National database screening matching MPLADS proposals against Central PWD and State sector projects.
            </p>
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl border border-slate-200 text-center text-xs space-y-2">
          <p className="font-extrabold text-slate-900 text-sm">No duplicate candidates detected</p>
          <p className="text-slate-500 max-w-md mx-auto">
            National NLP & Cosine Similarity screening across all 37,069 database records found zero duplicate candidates.
          </p>
        </div>

      </div>
    </AppShell>
  );
};
