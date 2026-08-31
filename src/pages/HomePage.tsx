import React from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/home/HeroSection';
import { InformationStrip } from '../components/home/InformationStrip';
import { ProblemSection } from '../components/home/ProblemSection';
import { CapabilitiesSection } from '../components/home/CapabilitiesSection';
import { MapPreviewSection } from '../components/home/MapPreviewSection';
import { HowAiHelpsSection } from '../components/home/HowAiHelpsSection';
import { Lock, Search } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Information Strip */}
      <InformationStrip />

      {/* 3. Purpose / Anomaly Oversight Section */}
      <ProblemSection />

      {/* 4. Core Capabilities Section */}
      <CapabilitiesSection />

      {/* 5. Digital Infrastructure Monitoring Section */}
      <MapPreviewSection />

      {/* 6. AI Process Workflow */}
      <HowAiHelpsSection />

      {/* 7. Citizen Report Callout Section (Clean White/Light-Blue, Navy Heading, Navy Primary Button per Prompt Specs) */}
      <section className="py-10 bg-[#EAF3FB] text-[#1F2937] border-t border-[#BCD7F2]">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-white border border-[#D9E0E7] rounded p-8 text-center space-y-4 shadow-2xs">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#EAF3FB] text-[#123B6D] border border-[#BCD7F2] text-xs font-semibold">
              <Lock className="w-3.5 h-3.5 text-[#1E5AA8]" />
              <span>Your identity is protected.</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#123B6D]">
              See an Infrastructure Problem?
            </h2>

            <p className="text-[#1F2937] text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              Report damaged, incomplete, delayed or improperly executed public infrastructure work.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/report"
                className="px-5 py-2.5 rounded font-semibold text-xs bg-[#123B6D] hover:bg-[#0d2c52] text-white shadow-2xs flex items-center justify-center gap-2 border border-[#123B6D] w-full sm:w-auto"
              >
                <span>REPORT AN ISSUE</span>
              </Link>
              
              <Link
                to="/report/track"
                className="px-5 py-2.5 rounded font-semibold text-xs bg-white hover:bg-[#F5F7F9] text-[#123B6D] border border-[#123B6D] w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Search className="w-3.5 h-3.5 text-[#1E5AA8]" />
                <span>Track Complaint</span>
              </Link>
            </div>

            <div className="pt-1 text-[11px] text-[#64748B] font-mono">
              Identity Safety Guarantee: Verified citizen reporting keeps user identity protected.
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};
