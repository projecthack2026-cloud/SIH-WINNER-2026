import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DemoRoleSwitcher } from './DemoRoleSwitcher';
import { 
  Bell, 
  HelpCircle, 
  LogOut, 
  MapPin, 
  Menu, 
  X, 
  ChevronDown
} from 'lucide-react';

interface Props {
  onOpenMobileSidebar: () => void;
}

export const DashboardHeader: React.FC<Props> = ({ onOpenMobileSidebar }) => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const notifications = [
    { id: '1', title: 'High-risk anomaly flagged', time: '12m ago', unread: true },
    { id: '2', title: 'New citizen evidence verified', time: '1h ago', unread: true },
    { id: '3', title: 'Quarterly fund report ready', time: '3h ago', unread: false },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#D8E0E8] shadow-2xs py-2.5 px-4 md:px-6">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left Side: Mobile Menu Toggle & Scope Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-md text-[#1F2937] hover:bg-[#F6F8FA] border border-[#D8E0E8]"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Geographic Scope Badge */}
          <div className="flex items-center gap-2 bg-[#EAF3FB] text-[#1558A6] border border-[#BCD7F2] px-3 py-1.5 rounded-md text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-[#1558A6] shrink-0" />
            <span className="hidden sm:inline text-[#64748B]">Scope:</span>
            <span className="font-bold font-mono">{user?.jurisdiction || 'Constituency'}</span>
          </div>
        </div>

        {/* Center/Right Actions: SIH Demo Switcher, Bell, Help, Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* SIH Prototype Demo Role Switcher */}
          <DemoRoleSwitcher />

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-md text-[#64748B] hover:text-[#1558A6] hover:bg-[#F6F8FA] border border-transparent hover:border-[#D8E0E8] relative transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C0392B] animate-ping"></span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C0392B]"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg border border-[#D8E0E8] shadow-lg p-4 space-y-3 z-50 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-[#D8E0E8] pb-2">
                  <h4 className="font-bold text-[#1558A6] text-xs uppercase tracking-wider font-mono">
                    Official Notifications
                  </h4>
                  <span className="badge badge-info text-[10px]">2 New</span>
                </div>
                <div className="space-y-2 text-xs">
                  {notifications.map(n => (
                    <div key={n.id} className={`p-2.5 rounded-md border ${n.unread ? 'bg-[#EAF3FB] border-[#BCD7F2]' : 'bg-[#F6F8FA] border-[#D8E0E8]'}`}>
                      <p className="font-bold text-[#1F2937]">{n.title}</p>
                      <span className="text-[10px] text-[#64748B] font-mono">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Help Button */}
          <button
            onClick={() => setShowHelpModal(true)}
            className="hidden sm:flex p-2 rounded-md text-[#64748B] hover:text-[#1558A6] hover:bg-[#F6F8FA] border border-transparent hover:border-[#D8E0E8] transition-colors"
            title="Help & Guidance"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 p-1.5 rounded-md hover:bg-[#F6F8FA] transition-colors text-left border border-transparent hover:border-[#D8E0E8]"
            >
              <div className="w-8 h-8 rounded-md bg-[#1558A6] text-white font-bold flex items-center justify-center text-xs shadow-2xs">
                {user?.name.charAt(0) || 'U'}
              </div>
              <div className="hidden xl:block text-xs leading-tight">
                <p className="font-bold text-[#1F2937] truncate max-w-[130px]">{user?.name}</p>
                <p className="text-[10px] text-[#64748B] font-mono capitalize">{user?.role} Role</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#64748B] hidden xl:block" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl p-4 space-y-3 z-50 animate-fadeIn">
                <div className="border-b border-slate-100 pb-3 space-y-1">
                  <p className="font-bold text-sm text-slate-900">{user?.name}</p>
                  <p className="text-xs text-blue-700 font-mono">{user?.officialId}</p>
                  <p className="text-xs text-slate-500">{user?.designation}</p>
                </div>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 relative animate-fadeIn">
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-100 text-blue-800">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">MPLADS Command Center Assistance</h3>
                <p className="text-xs text-slate-500">Role-Based Decision Support Guide</p>
              </div>
            </div>

            <p className="text-slate-600 text-xs leading-relaxed">
              Use the top-right <strong>Demo Role Switcher</strong> to evaluate the dashboard interfaces for MPs, District Magistrates, State Planning Secretaries, Ministry Directors, and System Administrators.
            </p>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <p className="font-bold text-slate-900">Technical Support Nodal Desk:</p>
              <p className="font-mono">support@mplads-ai.gov.in</p>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="btn btn-primary btn-block btn-sm text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
