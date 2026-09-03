import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getStoredComplaints } from '../data/mockData';
import type { Complaint } from '../types/complaint';
import { 
  Search, 
  Clock, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export const TrackComplaintPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('id') || '';
  
  const [complaintIdInput, setComplaintIdInput] = useState(initialQuery);
  const [searchedComplaint, setSearchedComplaint] = useState<Complaint | null>(null);
  const [notFound, setNotFound] = useState(false);

  // Exact Timeline Steps from Prompt Specs
  const displayTimelineSteps = [
    'Submitted',
    'Evidence Verification',
    'District Review',
    'Investigation',
    'Action Taken',
    'Resolved'
  ];

  const handleSearch = (idToSearch?: string) => {
    const targetId = (idToSearch || complaintIdInput).trim();
    if (!targetId) return;

    setNotFound(false);

    const complaints = getStoredComplaints();
    const found = complaints.find(
      c => c.complaintId.toLowerCase() === targetId.toLowerCase()
    );

    if (found) {
      setSearchedComplaint(found);
    } else {
      setSearchedComplaint(null);
      setNotFound(true);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const getCurrentTimelineStepIndex = (status: string) => {
    switch (status) {
      case 'Submitted': return 0;
      case 'Under Verification': return 1;
      case 'Forwarded to District Authority': return 2;
      case 'Under Investigation': return 3;
      case 'Action Taken': return 4;
      case 'Resolved': return 5;
      default: return 1;
    }
  };

  return (
    <main className="min-h-screen py-10 bg-[#F6F8FA]">
      <div className="container max-w-4xl space-y-6">
        
        {/* Page Header */}
        <div className="bg-white rounded-lg p-6 border border-[#D8E0E8] shadow-xs space-y-2 text-center">
          <span className="px-3 py-1 rounded text-[10px] uppercase font-bold bg-[#1558A6] text-white font-mono">
            Public Inquiry System
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1558A6] tracking-tight">
            Track Infrastructure Grievance Status
          </h1>
          <p className="text-[#64748B] text-xs sm:text-sm max-w-xl mx-auto">
            Enter your unique Complaint ID to view official investigation status, assigned district authority, and resolution timeline.
          </p>
        </div>

        {/* Search Bar Input Panel */}
        <div className="bg-white rounded-lg p-6 border border-[#D8E0E8] shadow-xs space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={complaintIdInput}
                onChange={(e) => setComplaintIdInput(e.target.value)}
                placeholder="Enter Complaint ID (e.g. MPL-CMP-2026-001284)"
                className="form-input pl-10 text-xs font-mono uppercase"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-md font-bold text-xs bg-[#1558A6] hover:bg-[#0F4482] text-white flex items-center justify-center gap-1.5 shrink-0 shadow-2xs border border-[#1558A6] cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track Status</span>
            </button>
          </form>

          {/* Quick Demo Pre-fill */}
          <div className="flex items-center gap-2 text-xs text-[#64748B] pt-2 border-t border-[#D8E0E8] flex-wrap font-mono">
            <span>Sample IDs:</span>
            <button
              type="button"
              onClick={() => {
                setComplaintIdInput('MPL-CMP-2026-001284');
                handleSearch('MPL-CMP-2026-001284');
              }}
              className="px-2 py-0.5 rounded bg-[#F5F7F9] hover:bg-[#EAF3FB] text-[#123B6D] font-bold border border-[#D9E0E7]"
            >
              MPL-CMP-2026-001284
            </button>
            <button
              type="button"
              onClick={() => {
                setComplaintIdInput('MPL-CMP-2026-000912');
                handleSearch('MPL-CMP-2026-000912');
              }}
              className="px-2 py-0.5 rounded bg-[#F5F7F9] hover:bg-[#EAF3FB] text-[#123B6D] font-bold border border-[#D9E0E7]"
            >
              MPL-CMP-2026-000912
            </button>
          </div>
        </div>

        {/* Not Found Alert */}
        {notFound && (
          <div className="p-4 bg-white rounded border border-[#D9E0E7] text-center space-y-1.5">
            <div className="p-2 rounded-full bg-[#F5F7F9] text-[#123B6D] w-fit mx-auto border border-[#D9E0E7]">
              <AlertCircle className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-[#123B6D] text-xs">No Complaint Found for ID: {complaintIdInput}</h3>
            <p className="text-[#64748B] text-[11px] max-w-md mx-auto">
              Please double check the ID entered. Format: `MPL-CMP-2026-XXXXXX`.
            </p>
          </div>
        )}

        {/* Found Complaint Status View */}
        {searchedComplaint && (
          <div className="space-y-4">
            
            <div className="bg-white rounded p-5 border border-[#D9E0E7] shadow-2xs space-y-5">
              
              {/* Summary Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#D9E0E7] pb-3">
                <div>
                  <span className="text-[10px] font-mono text-[#64748B] block">COMPLAINT RECORD</span>
                  <h2 className="text-lg font-extrabold font-mono text-[#123B6D]">
                    {searchedComplaint.complaintId}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#EAF3FB] text-[#123B6D] border border-[#BCD7F2]">
                    {searchedComplaint.complaintStatus}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-[#F5F7F9] text-[#475569] border border-[#D9E0E7]">
                    ID: {searchedComplaint.anonymousCitizenId}
                  </span>
                </div>
              </div>

              {/* Status Timeline (Blue = completed/current, Grey = pending - Prompt Specs) */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#123B6D] border-b border-[#D9E0E7] pb-1.5 font-mono">
                  Complaint Status Timeline
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {displayTimelineSteps.map((stepLabel, idx) => {
                    const currentIdx = getCurrentTimelineStepIndex(searchedComplaint.complaintStatus);
                    const isPassed = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div
                        key={stepLabel}
                        className={`p-2.5 rounded border text-center space-y-1 transition-all ${
                          isCurrent
                            ? 'bg-[#123B6D] text-white border-[#123B6D] font-bold'
                            : isPassed
                            ? 'bg-[#EAF3FB] text-[#123B6D] border-[#BCD7F2] font-semibold'
                            : 'bg-[#F5F7F9] text-[#64748B] border-[#D9E0E7]'
                        }`}
                      >
                        <div className="w-4 h-4 rounded-full mx-auto flex items-center justify-center text-[10px] font-bold border border-current">
                          {isPassed ? <CheckCircle2 className="w-3 h-3" /> : idx + 1}
                        </div>
                        <p className="text-[10px] leading-tight font-mono">{stepLabel}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Details Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono pt-1">
                <div className="bg-[#F5F7F9] p-3.5 rounded border border-[#D9E0E7] space-y-1.5">
                  <h4 className="font-bold text-[#123B6D] uppercase tracking-wider text-[10px]">
                    Report Details
                  </h4>
                  <div className="flex justify-between border-b border-[#D9E0E7] pb-1">
                    <span className="text-[#64748B]">Category:</span>
                    <span className="font-bold text-[#1F2937]">{searchedComplaint.category}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#D9E0E7] pb-1">
                    <span className="text-[#64748B]">Location:</span>
                    <span className="font-semibold text-[#1F2937]">{searchedComplaint.locality}, {searchedComplaint.district}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#D9E0E7] pb-1">
                    <span className="text-[#64748B]">Submitted:</span>
                    <span className="text-[#1F2937]">{new Date(searchedComplaint.submittedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Assigned Desk:</span>
                    <span className="font-bold text-[#123B6D]">{searchedComplaint.assignedAuthority}</span>
                  </div>
                </div>

                <div className="bg-[#F5F7F9] p-3.5 rounded border border-[#D9E0E7] space-y-1.5">
                  <h4 className="font-bold text-[#123B6D] uppercase tracking-wider text-[10px]">
                    Verification Summary
                  </h4>
                  <div className="flex justify-between border-b border-[#D9E0E7] pb-1">
                    <span className="text-[#64748B]">Identity Status:</span>
                    <span className="font-bold text-[#123B6D]">PROTECTED (VERIFIED)</span>
                  </div>
                  <div className="flex justify-between border-b border-[#D9E0E7] pb-1">
                    <span className="text-[#64748B]">Evidence Status:</span>
                    <span className="font-bold text-[#123B6D]">{searchedComplaint.evidenceVerificationStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Risk Rating:</span>
                    <span className="font-bold text-[#1F2937]">{searchedComplaint.riskLevel} Risk</span>
                  </div>
                </div>
              </div>

              {/* Audit Trail */}
              {searchedComplaint.updatesHistory && searchedComplaint.updatesHistory.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[#D9E0E7]">
                  <h4 className="font-bold text-[#123B6D] text-xs uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#1E5AA8]" />
                    <span>Audit Trail & Action History</span>
                  </h4>

                  <div className="space-y-2">
                    {searchedComplaint.updatesHistory.map((up, i) => (
                      <div key={i} className="p-2.5 bg-[#F5F7F9] rounded border border-[#D9E0E7] text-xs flex justify-between items-start gap-3">
                        <div className="space-y-0.5">
                          <p className="font-bold text-[#123B6D]">{up.status} — <span className="text-[#1E5AA8]">{up.updatedBy}</span></p>
                          <p className="text-[#475569]">{up.note}</p>
                        </div>
                        <span className="text-[10px] font-mono text-[#64748B] shrink-0">
                          {new Date(up.timestamp).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </main>
  );
};
