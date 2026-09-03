import React, { useState } from 'react';
import type { EvidenceFile, EvidenceVerificationStatus } from '../../types/complaint';
import { simulateAiEvidenceCheck } from '../../data/mockData';
import { AiEvidenceStatusCard } from './AiEvidenceStatusCard';
import { UploadCloud, Image as ImageIcon, Trash2, Sparkles, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Props {
  evidence: EvidenceFile[];
  evidenceVerificationStatus: EvidenceVerificationStatus;
  onChange: (evidenceList: EvidenceFile[], status: EvidenceVerificationStatus) => void;
}

export const EvidenceUploadStep: React.FC<Props> = ({
  evidence,
  evidenceVerificationStatus,
  onChange
}) => {
  const { t } = useLanguage();
  const [analyzing, setAnalyzing] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setAnalyzing(true);
    const file = files[0];
    const objectUrl = URL.createObjectURL(file);

    setTimeout(() => {
      setAnalyzing(false);
      const aiResult = simulateAiEvidenceCheck(file);
      const newFile: EvidenceFile = {
        id: `ev-${Date.now()}`,
        name: file.name,
        url: objectUrl,
        type: file.type,
        size: file.size,
        aiCheckResults: aiResult
      };

      const updated = [...evidence, newFile];
      onChange(updated, aiResult.status);
    }, 1000);
  };

  const handleAddSampleEvidence = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      const sampleFile: EvidenceFile = {
        id: `ev-sample-${Date.now()}`,
        name: 'infrastructure_site_defect.jpg',
        url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80',
        type: 'image/jpeg',
        size: 2850000,
        aiCheckResults: {
          metadataConsistent: true,
          manipulationRisk: 'Low',
          aiGeneratedRisk: 'Low',
          locationConsistent: true,
          confidenceScore: 94,
          notes: [
            'EXIF timestamp matches report timeline.',
            'Mobile camera lens geometry verified.',
            'Metadata location corresponds with district record.'
          ]
        }
      };

      const updated = [...evidence, sampleFile];
      onChange(updated, 'Verified / Low Concern');
    }, 800);
  };

  const handleRemove = (id: string) => {
    const updated = evidence.filter(e => e.id !== id);
    const nextStatus = updated.length === 0 ? 'Unable to Verify' : evidenceVerificationStatus;
    onChange(updated, nextStatus);
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-[#D9E0E7] pb-3">
        <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase">{t.reportForm.step5}</span>
        <h2 className="text-base font-bold text-[#123B6D]">{t.reportForm.step5Heading}</h2>
        <p className="text-[#1F2937] text-xs mt-0.5">
          {t.reportForm.step5Subtitle}
        </p>
      </div>

      <div className="space-y-4">
        
        {/* Upload Box */}
        <div className="border-2 border-dashed border-[#D9E0E7] rounded p-6 bg-white text-center space-y-3 hover:border-[#1E5AA8] transition-colors relative">
          
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="p-2.5 rounded-full bg-[#EAF3FB] text-[#1E5AA8] w-fit mx-auto">
            <UploadCloud className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-[#1F2937]">
              {t.reportForm.uploadPhoto}
            </p>
            <p className="text-[11px] text-[#64748B] font-mono">
              {t.reportForm.uploadFormats}
            </p>
          </div>

          <div className="pt-1">
            <button
              type="button"
              onClick={handleAddSampleEvidence}
              disabled={analyzing}
              className="px-3 py-1.5 rounded font-semibold text-xs bg-[#F5F7F9] hover:bg-[#EAF3FB] text-[#123B6D] border border-[#D9E0E7] inline-flex items-center gap-1.5 z-10 relative"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#1E5AA8]" />
              <span>{analyzing ? t.reportForm.inspectingFile : t.reportForm.attachSample}</span>
            </button>
          </div>

        </div>

        {/* Upload progress state */}
        {analyzing && (
          <div className="p-3 bg-[#EAF3FB] border border-[#BCD7F2] rounded flex items-center justify-center gap-2 text-[#123B6D] text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-[#1E5AA8] animate-spin" />
            <span>{t.reportForm.inspectingFile}</span>
          </div>
        )}

        {/* Attached files list */}
        {evidence.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-bold text-[#123B6D] text-xs uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <ImageIcon className="w-4 h-4 text-[#1E5AA8]" />
              <span>{t.reportForm.attachedEvidence} ({evidence.length})</span>
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {evidence.map((item) => (
                <div key={item.id} className="bg-white rounded border border-[#D9E0E7] p-3.5 space-y-3 shadow-2xs">
                  
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-12 h-12 rounded border border-[#D9E0E7] object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#123B6D] truncate max-w-xs">{item.name}</p>
                        <p className="text-[10px] text-[#64748B] font-mono">{(item.size / (1024 * 1024)).toFixed(2)} MB</p>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-[#EAF3FB] text-[#123B6D] border border-[#BCD7F2]">
                          {t.reportForm.photoVerified}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="p-1 rounded text-[#64748B] hover:text-rose-700 hover:bg-rose-50"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {item.aiCheckResults && (
                    <AiEvidenceStatusCard
                      status={item.aiCheckResults.manipulationRisk === 'Low' ? 'Verified / Low Concern' : 'Review Required'}
                      confidenceScore={item.aiCheckResults.confidenceScore}
                      notes={item.aiCheckResults.notes}
                    />
                  )}

                </div>
              ))}
            </div>
          </div>
        )}

        {evidence.length === 0 && !analyzing && (
          <div className="p-2.5 bg-[#F5F7F9] border border-[#D9E0E7] rounded text-xs text-[#64748B] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#123B6D] shrink-0" />
            <span>{t.reportForm.reqEvidenceAlert}</span>
          </div>
        )}

      </div>
    </div>
  );
};
