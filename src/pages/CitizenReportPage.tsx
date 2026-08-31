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

export const CitizenReportPage: React.FC = () => {
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

  // Progress Steps (Prompt Specs)
  const steps = [
    { num: 1, title: 'Details' },
    { num: 2, title: 'Location' },
    { num: 3, title: 'Description' },
    { num: 4, title: 'Evidence' },
    { num: 5, title: 'Submit' }
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
        setErrorMsg('Please select an infrastructure issue category.');
        return false;
      }
    }

    if (currentStep === 2) {
      if (!state || !district || !locality.trim()) {
        setErrorMsg('Please select State, District and enter Locality/Village name.');
        return false;
      }
    }

    if (currentStep === 3) {
      if (!description.trim() || description.length < 15) {
        setErrorMsg('Please provide a detailed description of the problem (at least 15 characters).');
        return false;
      }
    }

    if (currentStep === 4) {
      if (!isCitizenVerified || !citizenId) {
        setErrorMsg('Please complete private citizen verification.');
        return false;
      }
    }

    if (currentStep === 5) {
      if (evidence.length === 0) {
        setErrorMsg('At least one photo or video evidence file is required.');
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

  const handleSubmit = () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const newComplaint: Complaint = {
        complaintId: generateComplaintId(),
        anonymousCitizenId: citizenId,
        category: category!,
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
    <main className="min-h-screen py-8 bg-[#F5F7F9]">
      <div className="container max-w-4xl space-y-5">
        
        {/* Page Header (White background, thin grey border - Prompt Specs) */}
        <div className="bg-white rounded p-5 border border-[#D9E0E7] space-y-3 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="px-2.5 py-0.5 rounded text-[10px] uppercase font-bold bg-[#123B6D] text-white font-mono">
                Official Application Form
              </span>
              <h1 className="text-2xl font-extrabold text-[#123B6D] tracking-tight mt-1">
                Report an Infrastructure Issue
              </h1>
              <p className="text-[#64748B] text-xs mt-0.5">
                Help us identify damaged, incomplete, delayed or improperly executed public infrastructure work.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/report"
                className="px-3 py-1.5 rounded text-xs font-bold bg-[#123B6D] text-white hover:bg-[#0d2c52]"
              >
                Report Issue
              </Link>
              <Link
                to="/report/track"
                className="px-3 py-1.5 rounded text-xs font-bold bg-white text-[#123B6D] border border-[#123B6D] hover:bg-[#EAF3FB] flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Track Complaint</span>
              </Link>
            </div>
          </div>

          {/* Privacy Information Box */}
          <div className="p-3 bg-[#EAF3FB] border border-[#BCD7F2] rounded text-xs text-[#123B6D] flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-[#1E5AA8] shrink-0" />
            <div>
              <strong className="font-bold">Your identity is protected.</strong> Verified citizen reporting helps reduce fake and duplicate complaints while ensuring confidentiality.
            </div>
          </div>
        </div>

        {/* Step Progress Indicator (1 Details → 2 Location → 3 Description → 4 Evidence → 5 Submit - Prompt Specs) */}
        <div className="bg-white rounded p-3 border border-[#D9E0E7] shadow-2xs">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((s, idx) => (
              <div key={s.num} className="flex items-center">
                <div className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs font-mono transition-colors ${
                    currentStep === s.num
                      ? 'bg-[#123B6D] text-white'
                      : currentStep > s.num
                      ? 'bg-[#1E5AA8] text-white'
                      : 'bg-[#F5F7F9] text-[#64748B] border border-[#D9E0E7]'
                  }`}>
                    {currentStep > s.num ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.num}
                  </div>
                  <span className={`text-xs font-bold ${
                    currentStep === s.num ? 'text-[#123B6D]' : 'text-[#64748B]'
                  }`}>
                    {s.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <span className="text-[#94A3B8] mx-2 text-xs font-mono">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Validation Error Alert (Red ONLY for genuine error - Prompt Specs) */}
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800 text-xs font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Body Container */}
        <div className="bg-white rounded p-5 border border-[#D9E0E7] shadow-2xs space-y-5">
          
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

          {/* Buttons: Dark Navy Blue Primary, White/Navy Secondary (Prompt Specs) */}
          <div className="pt-4 border-t border-[#D9E0E7] flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1 || isSubmitting}
              className="px-3.5 py-1.5 rounded font-semibold text-xs bg-white text-[#123B6D] border border-[#D9E0E7] hover:bg-[#F5F7F9] flex items-center gap-1 disabled:opacity-40"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Step</span>
            </button>

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 rounded font-bold text-xs bg-[#123B6D] hover:bg-[#0d2c52] text-white flex items-center gap-1.5"
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-5 py-2 rounded font-bold text-xs bg-[#123B6D] hover:bg-[#0d2c52] text-white flex items-center gap-1.5 shadow-2xs"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting Form...' : 'Submit Official Complaint'}</span>
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
