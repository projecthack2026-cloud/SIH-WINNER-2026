import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppShell } from '../../components/dashboard/AppShell';
import { INITIAL_COMPLAINTS } from '../../data/mockData';
import { ArrowLeft, ShieldCheck, UserCheck } from 'lucide-react';

export const DistrictComplaintDetailPage: React.FC = () => {
  const { complaintId } = useParams<{ complaintId: string }>();
  const navigate = useNavigate();

  const complaint = INITIAL_COMPLAINTS.find(c => c.complaintId === complaintId) || INITIAL_COMPLAINTS[0];
  const [status, setStatus] = useState(complaint.complaintStatus);

  const handleUpdateStatus = (newStatus: typeof status) => {
    setStatus(newStatus);
    alert(`Complaint ${complaint.complaintId} status updated to: ${newStatus}`);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/district/complaints')}
          className="btn btn-outline btn-sm text-xs flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Complaints List</span>
        </button>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-700">{complaint.complaintId}</span>
                <span className="badge badge-success text-xs font-bold">{status}</span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 mt-1">{complaint.category} Issue</h1>
            </div>

            <div className="bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Identity Protected Layer</span>
            </div>
          </div>

          {/* Citizen Privacy Banner */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Citizen Verification:</span>
              <span className="font-mono font-bold text-slate-900">{complaint.anonymousCitizenId} ({complaint.citizenVerificationStatus})</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Geotagged Location:</span>
              <span className="font-bold text-slate-900">{complaint.landmark || complaint.locality}, {complaint.district}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Submitted Date:</span>
              <span className="text-slate-800">{new Date(complaint.submittedAt).toLocaleString()}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 text-xs">
            <span className="font-bold text-slate-900 uppercase tracking-wider block">Report Description:</span>
            <p className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed text-sm">
              {complaint.description}
            </p>
          </div>

          {/* AI Evidence Assessment */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" /> AI Photo Evidence Assessment
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px]">Metadata Status</span>
                <p className="font-bold text-emerald-400 mt-0.5">EXIF Verified</p>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px]">Pixel Integrity</span>
                <p className="font-bold text-emerald-400 mt-0.5">94% Authentic</p>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px]">AI Generative Risk</span>
                <p className="font-bold text-emerald-400 mt-0.5">Low (&lt;3.2%)</p>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px]">Geospatial Match</span>
                <p className="font-bold text-emerald-400 mt-0.5">Exact Match</p>
              </div>
            </div>
          </div>

          {/* Workflow Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <span className="font-bold text-slate-900 text-xs block">Official Administrative Actions:</span>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleUpdateStatus('Under Investigation')}
                className="btn btn-secondary btn-sm text-xs"
              >
                Forward to Field Inspector
              </button>
              <button
                onClick={() => handleUpdateStatus('Resolved')}
                className="btn btn-primary btn-sm text-xs bg-emerald-700 hover:bg-emerald-800 text-white"
              >
                Mark Complaint Resolved
              </button>
              <button
                onClick={() => handleUpdateStatus('Rejected')}
                className="btn btn-outline btn-sm text-xs text-rose-600 border-rose-200 hover:bg-rose-50"
              >
                Reject Report with Reason
              </button>
            </div>
          </div>

        </div>
      </div>
    </AppShell>
  );
};
