import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { StakeholderRole } from '../../types/auth';
import { UserCheck } from 'lucide-react';

export const DemoRoleSwitcher: React.FC = () => {
  const { user, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  const roleOptions: { id: StakeholderRole; label: string; scope: string; path: string }[] = [
    { id: 'mp', label: 'Member of Parliament (MP)', scope: 'Constituency', path: '/mp/dashboard' },
    { id: 'district', label: 'District Authority', scope: 'District', path: '/district/dashboard' },
    { id: 'state', label: 'State Nodal Authority', scope: 'State', path: '/state/dashboard' },
    { id: 'ministry', label: 'Ministry / MoSPI', scope: 'National', path: '/ministry/dashboard' },
    { id: 'admin', label: 'System Administrator', scope: 'Platform', path: '/admin/dashboard' },
  ];

  const handleSelectRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value as StakeholderRole;
    switchDemoRole(selectedId);
    const target = roleOptions.find(r => r.id === selectedId);
    if (target) {
      navigate(target.path);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-[#EAF3FB] text-[#123B6D] px-2.5 py-1 rounded border border-[#BCD7F2] text-xs font-mono">
      <UserCheck className="w-3.5 h-3.5 text-[#1E5AA8] shrink-0" />
      <span className="hidden md:inline font-semibold text-[#123B6D]">Demo Role:</span>
      
      <select
        value={user?.role || 'mp'}
        onChange={handleSelectRole}
        className="bg-transparent text-[#123B6D] font-bold focus:outline-none cursor-pointer pr-1"
      >
        {roleOptions.map((r) => (
          <option key={r.id} value={r.id} className="bg-white text-[#1F2937] font-sans">
            {r.label} ({r.scope})
          </option>
        ))}
      </select>
    </div>
  );
};
