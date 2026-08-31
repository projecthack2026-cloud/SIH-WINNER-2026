import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  if (pathnames.length === 0) return null;

  const roleSegment = pathnames[0]; // 'district', 'mp', 'state', 'ministry', 'admin'
  const rootPath = `/${roleSegment}/dashboard`;

  const formatSegment = (segment: string) => {
    switch (segment) {
      case 'dashboard': return 'Dashboard';
      case 'projects': return 'Projects';
      case 'risk': return 'AI Risk & Anomalies';
      case 'financial': return 'Financial Intelligence';
      case 'duplicates': return 'Duplicate Detection';
      case 'digital-twin': return 'Digital Twin';
      case 'complaints': return 'Citizen Complaints';
      case 'alerts': return 'Alerts & Compliance';
      case 'reports': return 'Reports & AI Insights';
      case 'districts': return 'District Performance';
      case 'states': return 'State Performance';
      case 'ai': return 'AI Risk & Fraud';
      case 'decision-support': return 'AI Decision Support';
      case 'citizen-issues': return 'Citizen Issues';
      case 'users': return 'User Management';
      case 'roles': return 'Roles & Permissions';
      case 'geography': return 'Geographic Scope';
      case 'data': return 'Data Management';
      case 'ai-models': return 'AI Model Center';
      case 'geospatial': return 'Geospatial Services';
      case 'security': return 'Security Center';
      case 'audit': return 'Audit Logs';
      case 'settings': return 'System Settings';
      default: return segment.toUpperCase();
    }
  };

  return (
    <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-4" aria-label="Breadcrumb">
      <Link to={rootPath} className="flex items-center gap-1 hover:text-blue-700 transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span className="capitalize">{roleSegment} Command</span>
      </Link>

      {pathnames.slice(1).map((value, index) => {
        const to = `/${pathnames.slice(0, index + 2).join('/')}`;
        const isLast = index === pathnames.length - 2;

        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {isLast ? (
              <span className="font-bold text-slate-900 truncate max-w-[200px]">
                {formatSegment(value)}
              </span>
            ) : (
              <Link to={to} className="hover:text-blue-700 transition-colors">
                {formatSegment(value)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
