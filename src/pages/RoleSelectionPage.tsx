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
  Activity,
  ShieldCheck
} from 'lucide-react';

export const RoleSelectionPage: React.FC = () => {
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
    <main className="min-h-screen py-10 bg-[#F5F7F9] flex items-center justify-center">
      <div className="container max-w-2xl space-y-5">
        
        {/* Main Card (White background, light grey border - Prompt Specs) */}
        <div className="bg-white rounded p-6 border border-[#D9E0E7] shadow-2xs space-y-5">
          
          {/* Header (Exact prompt specs) */}
          <div className="text-center space-y-1.5 border-b border-[#D9E0E7] pb-4">
            <div className="p-2.5 rounded bg-[#EAF3FB] text-[#123B6D] w-fit mx-auto border border-[#BCD7F2]">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <span className="text-[10px] font-mono font-bold text-[#64748B] block uppercase tracking-wider">
              MPLADS AI Monitor
            </span>

            <h1 className="text-xl font-extrabold text-[#123B6D]">
              Secure Official Login
            </h1>

            <p className="text-xs text-[#64748B]">
              Select your role to continue.
            </p>
          </div>

          {/* Role Cards Grid (ALL CARDS USE SAME STYLING: White background, Grey border, Blue icon, Navy title. Selected: Navy border, Light Blue background - Prompt Specs) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ROLES.map((r) => {
              const Icon = getRoleIcon(r.id);
              const isSelected = selectedRole === r.id;

              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRole(r.id)}
                  className={`p-4 rounded border text-left transition-all flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-[#EAF3FB] border-[#123B6D] ring-1 ring-[#123B6D]'
                      : 'bg-white border-[#D9E0E7] hover:border-[#1E5AA8]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded ${
                      isSelected ? 'bg-[#123B6D] text-white' : 'bg-[#F5F7F9] text-[#1E5AA8] border border-[#D9E0E7]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-mono font-bold text-[#64748B]">
                      OFFICIAL PORTAL
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-[#123B6D] text-sm">
                      {r.title}
                    </h3>
                    <p className="text-[#64748B] text-xs mt-0.5 leading-normal">
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
              className="px-4 py-2.5 rounded font-bold text-xs bg-[#123B6D] hover:bg-[#0d2c52] text-white w-full flex items-center justify-center gap-2 shadow-2xs"
            >
              <span>Continue to Login Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Security Notice Box */}
        <div className="p-3 bg-white border border-[#D9E0E7] rounded text-center text-xs text-[#123B6D] font-mono flex items-center justify-center gap-2">
          <Lock className="w-3.5 h-3.5 text-[#1E5AA8] shrink-0" />
          <span>Security notice: This portal is intended for authorized users.</span>
        </div>

      </div>
    </main>
  );
};
