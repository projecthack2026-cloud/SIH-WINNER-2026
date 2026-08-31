import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  IndianRupee, 
  ShieldAlert, 
  Map, 
  Globe, 
  Users, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const features = [
    {
      id: 'monitoring',
      title: 'Project Monitoring & Lifecycle Tracking',
      desc: 'Tracks project recommendations, technical sanctioning, work order issuance, physical progress milestones, and final completion certificates.',
      icon: Building2,
      highlights: ['Milestone Progress Tracking', 'Nodal Sanction Verification', 'Work Order Audit Logs']
    },
    {
      id: 'financial',
      title: 'Financial Utilization & Disbursement Intelligence',
      desc: 'Real-time monitoring of recommended funds, installment releases, unspent balances, and interest accumulation.',
      icon: IndianRupee,
      highlights: ['Installment Release Analytics', 'Utilization Certificate Tracking', 'Unspent Balance Alerts']
    },
    {
      id: 'risk',
      title: 'AI Anomaly & Risk Detection',
      desc: 'Machine learning algorithms calculate composite risk scores (Low, Medium, High) based on delays and expenditure mismatches.',
      icon: ShieldAlert,
      highlights: ['Physical vs Financial Mismatch', 'Timeline Delay Scoring', 'High-Risk Work Alerts']
    },
    {
      id: 'digital-twin',
      title: 'Digital Twin & Geospatial GIS Oversight',
      desc: 'Interactive map layer visualizing constituency work distribution with satellite imagery cross-referencing.',
      icon: Map,
      highlights: ['Interactive Constituency GIS', 'Sentinel-2 Satellite Imagery', 'Geotagged Asset Map']
    },
    {
      id: 'duplicate',
      title: 'Duplicate Work Detection Engine',
      desc: 'Geospatial and text similarity algorithms scan proposals to prevent double-allocation across state and central schemes.',
      icon: Globe,
      highlights: ['Cross-Scheme Scanning', 'Proximity Matching', 'Overlapping Proposal Flags']
    },
    {
      id: 'citizen',
      title: 'DPDP-Compliant Citizen Reporting',
      desc: 'Enables citizens to submit issue reports with photo evidence, backed by AI authenticity checks and DPDP identity protection.',
      icon: Users,
      highlights: ['Identity Protection Panel', 'AI Image Authenticity Check', 'Geotagged Evidence Upload']
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. Header Hero */}
      <section className="bg-white border-b border-[#D9E0E7] py-10">
        <div className="container max-w-4xl space-y-3 text-center">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#EAF3FB] text-[#123B6D] border border-[#BCD7F2] font-mono">
            Capability Overview
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B6D] tracking-tight">
            Explore MPLADS AI Monitor Capabilities
          </h1>

          <p className="text-[#1F2937] text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Detailed breakdown of key modules, AI models, financial intelligence algorithms, and GIS tools.
          </p>
        </div>
      </section>

      {/* 2. Capability Cards List (Uniform White cards, grey border, blue icon, navy headings) */}
      <section className="py-10 bg-[#F5F7F9] border-b border-[#D9E0E7]">
        <div className="container max-w-5xl space-y-4">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                id={feat.id}
                className="bg-white p-5 rounded border border-[#D9E0E7] shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded bg-[#EAF3FB] text-[#1E5AA8] border border-[#BCD7F2]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-extrabold text-[#123B6D]">{feat.title}</h2>
                      <p className="text-xs text-[#64748B] mt-0.5 max-w-3xl">{feat.desc}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#D9E0E7] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex flex-wrap items-center gap-2">
                    {feat.highlights.map((h, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-[#F5F7F9] text-[#123B6D] border border-[#D9E0E7] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#1E5AA8]" /> {h}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/report"
                    className="text-[#1E5AA8] font-bold hover:underline inline-flex items-center gap-1 text-[11px]"
                  >
                    <span>Test In Demo</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
};
