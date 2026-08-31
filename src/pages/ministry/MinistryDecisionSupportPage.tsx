import React from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { DecisionSupportBrief } from '../../components/dashboard/DecisionSupportBrief';

export const MinistryDecisionSupportPage: React.FC = () => {
  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">AI EXECUTIVE SYNTHESIS</span>
              <span className="text-xs text-slate-500 font-mono">National Policy Intelligence</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              National AI Decision Support Brief Generator
            </h1>
            <p className="text-xs text-slate-500">
              Real-time strategic synthesis for Ministry Secretaries and Director Generals.
            </p>
          </div>
        </div>

        <DecisionSupportBrief scope="National" regionName="India (MoSPI)" />

      </div>
    </AppShell>
  );
};
