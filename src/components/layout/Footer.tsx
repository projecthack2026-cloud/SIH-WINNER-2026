import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Eye, AlertCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1558A6] text-white pt-10 pb-6 border-t border-[#0F4482]">
      <div className="container">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-[#2B6CB0]">
          
          {/* Brand Identity */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <img 
                src="/logo.png" 
                alt="MPLADS AI Monitor Logo" 
                className="w-9 h-9 object-contain shrink-0 bg-white p-0.5 rounded-md" 
              />
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight block">
                  MPLADS AI Monitor
                </span>
                <span className="text-xs text-[#EAF3FB] font-medium">
                  AI-Powered Infrastructure Monitoring & Accountability
                </span>
              </div>
            </div>
            
            <p className="text-[#EAF3FB] text-xs leading-relaxed pr-4 font-normal">
              An AI-powered Digital Public Infrastructure platform for monitoring MPLADS projects, detecting anomalies, tracking infrastructure progress and enabling transparent citizen participation.
            </p>

            <div className="flex items-center gap-3 text-xs text-white pt-1">
              <span className="flex items-center gap-1.5 bg-[#0F4482] px-2.5 py-1 rounded border border-[#2B6CB0] text-[11px]">
                <Lock className="w-3.5 h-3.5 text-[#EAF3FB]" /> Identity Protected
              </span>
              <span className="flex items-center gap-1.5 bg-[#0F4482] px-2.5 py-1 rounded border border-[#2B6CB0] text-[11px]">
                <Eye className="w-3.5 h-3.5 text-[#EAF3FB]" /> Public Oversight
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-b border-[#2B6CB0] pb-1.5 font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#EAF3FB]">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/explore" className="hover:text-white transition-colors">Explore</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/report" className="hover:text-white transition-colors">Citizen Report</Link></li>
              <li><Link to="/report/track" className="hover:text-white transition-colors">Track Complaint</Link></li>
              <li><Link to="/signin" className="hover:text-white transition-colors">Sign In</Link></li>
            </ul>
          </div>

          {/* Important Links & Policy */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-b border-[#2B6CB0] pb-1.5 font-mono">
              Policies & Guidance
            </h4>
            <ul className="space-y-2 text-xs text-[#EAF3FB]">
              <li><Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Accessibility Statement</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Help & FAQ</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Nodal Contact</Link></li>
            </ul>
          </div>

          {/* Official Role Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-b border-[#2B6CB0] pb-1.5 font-mono">
              Official Portals
            </h4>
            <ul className="space-y-2 text-xs text-[#EAF3FB]">
              <li><Link to="/signin/mp" className="hover:text-white transition-colors">Member of Parliament Desk</Link></li>
              <li><Link to="/signin/district" className="hover:text-white transition-colors">District Authority Desk</Link></li>
              <li><Link to="/signin/state" className="hover:text-white transition-colors">State Nodal Authority Desk</Link></li>
              <li><Link to="/signin/ministry" className="hover:text-white transition-colors">Ministry / MoSPI Oversight</Link></li>
            </ul>
          </div>

        </div>

        {/* Prototype Disclaimer Strip */}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#EAF3FB]">
          <p>
            © {new Date().getFullYear()} MPLADS AI Monitor Platform. Official Government Portal Theme.
          </p>
          <div className="bg-[#0F4482] px-3.5 py-1.5 rounded-md border border-[#2B6CB0] flex items-center gap-2 text-white text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#EAF3FB]" />
            <span>Digital Infrastructure Monitoring Portal Prototype</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
