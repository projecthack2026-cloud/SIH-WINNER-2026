import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppShell } from '../../components/dashboard/AppShell';
import { RiskBreakdownCard } from '../../components/dashboard/RiskBreakdownCard';
import { ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { api, mapApiProjectToMockProject } from '../../services/api';
import type { MockProject } from '../../types/complaint';
import { useLanguage } from '../../context/LanguageContext';

export const ProjectDetailPage: React.FC = () => {
  const { t, tStatus } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<MockProject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      try {
        let numericId = parseInt(id || '0');
        if (isNaN(numericId) || numericId <= 0) {
          const matched = await api.getProjects({ search: id, limit: 1 });
          if (matched && matched.length > 0) {
            setProject(mapApiProjectToMockProject(matched[0]));
          } else {
            setError(t.projectDetail.errorText);
          }
        } else {
          const res = await api.getProjectById(numericId);
          setProject(mapApiProjectToMockProject(res));
        }
      } catch (err: any) {
        setError(t.projectDetail.errorText);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, t.projectDetail.errorText]);

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline btn-sm text-xs flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.projectDetail.backToDash}</span>
        </button>

        {loading && (
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
            <span>{t.projectDetail.loadingText}</span>
          </div>
        )}

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-900 p-4 rounded-2xl text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {project && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="badge badge-info font-mono text-xs font-bold">{t.projectDetail.canonicalIdLabel} {project.id}</span>
                <span className="badge badge-success text-xs font-bold">{tStatus(project.status)}</span>
              </div>

              <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">
                {project.title}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Category: {project.category} • Location: {project.district}, {project.state}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-semibold block">{t.projectDetail.mpConstituencyLabel}</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{project.mpName} ({project.constituency})</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-semibold block">{t.projectDetail.sanctionedAmtLabel}</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{project.sanctionedAmount}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-semibold block">{t.projectDetail.finUtilLabel}</span>
                <p className="font-bold text-blue-700 text-sm mt-0.5">{project.financialUtilization}%</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-semibold block">{t.projectDetail.physicalStatusLabel}</span>
                <p className="font-bold text-slate-700 text-xs">{t.projectDetail.physicalDataUnavailable}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-semibold block">{t.projectDetail.geoCoordsLabel}</span>
                <p className="font-bold text-slate-700 text-xs">{t.projectDetail.geoDataUnavailable}</p>
              </div>
            </div>

            <RiskBreakdownCard projectId={project.id} />
          </div>
        )}
      </div>
    </AppShell>
  );
};
