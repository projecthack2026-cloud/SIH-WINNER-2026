import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Eye, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

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
                className="w-10 h-10 object-contain shrink-0" 
              />
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight block">
                  {t.footer.platformName}
                </span>
                <span className="text-xs text-[#EAF3FB] font-medium">
                  {t.footer.subtitle}
                </span>
              </div>
            </div>
            
            <p className="text-[#EAF3FB] text-xs leading-relaxed pr-4 font-normal">
              {t.hero.description}
            </p>

            <div className="flex items-center gap-3 text-xs text-white pt-1">
              <span className="flex items-center gap-1.5 bg-[#0F4482] px-2.5 py-1 rounded border border-[#2B6CB0] text-[11px]">
                <Lock className="w-3.5 h-3.5 text-[#EAF3FB]" /> {t.hero.identityProtected}
              </span>
              <span className="flex items-center gap-1.5 bg-[#0F4482] px-2.5 py-1 rounded border border-[#2B6CB0] text-[11px]">
                <Eye className="w-3.5 h-3.5 text-[#EAF3FB]" /> Public Oversight
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-b border-[#2B6CB0] pb-1.5 font-mono">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-[#EAF3FB]">
              <li><Link to="/" className="hover:text-white transition-colors">{t.nav.home}</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">{t.nav.about}</Link></li>
              <li><Link to="/explore" className="hover:text-white transition-colors">{t.nav.explore}</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">{t.nav.howItWorks}</Link></li>
              <li><Link to="/report" className="hover:text-white transition-colors">{t.nav.citizenReport}</Link></li>
              <li><Link to="/report/track" className="hover:text-white transition-colors">{t.nav.trackComplaint}</Link></li>
              <li><Link to="/signin" className="hover:text-white transition-colors">{t.nav.signIn}</Link></li>
            </ul>
          </div>

          {/* Important Links & Policy */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-b border-[#2B6CB0] pb-1.5 font-mono">
              {t.footer.publicServices}
            </h4>
            <ul className="space-y-2 text-xs text-[#EAF3FB]">
              <li><Link to="/report" className="hover:text-white transition-colors">{t.footer.citizenReport}</Link></li>
              <li><Link to="/report/track" className="hover:text-white transition-colors">{t.footer.trackStatus}</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">{t.footer.privacyPolicy}</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">{t.footer.termsService}</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">{t.footer.helpFaq}</Link></li>
            </ul>
          </div>

          {/* Official Role Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-b border-[#2B6CB0] pb-1.5 font-mono">
              {t.footer.roleLogin}
            </h4>
            <ul className="space-y-2 text-xs text-[#EAF3FB]">
              <li><Link to="/signin/mp" className="hover:text-white transition-colors">Member of Parliament Desk</Link></li>
              <li><Link to="/signin/district" className="hover:text-white transition-colors">District Authority Desk</Link></li>
              <li><Link to="/signin/state" className="hover:text-white transition-colors">State Nodal Authority Desk</Link></li>
              <li><Link to="/signin/ministry" className="hover:text-white transition-colors">{t.footer.mospiRef}</Link></li>
            </ul>
          </div>

        </div>

        {/* Prototype Disclaimer Strip */}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#EAF3FB]">
          <p>
            {t.footer.copyright}
          </p>
          <div className="bg-[#0F4482] px-3.5 py-1.5 rounded-md border border-[#2B6CB0] flex items-center gap-2 text-white text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#EAF3FB]" />
            <span>{t.footer.disclaimer}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
