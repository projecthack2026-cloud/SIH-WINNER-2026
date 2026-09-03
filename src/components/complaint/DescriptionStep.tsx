import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

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
  const { t } = useLanguage();

  const getOngoingLabel = (opt: 'Yes' | 'No' | 'Not Sure') => {
    if (opt === 'Yes') return t.reportForm.optYes;
    if (opt === 'No') return t.reportForm.optNo;
    return t.reportForm.optNotSure;
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-[#D9E0E7] pb-3">
        <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase">{t.reportForm.step3}</span>
        <h2 className="text-base font-bold text-[#123B6D]">{t.reportForm.step3Heading}</h2>
        <p className="text-[#64748B] text-xs mt-0.5">
          {t.reportForm.step3Subtitle}
        </p>
      </div>

      <div className="space-y-4">
        
        {/* Description Text Area */}
        <div className="form-group">
          <label className="form-label text-xs">{t.reportForm.descriptionLabel}</label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder={t.reportForm.descriptionPlaceholder}
            className="form-textarea text-xs"
          ></textarea>
          <div className="flex justify-between items-center text-[11px] text-[#64748B] mt-1 font-mono">
            <span>{t.reportForm.descNotice}</span>
            <span>{description.length} chars</span>
          </div>
        </div>

        {/* Date Input */}
        <div className="form-group">
          <label className="form-label text-xs">{t.reportForm.dateObservedLabel}</label>
          <input
            type="date"
            value={whenNoticed}
            onChange={(e) => onChange({ whenNoticed: e.target.value })}
            className="form-input text-xs font-mono"
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Ongoing Choice */}
        <div className="form-group">
          <label className="form-label text-xs">{t.reportForm.isOngoingLabel}</label>
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
                {getOngoingLabel(opt)}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
