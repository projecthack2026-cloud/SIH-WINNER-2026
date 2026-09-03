import React, { useState, useEffect } from 'react';
import type { MockProject } from '../../types/complaint';
import { 
  MapPin, 
  Layers, 
  Globe,
  Navigation,
  Activity,
  RefreshCw
} from 'lucide-react';
import { api, mapApiProjectToMockProject } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';

export const MapPreviewSection: React.FC = () => {
  const { t, tStatus } = useLanguage();
  const [projects, setProjects] = useState<MockProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<MockProject | null>(null);
  const [mapMode, setMapMode] = useState<'map' | 'satellite'>('map');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await api.getProjects({ limit: 4 });
        const mapped = (res || []).map(mapApiProjectToMockProject);
        setProjects(mapped);
        if (mapped.length > 0) {
          setSelectedProject(mapped[0]);
        }
      } catch (err) {
        console.error("MapPreview API error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section className="py-10 bg-white border-b border-[#D9E0E7]">
      <div className="container space-y-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-1.5">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase font-mono tracking-wider bg-[#EAF3FB] text-[#123B6D] border border-[#BCD7F2]">
            {t.gisPreview.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B6D] tracking-tight">
            {t.gisPreview.title}
          </h2>
          <p className="text-[#64748B] text-xs sm:text-sm">
            {t.gisPreview.subtitle}
          </p>
        </div>

        {/* GIS Control Box */}
        <div className="bg-white rounded border border-[#D9E0E7] shadow-xs overflow-hidden text-[#1F2937]">
          
          {/* Top Control Bar */}
          <div className="bg-[#F5F7F9] px-4 py-2.5 border-b border-[#D9E0E7] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#123B6D]">{t.gisPreview.viewMode}</span>
              <div className="inline-flex rounded bg-white p-0.5 border border-[#D9E0E7] text-xs">
                <button
                  type="button"
                  onClick={() => setMapMode('map')}
                  className={`px-3 py-1 rounded font-semibold flex items-center gap-1.5 transition-all ${
                    mapMode === 'map' ? 'bg-[#123B6D] text-white' : 'text-[#64748B] hover:text-[#123B6D]'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" /> {t.gisPreview.vectorMap}
                </button>
                <button
                  type="button"
                  onClick={() => setMapMode('satellite')}
                  className={`px-3 py-1 rounded font-semibold flex items-center gap-1.5 transition-all ${
                    mapMode === 'satellite' ? 'bg-[#123B6D] text-white' : 'text-[#64748B] hover:text-[#123B6D]'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" /> {t.gisPreview.satelliteLayer}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#123B6D]">
              <Activity className="w-4 h-4 text-[#1E5AA8]" />
              <span>{t.gisPreview.telemetryActive}</span>
            </div>
          </div>

          {/* Map Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
            
            {/* Map Canvas */}
            <div className="lg:col-span-7 relative p-4 bg-[#F5F7F9] flex flex-col justify-between overflow-hidden">
              
              <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <pattern id="gis-light-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E5AA8" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#gis-light-grid)" />
              </svg>

              <div className="relative z-10 flex items-center justify-between text-xs text-[#123B6D] font-mono">
                <span className="bg-white px-2.5 py-1 rounded border border-[#D9E0E7] flex items-center gap-1.5 shadow-2xs">
                  <Layers className="w-3.5 h-3.5 text-[#1E5AA8]" />
                  {mapMode === 'satellite' ? t.gisPreview.sentinelLayer : t.gisPreview.spatialGrid}
                </span>
                <span className="text-[#123B6D] font-bold bg-[#EAF3FB] px-2 py-0.5 rounded border border-[#BCD7F2]">
                  {t.gisPreview.gisSyncOk}
                </span>
              </div>

              {loading ? (
                <div className="my-auto p-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#123B6D]" />
                  <span>{t.gisPreview.loadingDb}</span>
                </div>
              ) : (
                <div className="relative z-10 my-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projects.map((p) => {
                    const isSelected = selectedProject?.id === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedProject(p)}
                        className={`text-left p-3 rounded border transition-all ${
                          isSelected
                            ? 'bg-white border-[#123B6D] ring-2 ring-[#123B6D]/20 shadow-xs'
                            : 'bg-white border-[#D9E0E7] hover:border-[#1E5AA8]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-[#1E5AA8] shrink-0" />
                            <p className="text-xs font-bold text-[#123B6D] truncate max-w-[140px]">
                              {p.title}
                            </p>
                          </div>
                          <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                            {tStatus(p.status)}
                          </span>
                        </div>
                        
                        <div className="mt-2 flex items-center justify-between text-[11px] text-[#64748B] font-mono">
                          <span className="truncate max-w-[100px]">{p.id}</span>
                          <span className="text-[#123B6D] font-bold">{p.financialUtilization}% Util.</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="relative z-10 flex items-center justify-between text-xs text-[#64748B] border-t border-[#D9E0E7] pt-2 font-mono">
                <span className="flex items-center gap-1 text-[11px]">
                  <Navigation className="w-3.5 h-3.5 text-amber-600" /> {t.gisPreview.pendingGps}
                </span>
                <span>{projects.length} {t.gisPreview.projectsIngested}</span>
              </div>

            </div>

            {/* Project Details Panel */}
            <div className="lg:col-span-5 bg-white p-5 border-t lg:border-t-0 lg:border-l border-[#D9E0E7] space-y-4 flex flex-col justify-between">
              
              {selectedProject ? (
                <div className="space-y-3 font-mono text-xs">
                  
                  <div className="border-b border-[#D9E0E7] pb-2">
                    <span className="text-[#123B6D] font-bold uppercase tracking-wider text-[11px] block">
                      {t.gisPreview.recordDetails}
                    </span>
                  </div>

                  <div className="bg-[#F5F7F9] p-4 rounded border border-[#D9E0E7] space-y-2 text-[#1F2937]">
                    <div className="flex justify-between border-b border-[#D9E0E7] pb-1.5">
                      <span className="text-[#64748B]">{t.gisPreview.projName}</span>
                      <span className="font-bold text-[#123B6D] text-right max-w-[170px] truncate">{selectedProject.title}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#D9E0E7] pb-1.5">
                      <span className="text-[#64748B]">{t.gisPreview.canonicalId}</span>
                      <span className="font-bold text-[#123B6D]">{selectedProject.id}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#D9E0E7] pb-1.5">
                      <span className="text-[#64748B]">{t.gisPreview.utilization}</span>
                      <span className="font-bold text-[#123B6D]">{selectedProject.financialUtilization}%</span>
                    </div>
                    <div className="flex justify-between border-b border-[#D9E0E7] pb-1.5">
                      <span className="text-[#64748B]">{t.gisPreview.status}</span>
                      <span className="font-bold text-[#123B6D] uppercase">{tStatus(selectedProject.status)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">{t.gisPreview.sanctioned}</span>
                      <span className="font-bold text-[#123B6D]">{selectedProject.sanctionedAmount}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 font-sans">
                    <div className="flex justify-between text-[11px] text-[#1F2937]">
                      <span className="font-semibold">{t.gisPreview.finUtil}</span>
                      <span className="font-bold text-[#123B6D] font-mono">{selectedProject.financialUtilization}%</span>
                    </div>
                    <div className="w-full bg-[#EAF3FB] h-2 rounded overflow-hidden border border-[#BCD7F2]">
                      <div 
                        className="h-full bg-[#123B6D] transition-all duration-300"
                        style={{ width: `${selectedProject.financialUtilization}%` }}
                      ></div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-500">No project selected.</div>
              )}

              <div className="text-[10px] text-[#64748B] font-mono border-t border-[#D9E0E7] pt-2">
                {t.gisPreview.pendingCoords}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
