import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ROLES } from '../data/mockData';
import type { StakeholderRole } from '../types/auth';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  Building, 
  Landmark, 
  ShieldAlert, 
  ArrowLeft, 
  UserCheck, 
  KeyRound, 
  X,
  Activity,
  Lock,
  RefreshCw
} from 'lucide-react';

export const RoleLoginPage: React.FC = () => {
  const { role: roleParam } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const { login } = useAuth();

  const roleData = ROLES.find(r => r.id === roleParam) || ROLES[1];

  const [officialId, setOfficialId] = useState(roleData.sampleId);
  const [password, setPassword] = useState('••••••••••••');
  const [captchaInput, setCaptchaInput] = useState('7K2P9');
  const [rememberDevice, setRememberDevice] = useState(true);
  
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const RoleIcon = getRoleIcon(roleData.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officialId || !password) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      login(roleData.id, officialId);
      
      switch (roleData.id) {
        case 'mp': navigate('/mp/dashboard'); break;
        case 'district': navigate('/district/dashboard'); break;
        case 'state': navigate('/state/dashboard'); break;
        case 'ministry': navigate('/ministry/dashboard'); break;
        case 'admin': navigate('/admin/dashboard'); break;
        default: navigate('/mp/dashboard'); break;
      }
    }, 600);
  };

  return (
    <main className="min-h-screen py-12 bg-[#F6F8FA] flex items-center justify-center">
      <div className="container max-w-md space-y-4">
        
        {/* Back Link */}
        <div>
          <Link
            to="/signin"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#1558A6] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Role Selection</span>
          </Link>
        </div>

        {/* Form Box */}
        <div className="bg-white rounded-lg p-6 border border-[#D8E0E8] shadow-xs space-y-5">
          
          {/* Header */}
          <div className="text-center space-y-1.5 border-b border-[#D8E0E8] pb-4">
            <div className="p-3 rounded-md bg-[#EAF3FB] text-[#1558A6] w-fit mx-auto border border-[#BCD7F2]">
              <RoleIcon className="w-6 h-6" />
            </div>

            <span className="text-[10px] font-mono font-bold text-[#64748B] block uppercase tracking-wider">
              MPLADS AI Monitor • Official Portal
            </span>

            <h1 className="text-xl font-extrabold text-[#1558A6]">
              Secure Official Login
            </h1>

            <p className="text-xs text-[#64748B] font-medium">
              Authorized personnel only — {roleData.title}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="form-group">
              <label className="form-label flex items-center justify-between text-xs">
                <span>Official Email / ID *</span>
                <span className="text-[10px] text-[#64748B] font-mono">Sample: {roleData.sampleId}</span>
              </label>
              <input
                type="text"
                value={officialId}
                onChange={(e) => setOfficialId(e.target.value)}
                placeholder="Enter Official Email / ID"
                className="form-input text-xs font-mono"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label flex items-center justify-between text-xs">
                <span>Password *</span>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[11px] text-[#2B6CB0] font-semibold hover:underline"
                >
                  Forgot Password?
                </button>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="form-input text-xs font-mono"
                required
              />
            </div>

            {/* Captcha Security Check */}
            <div className="form-group">
              <label className="form-label text-xs">Security Check (Captcha) *</label>
              <div className="flex items-center gap-2">
                <div className="bg-[#F6F8FA] border border-[#D8E0E8] px-3 py-2 rounded text-sm font-mono font-bold tracking-widest text-[#1558A6] select-none flex items-center gap-2">
                  <span>7 K 2 P 9</span>
                  <RefreshCw className="w-3 h-3 text-[#64748B] cursor-pointer" />
                </div>
                <input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="Enter code"
                  className="form-input text-xs font-mono uppercase"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                checked={rememberDevice}
                onChange={(e) => setRememberDevice(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#1558A6] focus:ring-[#2B6CB0] border-[#D8E0E8]"
              />
              <label htmlFor="remember" className="text-xs text-[#1F2937] font-medium">
                Remember this device for official session
              </label>
            </div>

            {/* Primary Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-md font-bold text-xs bg-[#1558A6] hover:bg-[#0F4482] text-white w-full flex items-center justify-center gap-2 shadow-2xs border border-[#1558A6] cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>{isSubmitting ? 'Authenticating Officer...' : 'SIGN IN'}</span>
            </button>

            {/* Secondary Button */}
            <Link
              to="/signin"
              className="px-4 py-2 rounded-md font-semibold text-xs bg-white text-[#1558A6] border border-[#1558A6] hover:bg-[#EAF3FB] w-full flex items-center justify-center gap-2 transition-all"
            >
              <span>BACK TO ROLE SELECTION</span>
            </Link>

          </form>

        </div>

        {/* Security Notice Box */}
        <div className="p-3.5 bg-white border border-[#D8E0E8] rounded-md text-center text-xs text-[#1558A6] font-mono flex items-center justify-center gap-2 shadow-2xs">
          <Lock className="w-3.5 h-3.5 text-[#1558A6] shrink-0" />
          <span>Security Notice: Authorized official access log recorded & monitored.</span>
        </div>

        {/* Forgot Password Modal */}
        {showForgotModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-sm w-full p-5 space-y-4 shadow-xl border border-[#D8E0E8] relative">
              <button
                onClick={() => setShowForgotModal(false)}
                className="absolute top-4 right-4 p-1 rounded text-[#64748B] hover:text-[#1558A6]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded bg-[#EAF3FB] text-[#1558A6] border border-[#BCD7F2]">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1558A6] text-sm">Credential Support</h3>
                  <p className="text-[11px] text-[#64748B] font-mono">Official Officer Recovery</p>
                </div>
              </div>

              <p className="text-[#1F2937] text-xs leading-relaxed">
                To reset credentials for official ID <strong>{officialId}</strong>, please submit a token request to your State Nodal Administrator or Ministry IT Nodal Desk.
              </p>

              <button
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-2 rounded-md font-bold text-xs bg-[#1558A6] text-white w-full cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
};
