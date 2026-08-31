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

interface Props {
  selectedCategory: IssueCategory | null;
  onSelect: (category: IssueCategory) => void;
}

export const IssueTypeStep: React.FC<Props> = ({ selectedCategory, onSelect }) => {
  const categories: { category: IssueCategory; icon: React.ElementType; label: string; desc: string }[] = [
    { category: 'Road / Street', icon: Road, label: 'Road / Street', desc: 'Potholes, broken paving, incomplete asphalt, missing culverts' },
    { category: 'Drainage', icon: Droplet, label: 'Drainage', desc: 'Open drains, blocked storm culverts, flooding hazards' },
    { category: 'Water Infrastructure', icon: ShowerHead, label: 'Water Supply', desc: 'Broken borewells, leaks, overhead tanks, pipeline delay' },
    { category: 'School / Education Infrastructure', icon: GraduationCap, label: 'Education Facility', desc: 'School classrooms, roofs, toilets, digital lab delay' },
    { category: 'Healthcare Infrastructure', icon: HeartPulse, label: 'Healthcare Center', desc: 'Primary health center building, diagnostic equipment work' },
    { category: 'Community Building', icon: Building, label: 'Community Hall', desc: 'Panchayat hall, library, Anganwadi building defect' },
    { category: 'Public Facility', icon: Building2, label: 'Public Facility', desc: 'Bus stop shelter, parks, public toilet infrastructure' },
    { category: 'Electricity / Lighting', icon: Zap, label: 'Electricity / Lighting', desc: 'Solar streetlights, transformer platform, cabling' },
    { category: 'Sanitation', icon: Trash2, label: 'Sanitation', desc: 'Waste collection point, public sanitation unit' },
    { category: 'Other', icon: HelpCircle, label: 'Other Infrastructure', desc: 'Any other MPLADS funded community development work' },
  ];

  return (
    <div className="space-y-4">
      <div className="border-b border-[#D9E0E7] pb-3">
        <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase">STEP 1 OF 5</span>
        <h2 className="text-base font-bold text-[#123B6D]">Select Infrastructure Issue Category *</h2>
        <p className="text-[#64748B] text-xs mt-0.5">
          Choose the infrastructure category that best describes the reported problem.
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
