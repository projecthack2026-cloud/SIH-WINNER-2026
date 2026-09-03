import React from 'react';
import type { IssueCategory } from '../../types/complaint';
import { 
  Road, 
  Droplet, 
  ShowerHead, 
  GraduationCap, 
  HeartPulse, 
  Building, 
  Building2, 
  Zap, 
  Trash2, 
  HelpCircle,
  Check
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Props {
  selectedCategory: IssueCategory | null;
  onSelect: (category: IssueCategory) => void;
}

export const IssueTypeStep: React.FC<Props> = ({ selectedCategory, onSelect }) => {
  const { t } = useLanguage();

  const categories: { category: IssueCategory; icon: React.ElementType; label: string; desc: string }[] = [
    { category: 'Road / Street', icon: Road, label: t.categories.roadLabel, desc: t.categories.roadDesc },
    { category: 'Drainage', icon: Droplet, label: t.categories.drainLabel, desc: t.categories.drainDesc },
    { category: 'Water Infrastructure', icon: ShowerHead, label: t.categories.waterLabel, desc: t.categories.waterDesc },
    { category: 'School / Education Infrastructure', icon: GraduationCap, label: t.categories.eduLabel, desc: t.categories.eduDesc },
    { category: 'Healthcare Infrastructure', icon: HeartPulse, label: t.categories.healthLabel, desc: t.categories.healthDesc },
    { category: 'Community Building', icon: Building, label: t.categories.commLabel, desc: t.categories.commDesc },
    { category: 'Public Facility', icon: Building2, label: t.categories.pubLabel, desc: t.categories.pubDesc },
    { category: 'Electricity / Lighting', icon: Zap, label: t.categories.elecLabel, desc: t.categories.elecDesc },
    { category: 'Sanitation', icon: Trash2, label: t.categories.sanLabel, desc: t.categories.sanDesc },
    { category: 'Other', icon: HelpCircle, label: t.categories.othLabel, desc: t.categories.othDesc },
  ];

  return (
    <div className="space-y-4">
      <div className="border-b border-[#D9E0E7] pb-3">
        <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase">{t.reportForm.step1}</span>
        <h2 className="text-base font-bold text-[#123B6D]">{t.reportForm.step1Heading}</h2>
        <p className="text-[#64748B] text-xs mt-0.5">
          {t.reportForm.step1Subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {categories.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedCategory === item.category;
          return (
            <button
              key={item.category}
              type="button"
              onClick={() => onSelect(item.category)}
              className={`p-3.5 rounded border text-left transition-all flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-[#EAF3FB] border-[#123B6D] ring-1 ring-[#123B6D]'
                  : 'bg-white border-[#D9E0E7] hover:border-[#1E5AA8]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded ${isSelected ? 'bg-[#123B6D] text-white' : 'bg-[#F5F7F9] text-[#123B6D] border border-[#D9E0E7]'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {isSelected && (
                  <span className="p-0.5 rounded bg-[#123B6D] text-white">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-[#123B6D] text-xs">{item.label}</h3>
                <p className="text-[#64748B] text-[11px] mt-0.5 leading-normal">{item.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
