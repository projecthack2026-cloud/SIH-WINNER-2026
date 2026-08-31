import React from 'react';
import type { MockProject } from '../../types/complaint';
import { RiskBreakdownCard } from './RiskBreakdownCard';
import { X, DollarSign, Activity, Building2 } from 'lucide-react';

interface Props {
  project: MockProject & { physicalProgress?: number; financialProgress?: number; riskScore?: number };
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<Props> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative my-8 animate-fadeIn">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="flex items-center gap-2">
            <span className="badge badge-info font-mono text-[10px] uppercase font-bold">
              ID: {project.id}
            </span>
            <span className={`badge ${
              project.riskLevel === 'High' ? 'badge-danger' : project.riskLevel === 'Medium' ? 'badge-warning' : 'badge-success'
            } text-[10px] font-bold`}>
              {project.riskLevel} Risk ({project.riskScore || 20}/100)
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
            {project.title}
          </h2>

          <p className="text-xs text-slate-500 font-medium">
            Category: {project.category} • Location: {project.district}, {project.state}
          </p>
        </div>

        {/* Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-slate-500 text-xs flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-blue-700" /> Constituency & MP
            </span>
            <p className="font-bold text-slate-900 text-sm">{project.constituency}</p>
            <p className="text-xs text-slate-600">{project.mpName}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-slate-500 text-xs flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-700" /> Sanctioned vs Spent
            </span>
            <p className="font-bold text-slate-900 text-sm">{project.sanctionedAmount}</p>
            <p className="text-xs text-emerald-700 font-bold">Spent: {project.spentAmount}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-slate-500 text-xs flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-amber-600" /> Physical Execution
            </span>
            <p className="font-bold text-slate-900 text-sm">{project.physicalProgress || project.progressPercentage}% Completed</p>
            <p className="text-xs text-slate-600">Status: {project.status}</p>
          </div>
        </div>

        {/* Progress Progress Bars Comparison */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
          <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
            Physical vs Financial Progress Breakdown
          </h4>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Physical Execution Progress</span>
                <span className="font-mono font-bold text-blue-800">{project.physicalProgress || project.progressPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${project.physicalProgress || project.progressPercentage}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Financial Disbursement Progress</span>
                <span className="font-mono font-bold text-emerald-800">{project.financialProgress || project.progressPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${project.financialProgress || project.progressPercentage}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Explainable Risk Breakdown */}
        <RiskBreakdownCard projectId={project.id} />

        {/* Close Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="btn btn-outline btn-sm text-xs"
          >
            Close Detail View
          </button>
        </div>

      </div>
    </div>
  );
};
