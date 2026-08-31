import React from 'react';
import type { EvidenceVerificationStatus } from '../../types/complaint';
import { Cpu } from 'lucide-react';

interface Props {
  status: EvidenceVerificationStatus;
  confidenceScore: number;
  notes: string[];
}

export const AiEvidenceStatusCard: React.FC<Props> = ({
  status,
  confidenceScore,
  notes
}) => {
  const getBadgeStyle = () => {
    if (status === 'Verified / Low Concern') return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (status === 'Review Required') return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-slate-100 text-slate-800 border-slate-300';
  };

  return (
    <div className="bg-white rounded-md border border-slate-200 p-4 space-y-3 shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-blue-50 text-[#0f2942]">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-[#081729] text-xs uppercase tracking-wide">Evidence Assessment Status</h4>
            <p className="text-[11px] text-slate-500 font-mono">EXIF & visual structure inspection</p>
          </div>
        </div>

        <div className={`px-2.5 py-1 rounded text-xs font-bold border ${getBadgeStyle()}`}>
          {status}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded font-mono">
        <span className="text-slate-600">Verification Index:</span>
        <span className="font-bold text-[#0f2942]">{confidenceScore}% Score</span>
      </div>

      <div className="space-y-1 text-xs text-slate-600">
        <p className="font-bold text-[#081729] text-[11px] uppercase">Inspection Signals:</p>
        <ul className="space-y-1 pl-4 list-disc text-[11px]">
          {notes.map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
      </div>

      <div className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-100">
        * Note: Verification generates an automated assessment score to assist authority review.
      </div>
    </div>
  );
};
