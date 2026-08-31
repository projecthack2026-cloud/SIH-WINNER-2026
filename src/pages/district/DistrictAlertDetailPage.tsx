import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppShell } from '../../components/dashboard/AppShell';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const DistrictAlertDetailPage: React.FC = () => {
  const { alertId } = useParams<{ alertId: string }>();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<number>(2); // 1: OPEN, 2: UNDER REVIEW, 3: INVESTIGATION, 4: ACTION TAKEN, 5: RESOLVED
  const steps = ['OPEN', 'UNDER REVIEW', 'INVESTIGATION', 'ACTION TAKEN', 'RESOLVED'];

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/district/alerts')}
          className="btn btn-outline btn-sm text-xs flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Alerts Center</span>
        </button>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-rose-600">{alertId}</span>
                <span className="badge badge-danger text-xs font-bold">High Severity</span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Rule Engine Compliance Investigation</h1>
            </div>

            <span className="badge badge-info text-xs font-bold">{steps[currentStep - 1]}</span>
          </div>

          {/* Workflow Stepper Visualizer */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block">Official Investigation Workflow Stepper:</span>
            <div className="flex items-center justify-between gap-1 overflow-x-auto text-[11px] font-bold">
              {steps.map((step, idx) => {
                const stepNum = idx + 1;
                const isCompleted = stepNum < currentStep;
                const isCurrent = stepNum === currentStep;

                return (
                  <div key={step} className="flex items-center gap-1">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 font-mono ${
                      isCompleted ? 'bg-emerald-600 text-white' : isCurrent ? 'bg-blue-600 text-white shadow ring-2 ring-blue-300' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {stepNum}
                    </span>
                    <span className={`whitespace-nowrap ${isCurrent ? 'text-blue-900 font-extrabold' : 'text-slate-600'}`}>
                      {step}
                    </span>
                    {idx < steps.length - 1 && <span className="text-slate-300 mx-1">•</span>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-bold text-slate-900 uppercase tracking-wider block">AI Anomaly Trigger Details:</span>
            <p className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed text-sm">
              Discrepancy detected between recorded recommendations, sanctions, or expenditure amounts in database ingestion pipeline.
            </p>
          </div>

          {/* Workflow Advance Button */}
          <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Advance workflow state for official record.</span>
            
            {currentStep < 5 ? (
              <button
                onClick={() => setCurrentStep(prev => Math.min(5, prev + 1))}
                className="btn btn-primary btn-sm text-xs flex items-center gap-1.5"
              >
                <span>Advance to Step {currentStep + 1}: {steps[currentStep]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <span className="badge badge-success text-xs font-bold">Workflow Resolved & Archived</span>
            )}
          </div>

        </div>
      </div>
    </AppShell>
  );
};
