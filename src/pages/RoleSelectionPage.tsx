import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../data/mockData';
import type { StakeholderRole } from '../types/auth';
import { 
  Building2, 
  Building, 
  Landmark, 
  ShieldAlert, 
  ArrowRight, 
  Lock, 
  Activity
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const RoleSelectionPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<StakeholderRole>('mp');

  const getRoleIcon = (id: StakeholderRole) => {
    switch (id) {
      case 'mp': return Building2;
      case 'district': return Building;
      case 'state': return Landmark;
      case 'ministry': return ShieldAlert;
      case 'admin': return Activity;
      default: return Building;
    }
  };

  const handleProceed = () => {
    navigate(`/signin/${selectedRole}`);
  };

  return (
    <main className="min-h-screen py-12 bg-[#F6F8FA] flex items-center justify-center">
      <div className="container max-w-2xl space-y-6">
        
        {/* Main Card Container */}
        <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#D8E0E8] shadow-xs space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 border-b border-[#D8E0E8] pb-5">
            <img 
              src="/logo.png" 
              alt="MPLADS AI Monitor Logo" 
              className="w-14 h-14 object-contain mx-auto drop-shadow-xs mb-1" 
            />

            <span className="text-[11px] font-mono font-bold text-[#64748B] block uppercase tracking-wider">
              {t.roleSelection.portalHeader}
            </span>

            <h1 className="text-2xl font-extrabold text-[#1558A6]">
              {t.roleSelection.pageTitle}
            </h1>

            <p className="text-xs text-[#64748B] max-w-md mx-auto">
              {t.roleSelection.pageSubtitle}
            </p>
          </div>

          {/* Role Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ROLES.map((r) => {
              const Icon = getRoleIcon(r.id);
              const isSelected = selectedRole === r.id;

              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRole(r.id)}
                  className={`p-4 rounded-md border text-left transition-all flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-[#EAF3FB] border-[#1558A6] ring-1 ring-[#1558A6]'
                      : 'bg-white border-[#D8E0E8] hover:border-[#2B6CB0]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-md ${
                      isSelected ? 'bg-[#1558A6] text-white' : 'bg-[#F6F8FA] text-[#1558A6] border border-[#D8E0E8]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold text-[#1558A6] bg-[#EAF3FB] border border-[#BCD7F2] rounded">
                      Official Portal
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-[#1F2937] text-sm">
                      {r.title}
                    </h3>
                    <p className="text-[#64748B] text-xs mt-1 leading-relaxed">
                      {r.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action CTA Button */}
          <div className="pt-2">
            <button
              onClick={handleProceed}
              className="px-5 py-3 rounded-md font-bold text-xs bg-[#1558A6] hover:bg-[#0F4482] text-white w-full flex items-center justify-center gap-2 shadow-2xs border border-[#1558A6] transition-colors cursor-pointer"
            >
              <span>{t.roleSelection.continueBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Security Notice Box */}
        <div className="p-3.5 bg-white border border-[#D8E0E8] rounded-md text-center text-xs text-[#1558A6] font-mono flex items-center justify-center gap-2 shadow-2xs">
          <Lock className="w-4 h-4 text-[#1558A6] shrink-0" />
          <span>{t.roleSelection.securityNotice}</span>
        </div>

      </div>
    </main>
  );
};
