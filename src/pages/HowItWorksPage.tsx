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
      <section className="bg-[#F6F8FA] border-b border-[#D8E0E8] py-12">
        <div className="container max-w-4xl space-y-3 text-center">
          <span className="px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-[#EAF3FB] text-[#1558A6] border border-[#BCD7F2] font-mono">
            Platform Workflow
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1558A6] tracking-tight">
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
      <section className="py-12 bg-white border-b border-[#D8E0E8]">
        <div className="container max-w-5xl space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1558A6]">Core Verification Mechanisms</h2>
            <p className="text-xs text-[#64748B]">Automated algorithms and ground feedback integration.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            <div className="bg-white p-6 rounded-lg border border-[#D8E0E8] space-y-3 shadow-xs">
              <div className="flex items-center gap-3 text-[#1558A6]">
                <div className="p-2.5 rounded-md bg-[#EAF3FB] border border-[#BCD7F2]">
                  <Cpu className="w-5 h-5 text-[#1558A6]" />
                </div>
                <h3 className="font-bold text-base text-[#1F2937]">Physical vs Financial Discrepancy Engine</h3>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                The machine learning model cross-checks physical percentage reported in site inspections against financial utilization certificates released by the district treasury.
              </p>
              <div className="p-3 bg-[#F6F8FA] rounded-md border border-[#D8E0E8] text-[11px] font-mono text-[#1558A6] font-semibold">
                Example Alert: Financial utilization 80% with physical completion under 35%.
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#D8E0E8] space-y-3 shadow-xs">
              <div className="flex items-center gap-3 text-[#1558A6]">
                <div className="p-2.5 rounded-md bg-[#EAF3FB] border border-[#BCD7F2]">
                  <Database className="w-5 h-5 text-[#1558A6]" />
                </div>
                <h3 className="font-bold text-base text-[#1F2937]">Duplicate Claim Detection</h3>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Text and spatial similarity algorithms scan project titles and GPS coordinates against state PWD, MGNREGA, and municipal works databases.
              </p>
              <div className="p-3 bg-[#F6F8FA] rounded-md border border-[#D8E0E8] text-[11px] font-mono text-[#1558A6] font-semibold">
                Example Alert: Overlapping road paved under municipal fund 6 months prior.
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#D8E0E8] space-y-3 shadow-xs">
              <div className="flex items-center gap-3 text-[#1558A6]">
                <div className="p-2.5 rounded-md bg-[#EAF3FB] border border-[#BCD7F2]">
                  <Upload className="w-5 h-5 text-[#1558A6]" />
                </div>
                <h3 className="font-bold text-base text-[#1F2937]">Evidence Authenticity Check</h3>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                EXIF camera metadata, GPS location stamps, image noise consistency, and AI-generated image risks are inspected prior to routing citizen complaints.
              </p>
              <div className="p-3 bg-[#F6F8FA] rounded-md border border-[#D8E0E8] text-[11px] font-mono text-[#16805C] font-semibold">
                Result: Status tagged as Verified / Low Concern before district dispatch.
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#D8E0E8] space-y-3 shadow-xs">
              <div className="flex items-center gap-3 text-[#1558A6]">
                <div className="p-2.5 rounded-md bg-[#EAF3FB] border border-[#BCD7F2]">
                  <Lock className="w-5 h-5 text-[#1558A6]" />
                </div>
                <h3 className="font-bold text-base text-[#1F2937]">Isolated Identity Protection</h3>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Citizen mobile credentials are verified via isolated gateway and replaced with encrypted pseudonyms (DPDP Act compliant).
              </p>
              <div className="p-3 bg-[#F6F8FA] rounded-md border border-[#D8E0E8] text-[11px] font-mono text-[#1558A6] font-semibold">
                Authority Log: Displays "Verified Citizen MPL-CMP-2026-001284" only.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Action Banner */}
      <section className="py-10 bg-[#EAF3FB] border-t border-[#BCD7F2]">
        <div className="container max-w-3xl text-center space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#1558A6]">Ready to Report an Issue or Access Command Dashboards?</h2>
          <div className="flex items-center justify-center gap-3">
            <Link to="/report" className="px-5 py-2.5 rounded-md font-bold text-xs bg-[#1558A6] text-white hover:bg-[#0F4482] shadow-2xs border border-[#1558A6]">
              Report Infrastructure Issue
            </Link>
            <Link to="/signin" className="px-5 py-2.5 rounded-md font-bold text-xs bg-white text-[#1558A6] border border-[#1558A6] hover:bg-[#F6F8FA]">
              Official Sign In
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
};
