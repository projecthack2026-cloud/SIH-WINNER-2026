import React from 'react';
import { 
  Clock, 
  IndianRupee, 
  TrendingDown, 
  CopyCheck, 
  ShieldAlert,
  Wrench,
  Check
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ProblemSection: React.FC = () => {
  const { t } = useLanguage();

  const problems = [
    {
      icon: Clock,
      title: t.problems.delTitle,
      desc: t.problems.delDesc,
    },
    {
      icon: IndianRupee,
      title: t.problems.expTitle,
      desc: t.problems.expDesc,
    },
    {
      icon: TrendingDown,
      title: t.problems.costTitle,
      desc: t.problems.costDesc,
    },
    {
      icon: CopyCheck,
      title: t.problems.dupTitle,
      desc: t.problems.dupDesc,
    },
    {
      icon: ShieldAlert,
      title: t.problems.progTitle,
      desc: t.problems.progDesc,
    },
    {
      icon: Wrench,
      title: t.problems.defTitle,
      desc: t.problems.defDesc,
    }
  ];

  return (
    <section className="py-10 bg-white border-b border-[#D9E0E7]">
      <div className="container space-y-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-1.5">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase font-mono tracking-wider bg-[#EAF3FB] text-[#123B6D] border border-[#BCD7F2]">
            {t.problems.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B6D] tracking-tight">
            {t.problems.title}
          </h2>
          <p className="text-[#64748B] text-xs sm:text-sm">
            {t.problems.subtitle}
          </p>
        </div>

        {/* 6 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded p-4 border border-[#D9E0E7] shadow-2xs space-y-2"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded bg-[#EAF3FB] text-[#1E5AA8] border border-[#BCD7F2]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-extrabold text-[#123B6D]">
                    {p.title}
                  </h3>
                </div>
                <p className="text-[#64748B] text-xs leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Summary Box */}
        <div className="bg-[#F5F7F9] border border-[#D9E0E7] rounded p-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="space-y-0.5 text-center md:text-left">
            <h4 className="font-bold text-[#123B6D] text-xs">
              {t.problems.boxTitle}
            </h4>
            <p className="text-[#64748B] text-xs">
              {t.problems.boxDesc}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#123B6D] bg-white px-3 py-1.5 rounded border border-[#D9E0E7] shrink-0">
            <Check className="w-3.5 h-3.5 text-[#1E5AA8]" />
            <span>{t.problems.boxBadge}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
