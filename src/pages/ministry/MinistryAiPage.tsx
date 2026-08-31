import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { api, type AnomalyResponse } from '../../services/api';
import { Cpu, RefreshCw } from 'lucide-react';

export const MinistryAiPage: React.FC = () => {
  const [anomalies, setAnomalies] = useState<AnomalyResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnomalies = async () => {
      setLoading(true);
      try {
        const res = await api.getAnomalies();
        setAnomalies(res || []);
      } catch (err) {
        console.error("Ministry AI Page error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnomalies();
  }, []);

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-danger text-[10px] uppercase font-bold">NATIONAL AI ANOMALY ENGINE</span>
              <span className="text-xs text-slate-500 font-mono">Rule-Engine Ingested Database Records</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              National AI Risk & Anomaly Indicators
            </h1>
            <p className="text-xs text-slate-500">
              Systemic risk vectors and anomaly flags computed across all database recommendations, sanctions, and expenditures.
            </p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-900 leading-relaxed flex items-center gap-3">
          <Cpu className="w-5 h-5 text-amber-700 shrink-0" />
          <span>
            <strong>National Guidance Note:</strong> Systemic rule engine scans identified <strong>{anomalies.length} anomaly records</strong> across the ingested datasets. These flags indicate discrepancies in financial amounts, dates, or MP recommendations requiring administrative review.
          </span>
        </div>

        {loading ? (
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
            <span>Loading national database anomaly records...</span>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">National Rule Engine Anomaly Records ({anomalies.length})</h3>
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
                    <span>{anm.district}, {anm.state}</span>
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
