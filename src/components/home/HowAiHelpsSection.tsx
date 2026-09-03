import React from 'react';
import { 
  Database, 
  Cpu, 
  ShieldCheck, 
  AlertTriangle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HowAiHelpsSection: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      number: '01',
      title: t.aiProcess.step1Title,
      description: t.aiProcess.step1Desc,
      icon: Database
    },
    {
      number: '02',
      title: t.aiProcess.step2Title,
      description: t.aiProcess.step2Desc,
      icon: Cpu
    },
    {
      number: '03',
      title: t.aiProcess.step3Title,
      description: t.aiProcess.step3Desc,
      icon: ShieldCheck
    },
    {
      number: '04',
      title: t.aiProcess.step4Title,
      description: t.aiProcess.step4Desc,
      icon: AlertTriangle
    },
    {
      number: '05',
      title: t.aiProcess.step5Title,
      description: t.aiProcess.step5Desc,
      icon: CheckCircle2
    }
  ];

  return (
    <section className="py-10 bg-[#F5F7F9] border-b border-[#D9E0E7]">
      <div className="container space-y-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-1.5">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#EAF3FB] text-[#123B6D] border border-[#BCD7F2] font-mono">
            {t.aiProcess.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B6D] tracking-tight">
            {t.aiProcess.title}
          </h2>
          <p className="text-[#64748B] text-xs sm:text-sm">
            {t.aiProcess.subtitle}
          </p>
        </div>

        {/* 5-Step Diagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded p-4 border border-[#D9E0E7] shadow-2xs space-y-3 flex flex-col justify-between"
              >
                {/* Header: Blue Numbered Circle */}
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full bg-[#123B6D] text-white flex items-center justify-center text-xs font-bold font-mono shadow-2xs">
                    {step.number}
                  </div>
                  <div className="p-1.5 rounded bg-[#EAF3FB] text-[#123B6D]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-extrabold text-[#123B6D] font-mono uppercase tracking-wide">
                    {step.title}
                  </h3>

                  <p className="text-[#64748B] text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex justify-end pt-1">
                    <ArrowRight className="w-3.5 h-3.5 text-[#1E5AA8]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-white border border-[#D9E0E7] rounded text-xs font-mono text-[#123B6D] text-center font-semibold">
          {t.aiProcess.flowSummary}
        </div>

      </div>
    </section>
  );
};
