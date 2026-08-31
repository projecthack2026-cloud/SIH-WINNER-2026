import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { api, type AnomalyResponse } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Cpu, RefreshCw } from 'lucide-react';

export const DistrictRiskPage: React.FC = () => {
  const { user } = useAuth();
  const districtName = user?.jurisdiction || 'Pune';
  const [anomalies, setAnomalies] = useState<AnomalyResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnomalies = async () => {
      setLoading(true);
      try {
        const res = await api.getAnomalies({ district: districtName });
        setAnomalies(res || []);
      } catch (err) {
        console.error("District Risk Page error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnomalies();
  }, [districtName]);

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Page Title & Scope Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-danger text-[10px] uppercase font-bold">AI ANOMALY ENGINE</span>
              <span className="text-xs text-slate-500 font-mono">Rule-Engine Ingested Anomalies</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              AI Risk & Anomaly Intelligence — {districtName} District
            </h1>
            <p className="text-xs text-slate-500">
              Rule engine detection of project anomalies across {districtName} District.
            </p>
          </div>
        </div>

        {/* Risk Distribution Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-amber-400" /> Explainable AI Screening Principles
            </h3>
            <span className="badge badge-info text-[10px]">HUMAN-IN-THE-LOOP</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed">
            <p className="font-bold text-amber-400">Governance Audit Protocol Note:</p>
            <p>
              AI risk flags represent <strong>"Potential anomalies requiring human verification"</strong> and do not declare confirmed fraud. District Officers must conduct field audits before taking administrative action.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
            <span>Loading district anomaly records...</span>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="font-extrabold text-slate-900 text-base">Flagged District Anomalies ({anomalies.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {anomalies.map((anm) => (
                <div key={anm.anomaly_id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-rose-700">{anm.rule_triggered}</span>
                    <span className="badge badge-danger text-[10px] font-bold">{anm.risk_level} Risk</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{anm.project_title}</h4>
                  <p className="text-slate-600">{anm.explanation}</p>
                  <div className="flex justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2 font-mono">
                    <span>District: {anm.district}</span>
                    <span>Confidence: {(anm.confidence_score * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
};
