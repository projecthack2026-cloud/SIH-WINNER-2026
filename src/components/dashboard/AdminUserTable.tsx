import React, { useState } from 'react';
import type { UserAuthSession } from '../../types/auth';
import { DEMO_USERS } from '../../data/dashboardMockData';
import { Lock, Unlock, Plus } from 'lucide-react';

export const AdminUserTable: React.FC = () => {
  const [users, setUsers] = useState<UserAuthSession[]>(Object.values(DEMO_USERS));

  const toggleLock = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.userId === userId) {
        const nextStatus = u.status === 'Locked' ? 'Active' : 'Locked';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-extrabold text-slate-900 text-base">Platform User & RBAC Management</h3>
          <p className="text-xs text-slate-500">Technical access credentials, role bindings, and geographic scope assignments</p>
        </div>
        <button
          onClick={() => alert('User Creation Wizard: Enter Official NIC Email & Assign Geographic Scope.')}
          className="btn btn-primary btn-sm text-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Provision Official User</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
              <th className="p-3">Official ID & Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Geographic Scope</th>
              <th className="p-3">Jurisdiction</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map(u => (
              <tr key={u.userId} className="hover:bg-slate-50 transition-colors">
                <td className="p-3">
                  <span className="font-mono text-[10px] text-blue-700 font-bold block">{u.officialId}</span>
                  <span className="font-bold text-slate-900">{u.name}</span>
                  <span className="text-[11px] text-slate-500 block">{u.email}</span>
                </td>
                <td className="p-3">
                  <span className="badge badge-info text-[10px] uppercase font-bold">{u.role}</span>
                </td>
                <td className="p-3 font-semibold text-slate-800">{u.scopeLevel}</td>
                <td className="p-3 text-slate-700 font-medium">{u.jurisdiction}</td>
                <td className="p-3">
                  <span className={`badge ${u.status === 'Active' ? 'badge-success' : 'badge-danger'} text-[10px] font-bold`}>
                    {u.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => toggleLock(u.userId)}
                    className={`btn btn-sm text-[11px] py-1 px-2.5 inline-flex items-center gap-1 ${
                      u.status === 'Locked' ? 'btn-secondary text-emerald-800' : 'btn-outline text-rose-700 hover:bg-rose-50'
                    }`}
                  >
                    {u.status === 'Locked' ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                    <span>{u.status === 'Locked' ? 'Unlock Account' : 'Lock Account'}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
