import React from 'react';

interface Props {
  description: string;
  whenNoticed: string;
  isOngoing: 'Yes' | 'No' | 'Not Sure';
  onChange: (fields: Partial<{ description: string; whenNoticed: string; isOngoing: 'Yes' | 'No' | 'Not Sure' }>) => void;
}

export const DescriptionStep: React.FC<Props> = ({
  description,
  whenNoticed,
  isOngoing,
  onChange
}) => {
  return (
    <div className="space-y-4">
      <div className="border-b border-[#D9E0E7] pb-3">
        <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase">STEP 3 OF 5</span>
        <h2 className="text-base font-bold text-[#123B6D]">Issue Description & Timeline</h2>
        <p className="text-[#64748B] text-xs mt-0.5">
          Provide detailed information regarding the defect, delay, or improper execution observed.
        </p>
      </div>

      <div className="space-y-4">
        
        {/* Description Text Area */}
        <div className="form-group">
          <label className="form-label text-xs">Problem Description *</label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Describe what is incomplete, damaged, delayed, or improper. Include details regarding structural condition or timeline stalls."
            className="form-textarea text-xs"
          ></textarea>
          <div className="flex justify-between items-center text-[11px] text-[#64748B] mt-1 font-mono">
            <span>Provide accurate details for nodal review.</span>
            <span>{description.length} chars</span>
          </div>
        </div>

        {/* Date Input */}
        <div className="form-group">
          <label className="form-label text-xs">Date First Observed *</label>
          <input
            type="date"
            value={whenNoticed}
            onChange={(e) => onChange({ whenNoticed: e.target.value })}
            className="form-input text-xs font-mono"
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Ongoing Choice (White/Navy/Light Blue - NO ORANGE) */}
        <div className="form-group">
          <label className="form-label text-xs">Is the issue currently ongoing? *</label>
          <div className="grid grid-cols-3 gap-3">
            {(['Yes', 'No', 'Not Sure'] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onChange({ isOngoing: opt })}
                className={`py-2 px-3 rounded border text-xs font-semibold transition-all ${
                  isOngoing === opt
                    ? 'bg-[#123B6D] text-white border-[#123B6D]'
                    : 'bg-white text-[#1F2937] border-[#D9E0E7] hover:bg-[#F5F7F9]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
