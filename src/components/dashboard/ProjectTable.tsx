import React, { useState } from 'react';
import type { MockProject } from '../../types/complaint';
import { Search, Eye } from 'lucide-react';

interface Props {
  projects: (MockProject & { physicalProgress?: number; financialProgress?: number; riskScore?: number })[];
  onSelectProject: (project: MockProject) => void;
  showJurisdictionCol?: boolean;
}

export const ProjectTable: React.FC<Props> = ({
  projects,
  onSelectProject,
  showJurisdictionCol = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filtered = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'All' || p.riskLevel === riskFilter;
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesRisk && matchesStatus;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
      
      {/* Table Header Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search project title, ID, or district..."
            className="form-input pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="form-select text-xs py-1.5"
          >
            <option value="All">All Risk Levels</option>
            <option value="Low">Low Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="High">High Risk</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select text-xs py-1.5"
          >
            <option value="All">All Statuses</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Delayed">Delayed</option>
            <option value="Under Review">Under Review</option>
          </select>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
              <th className="p-3">Project ID & Title</th>
              {showJurisdictionCol && <th className="p-3">Location</th>}
              <th className="p-3">Sanctioned</th>
              <th className="p-3">Physical %</th>
              <th className="p-3">Financial %</th>
              <th className="p-3">AI Risk</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3">
                  <span className="font-mono text-[10px] text-slate-400 block">{p.id}</span>
                  <span className="font-bold text-slate-900 line-clamp-1">{p.title}</span>
                  <span className="text-[11px] text-slate-500">{p.category}</span>
                </td>
                {showJurisdictionCol && (
                  <td className="p-3">
                    <span className="font-semibold text-slate-800">{p.district}</span>
                    <span className="text-slate-500 block text-[11px]">{p.state}</span>
                  </td>
                )}
                <td className="p-3 font-mono font-bold text-slate-900">
                  {p.sanctionedAmount}
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{p.physicalProgress || p.progressPercentage}%</span>
                    <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden hidden sm:block">
                      <div className="bg-blue-600 h-full" style={{ width: `${p.physicalProgress || p.progressPercentage}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <span className="font-bold text-slate-900">{p.financialProgress || p.progressPercentage}%</span>
                </td>
                <td className="p-3">
                  <span className={`badge ${
                    p.riskLevel === 'High' ? 'badge-danger' : p.riskLevel === 'Medium' ? 'badge-warning' : 'badge-success'
                  } text-[10px] font-bold`}>
                    {p.riskLevel} ({p.riskScore || 20})
                  </span>
                </td>
                <td className="p-3">
                  <span className="font-semibold text-slate-800">{p.status}</span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => onSelectProject(p)}
                    className="btn btn-outline btn-sm text-[11px] py-1 px-2.5 inline-flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-400 italic">
                  No projects match your filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
