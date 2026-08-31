import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Cpu, 
  Globe,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { api, type DashboardSummary } from '../../services/api';

export const HeroSection: React.FC = () => {
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
    <section className="bg-white text-[#1F2937] py-10 md:py-14 border-b border-[#D9E0E7]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#EAF3FB] border border-[#BCD7F2] text-[#123B6D] text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#1E5AA8]"></span>
              <span>MPLADS Infrastructure Monitoring & Oversight System</span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#123B6D] tracking-tight leading-tight">
              Smarter Monitoring.<br />
              Transparent Development.<br />
              Stronger Communities.
            </h1>

            {/* Supporting Text */}
            <p className="text-[#1F2937] text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              An AI-powered platform for monitoring MPLADS projects, identifying anomalies, tracking infrastructure progress and enabling secure citizen participation.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                to="/explore"
                className="px-5 py-2.5 rounded font-semibold text-sm bg-[#123B6D] hover:bg-[#0d2c52] text-white transition-all shadow-xs flex items-center justify-center gap-2 border border-[#123B6D]"
              >
                <span>Explore Platform</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                to="/report"
                className="px-5 py-2.5 rounded font-semibold text-sm bg-white hover:bg-[#EAF3FB] text-[#123B6D] transition-all flex items-center justify-center gap-2 border border-[#123B6D]"
              >
                <span>Report an Issue</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#D9E0E7] text-xs text-[#1F2937]">
              <div className="flex items-center gap-2 bg-[#F5F7F9] p-2.5 rounded border border-[#D9E0E7]">
                <ShieldCheck className="w-4 h-4 text-[#1E5AA8] shrink-0" />
                <span className="font-semibold">Identity Protected</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F5F7F9] p-2.5 rounded border border-[#D9E0E7]">
                <Cpu className="w-4 h-4 text-[#1E5AA8] shrink-0" />
                <span className="font-semibold">AI Risk Detection</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F5F7F9] p-2.5 rounded border border-[#D9E0E7]">
                <MapPin className="w-4 h-4 text-[#1E5AA8] shrink-0" />
                <span className="font-semibold">GIS Satellite Twin</span>
              </div>
            </div>

          </div>

          {/* Right Visual Graphic */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded border border-[#D9E0E7] p-4 shadow-xs space-y-3">
              
              <div className="flex items-center justify-between border-b border-[#D9E0E7] pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#123B6D]">MPLADS_DATABASE_TELEMETRY</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#EAF3FB] text-[#123B6D] border border-[#BCD7F2]">
                  PostgreSQL / SQLite Live
                </span>
              </div>

              <div className="relative h-60 bg-[#F5F7F9] rounded border border-[#D9E0E7] p-3 flex flex-col justify-between">
                
                <div className="flex items-center justify-between text-[11px] text-[#1F2937] font-mono">
                  <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded border border-[#D9E0E7]">
                    <Globe className="w-3.5 h-3.5 text-[#1E5AA8]" /> Real Database Telemetry
                  </span>
                  <span className="text-[#123B6D] flex items-center gap-1 font-bold">
                    <Activity className="w-3.5 h-3.5 text-[#1E5AA8]" /> {totalStates} States & UTs
                  </span>
                </div>

                <div className="space-y-2 my-auto">
                  <div className="bg-white border border-[#BCD7F2] p-2.5 rounded text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#123B6D] truncate">Rule Engine Anomaly Detection</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#EAF3FB] text-[#123B6D] border border-[#BCD7F2]">
                        97 Verified Flags
                      </span>
                    </div>
                    <p className="text-[11px] text-[#64748B] truncate">
                      Scanned across all recommendations, sanctions, & expenditures
                    </p>
                  </div>

                  <div className="bg-white border border-[#D9E0E7] p-2 rounded flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E5AA8] shrink-0" />
                      <span className="text-[#1F2937] font-medium truncate max-w-[180px]">
                        Ingested Completed Projects
                      </span>
                    </div>
                    <span className="text-[#123B6D] font-bold font-mono text-[11px]">{totalCompleted}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] font-mono border-t border-[#D9E0E7]">
                  <div>
                    <span className="text-[#64748B]">Total Projects</span>
                    <p className="text-[#123B6D] font-bold text-xs">{totalProj}</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Rule Anomalies</span>
                    <p className="text-[#123B6D] font-bold text-xs">97</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Ingested Datasets</span>
                    <p className="text-[#123B6D] font-bold text-xs">6 CSVs</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
