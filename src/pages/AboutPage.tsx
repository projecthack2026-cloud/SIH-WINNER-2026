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
      <section className="bg-white border-b border-[#D9E0E7] py-10">
        <div className="container max-w-4xl space-y-3 text-center">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#EAF3FB] text-[#123B6D] border border-[#BCD7F2] font-mono">
            Platform Governance & Architecture
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B6D] tracking-tight">
            About MPLADS AI Monitor
          </h1>

          <p className="text-[#1F2937] text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            An AI-driven Digital Public Infrastructure platform designed to monitor physical and financial progress, identify execution anomalies, and enable secure citizen participation across MPLADS development works.
          </p>
        </div>
      </section>

      {/* 2. Core Governance Pillars (White cards, grey border, blue icons, navy titles) */}
      <section className="py-10 border-b border-[#D9E0E7] bg-white">
        <div className="container max-w-5xl space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-extrabold text-[#123B6D]">Institutional Objectives</h2>
            <p className="text-xs text-[#64748B]">Core principles guiding platform engineering and decision support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded border border-[#D9E0E7] space-y-2 shadow-2xs">
              <div className="p-2 rounded bg-[#EAF3FB] text-[#1E5AA8] border border-[#BCD7F2] w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#123B6D]">Objective Accountability</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Replaces manual inspection sampling with continuous automated data validation and GIS verification across all parliamentary constituencies.
              </p>
            </div>

            <div className="bg-white p-5 rounded border border-[#D9E0E7] space-y-2 shadow-2xs">
              <div className="p-2 rounded bg-[#EAF3FB] text-[#1E5AA8] border border-[#BCD7F2] w-fit">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#123B6D]">AI Risk Detection</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Identifies cost overruns, timeline stalls, duplicate scheme claims, and physical vs financial mismatch automatically.
              </p>
            </div>

            <div className="bg-white p-5 rounded border border-[#D9E0E7] space-y-2 shadow-2xs">
              <div className="p-2 rounded bg-[#EAF3FB] text-[#1E5AA8] border border-[#BCD7F2] w-fit">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#123B6D]">Citizen Participation</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Enables citizens to submit geotagged evidence on infrastructure defects while protecting identity using isolated verification layers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Multi-tier Governance Architecture */}
      <section className="py-10 bg-[#F5F7F9] border-b border-[#D9E0E7]">
        <div className="container max-w-4xl space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-extrabold text-[#123B6D]">Multi-Tier Governance Workflow</h2>
            <p className="text-xs text-[#64748B]">Designed for seamless role-based collaboration across government tiers.</p>
          </div>

          <div className="space-y-3">
            {[
              { role: 'Member of Parliament (MP)', desc: 'Recommends community development projects, tracks constituency execution, and receives AI risk alerts.', icon: Building2 },
              { role: 'District Nodal Authority (DM / DC)', desc: 'Sanctions works, manages technical estimates, issues work orders, and conducts ground verification.', icon: Landmark },
              { role: 'State Nodal Authority', desc: 'Monitors state-wide constituency fund utilization, district performance benchmarks, and systemic delays.', icon: Shield },
              { role: 'Ministry Oversight (MoSPI)', desc: 'National macro-analytics, policy evaluation, cross-state anomaly oversight, and strategic reporting.', icon: Landmark }
            ].map((tier, idx) => {
              const Icon = tier.icon;
              return (
                <div key={idx} className="bg-white p-4 rounded border border-[#D9E0E7] flex items-center justify-between gap-4 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded bg-[#EAF3FB] text-[#123B6D] border border-[#BCD7F2]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#123B6D]">{tier.role}</h4>
                      <p className="text-[11px] text-[#64748B] mt-0.5">{tier.desc}</p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-[#1E5AA8] shrink-0" />
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <Link
              to="/signin"
              className="px-4 py-2 rounded font-bold text-xs bg-[#123B6D] hover:bg-[#0d2c52] text-white inline-flex items-center gap-1.5"
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
