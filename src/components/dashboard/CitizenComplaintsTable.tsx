import React, { useState } from 'react';
import type { Complaint } from '../../types/complaint';
import { INITIAL_COMPLAINTS } from '../../data/mockData';
import { ShieldCheck, Eye, Lock } from 'lucide-react';

export const CitizenComplaintsTable: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  const handleUpdateStatus = (id: string, newStatus: Complaint['complaintStatus']) => {
    setComplaints(prev => prev.map(c => c.complaintId === id ? { ...c, complaintStatus: newStatus } : c));
    if (selectedComplaint && selectedComplaint.complaintId === id) {
      setSelectedComplaint(prev => prev ? { ...prev, complaintStatus: newStatus } : null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
      
      {/* Table Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="font-extrabold text-slate-900 text-base">District Citizen Complaints Desk</h3>
          <p className="text-xs text-slate-500">
            Citizen identity is strictly isolated and replaced with encrypted pseudonyms (DPDP Compliant).
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Identity Layer Protected</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
              <th className="p-3">Complaint ID</th>
              <th className="p-3">Citizen Pseudonym</th>
              <th className="p-3">Issue Category</th>
              <th className="p-3">Location</th>
              <th className="p-3">Verification</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {complaints.map((c) => (
              <tr key={c.complaintId} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-mono font-bold text-blue-800">{c.complaintId}</td>
                <td className="p-3">
                  <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                    {c.anonymousCitizenId}
                  </span>
                  <span className="text-[10px] text-slate-400 block flex items-center gap-1 mt-0.5">
                    <Lock className="w-3 h-3 text-emerald-600" /> Identity Masked
                  </span>
                </td>
                <td className="p-3 font-semibold text-slate-900">{c.category}</td>
                <td className="p-3 text-slate-700">{c.district}, {c.state}</td>
                <td className="p-3">
                  <span className="badge badge-success text-[10px] font-bold">
                    {c.citizenVerificationStatus}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`badge ${
                    c.complaintStatus === 'Resolved' ? 'badge-success' : c.complaintStatus === 'Under Investigation' ? 'badge-warning' : 'badge-info'
                  } text-[10px] font-bold`}>
                    {c.complaintStatus}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => setSelectedComplaint(c)}
                    className="btn btn-outline btn-sm text-[11px] py-1 px-2.5 inline-flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Review</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Complaint Detail & Workflow Drawer Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl border border-slate-200 relative my-8 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-blue-700">{selectedComplaint.complaintId}</span>
                <h3 className="font-extrabold text-slate-900 text-lg">{selectedComplaint.category}</h3>
              </div>
              <span className="badge badge-success text-xs">{selectedComplaint.complaintStatus}</span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Anonymous ID:</span>
                <span className="font-mono font-bold text-slate-900">{selectedComplaint.anonymousCitizenId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Geotagged Location:</span>
                <span className="font-bold text-slate-900">{selectedComplaint.landmark || selectedComplaint.locality}, {selectedComplaint.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Submitted Date:</span>
                <span className="text-slate-800">{new Date(selectedComplaint.submittedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <span className="font-bold text-slate-900 block">Citizen Description:</span>
              <p className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed">
                {selectedComplaint.description}
              </p>
            </div>

            {/* Workflow Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 block">Update Official Workflow Status:</span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedComplaint.complaintId, 'Under Investigation')}
                  className="btn btn-secondary btn-sm text-xs"
                >
                  Forward for Field Audit
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedComplaint.complaintId, 'Resolved')}
                  className="btn btn-primary btn-sm text-xs bg-emerald-700 hover:bg-emerald-800 text-white"
                >
                  Mark as Resolved
                </button>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="btn btn-outline btn-sm text-xs"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
