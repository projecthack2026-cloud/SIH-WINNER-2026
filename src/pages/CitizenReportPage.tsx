import React, { useState } from 'react';
import type { IssueCategory, EvidenceFile, EvidenceVerificationStatus, Complaint } from '../types/complaint';
import { generateComplaintId, saveComplaint } from '../data/mockData';
import { IssueTypeStep } from '../components/complaint/IssueTypeStep';
import { LocationStep } from '../components/complaint/LocationStep';
import { DescriptionStep } from '../components/complaint/DescriptionStep';
import { CitizenVerificationStep } from '../components/complaint/CitizenVerificationStep';
import { EvidenceUploadStep } from '../components/complaint/EvidenceUploadStep';
import { ComplaintSuccessModal } from '../components/complaint/ComplaintSuccessModal';
import { ShieldCheck, ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle, Search, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const CitizenReportPage: React.FC = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [submittedComplaint, setSubmittedComplaint] = useState<Complaint | null>(null);

  // Form State
  const [category, setCategory] = useState<IssueCategory | null>(null);
  const [state, setState] = useState('Maharashtra');
  const [district, setDistrict] = useState('Pune');
  const [locality, setLocality] = useState('');
  const [landmark, setLandmark] = useState('');
  const [latitude, setLatitude] = useState<number | undefined>(undefined);
  const [longitude, setLongitude] = useState<number | undefined>(undefined);
  
  const [description, setDescription] = useState('');
  const [whenNoticed, setWhenNoticed] = useState(new Date().toISOString().split('T')[0]);
  const [isOngoing, setIsOngoing] = useState<'Yes' | 'No' | 'Not Sure'>('Yes');

  const [citizenId, setCitizenId] = useState('');
  const [isCitizenVerified, setIsCitizenVerified] = useState(false);

  const [evidence, setEvidence] = useState<EvidenceFile[]>([]);
  const [evidenceStatus, setEvidenceStatus] = useState<EvidenceVerificationStatus>('Unable to Verify');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Translated Steps
  const steps = [
    { num: 1, title: t.reportForm.step1 },
    { num: 2, title: t.reportForm.step2 },
    { num: 3, title: t.reportForm.step3 },
    { num: 4, title: t.reportForm.step4 },
    { num: 5, title: t.reportForm.step5 }
  ];

  const handleLocationChange = (fields: Partial<{ state: string; district: string; locality: string; landmark: string; latitude: number; longitude: number }>) => {
    if (fields.state !== undefined) setState(fields.state);
    if (fields.district !== undefined) setDistrict(fields.district);
    if (fields.locality !== undefined) setLocality(fields.locality);
    if (fields.landmark !== undefined) setLandmark(fields.landmark);
    if (fields.latitude !== undefined) setLatitude(fields.latitude);
    if (fields.longitude !== undefined) setLongitude(fields.longitude);
  };

  const handleDescriptionChange = (fields: Partial<{ description: string; whenNoticed: string; isOngoing: 'Yes' | 'No' | 'Not Sure' }>) => {
    if (fields.description !== undefined) setDescription(fields.description);
    if (fields.whenNoticed !== undefined) setWhenNoticed(fields.whenNoticed);
    if (fields.isOngoing !== undefined) setIsOngoing(fields.isOngoing);
  };

  const validateCurrentStep = (): boolean => {
    setErrorMsg(null);

    if (currentStep === 1) {
      if (!category) {
        setErrorMsg(t.reportForm.valCategoryReq);
        return false;
      }
    }

    if (currentStep === 2) {
      if (!state || !district || !locality.trim()) {
        setErrorMsg(t.reportForm.valTitleReq);
        return false;
      }
    }

    if (currentStep === 3) {
      if (!description.trim() || description.length < 15) {
        setErrorMsg(t.reportForm.valDescReq);
        return false;
      }
    }

    if (currentStep === 4) {
      if (!isCitizenVerified || !citizenId) {
        setErrorMsg(t.reportForm.valMobileReq);
        return false;
      }
    }

    if (currentStep === 5) {
      if (evidence.length === 0) {
        setErrorMsg(t.reportForm.valTitleReq);
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setErrorMsg(null);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    setTimeout(() => {
      setIsSubmitting(false);

      const generatedId = generateComplaintId();
      const newComplaint: Complaint = {
        complaintId: generatedId,
        anonymousCitizenId: citizenId || 'ANON-CITIZEN-99',
        category: category || 'Public Facility',
        description,
        whenNoticed,
        isOngoing,
        state,
        district,
        locality,
        landmark: landmark || undefined,
        latitude,
        longitude,
        submittedAt: new Date().toISOString(),
        evidence,
        citizenVerificationStatus: 'Verified Citizen',
        evidenceVerificationStatus: evidenceStatus,
        riskLevel: evidenceStatus === 'Verified / Low Concern' ? 'Low' : 'Medium',
        complaintStatus: 'Submitted',
        assignedAuthority: `District Magistrate Office, ${district}`,
        updatesHistory: [
          {
            timestamp: new Date().toISOString(),
            status: 'Submitted',
            note: 'Complaint registered by citizen with identity protection active.',
            updatedBy: 'Citizen Portal'
          }
        ]
      };

      saveComplaint(newComplaint);
      setSubmittedComplaint(newComplaint);
    }, 1000);
  };

  return (
    <main className="min-h-screen py-10 bg-[#F6F8FA]">
      <div className="container max-w-4xl space-y-6">
        
        {/* Page Header */}
        <div className="bg-white rounded-lg p-6 border border-[#D8E0E8] space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded text-[10px] uppercase font-bold bg-[#1558A6] text-white font-mono">
                {t.reportForm.pageBadge}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1558A6] tracking-tight mt-1.5">
                {t.reportForm.pageTitle}
              </h1>
              <p className="text-[#64748B] text-xs sm:text-sm mt-1">
                {t.reportForm.pageSubtitle}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <Link
                to="/report"
                className="px-3.5 py-2 rounded-md text-xs font-bold bg-[#1558A6] text-white hover:bg-[#0F4482]"
              >
                {t.nav.reportIssueBtn}
              </Link>
              <Link
                to="/report/track"
                className="px-3.5 py-2 rounded-md text-xs font-bold bg-white text-[#1558A6] border border-[#1558A6] hover:bg-[#EAF3FB] flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{t.nav.trackComplaint}</span>
              </Link>
            </div>
          </div>

          {/* Privacy Information Box */}
          <div className="p-3.5 bg-[#EAF3FB] border border-[#BCD7F2] rounded-md text-xs text-[#1558A6] flex items-center gap-3">
            <Lock className="w-4 h-4 text-[#1558A6] shrink-0" />
            <div>
              <strong className="font-bold">{t.reportForm.privacyBadge}</strong>
            </div>
          </div>
        </div>

        {/* Step Progress Indicator */}
        <div className="bg-white rounded-lg p-4 border border-[#D8E0E8] shadow-xs">
          <div className="flex items-center justify-between max-w-2xl mx-auto flex-wrap gap-2">
            {steps.map((s, idx) => (
              <div key={s.num} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs font-mono transition-colors ${
                    currentStep === s.num
                      ? 'bg-[#1558A6] text-white shadow-2xs'
                      : currentStep > s.num
                      ? 'bg-[#2B6CB0] text-white'
                      : 'bg-[#F6F8FA] text-[#64748B] border border-[#D8E0E8]'
                  }`}>
                    {currentStep > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                  </div>
                  <span className={`text-xs font-bold ${
                    currentStep === s.num ? 'text-[#1558A6]' : 'text-[#64748B]'
                  }`}>
                    {s.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <span className="text-[#94A3B8] mx-2 text-xs font-mono hidden sm:inline">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Validation Error Alert */}
        {errorMsg && (
          <div className="p-3.5 bg-[#FEF2F2] border border-[#FECACA] rounded-md text-[#C0392B] text-xs font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#C0392B] shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Body Container */}
        <div className="bg-white rounded-lg p-6 border border-[#D8E0E8] shadow-xs space-y-6">
          
          {currentStep === 1 && (
            <IssueTypeStep
              selectedCategory={category}
              onSelect={setCategory}
            />
          )}

          {currentStep === 2 && (
            <LocationStep
              state={state}
              district={district}
              locality={locality}
              landmark={landmark}
              latitude={latitude}
              longitude={longitude}
              onChange={handleLocationChange}
            />
          )}

          {currentStep === 3 && (
            <DescriptionStep
              description={description}
              whenNoticed={whenNoticed}
              isOngoing={isOngoing}
              onChange={handleDescriptionChange}
            />
          )}

          {currentStep === 4 && (
            <CitizenVerificationStep
              citizenId={citizenId}
              isVerified={isCitizenVerified}
              onVerify={(id) => {
                setCitizenId(id);
                setIsCitizenVerified(true);
              }}
            />
          )}

          {currentStep === 5 && (
            <EvidenceUploadStep
              evidence={evidence}
              evidenceVerificationStatus={evidenceStatus}
              onChange={(list, st) => {
                setEvidence(list);
                setEvidenceStatus(st);
              }}
            />
          )}

          {/* Form Action Buttons */}
          <div className="pt-4 border-t border-[#D8E0E8] flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1 || isSubmitting}
              className="px-4 py-2.5 rounded-md font-semibold text-xs bg-white text-[#1558A6] border border-[#D8E0E8] hover:bg-[#F6F8FA] flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.reportForm.btnBack}</span>
            </button>

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-md font-bold text-xs bg-[#1558A6] hover:bg-[#0F4482] text-white flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span>{t.reportForm.btnNext}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-md font-bold text-xs bg-[#1558A6] hover:bg-[#0F4482] text-white flex items-center gap-2 shadow-xs cursor-pointer border border-[#1558A6]"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isSubmitting ? t.reportForm.submitting : t.reportForm.btnSubmit}</span>
              </button>
            )}
          </div>

        </div>

        {/* Success Modal */}
        {submittedComplaint && (
          <ComplaintSuccessModal
            complaint={submittedComplaint}
            onClose={() => setSubmittedComplaint(null)}
          />
        )}

      </div>
    </main>
  );
};
