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

export const CapabilitiesSection: React.FC = () => {
  const capabilities = [
    {
      id: 'risk',
      title: 'AI Risk Detection',
      description: 'Predictive risk scoring models analyze physical progress vs. financial utilization to flag delay and compliance concerns.',
      icon: ShieldAlert,
      link: '/explore#risk'
    },
    {
      id: 'monitoring',
      title: 'Project Monitoring',
      description: 'End-to-end milestone tracking across all constituency works with standardized status reporting and audit trails.',
      icon: Building2,
      link: '/explore#monitoring'
    },
    {
      id: 'financial',
      title: 'Financial Intelligence',
      description: 'Automated tracking of fund recommendations, sanction releases, and expenditure utilization certificates.',
      icon: IndianRupee,
      link: '/explore#financial'
    },
    {
      id: 'duplicate',
      title: 'Duplicate & Irregular Work Detection',
      description: 'Geospatial and text similarity algorithms flag overlapping or duplicate works claimed across adjacent schemes.',
      icon: Copy,
      link: '/explore#duplicate'
    },
    {
      id: 'digital-twin',
      title: 'Digital Twin & Geospatial Monitoring',
      description: 'High-resolution Sentinel satellite imagery cross-referenced with geotagged site photographs for physical verification.',
      icon: Map,
      link: '/explore#digital-twin'
    },
    {
      id: 'citizen',
      title: 'Citizen Reporting',
      description: 'Secure citizen grievance reporting with identity protection and automated evidence authenticity evaluation.',
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
            Platform Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1558A6] tracking-tight">
            Key Monitoring & Transparency Tools
          </h2>
          <p className="text-[#64748B] text-xs sm:text-sm font-normal">
            Integrated AI and GIS oversight tools designed for administrative transparency, fraud prevention, and public service accountability.
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
                      MODULE
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
                    <span>Explore Module Details</span>
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
