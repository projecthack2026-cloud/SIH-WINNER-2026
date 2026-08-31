import React from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { Map } from 'lucide-react';

export const AdminGeospatialPage: React.FC = () => {
  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">GIS & SATELLITE ENGINE</span>
              <span className="text-xs text-slate-500 font-mono">Sentinel-2 Gateway</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Geospatial Services & Satellite Gateway
            </h1>
            <p className="text-xs text-slate-500">
              Sentinel-2 multispectral imagery ingestion status and OpenStreetMap GIS vector rendering health.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Map className="w-5 h-5 text-blue-700" />
              <h3 className="font-bold text-slate-900 text-base">GIS Tile & Satellite Stream Telemetry</h3>
            </div>
            <span className="badge badge-success text-xs font-mono">ONLINE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">Sentinel-2 Multispectral Gateway</span>
              <p className="text-slate-600">Re-visit Period: 5 Days • Resolution: 10m Ground Sampling</p>
              <span className="badge badge-success text-[10px] mt-1">100% Tiles Cached</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">OpenStreetMap GIS Mesh Server</span>
              <p className="text-slate-600">Vector Tiles Engine • Latency: 18ms</p>
              <span className="badge badge-success text-[10px] mt-1">100% Tiles Cached</span>
            </div>
          </div>
        </div>

      </div>
    </AppShell>
  );
};
