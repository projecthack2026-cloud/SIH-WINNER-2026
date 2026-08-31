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
  UserCheck
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
    <header className="sticky top-0 z-50 bg-white border-b border-[#D9E0E7]">
      
      {/* 1. Minimal Top Utility Bar (White / Light Grey background) */}
      <div className="bg-[#F5F7F9] text-[#475569] text-xs py-1 border-b border-[#D9E0E7]">
        <div className="container flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 font-medium">
            <span className="font-semibold text-[#123B6D]">
              Government Digital Infrastructure Monitoring Platform
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[#64748B]">
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-[#64748B] font-medium flex items-center gap-1 mr-1">
                <Eye className="w-3 h-3 text-[#123B6D]" /> Access:
              </span>
              <button 
                onClick={() => setFontSize('normal')}
                className={`px-1 font-bold ${fontSize === 'normal' ? 'text-[#123B6D] font-extrabold' : 'text-[#64748B]'}`}
              >
                A-
              </button>
              <span>|</span>
              <button 
                onClick={() => setFontSize('large')}
                className={`px-1 font-bold ${fontSize === 'large' ? 'text-[#123B6D] font-extrabold' : 'text-[#64748B]'}`}
              >
                A
              </button>
              <span>|</span>
              <button 
                onClick={() => setFontSize('xlarge')}
                className={`px-1 font-bold ${fontSize === 'xlarge' ? 'text-[#123B6D] font-extrabold' : 'text-[#64748B]'}`}
              >
                A+
              </button>
            </div>

            <Link to="/about" className="hover:text-[#123B6D] transition-colors flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-[#1E5AA8]" /> Help & FAQ
            </Link>

            <span>•</span>

            <div className="flex items-center gap-1 text-[11px]">
              <Globe className="w-3 h-3 text-[#1E5AA8]" />
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="bg-transparent text-[#1F2937] font-medium focus:outline-none cursor-pointer"
              >
                <option value="English">English</option>
                <option value="Hindi">हिन्दी (Hindi)</option>
                <option value="Marathi">मराठी (Marathi)</option>
              </select>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Main Header Bar (White Background) */}
      <div className="container py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Platform Name */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="p-2 rounded bg-[#EAF3FB] text-[#123B6D] border border-[#BCD7F2] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-[#123B6D] tracking-tight leading-none">
                  MPLADS <span className="text-[#1E5AA8]">AI Monitor</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-[#EAF3FB] text-[#123B6D] border border-[#BCD7F2]">
                  DPI Portal
                </span>
              </div>
              <p className="text-xs text-[#64748B] font-medium mt-0.5">
                AI-Powered Infrastructure Monitoring & Accountability
              </p>
            </div>
          </Link>

          {/* Right Primary Action CTA */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              to="/report"
              className="px-3.5 py-2 rounded font-semibold text-xs bg-white text-[#123B6D] hover:bg-[#EAF3FB] transition-all border border-[#123B6D]"
            >
              Report Issue
            </Link>
            <Link
              to="/signin"
              className="px-4 py-2 rounded font-semibold text-xs bg-[#123B6D] hover:bg-[#0d2c52] text-white transition-all shadow-xs flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>SIGN IN</span>
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded text-[#1F2937] hover:bg-[#F5F7F9] border border-[#D9E0E7] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* 3. Navigation Bar (White background, Dark Navy active link with blue bottom border) */}
      <div className="bg-white border-t border-[#D9E0E7]">
        <div className="container">
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2.5 text-sm font-semibold transition-all whitespace-nowrap ${
                    active
                      ? 'text-[#123B6D] border-b-2 border-[#1E5AA8] font-bold'
                      : 'text-[#475569] hover:text-[#1E5AA8]'
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
        <div className="lg:hidden border-t border-[#D9E0E7] bg-white text-[#1F2937] px-4 py-4 space-y-3 shadow-md">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded text-sm font-semibold ${
                  isActive(link.path)
                    ? 'bg-[#EAF3FB] text-[#123B6D] font-bold border-l-4 border-[#1E5AA8]'
                    : 'text-[#475569] hover:bg-[#F5F7F9]'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#D9E0E7] space-y-2">
            <Link
              to="/report"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded font-semibold text-xs bg-white text-[#123B6D] border border-[#123B6D]"
            >
              <span>Report Infrastructure Issue</span>
            </Link>
            <Link
              to="/signin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded font-semibold text-xs bg-[#123B6D] text-white"
            >
              <span>SIGN IN</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
