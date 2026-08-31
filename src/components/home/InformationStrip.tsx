import React from 'react';
import { Layers, AlertTriangle, Clock, MessageSquare } from 'lucide-react';

export const InformationStrip: React.FC = () => {
  const stats = [
    {
      label: 'PROJECTS MONITORED',
      value: '1,250+',
      subtext: 'Active Constituency Infrastructure Works',
      icon: Layers,
    },
    {
      label: 'PROJECTS AT RISK',
      value: '84',
      subtext: 'Flagged by Anomaly AI Models',
      icon: AlertTriangle,
    },
    {
      label: 'UNDER REVIEW',
      value: '36',
      subtext: 'Pending District Nodal Verification',
      icon: Clock,
    },
    {
      label: 'CITIZEN REPORTS',
      value: '420+',
      subtext: 'Verified Anonymous Complaints',
      icon: MessageSquare,
    }
  ];

  return (
    <section className="bg-white border-b border-[#D9E0E7] py-6">
      <div className="container">
        
        {/* Header Label */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#D9E0E7]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#123B6D]"></span>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#123B6D] font-mono">
              National Infrastructure Monitoring Telemetry
            </h2>
          </div>
          <div className="text-[11px] text-[#64748B] font-mono">
            Sample Demo Telemetry Data
          </div>
        </div>

        {/* 4 Stat Cards Grid (White background, thin grey border, dark navy numbers, grey labels - Prompt Specs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-4 rounded border border-[#D9E0E7] flex items-center justify-between shadow-2xs"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wide text-[#64748B] block font-mono">
                    {stat.label}
                  </span>
                  <div className="text-2xl font-extrabold text-[#123B6D] font-mono tracking-tight">
                    {stat.value}
                  </div>
                  <span className="text-[11px] text-[#64748B] block">
                    {stat.subtext}
                  </span>
                </div>
                
                <div className="p-2.5 rounded bg-[#F5F7F9] border border-[#D9E0E7] text-[#123B6D]">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
