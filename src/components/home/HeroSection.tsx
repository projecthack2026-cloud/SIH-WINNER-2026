import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Cpu, 
  Globe,
  Activity,
  CheckCircle2,
  Database,
  FileCheck,
  AlertTriangle
} from 'lucide-react';
import { api, type DashboardSummary } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.getDashboardSummary();
        setSummary(res);
      } catch (err) {
        console.error("Hero summary API error:", err);
      }
    };
    fetchSummary();
  }, []);

  const totalProj = summary ? summary.total_projects.toLocaleString() : '37,069';
  const totalStates = summary ? summary.number_of_states : 36;
  const totalCompleted = summary ? summary.completed_projects.toLocaleString() : '33,857';

  return (
    <section className="bg-[#F6F8FA] text-[#1F2937] py-12 md:py-16 border-b border-[#D8E0E8]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Small Official Portal Label */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-[#EAF3FB] border border-[#BCD7F2] text-[#1558A6] text-xs font-bold">
              <img src="/logo.png" alt="Logo" className="w-5 h-5 object-contain" />
              <span>{t.hero.portalBadge}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="MPLADS AI Monitor Shield Logo" className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0 drop-shadow-xs" />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1558A6] tracking-tight leading-tight">
                  {t.hero.mainTitle} <span className="text-[#2B6CB0]">{t.hero.mainTitleHighlight}</span>
                </h1>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[#2B6CB0]">
                {t.hero.subTitle}
              </h2>
            </div>

            {/* Short Description */}
            <p className="text-[#1F2937] text-base leading-relaxed max-w-2xl font-normal">
              {t.hero.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                to="/explore"
                className="px-6 py-3 rounded-md font-bold text-sm bg-[#1558A6] hover:bg-[#0F4482] text-white transition-all shadow-xs flex items-center justify-center gap-2 border border-[#1558A6]"
              >
                <span>{t.hero.btnExplore}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                to="/report"
                className="px-6 py-3 rounded-md font-semibold text-sm bg-white hover:bg-[#EAF3FB] text-[#1558A6] transition-all flex items-center justify-center gap-2 border border-[#1558A6]"
              >
                <span>{t.hero.btnReport}</span>
              </Link>
            </div>

            {/* Key Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#D8E0E8] text-xs text-[#1F2937]">
              <div className="flex items-center gap-2.5 bg-white p-3 rounded-md border border-[#D8E0E8] shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#1558A6] shrink-0" />
                <span className="font-semibold text-[#1F2937]">{t.hero.identityProtected}</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white p-3 rounded-md border border-[#D8E0E8] shadow-2xs">
                <Cpu className="w-4 h-4 text-[#1558A6] shrink-0" />
                <span className="font-semibold text-[#1F2937]">{t.hero.aiRiskDetection}</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white p-3 rounded-md border border-[#D8E0E8] shadow-2xs">
                <MapPin className="w-4 h-4 text-[#1558A6] shrink-0" />
                <span className="font-semibold text-[#1F2937]">{t.hero.gisTwin}</span>
              </div>
            </div>

          </div>

          {/* Right Official Government Information Panel */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg border border-[#D8E0E8] p-5 shadow-xs space-y-4">
              
              <div className="flex items-center justify-between border-b border-[#D8E0E8] pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#1558A6]" />
                  <span className="text-xs font-bold text-[#1558A6] uppercase tracking-wider">
                    {t.hero.systemStatus}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#F0FDF4] text-[#16805C] border border-[#A7F3D0] flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#16805C] animate-pulse"></span>
                  {t.hero.live}
                </span>
              </div>

              {/* Information Panel Metrics List */}
              <div className="space-y-2.5 text-xs text-[#1F2937]">
                
                <div className="flex items-center justify-between p-3 rounded-md bg-[#F5F9FD] border border-[#BCD7F2]">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#1558A6]" />
                    <span className="font-semibold text-[#1F2937]">{t.hero.dbStatus}</span>
                  </div>
                  <span className="font-bold text-[#16805C] flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#16805C]"></span> {t.hero.activeTelemetry}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-md bg-[#F6F8FA] border border-[#D8E0E8]">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#2B6CB0]" />
                    <span className="font-medium text-[#64748B]">{t.hero.statesCovered}</span>
                  </div>
                  <span className="font-mono font-bold text-[#1558A6] text-sm">{totalStates}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-md bg-[#F6F8FA] border border-[#D8E0E8]">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-[#2B6CB0]" />
                    <span className="font-medium text-[#64748B]">{t.hero.totalProjects}</span>
                  </div>
                  <span className="font-mono font-bold text-[#1558A6] text-sm">{totalProj}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-md bg-[#F6F8FA] border border-[#D8E0E8]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16805C]" />
                    <span className="font-medium text-[#64748B]">{t.hero.completedProjects}</span>
                  </div>
                  <span className="font-mono font-bold text-[#16805C] text-sm">{totalCompleted}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-md bg-[#FFFBEB] border border-[#FDE68A]">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#C47A00]" />
                    <span className="font-medium text-[#1F2937]">{t.hero.aiFlags}</span>
                  </div>
                  <span className="font-mono font-bold text-[#C47A00] text-sm">97</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-md bg-[#F6F8FA] border border-[#D8E0E8]">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#2B6CB0]" />
                    <span className="font-medium text-[#64748B]">{t.hero.ingestedDatasets}</span>
                  </div>
                  <span className="font-mono font-bold text-[#1F2937] text-sm">6 Official CSVs</span>
                </div>

              </div>

              <div className="pt-2 border-t border-[#D8E0E8] text-[11px] text-[#64748B] flex items-center justify-between">
                <span>Official MoSPI Data Pipeline</span>
                <span className="font-mono text-[#1558A6] font-semibold">v2.4 Live</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
