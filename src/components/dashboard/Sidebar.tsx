import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  FolderKanban, 
  ShieldAlert, 
  DollarSign, 
  Users, 
  Bell, 
  FileText,
  CopyCheck,
  Building,
  Landmark,
  Shield,
  Cpu,
  Map,
  Activity,
  UserCog,
  MapPin,
  Database,
  Lock,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface Props {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<Props> = ({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile
}) => {
  const { role } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    if (location.pathname === path) return true;
    if (path.endsWith('/dashboard')) return false;
    return location.pathname.startsWith(path);
  };

  const getNavItems = () => {
    switch (role) {
      case 'mp':
        return [
          { label: 'Dashboard', path: '/mp/dashboard', icon: LayoutDashboard },
          { label: 'My Projects', path: '/mp/projects', icon: FolderKanban },
          { label: 'AI Risk', path: '/mp/risk', icon: ShieldAlert },
          { label: 'Financial Overview', path: '/mp/financial', icon: DollarSign },
          { label: 'Digital Twin', path: '/mp/digital-twin', icon: Map },
          { label: 'Citizen Issues', path: '/mp/citizen-issues', icon: Users },
          { label: 'Alerts', path: '/mp/alerts', icon: Bell },
          { label: 'Reports', path: '/mp/reports', icon: FileText }
        ];
      case 'district':
        return [
          { label: 'Dashboard', path: '/district/dashboard', icon: LayoutDashboard },
          { label: 'Projects', path: '/district/projects', icon: FolderKanban },
          { label: 'AI Risk & Anomalies', path: '/district/risk', icon: ShieldAlert },
          { label: 'Financial Intelligence', path: '/district/financial', icon: DollarSign },
          { label: 'Duplicate Detection', path: '/district/duplicates', icon: CopyCheck },
          { label: 'Digital Twin', path: '/district/digital-twin', icon: Map },
          { label: 'Citizen Complaints', path: '/district/complaints', icon: Users },
          { label: 'Alerts & Compliance', path: '/district/alerts', icon: Bell },
          { label: 'Reports', path: '/district/reports', icon: FileText }
        ];
      case 'state':
        return [
          { label: 'Dashboard', path: '/state/dashboard', icon: LayoutDashboard },
          { label: 'District Performance', path: '/state/districts', icon: Building },
          { label: 'Projects', path: '/state/projects', icon: FolderKanban },
          { label: 'AI Intelligence', path: '/state/ai', icon: Cpu },
          { label: 'Financial Intelligence', path: '/state/financial', icon: DollarSign },
          { label: 'Duplicate Detection', path: '/state/duplicates', icon: CopyCheck },
          { label: 'Digital Twin', path: '/state/digital-twin', icon: Map },
          { label: 'Alerts & Compliance', path: '/state/alerts', icon: Bell },
          { label: 'Reports', path: '/state/reports', icon: FileText }
        ];
      case 'ministry':
        return [
          { label: 'National Dashboard', path: '/ministry/dashboard', icon: LayoutDashboard },
          { label: 'State Performance', path: '/ministry/states', icon: Landmark },
          { label: 'Project Intelligence', path: '/ministry/projects', icon: FolderKanban },
          { label: 'AI Risk & Fraud', path: '/ministry/ai', icon: ShieldAlert },
          { label: 'Financial Intelligence', path: '/ministry/financial', icon: DollarSign },
          { label: 'Duplicate Detection', path: '/ministry/duplicates', icon: CopyCheck },
          { label: 'Digital Twin', path: '/ministry/digital-twin', icon: Map },
          { label: 'Alerts & Compliance', path: '/ministry/alerts', icon: Bell },
          { label: 'Decision Support', path: '/ministry/decision-support', icon: Cpu },
          { label: 'Reports', path: '/ministry/reports', icon: FileText }
        ];
      case 'admin':
        return [
          { label: 'System Dashboard', path: '/admin/dashboard', icon: Activity },
          { label: 'User Management', path: '/admin/users', icon: UserCog },
          { label: 'Roles & Permissions', path: '/admin/roles', icon: Shield },
          { label: 'Geographic Scope', path: '/admin/geography', icon: MapPin },
          { label: 'Data Management', path: '/admin/data', icon: Database },
          { label: 'AI Model Center', path: '/admin/ai-models', icon: Cpu },
          { label: 'Alert Configuration', path: '/admin/alerts', icon: Bell },
          { label: 'Geospatial Services', path: '/admin/geospatial', icon: Map },
          { label: 'Security Center', path: '/admin/security', icon: Lock },
          { label: 'Audit Logs', path: '/admin/audit', icon: History },
          { label: 'System Settings', path: '/admin/settings', icon: Settings }
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0D274A] text-[#EAF3FB] border-r border-[#194C8A]">
      
      {/* Brand Header */}
      <div className="p-3.5 border-b border-[#194C8A] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 overflow-hidden">
          <div className="p-1.5 rounded bg-white text-[#123B6D] shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          {!collapsed && (
            <div className="truncate">
              <span className="font-extrabold text-sm text-white tracking-tight leading-none block">
                MPLADS <span className="text-[#EAF3FB]">AI</span>
              </span>
              <span className="text-[10px] text-[#EAF3FB] uppercase font-mono tracking-wider">
                {role} Command Desk
              </span>
            </div>
          )}
        </Link>

        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex p-1 rounded text-[#EAF3FB] hover:bg-[#123B6D] transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-2.5 px-3 py-2 rounded text-xs font-semibold transition-all ${
                active
                  ? 'bg-[#123B6D] text-white font-bold border-l-4 border-[#1E5AA8]'
                  : 'text-[#EAF3FB] hover:bg-[#123B6D]/60'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* Footer Link to Public Website */}
      <div className="p-3 border-t border-[#194C8A]">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-semibold text-[#EAF3FB] hover:text-white px-2 py-1.5 rounded hover:bg-[#123B6D] transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          {!collapsed && <span>Public Portal Home</span>}
        </Link>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block shrink-0 transition-all duration-300 ${collapsed ? 'w-20' : 'w-60'}`}>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex">
          <div className="w-64 max-w-full h-full">
            {sidebarContent}
          </div>
          <div className="flex-1" onClick={onCloseMobile}></div>
        </div>
      )}
    </>
  );
};
