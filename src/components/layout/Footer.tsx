import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, AlertCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#123B6D] text-white pt-10 pb-6 border-t border-[#194C8A]">
      <div className="container">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-[#194C8A]">
          
          {/* Brand Identity */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded bg-white text-[#123B6D] border border-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
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
              <span className="flex items-center gap-1.5 bg-[#0D274A] px-2.5 py-1 rounded border border-[#194C8A] text-[11px]">
                <Lock className="w-3.5 h-3.5 text-[#EAF3FB]" /> Identity Protected
              </span>
              <span className="flex items-center gap-1.5 bg-[#0D274A] px-2.5 py-1 rounded border border-[#194C8A] text-[11px]">
                <Eye className="w-3.5 h-3.5 text-[#EAF3FB]" /> Public Oversight
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-b border-[#194C8A] pb-1.5">
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
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-b border-[#194C8A] pb-1.5">
              Policies & Help
            </h4>
            <ul className="space-y-2 text-xs text-[#EAF3FB]">
              <li><Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Accessibility</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Help</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Official Role Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-b border-[#194C8A] pb-1.5">
              Official Portals
            </h4>
            <ul className="space-y-2 text-xs text-[#EAF3FB]">
              <li><Link to="/signin/mp" className="hover:text-white transition-colors">Member of Parliament</Link></li>
              <li><Link to="/signin/district" className="hover:text-white transition-colors">District Authority</Link></li>
              <li><Link to="/signin/state" className="hover:text-white transition-colors">State Nodal Authority</Link></li>
              <li><Link to="/signin/ministry" className="hover:text-white transition-colors">Ministry / MoSPI Oversight</Link></li>
            </ul>
          </div>

        </div>

        {/* Prototype Disclaimer Strip */}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#EAF3FB]">
          <p>
            © {new Date().getFullYear()} MPLADS AI Monitor Platform. All Rights Reserved.
          </p>
          <div className="bg-[#0D274A] px-3.5 py-1.5 rounded border border-[#194C8A] flex items-center gap-2 text-white text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#EAF3FB]" />
            <span>This is a prototype developed for Smart India Hackathon.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
