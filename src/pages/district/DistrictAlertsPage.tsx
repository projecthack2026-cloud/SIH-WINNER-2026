import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../../components/dashboard/AppShell';
import { api, type AnomalyResponse } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Eye, RefreshCw } from 'lucide-react';

export const DistrictAlertsPage: React.FC = () => {
  const { user } = useAuth();
  const districtName = user?.jurisdiction || 'Pune';
  const navigate = useNavigate();

  const [anomalies, setAnomalies] = useState<AnomalyResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);
      try {
        const res = await api.getAnomalies({ district: districtName });
        setAnomalies(res || []);
      } catch (err) {
        console.error("District alerts error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, [districtName]);

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Page Title & Scope Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-danger text-[10px] uppercase font-bold">OFFICIAL COMPLIANCE</span>
              <span className="text-xs text-slate-500 font-mono">Governing Action Workflow</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Alerts & Compliance Center — {districtName}
            </h1>
            <p className="text-xs text-slate-500">
              Investigate rule engine anomaly alerts and track corrective actions across {districtName} District.
            </p>
          </div>
        </div>

        {/* Interactive Alert Cards List */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base">Active Database Governance Alerts ({anomalies.length})</h3>
          
          {loading ? (
            <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
              <span>Loading database compliance alerts...</span>
            </div>
          ) : anomalies.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center text-xs text-slate-500">
              No rule engine anomaly alerts currently triggered for this district.
            </div>
          ) : (
            <div className="space-y-3">
              {anomalies.map(a => (
                <div key={a.anomaly_id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900">{a.rule_triggered}</span>
                      <span className="badge badge-danger text-[10px] font-bold">
                        {a.risk_level} Risk
                      </span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-base">{a.project_title}</h4>
                    <p className="text-xs text-slate-500">{a.explanation}</p>
                  </div>

                  {a.canonical_work_id && (
                    <button
                      onClick={() => navigate(`/projects/${a.canonical_work_id}`)}
                      className="btn btn-primary btn-sm text-xs shrink-0 flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Linked Work</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </AppShell>
  );
};
