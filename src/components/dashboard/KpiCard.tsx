import React from 'react';
import type { DashboardKpi } from '../../types/dashboard';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Props {
  kpi: DashboardKpi;
  icon?: React.ElementType;
}

export const KpiCard: React.FC<Props> = ({ kpi, icon: Icon }) => {
  return (
    <div className="bg-white rounded-lg p-5 border border-[#D8E0E8] shadow-xs hover:border-[#1558A6] transition-all space-y-3 flex flex-col justify-between">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[11px] font-bold font-mono text-[#64748B] uppercase tracking-wider block">
            {kpi.title}
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#1558A6] tracking-tight">
            {kpi.value}
          </p>
        </div>

        {Icon && (
          <div className="p-2.5 rounded-md bg-[#EAF3FB] text-[#1558A6] border border-[#BCD7F2] shrink-0">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(kpi.change || kpi.description) && (
        <div className="pt-2.5 border-t border-[#D8E0E8] flex items-center justify-between text-xs">
          {kpi.change && (
            <span className={`flex items-center gap-1 font-bold ${
              kpi.trend === 'up' ? 'text-[#16805C]' : kpi.trend === 'down' ? 'text-[#C0392B]' : 'text-[#64748B]'
            }`}>
              {kpi.trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
              {kpi.trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
              {kpi.trend === 'neutral' && <Minus className="w-3.5 h-3.5" />}
              {kpi.change}
            </span>
          )}
          {kpi.description && (
            <span className="text-[#64748B] font-medium truncate text-[11px]">{kpi.description}</span>
          )}
        </div>
      )}
    </div>
  );
};
