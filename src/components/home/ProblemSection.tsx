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

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: Clock,
      title: 'Project Delays',
      desc: 'Detects works lagging far behind approved completion timelines before funds stall.',
    },
    {
      icon: IndianRupee,
      title: 'Unusual Expenditure Patterns',
      desc: 'Flags suspicious lump-sum disbursements without corresponding physical progress on ground.',
    },
    {
      icon: TrendingDown,
      title: 'Cost Overruns',
      desc: 'Monitors financial deviations exceeding sanctioned budgets and alerts nodal authorities.',
    },
    {
      icon: CopyCheck,
      title: 'Potential Duplicate Works',
      desc: 'Cross-checks project proposals against state/municipal databases to prevent double-funding.',
    },
    {
      icon: ShieldAlert,
      title: 'Progress Anomalies',
      desc: 'Compares satellite elevation and drone evidence against reported physical progress claims.',
    },
    {
      icon: Wrench,
      title: 'Infrastructure Defects',
      desc: 'Channels direct evidence from citizens on roads, drains, water, and public facilities.',
    }
  ];

  return (
    <section className="py-10 bg-white border-b border-[#D9E0E7]">
      <div className="container space-y-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-1.5">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase font-mono tracking-wider bg-[#EAF3FB] text-[#123B6D] border border-[#BCD7F2]">
            Public Oversight Objective
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B6D] tracking-tight">
            Key Infrastructure Anomalies Addressed
          </h2>
          <p className="text-[#64748B] text-xs sm:text-sm">
            Automated intelligence assists district officers and representatives in early risk identification.
          </p>
        </div>

        {/* 6 Problem Cards Grid (Identical Visual Style - White background, grey border, blue icon, navy title, grey text) */}
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
              Empowering MPs, District Authorities & Citizens Alike
            </h4>
            <p className="text-[#64748B] text-xs">
              AI acts as an objective decision-support tool highlighting high-priority works needing physical audit.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#123B6D] bg-white px-3 py-1.5 rounded border border-[#D9E0E7] shrink-0">
            <Check className="w-3.5 h-3.5 text-[#1E5AA8]" />
            <span>Audited & Accountable Workflow</span>
          </div>
        </div>

      </div>
    </section>
  );
};
