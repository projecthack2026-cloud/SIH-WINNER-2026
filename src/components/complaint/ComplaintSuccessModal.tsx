import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Complaint } from '../../types/complaint';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Search, 
  Lock
} from 'lucide-react';

interface Props {
  complaint: Complaint;
  onClose: () => void;
}

export const ComplaintSuccessModal: React.FC<Props> = ({ complaint, onClose }) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopyId = () => {
    navigator.clipboard.writeText(complaint.complaintId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTrackNow = () => {
    navigate(`/report/track?id=${complaint.complaintId}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 text-center animate-fadeIn">
        
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Report Submitted Successfully
          </h2>
          <p className="text-slate-600 text-sm">
            Your report has been securely registered in the MPLADS AI Monitoring system.
          </p>
        </div>

        {/* Highlighted Complaint ID Box */}
        <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Official Complaint Tracking ID
          </span>
          <div className="flex items-center justify-center gap-3">
            <span className="text-xl sm:text-2xl font-extrabold font-mono text-amber-400">
              {complaint.complaintId}
            </span>
            <button
              onClick={handleCopyId}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              title="Copy Complaint ID"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          {copied && <p className="text-[11px] text-emerald-400 font-mono">Copied to clipboard!</p>}
        </div>

        {/* Protection & Verification Status Badges */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5 text-xs text-left">
          <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
            <span className="text-slate-600 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600" /> Identity Protection:
            </span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Active ({complaint.anonymousCitizenId})
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
            <span className="text-slate-600">Evidence Status:</span>
            <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {complaint.evidenceVerificationStatus}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-600">Current Status:</span>
            <span className="font-bold text-slate-800 bg-slate-200 px-2 py-0.5 rounded">
              {complaint.complaintStatus}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleTrackNow}
            className="btn btn-primary btn-block btn-lg flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span>Track Complaint Live Status</span>
          </button>

          <button
            onClick={onClose}
            className="btn btn-ghost btn-block text-slate-600 text-sm"
          >
            Back to Home Page
          </button>
        </div>

      </div>
    </div>
  );
};
