import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Cpu, 
  Users, 
  Landmark, 
  CheckCircle2, 
  ArrowRight,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. Header Hero */}
      <section className="bg-[#F6F8FA] border-b border-[#D8E0E8] py-12">
        <div className="container max-w-4xl space-y-3 text-center">
          <span className="px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-[#EAF3FB] text-[#1558A6] border border-[#BCD7F2] font-mono">
            Platform Governance & Architecture
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1558A6] tracking-tight">
            About MPLADS AI Monitor
          </h1>

          <p className="text-[#1F2937] text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            An AI-driven Digital Public Infrastructure platform designed to monitor physical and financial progress, identify execution anomalies, and enable secure citizen participation across MPLADS development works.
          </p>
        </div>
      </section>

      {/* 2. Core Governance Pillars */}
      <section className="py-12 border-b border-[#D8E0E8] bg-white">
        <div className="container max-w-5xl space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1558A6]">Institutional Objectives</h2>
            <p className="text-xs text-[#64748B]">Core principles guiding platform engineering and decision support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-6 rounded-lg border border-[#D8E0E8] space-y-3 shadow-xs">
              <div className="p-2.5 rounded-md bg-[#EAF3FB] text-[#1558A6] border border-[#BCD7F2] w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1F2937]">Objective Accountability</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Replaces manual inspection sampling with continuous automated data validation and GIS verification across all parliamentary constituencies.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#D8E0E8] space-y-3 shadow-xs">
              <div className="p-2.5 rounded-md bg-[#EAF3FB] text-[#1558A6] border border-[#BCD7F2] w-fit">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1F2937]">AI Risk Detection</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Identifies cost overruns, timeline stalls, duplicate scheme claims, and physical vs financial mismatch automatically.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#D8E0E8] space-y-3 shadow-xs">
              <div className="p-2.5 rounded-md bg-[#EAF3FB] text-[#1558A6] border border-[#BCD7F2] w-fit">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1F2937]">Citizen Participation</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Enables citizens to submit geotagged evidence on infrastructure defects while protecting identity using isolated verification layers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Multi-tier Governance Architecture */}
      <section className="py-12 bg-[#F6F8FA] border-b border-[#D8E0E8]">
        <div className="container max-w-4xl space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1558A6]">Multi-Tier Governance Workflow</h2>
            <p className="text-xs text-[#64748B]">Designed for seamless role-based collaboration across government tiers.</p>
          </div>

          <div className="space-y-3.5">
            {[
              { role: 'Member of Parliament (MP)', desc: 'Recommends community development projects, tracks constituency execution, and receives AI risk alerts.', icon: Building2 },
              { role: 'District Nodal Authority (DM / DC)', desc: 'Sanctions works, manages technical estimates, issues work orders, and conducts ground verification.', icon: Landmark },
              { role: 'State Nodal Authority', desc: 'Monitors state-wide constituency fund utilization, district performance benchmarks, and systemic delays.', icon: Shield },
              { role: 'Ministry Oversight (MoSPI)', desc: 'National macro-analytics, policy evaluation, cross-state anomaly oversight, and strategic reporting.', icon: Landmark }
            ].map((tier, idx) => {
              const Icon = tier.icon;
              return (
                <div key={idx} className="bg-white p-4.5 rounded-lg border border-[#D8E0E8] flex items-center justify-between gap-4 shadow-xs">
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-md bg-[#EAF3FB] text-[#1558A6] border border-[#BCD7F2]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1F2937]">{tier.role}</h4>
                      <p className="text-xs text-[#64748B] mt-0.5">{tier.desc}</p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-[#16805C] shrink-0" />
                </div>
              );
            })}
          </div>

          <div className="text-center pt-3">
            <Link
              to="/signin"
              className="px-5 py-2.5 rounded-md font-bold text-xs bg-[#1558A6] hover:bg-[#0F4482] text-white inline-flex items-center gap-1.5 shadow-2xs border border-[#1558A6] cursor-pointer"
            >
              <span>Access Official Role Login</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
};
