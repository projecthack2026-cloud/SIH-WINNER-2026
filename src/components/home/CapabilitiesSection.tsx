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
    <section className="py-10 bg-white border-b border-[#D9E0E7]">
      <div className="container space-y-6">
        
        {/* Section Header */}
        <div className="text-center space-y-1.5 max-w-2xl mx-auto">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase font-mono tracking-wider bg-[#EAF3FB] text-[#123B6D] border border-[#BCD7F2]">
            Platform Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B6D] tracking-tight">
            Platform Capabilities
          </h2>
          <p className="text-[#64748B] text-xs sm:text-sm font-normal">
            Integrated AI and GIS oversight tools designed for administrative transparency and public service accountability.
          </p>
        </div>

        {/* 6 Feature Cards Grid (ALL SAME STYLING - White background, 1px light grey border, Blue icon, Navy heading, Grey text) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.id}
                className="bg-white rounded p-4 border border-[#D9E0E7] shadow-2xs hover:border-[#1E5AA8] transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded bg-[#EAF3FB] text-[#1E5AA8] border border-[#BCD7F2]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#64748B]">
                      MODULE
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-[#123B6D]">
                    {cap.title}
                  </h3>

                  <p className="text-[#64748B] text-xs leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#D9E0E7]">
                  <Link
                    to={cap.link}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E5AA8] hover:underline"
                  >
                    <span>Learn More</span>
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
