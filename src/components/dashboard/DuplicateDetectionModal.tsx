import React, { useState } from 'react';
import type { DuplicateWorkCandidate } from '../../types/dashboard';
import { X, AlertTriangle, Building, MapPin, DollarSign } from 'lucide-react';

interface Props {
  candidate: DuplicateWorkCandidate;
  onClose: () => void;
  onUpdateStatus?: (id: string, status: 'Flagged for Audit' | 'Not Duplicate') => void;
}

export const DuplicateDetectionModal: React.FC<Props> = ({ candidate, onClose, onUpdateStatus }) => {
  const [currentStatus, setCurrentStatus] = useState(candidate.status);

  const handleAction = (newStatus: 'Flagged for Audit' | 'Not Duplicate') => {
    setCurrentStatus(newStatus);
    if (onUpdateStatus) {
      onUpdateStatus(candidate.id, newStatus);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative my-8 animate-fadeIn">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 border-b border-slate-100 pb-4 pr-8">
          <div className="flex items-center gap-2">
            <span className="badge badge-warning text-[10px] font-mono font-bold uppercase">
              POTENTIAL DUPLICATE WORK DETECTED
            </span>
            <span className="badge badge-danger text-[10px] font-bold">
              {candidate.similarityScore}% Overall Similarity
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900">
            Cross-Database Duplicate Analysis Investigation
          </h2>
          <p className="text-xs text-slate-500">
            NLP & Geospatial proximity matching flagged this MPLADS proposal against a parallel municipal record.
          </p>
        </div>

        {/* Side by Side Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Project A (MPLADS) */}
          <div className="bg-blue-50/60 rounded-2xl p-5 border border-blue-200 space-y-3">
            <div className="flex items-center justify-between border-b border-blue-200/60 pb-2">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">PROJECT A (MPLADS Proposal)</span>
              <span className="font-mono text-[10px] text-blue-700 font-bold">{candidate.projectA.id}</span>
            </div>

            <h4 className="font-extrabold text-slate-900 text-base">{candidate.projectA.title}</h4>

            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                <span>{candidate.projectA.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="font-bold text-slate-900">Sanctioned: {candidate.projectA.sanctionedAmount}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>Agency: {candidate.projectA.agency}</span>
              </div>
            </div>
          </div>

          {/* Project B (Municipal/State) */}
          <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-200 space-y-3">
            <div className="flex items-center justify-between border-b border-amber-200/60 pb-2">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">PROJECT B (Parallel Scheme)</span>
              <span className="font-mono text-[10px] text-amber-700 font-bold">{candidate.projectB.id}</span>
            </div>

            <h4 className="font-extrabold text-slate-900 text-base">{candidate.projectB.title}</h4>

            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>{candidate.projectB.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="font-bold text-slate-900">Sanctioned: {candidate.projectB.sanctionedAmount}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>Agency: {candidate.projectB.agency}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Similarity Factors Breakdown */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            AI Similarity Vector Breakdown
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 text-[11px]">Description NLP Match</span>
              <p className="font-mono font-extrabold text-amber-600 text-lg mt-0.5">{candidate.similarityFactors.description}%</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 text-[11px]">Geospatial Coords</span>
              <p className="font-mono font-extrabold text-rose-600 text-lg mt-0.5">{candidate.similarityFactors.location}%</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 text-[11px]">Budget / Sanction</span>
              <p className="font-mono font-extrabold text-amber-600 text-lg mt-0.5">{candidate.similarityFactors.cost}%</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 text-[11px]">Agency Overlap</span>
              <p className="font-mono font-extrabold text-blue-600 text-lg mt-0.5">{candidate.similarityFactors.agency}%</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <span className="text-xs font-semibold text-slate-500">
            Current Status: <span className="text-slate-900 font-bold">{currentStatus}</span>
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => handleAction('Not Duplicate')}
              className="btn btn-outline btn-sm text-xs flex-1 sm:flex-initial"
            >
              Mark as Not Duplicate
            </button>
            <button
              onClick={() => handleAction('Flagged for Audit')}
              className="btn btn-accent btn-sm text-xs flex-1 sm:flex-initial"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Flag for Field Investigation</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
