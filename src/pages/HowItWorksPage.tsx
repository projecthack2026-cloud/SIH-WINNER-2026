import React from 'react';
import { HowAiHelpsSection } from '../components/home/HowAiHelpsSection';
import { Link } from 'react-router-dom';
import { 
  Database, 
  Cpu, 
  Lock, 
  Upload
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. Header Hero */}
      <section className="bg-white border-b border-[#D9E0E7] py-10">
        <div className="container max-w-4xl space-y-3 text-center">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#EAF3FB] text-[#123B6D] border border-[#BCD7F2] font-mono">
            Platform Workflow
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B6D] tracking-tight">
            How MPLADS AI Monitor Works
          </h1>

          <p className="text-[#1F2937] text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Understanding the automated ingestion, AI risk detection, satellite verification, and citizen reporting workflows.
          </p>
        </div>
      </section>

      {/* 2. Process Diagram Section */}
      <HowAiHelpsSection />

      {/* 3. Detailed Mechanism Grid */}
      <section className="py-10 bg-white border-b border-[#D9E0E7]">
        <div className="container max-w-5xl space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-extrabold text-[#123B6D]">Core Verification Mechanisms</h2>
            <p className="text-xs text-[#64748B]">Automated algorithms and ground feedback integration.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-white p-5 rounded border border-[#D9E0E7] space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-[#123B6D]">
                <div className="p-2 rounded bg-[#EAF3FB] border border-[#BCD7F2]">
                  <Cpu className="w-5 h-5 text-[#1E5AA8]" />
                </div>
                <h3 className="font-bold text-sm">Physical vs Financial Discrepancy Engine</h3>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                The machine learning model cross-checks physical percentage reported in site inspections against financial utilization certificates released by the district treasury.
              </p>
              <div className="p-2.5 bg-[#F5F7F9] rounded border border-[#D9E0E7] text-[11px] font-mono text-[#123B6D]">
                Example Alert: Financial utilization 80% with physical completion under 35%.
              </div>
            </div>

            <div className="bg-white p-5 rounded border border-[#D9E0E7] space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-[#123B6D]">
                <div className="p-2 rounded bg-[#EAF3FB] border border-[#BCD7F2]">
                  <Database className="w-5 h-5 text-[#1E5AA8]" />
                </div>
                <h3 className="font-bold text-sm">Duplicate Claim Detection</h3>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Text and spatial similarity algorithms scan project titles and GPS coordinates against state PWD, MGNREGA, and municipal works databases.
              </p>
              <div className="p-2.5 bg-[#F5F7F9] rounded border border-[#D9E0E7] text-[11px] font-mono text-[#123B6D]">
                Example Alert: Overlapping road paved under municipal fund 6 months prior.
              </div>
            </div>

            <div className="bg-white p-5 rounded border border-[#D9E0E7] space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-[#123B6D]">
                <div className="p-2 rounded bg-[#EAF3FB] border border-[#BCD7F2]">
                  <Upload className="w-5 h-5 text-[#1E5AA8]" />
                </div>
                <h3 className="font-bold text-sm">Evidence Authenticity Check</h3>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                EXIF camera metadata, GPS location stamps, image noise consistency, and AI-generated image risks are inspected prior to routing citizen complaints.
              </p>
              <div className="p-2.5 bg-[#F5F7F9] rounded border border-[#D9E0E7] text-[11px] font-mono text-[#123B6D]">
                Result: Status tagged as Verified / Low Concern before district dispatch.
              </div>
            </div>

            <div className="bg-white p-5 rounded border border-[#D9E0E7] space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-[#123B6D]">
                <div className="p-2 rounded bg-[#EAF3FB] border border-[#BCD7F2]">
                  <Lock className="w-5 h-5 text-[#1E5AA8]" />
                </div>
                <h3 className="font-bold text-sm">Isolated Identity Protection</h3>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Citizen mobile credentials are verified via isolated gateway and replaced with encrypted pseudonyms (DPDP Act compliant).
              </p>
              <div className="p-2.5 bg-[#F5F7F9] rounded border border-[#D9E0E7] text-[11px] font-mono text-[#123B6D]">
                Authority Log: Displays "Verified Citizen MPL-CMP-2026-001284" only.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Action Banner */}
      <section className="py-8 bg-[#EAF3FB] border-t border-[#BCD7F2]">
        <div className="container max-w-3xl text-center space-y-3">
          <h2 className="text-lg font-bold text-[#123B6D]">Ready to Report an Issue or Access Command Dashboards?</h2>
          <div className="flex items-center justify-center gap-3">
            <Link to="/report" className="px-4 py-2 rounded font-bold text-xs bg-[#123B6D] text-white hover:bg-[#0d2c52]">
              Report Infrastructure Issue
            </Link>
            <Link to="/signin" className="px-4 py-2 rounded font-bold text-xs bg-white text-[#123B6D] border border-[#123B6D] hover:bg-[#F5F7F9]">
              Official Sign In
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
};
