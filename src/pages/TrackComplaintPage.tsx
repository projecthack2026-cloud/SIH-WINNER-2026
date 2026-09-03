import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getStoredComplaints } from '../data/mockData';
import type { Complaint } from '../types/complaint';
import { 
  Search, 
  Clock, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TrackComplaintPage: React.FC = () => {
  const { t, tStatus } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('id') || '';
  
  const [complaintIdInput, setComplaintIdInput] = useState(initialQuery);
  const [searchedComplaint, setSearchedComplaint] = useState<Complaint | null>(null);
  const [notFound, setNotFound] = useState(false);

  const displayTimelineSteps = [
    t.track.statusSubmitted,
    t.track.statusUnderReview,
    t.track.statusAssigned,
    t.track.statusInProgress,
    t.track.statusResolved,
    t.track.statusClosed
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

  const getCurrentTimelineStepIndex = (status: string): number => {
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
            {t.track.badge}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1558A6] tracking-tight">
            {t.track.title}
          </h1>
          <p className="text-[#64748B] text-xs sm:text-sm max-w-xl mx-auto">
            {t.track.subtitle}
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
                placeholder={t.track.inputPlaceholder}
                className="form-input pl-10 text-xs font-mono uppercase"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-md font-bold text-xs bg-[#1558A6] hover:bg-[#0F4482] text-white flex items-center justify-center gap-1.5 shrink-0 shadow-2xs border border-[#1558A6] cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{t.track.btnTrack}</span>
            </button>
          </form>

          {/* Quick Demo Pre-fill */}
          <div className="flex items-center gap-2 text-xs text-[#64748B] pt-2 border-t border-[#D8E0E8] flex-wrap font-mono">
            <span>{t.track.sampleIds}</span>
            <button
              type="button"
              onClick={() => {
                setComplaintIdInput('MPL-CMP-2026-001284');
                handleSearch('MPL-CMP-2026-001284');
              }}
              className="px-2 py-0.5 rounded bg-[#F5F7F9] hover:bg-[#EAF3FB] text-[#1558A6] font-bold border border-[#D8E0E8]"
            >
              MPL-CMP-2026-001284
            </button>
            <button
              type="button"
              onClick={() => {
                setComplaintIdInput('MPL-CMP-2026-000912');
                handleSearch('MPL-CMP-2026-000912');
              }}
              className="px-2 py-0.5 rounded bg-[#F5F7F9] hover:bg-[#EAF3FB] text-[#1558A6] font-bold border border-[#D8E0E8]"
            >
              MPL-CMP-2026-000912
            </button>
          </div>
        </div>

        {/* Not Found Alert */}
        {notFound && (
          <div className="p-5 bg-white rounded-lg border border-[#D8E0E8] text-center space-y-2">
            <div className="p-2 rounded-full bg-[#FEF2F2] text-[#C0392B] w-fit mx-auto border border-[#FECACA]">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#C0392B] text-sm">{t.track.notFoundTitle} ({complaintIdInput})</h3>
            <p className="text-[#64748B] text-xs max-w-md mx-auto">
              {t.track.notFoundDesc}
            </p>
          </div>
        )}

        {/* Found Complaint Status View */}
        {searchedComplaint && (
          <div className="space-y-4">
            
            <div className="bg-white rounded-lg p-6 border border-[#D8E0E8] shadow-xs space-y-5">
              
              {/* Summary Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#D8E0E8] pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#64748B] block uppercase font-bold">COMPLAINT RECORD</span>
                  <h2 className="text-xl font-black font-mono text-[#1558A6]">
                    {searchedComplaint.complaintId}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-md text-xs font-bold bg-[#EAF3FB] text-[#1558A6] border border-[#BCD7F2]">
                    {tStatus(searchedComplaint.complaintStatus)}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#F6F8FA] text-[#64748B] border border-[#D8E0E8]">
                    {t.track.verifiedCitizen}: {searchedComplaint.anonymousCitizenId}
                  </span>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1558A6] border-b border-[#D8E0E8] pb-2 font-mono">
                  {t.track.timelineTitle}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                  {displayTimelineSteps.map((stepLabel, idx) => {
                    const currentIdx = getCurrentTimelineStepIndex(searchedComplaint.complaintStatus);
                    const isPassed = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div
                        key={stepLabel}
                        className={`p-3 rounded-md border text-center space-y-1.5 transition-all ${
                          isCurrent
                            ? 'bg-[#1558A6] text-white border-[#1558A6] font-bold shadow-xs'
                            : isPassed
                            ? 'bg-[#EAF3FB] text-[#1558A6] border-[#BCD7F2] font-semibold'
                            : 'bg-[#F6F8FA] text-[#64748B] border-[#D8E0E8]'
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full mx-auto flex items-center justify-center text-[10px] font-bold border border-current">
                          {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                        </div>
                        <p className="text-[11px] leading-tight font-mono">{stepLabel}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Details Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono pt-2">
                <div className="bg-[#F6F8FA] p-4 rounded-lg border border-[#D8E0E8] space-y-2">
                  <h4 className="font-bold text-[#1558A6] uppercase tracking-wider text-[10px]">
                    Report Details
                  </h4>
                  <div className="flex justify-between border-b border-[#D8E0E8] pb-1.5">
                    <span className="text-[#64748B]">Category:</span>
                    <span className="font-bold text-[#1F2937]">{searchedComplaint.category}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#D8E0E8] pb-1.5">
                    <span className="text-[#64748B]">Location:</span>
                    <span className="font-semibold text-[#1F2937]">{searchedComplaint.locality}, {searchedComplaint.district}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#D8E0E8] pb-1.5">
                    <span className="text-[#64748B]">Submitted:</span>
                    <span className="text-[#1F2937]">{new Date(searchedComplaint.submittedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">{t.track.assignedAuthority}:</span>
                    <span className="font-bold text-[#1558A6]">{searchedComplaint.assignedAuthority}</span>
                  </div>
                </div>

                <div className="bg-[#F6F8FA] p-4 rounded-lg border border-[#D8E0E8] space-y-2">
                  <h4 className="font-bold text-[#1558A6] uppercase tracking-wider text-[10px]">
                    Verification Summary
                  </h4>
                  <div className="flex justify-between border-b border-[#D8E0E8] pb-1.5">
                    <span className="text-[#64748B]">Identity Status:</span>
                    <span className="font-bold text-[#16805C]">PROTECTED (DPDP ACT)</span>
                  </div>
                  <div className="flex justify-between border-b border-[#D8E0E8] pb-1.5">
                    <span className="text-[#64748B]">Photo Metadata:</span>
                    <span className="font-bold text-[#16805C]">{searchedComplaint.evidenceVerificationStatus}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#D8E0E8] pb-1.5">
                    <span className="text-[#64748B]">AI Risk Level:</span>
                    <span className="font-bold text-[#1558A6]">{searchedComplaint.riskLevel} Risk</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-[#F6F8FA] p-4 rounded-lg border border-[#D8E0E8] space-y-1 text-xs">
                <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase">Submitted Problem Description</span>
                <p className="text-[#1F2937] leading-relaxed">{searchedComplaint.description}</p>
              </div>

              {/* Audit Trail */}
              {searchedComplaint.updatesHistory && searchedComplaint.updatesHistory.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[#D8E0E8]">
                  <h4 className="font-bold text-[#1558A6] text-xs uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#1558A6]" />
                    <span>Audit Trail & Action History</span>
                  </h4>
                  <div className="space-y-2">
                    {searchedComplaint.updatesHistory.map((up, i) => (
                      <div key={i} className="p-2.5 bg-[#F6F8FA] rounded-md border border-[#D8E0E8] text-xs flex justify-between items-start gap-3">
                        <div className="space-y-0.5">
                          <p className="font-bold text-[#1558A6]">{tStatus(up.status)} — <span className="text-[#2B6CB0]">{up.updatedBy}</span></p>
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
