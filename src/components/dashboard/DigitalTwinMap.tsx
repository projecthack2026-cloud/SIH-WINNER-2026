import React, { useState } from 'react';
import type { MockProject } from '../../types/complaint';
import { MapPin, Layers, CheckCircle2, Navigation } from 'lucide-react';

interface Props {
  projects?: MockProject[];
  title?: string;
  scopeLabel?: string;
}

export const DigitalTwinMap: React.FC<Props> = ({
  projects = [],
  title = 'Geospatial Digital Twin Command Center',
  scopeLabel = 'Jurisdiction View'
}) => {
  const [selected, setSelected] = useState<MockProject | null>(projects[0] || null);

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden text-slate-100 space-y-0">
      
      {/* Top Header & Controls */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-base">{title}</h3>
          <p className="text-xs text-slate-400 font-mono">{scopeLabel} • MPLADS Project GIS Oversight</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge badge-warning text-[10px] font-mono">Satellite verification not yet available</span>
        </div>
      </div>

      {/* Grid Canvas & Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        
        {/* Map Display (Left 7/12) */}
        <div className="lg:col-span-7 relative p-6 bg-slate-950 flex flex-col justify-between overflow-hidden">
          
          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid-pattern-dt" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3b82f6" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-pattern-dt)" />
          </svg>

          <div className="relative z-10 flex items-center justify-between text-xs text-slate-300 font-mono">
            <span className="bg-slate-900 px-3 py-1 rounded-xl border border-slate-800 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              Geospatial Coordinate Layer
            </span>
            <span className="text-amber-400 font-bold bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-800">
              Coordinates: Unavailable in Dataset
            </span>
          </div>

          {/* Location Notice Box */}
          <div className="relative z-10 my-8 p-6 bg-slate-900/90 border border-slate-800 rounded-2xl text-center space-y-3">
            <MapPin className="w-8 h-8 text-amber-500 mx-auto" />
            <h4 className="font-bold text-slate-100 text-sm">Geospatial Coordinates Unavailable</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              The raw MPLADS CSV datasets do not contain GPS coordinates for individual projects. 
              Visual positioning will automatically populate as PostGIS & ground GIS coordinates are verified.
            </p>
          </div>

          {/* Project Picker Grid */}
          {projects.length > 0 && (
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
              {projects.slice(0, 6).map((p) => {
                const isSelected = selected?.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelected(p)}
                    className={`text-left p-3 rounded-xl border transition-all text-xs ${
                      isSelected
                        ? 'bg-blue-950/90 border-blue-500 shadow-md ring-1 ring-blue-500/40'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <p className="font-bold text-slate-100 truncate">{p.title}</p>
                    <div className="mt-1 flex justify-between text-[11px] font-mono text-slate-400">
                      <span>ID: {p.id}</span>
                      <span className="text-blue-400 font-bold">{p.financialUtilization}% Util.</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3 mt-3">
            <span className="text-[11px] text-slate-400">PostGIS Integration: Prepared</span>
            <span className="text-slate-400 font-mono flex items-center gap-1">
              <Navigation className="w-3 h-3 text-amber-400" /> Geospatial Status Pending
            </span>
          </div>

        </div>

        {/* Selected Project Specs (Right 5/12) */}
        <div className="lg:col-span-5 bg-slate-950 p-6 border-t lg:border-t-0 lg:border-l border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">PROJECT RECORD SPECS</span>
            <span className="badge badge-success text-xs font-bold">{selected?.status || 'Active'}</span>
          </div>

          {selected ? (
            <>
              <div>
                <h4 className="text-base font-extrabold text-white leading-snug">{selected.title}</h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">ID: {selected.id} • {selected.category}</p>
              </div>

              <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">District & State:</span>
                  <span className="text-slate-100 font-semibold">{selected.district}, {selected.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Nodal MP:</span>
                  <span className="text-slate-100 font-semibold">{selected.mpName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sanctioned Amount:</span>
                  <span className="text-slate-100 font-semibold">{selected.sanctionedAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Financial Utilization:</span>
                  <span className="text-blue-400 font-bold">{selected.financialUtilization}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Physical Progress:</span>
                  <span className="text-slate-400 font-semibold italic">Physical progress data unavailable</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Geospatial Coordinates:</span>
                  <span className="text-amber-400 font-semibold">Location coordinates unavailable</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Satellite verification not yet available.</span>
              </div>
            </>
          ) : (
            <div className="p-6 text-center text-xs text-slate-500">Select a project record to inspect details.</div>
          )}

        </div>

      </div>

    </div>
  );
};
