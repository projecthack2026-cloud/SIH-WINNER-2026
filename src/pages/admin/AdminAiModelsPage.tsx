import React from 'react';
import { AppShell } from '../../components/dashboard/AppShell';

export const AdminAiModelsPage: React.FC = () => {
  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">MODEL CENTER</span>
              <span className="text-xs text-slate-500 font-mono">Neural Weights & Retraining</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              AI Model Center (v2.4)
            </h1>
            <p className="text-xs text-slate-500">
              Manage anomaly detection neural networks, retrain thresholds, and review model accuracy metrics.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-900 text-sm">Progress-Expenditure Matcher v2.4</span>
              <span className="badge badge-success text-[10px]">DEPLOYED</span>
            </div>
            <p className="text-slate-600">Calculates physical vs financial disbursement gap vectors.</p>
            <div className="flex justify-between font-mono text-slate-500 pt-2 border-t border-slate-100">
              <span>Accuracy: <strong className="text-emerald-700">94.8%</strong></span>
              <span>Inference: 14ms</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-900 text-sm">Geospatial NLP Duplicate Scanner v1.9</span>
              <span className="badge badge-success text-[10px]">DEPLOYED</span>
            </div>
            <p className="text-slate-600">Cross-checks project descriptions & GPS coordinates against municipal proposals.</p>
            <div className="flex justify-between font-mono text-slate-500 pt-2 border-t border-slate-100">
              <span>Accuracy: <strong className="text-emerald-700">92.1%</strong></span>
              <span>Inference: 22ms</span>
            </div>
          </div>
        </div>

      </div>
    </AppShell>
  );
};
