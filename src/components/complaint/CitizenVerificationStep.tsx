import React, { useState } from 'react';
import { generateCitizenId } from '../../data/mockData';
import { ShieldCheck, EyeOff, Phone, KeyRound, Eye, Lock } from 'lucide-react';

interface Props {
  citizenId: string;
  isVerified: boolean;
  onVerify: (citizenId: string) => void;
}

export const CitizenVerificationStep: React.FC<Props> = ({
  citizenId,
  isVerified,
  onVerify
}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = () => {
    if (mobileNumber.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
    }, 600);
  };

  const handleVerifyOtp = () => {
    if (otpCode.length < 4) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const generatedId = citizenId || generateCitizenId();
      onVerify(generatedId);
    }, 600);
  };

  return (
    <div className="space-y-4">
      
      {/* Section Header */}
      <div className="border-b border-[#D9E0E7] pb-3">
        <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase">STEP 4 OF 5</span>
        <h2 className="text-base font-bold text-[#123B6D]">Identity Protection & Citizen Verification</h2>
        <p className="text-[#64748B] text-xs mt-0.5">
          Your identity is verified separately and is not exposed to the authority handling the complaint.
        </p>
      </div>

      {!isVerified ? (
        <div className="bg-white rounded border border-[#D9E0E7] p-5 space-y-4 shadow-2xs">
          
          <div className="flex items-center gap-3 bg-[#EAF3FB] border border-[#BCD7F2] rounded p-3.5 text-[#123B6D]">
            <Lock className="w-5 h-5 text-[#1E5AA8] shrink-0" />
            <div className="text-xs space-y-0.5">
              <p className="font-bold text-[#123B6D]">Identity Protection Notice</p>
              <p className="text-[#1F2937]">
                Your phone number is used strictly to verify citizen authenticity. It is encrypted in isolation and will NEVER be shared with District Authorities.
              </p>
            </div>
          </div>

          <div className="max-w-md mx-auto space-y-3 pt-1">
            {!otpSent ? (
              <div className="space-y-3">
                <div className="form-group">
                  <label className="form-label flex items-center gap-1.5 text-xs font-bold text-[#123B6D]">
                    <Phone className="w-3.5 h-3.5 text-[#1E5AA8]" />
                    <span>Mobile Number for Verification *</span>
                  </label>
                  <div className="flex gap-2">
                    <span className="px-3 py-2 bg-[#F5F7F9] border border-[#D9E0E7] rounded text-xs font-bold text-[#475569] flex items-center">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter 10-digit mobile number"
                      className="form-input text-xs"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={mobileNumber.length < 10 || loading}
                  className="px-4 py-2 rounded font-bold text-xs bg-[#123B6D] hover:bg-[#0d2c52] text-white w-full transition-all disabled:opacity-50"
                >
                  {loading ? 'Sending OTP...' : 'Send Verification OTP'}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-2.5 bg-[#EAF3FB] border border-[#BCD7F2] rounded text-xs text-[#123B6D] flex justify-between items-center">
                  <span>OTP sent to +91 ******{mobileNumber.slice(-4)}</span>
                  <button onClick={() => setOtpSent(false)} className="text-[#1E5AA8] font-bold underline">Change</button>
                </div>

                <div className="form-group">
                  <label className="form-label flex items-center gap-1.5 text-xs font-bold text-[#123B6D]">
                    <KeyRound className="w-3.5 h-3.5 text-[#1E5AA8]" />
                    <span>Enter 4-Digit Verification OTP * (Demo Code: 1234)</span>
                  </label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="1234"
                    className="form-input text-center text-sm font-mono tracking-widest"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={otpCode.length < 4 || loading}
                  className="px-4 py-2 rounded font-bold text-xs bg-[#123B6D] hover:bg-[#0d2c52] text-white w-full transition-all disabled:opacity-50"
                >
                  {loading ? 'Verifying Identity...' : 'Confirm Verification & Mask Identity'}
                </button>
              </div>
            )}
          </div>

        </div>
      ) : (
        /* Verified Identity Protection Box */
        <div className="bg-white border border-[#D9E0E7] rounded p-4 space-y-4 shadow-2xs">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#D9E0E7] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded bg-[#123B6D] text-white shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#123B6D]">Identity Protection Panel</h3>
                <p className="text-xs text-[#64748B]">Your identity is verified separately and is not exposed to the authority handling the complaint.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="bg-[#F5F7F9] p-2.5 rounded border border-[#D9E0E7]">
              <span className="text-[#64748B] block text-[10px]">Citizen Verification</span>
              <span className="font-bold text-emerald-700 text-xs">VERIFIED</span>
            </div>
            <div className="bg-[#EAF3FB] p-2.5 rounded border border-[#BCD7F2]">
              <span className="text-[#64748B] block text-[10px]">Identity Status</span>
              <span className="font-bold text-[#123B6D] text-xs">PROTECTED</span>
            </div>
            <div className="bg-[#F5F7F9] p-2.5 rounded border border-[#D9E0E7]">
              <span className="text-[#64748B] block text-[10px]">Anonymous ID</span>
              <span className="font-bold text-[#123B6D] text-xs">{citizenId || 'MPL-CMP-2026-001284'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="bg-[#F5F7F9] p-3 rounded border border-[#D9E0E7] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#123B6D]">
                <Eye className="w-3.5 h-3.5 text-[#1E5AA8]" />
                <span>Visible to Authority:</span>
              </div>
              <ul className="space-y-1 text-[#64748B] list-disc pl-4 text-[11px]">
                <li>Anonymous ID: <strong className="font-mono text-[#123B6D]">{citizenId}</strong></li>
                <li>Verified location, description & uploaded evidence</li>
                <li>Citizen Status: <span className="text-emerald-700 font-bold">VERIFIED CITIZEN</span></li>
              </ul>
            </div>

            <div className="bg-[#123B6D] text-white p-3 rounded border border-[#123B6D] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#EAF3FB]">
                <EyeOff className="w-3.5 h-3.5 text-[#EAF3FB]" />
                <span>Protected / Hidden Data:</span>
              </div>
              <ul className="space-y-1 text-[#EAF3FB] list-disc pl-4 text-[11px]">
                <li>Mobile number and contact person name</li>
                <li>Device IP address or credentials</li>
              </ul>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
