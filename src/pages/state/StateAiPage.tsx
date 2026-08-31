import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { api, type AnomalyResponse } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Cpu, RefreshCw } from 'lucide-react';

export const StateAiPage: React.FC = () => {
  const { user } = useAuth();
  const stateName = user?.jurisdiction || 'Maharashtra';
  const [anomalies, setAnomalies] = useState<AnomalyResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnomalies = async () => {
      setLoading(true);
      try {
        const res = await api.getAnomalies({ state: stateName });
        setAnomalies(res || []);
      } catch (err) {
        console.error("State AI Page error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnomalies();
  }, [stateName]);

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-danger text-[10px] uppercase font-bold">STATE AI RISK HEATMAP</span>
              <span className="text-xs text-slate-500 font-mono">Rule-Engine Ingested Anomalies</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              State AI Risk & Anomaly Intelligence — {stateName}
            </h1>
            <p className="text-xs text-slate-500">
              State-wide risk anomaly detection derived from database recommendations, sanctions, and expenditures.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-3">
          <h3 className="font-bold text-amber-400 text-base flex items-center gap-2">
            <Cpu className="w-5 h-5" /> State Anomaly Detection Summary
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Rule engine scans across {stateName} identified {anomalies.length} anomaly flags (e.g., sanction expenditure mismatch, recommendation discrepancy).
          </p>
        </div>

        {loading ? (
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
            <span>Loading database anomaly records...</span>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Ingested Anomaly Records ({anomalies.length})</h3>
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
