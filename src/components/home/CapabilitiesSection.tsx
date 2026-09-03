import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Building2, 
  IndianRupee, 
  Copy, 
  Map, 
  Users, 
  ChevronRight 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const CapabilitiesSection: React.FC = () => {
  const { t } = useLanguage();

  const capabilities = [
    {
      id: 'risk',
      title: t.capabilities.riskTitle,
      description: t.capabilities.riskDesc,
      icon: ShieldAlert,
      link: '/explore#risk'
    },
    {
      id: 'monitoring',
      title: t.capabilities.monTitle,
      description: t.capabilities.monDesc,
      icon: Building2,
      link: '/explore#monitoring'
    },
    {
      id: 'financial',
      title: t.capabilities.finTitle,
      description: t.capabilities.finDesc,
      icon: IndianRupee,
      link: '/explore#financial'
    },
    {
      id: 'duplicate',
      title: t.capabilities.dupTitle,
      description: t.capabilities.dupDesc,
      icon: Copy,
      link: '/explore#duplicate'
    },
    {
      id: 'digital-twin',
      title: t.capabilities.gisTitle,
      description: t.capabilities.gisDesc,
      icon: Map,
      link: '/explore#digital-twin'
    },
    {
      id: 'citizen',
      title: t.capabilities.citTitle,
      description: t.capabilities.citDesc,
      icon: Users,
      link: '/report'
    }
  ];

  return (
    <section className="py-12 bg-white border-b border-[#D8E0E8]">
      <div className="container space-y-6">
        
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="px-3 py-1 rounded text-[10px] font-bold uppercase font-mono tracking-wider bg-[#EAF3FB] text-[#1558A6] border border-[#BCD7F2]">
            {t.capabilities.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1558A6] tracking-tight">
            {t.capabilities.title}
          </h2>
          <p className="text-[#64748B] text-xs sm:text-sm font-normal">
            {t.capabilities.subtitle}
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.id}
                className="bg-white rounded-lg p-5 border border-[#D8E0E8] shadow-xs hover:border-[#1558A6] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-md bg-[#EAF3FB] text-[#1558A6] border border-[#BCD7F2]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider">
                      {t.capabilities.moduleTag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#1F2937]">
                    {cap.title}
                  </h3>

                  <p className="text-[#64748B] text-xs leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D8E0E8]">
                  <Link
                    to={cap.link}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1558A6] hover:text-[#0F4482]"
                  >
                    <span>{t.capabilities.exploreDetails}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
