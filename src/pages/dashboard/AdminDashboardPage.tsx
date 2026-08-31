import React, { useState } from 'react';
import { AppShell } from '../../components/dashboard/AppShell';
import { AdminSystemHealth } from '../../components/dashboard/AdminSystemHealth';
import { AdminUserTable } from '../../components/dashboard/AdminUserTable';
import { AdminAuditLogTable } from '../../components/dashboard/AdminAuditLogTable';
import { useAuth } from '../../context/AuthContext';
import { Shield } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'health' | 'users' | 'ai-models' | 'audit' | 'settings'>('health');

  return (
    <AppShell>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-[10px] uppercase font-bold">TECHNICAL PLATFORM ADMINISTRATION</span>
              <span className="text-xs text-slate-500 font-mono">Infrastructure & RBAC Manager</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              System Administration Command Center
            </h1>
            <p className="text-xs text-slate-500">
              Technical Administrator: {user?.name} (Platform Headquarters)
            </p>
          </div>

          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Platform Status: Operational</span>
          </div>
        </div>

        {/* Technical Notice Banner */}
        <div className="bg-slate-900 text-slate-300 p-4 rounded-2xl border border-slate-800 text-xs flex items-center gap-3">
          <Shield className="w-5 h-5 text-blue-400 shrink-0" />
          <span>
            <strong>Technical Scoping Mandate:</strong> System Administrator accounts maintain platform health, user provisioning, security, and AI model deployments. System Administrators do not perform MPLADS governance or business approvals.
          </span>
        </div>

        {/* Infrastructure Telemetry Grid */}
        <AdminSystemHealth />

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold overflow-x-auto">
          {[
            { id: 'health', label: 'Platform Health' },
            { id: 'users', label: 'User & Scope Provisioning' },
            { id: 'ai-models', label: 'AI Model Center (v2.4)' },
            { id: 'audit', label: 'Immutable Audit Logs' },
            { id: 'settings', label: 'System Settings' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2.5 border-b-2 font-bold whitespace-nowrap transition-colors ${
                activeTab === t.id ? 'border-blue-600 text-blue-800' : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Views */}
        {activeTab === 'health' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-xs">
            <h3 className="font-extrabold text-slate-900 text-base">Pipeline & Gateway Performance</h3>
            <p className="text-slate-600">
              Database connection pools, REST API response latency, and Sentinel-2 satellite ingestion pipelines are performing within normal parameters.
            </p>
          </div>
        )}

        {activeTab === 'users' && (
          <AdminUserTable />
        )}

        {activeTab === 'ai-models' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Deployed AI Anomaly Models</h3>
                <p className="text-xs text-slate-500">Neural network versions, risk thresholds, and retraining status</p>
              </div>
              <span className="badge badge-success text-xs font-mono">v2.4 Active</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">Progress-Expenditure Neural Matcher v2.4</span>
                <p className="text-slate-600">Evaluates physical milestone completion against financial tranche disbursement.</p>
                <div className="flex justify-between font-mono text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                  <span>Accuracy: <strong className="text-emerald-700">94.8%</strong></span>
                  <span>Retrained: 3 days ago</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">Geospatial NLP Duplicate Work Scanner v1.9</span>
                <p className="text-slate-600">Cross-checks project descriptions & GPS coordinates against municipal datasets.</p>
                <div className="flex justify-between font-mono text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                  <span>Accuracy: <strong className="text-emerald-700">92.1%</strong></span>
                  <span>Retrained: 1 week ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <AdminAuditLogTable />
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 text-xs">
            <h3 className="font-extrabold text-slate-900 text-base">Platform Security & Maintenance Controls</h3>
            <div className="space-y-3 max-w-lg">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span>Enforce Multi-Factor Authentication (MFA)</span>
                <input type="checkbox" defaultChecked className="toggle" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span>DPDP Citizen Identity Masking Engine</span>
                <input type="checkbox" defaultChecked disabled className="toggle" />
              </div>
            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
};
