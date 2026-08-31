import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

export const AccessDenied: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getRoleDashboard = () => {
    switch (user?.role) {
      case 'mp': return '/mp/dashboard';
      case 'district': return '/district/dashboard';
      case 'state': return '/state/dashboard';
      case 'ministry': return '/ministry/dashboard';
      case 'admin': return '/admin/dashboard';
      default: return '/';
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 border border-slate-200 shadow-xl text-center space-y-6">
        
        <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 border border-rose-200 mx-auto flex items-center justify-center shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="badge badge-danger uppercase tracking-wider font-mono text-[10px] font-bold">
            ERROR 403 • ACCESS RESTRICTED
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Unauthorized Governance Scope
          </h2>
          <p className="text-slate-600 text-xs leading-relaxed max-w-md mx-auto">
            Your authenticated session (<strong>{user?.name}</strong> • <code>{user?.role?.toUpperCase()}</code> role) does not possess permission to access this module or geographic jurisdiction.
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 text-left space-y-1">
          <p className="font-bold text-slate-900">Enforced Security Rules:</p>
          <ul className="list-disc pl-5 space-y-1 text-[11px] text-slate-600">
            <li>Role-Based Access Control (RBAC) active.</li>
            <li>Geographic Scope Boundaries strictly enforced.</li>
            <li>Use the header <strong>Demo Role Switcher</strong> to evaluate other role dashboards.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-sm text-xs w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
          
          <Link
            to={getRoleDashboard()}
            className="btn btn-primary btn-sm text-xs w-full sm:w-auto"
          >
            <Home className="w-4 h-4" />
            <span>Return to Authorized Dashboard</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
