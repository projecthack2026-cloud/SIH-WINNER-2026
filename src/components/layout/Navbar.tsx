import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  Globe, 
  HelpCircle,
  ChevronRight,
  Eye,
  UserCheck,
  PlusCircle
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Explore', path: '/explore' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Citizen Report', path: '/report' },
    { label: 'Track Complaint', path: '/report/track' },
    { label: 'Sign In', path: '/signin' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#D8E0E8] shadow-xs">
      
      {/* 1. Top Utility & Accessibility Bar */}
      <div className="bg-[#F6F8FA] text-[#64748B] text-xs py-1.5 border-b border-[#D8E0E8]">
        <div className="container flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 font-medium">
            <span className="h-2 w-2 rounded-full bg-[#1558A6]"></span>
            <span className="font-semibold text-[#1F2937] text-[11px] sm:text-xs">
              Government Digital Infrastructure Monitoring Platform
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[#64748B]">
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="text-[#64748B] font-medium flex items-center gap-1 mr-1">
                <Eye className="w-3.5 h-3.5 text-[#1558A6]" /> Access:
              </span>
              <button 
                onClick={() => setFontSize('normal')}
                className={`px-1.5 py-0.5 rounded font-bold text-[11px] transition-colors ${fontSize === 'normal' ? 'bg-[#1558A6] text-white' : 'hover:bg-[#EAF3FB] text-[#1F2937]'}`}
              >
                A-
              </button>
              <button 
                onClick={() => setFontSize('large')}
                className={`px-1.5 py-0.5 rounded font-bold text-[11px] transition-colors ${fontSize === 'large' ? 'bg-[#1558A6] text-white' : 'hover:bg-[#EAF3FB] text-[#1F2937]'}`}
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('xlarge')}
                className={`px-1.5 py-0.5 rounded font-bold text-[11px] transition-colors ${fontSize === 'xlarge' ? 'bg-[#1558A6] text-white' : 'hover:bg-[#EAF3FB] text-[#1F2937]'}`}
              >
                A+
              </button>
            </div>

            <span className="text-[#D8E0E8]">|</span>

            <Link to="/about" className="hover:text-[#1558A6] transition-colors flex items-center gap-1 text-[11px]">
              <HelpCircle className="w-3.5 h-3.5 text-[#2B6CB0]" /> Help & FAQ
            </Link>

            <span className="text-[#D8E0E8]">|</span>

            <div className="flex items-center gap-1 text-[11px]">
              <Globe className="w-3.5 h-3.5 text-[#2B6CB0]" />
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="bg-transparent text-[#1F2937] font-medium focus:outline-none cursor-pointer text-[11px]"
              >
                <option value="English">English</option>
                <option value="Hindi">हिन्दी (Hindi)</option>
                <option value="Marathi">मराठी (Marathi)</option>
              </select>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Main Identity Row */}
      <div className="bg-white py-3.5">
        <div className="container flex items-center justify-between gap-4">
          
          {/* Logo & Emblem */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="p-2.5 rounded-lg bg-[#EAF3FB] text-[#1558A6] border border-[#BCD7F2] shadow-2xs">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl text-[#1558A6] tracking-tight leading-none">
                  MPLADS <span className="text-[#2B6CB0]">AI Monitor</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-[#EAF3FB] text-[#1558A6] border border-[#BCD7F2]">
                  Portal
                </span>
              </div>
              <p className="text-xs text-[#64748B] font-medium mt-1">
                AI-Powered Infrastructure Monitoring & Accountability
              </p>
            </div>
          </Link>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              to="/report"
              className="px-4 py-2 rounded-md font-semibold text-xs bg-white text-[#1558A6] hover:bg-[#EAF3FB] transition-all border border-[#1558A6] flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#1558A6]" />
              <span>Report Issue</span>
            </Link>
            <Link
              to="/signin"
              className="px-4.5 py-2 rounded-md font-bold text-xs bg-[#1558A6] hover:bg-[#0F4482] text-white transition-all shadow-2xs flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" />
              <span>SIGN IN</span>
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-[#1F2937] hover:bg-[#F6F8FA] border border-[#D8E0E8] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* 3. Main Horizontal Navigation */}
      <div className="bg-[#F5F9FD] border-t border-[#D8E0E8]">
        <div className="container">
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2.5 text-sm font-semibold transition-all whitespace-nowrap border-b-2 ${
                    active
                      ? 'bg-white text-[#1558A6] border-[#1558A6] font-bold shadow-xs'
                      : 'border-transparent text-[#1F2937] hover:text-[#1558A6] hover:bg-[#EAF3FB]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#D8E0E8] bg-white text-[#1F2937] px-4 py-4 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#EAF3FB] text-[#1558A6] font-bold border-l-4 border-[#1558A6]'
                    : 'text-[#1F2937] hover:bg-[#F6F8FA]'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#64748B]" />
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#D8E0E8] space-y-2">
            <Link
              to="/report"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-semibold text-xs bg-white text-[#1558A6] border border-[#1558A6]"
            >
              <span>Report Infrastructure Issue</span>
            </Link>
            <Link
              to="/signin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-bold text-xs bg-[#1558A6] text-white"
            >
              <span>SIGN IN</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
