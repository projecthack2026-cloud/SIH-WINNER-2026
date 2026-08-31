import React from 'react';
import type { DashboardKpi } from '../../types/dashboard';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Props {
  kpi: DashboardKpi;
  icon?: React.ElementType;
}

export const KpiCard: React.FC<Props> = ({ kpi, icon: Icon }) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow transition-all space-y-3 flex flex-col justify-between">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            {kpi.title}
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {kpi.value}
          </p>
        </div>

        {Icon && (
          <div className="p-3 rounded-xl bg-slate-100 text-slate-700 shrink-0">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(kpi.change || kpi.description) && (
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          {kpi.change && (
            <span className={`flex items-center gap-1 font-bold ${
              kpi.trend === 'up' ? 'text-emerald-700' : kpi.trend === 'down' ? 'text-rose-600' : 'text-slate-500'
            }`}>
              {kpi.trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
              {kpi.trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
              {kpi.trend === 'neutral' && <Minus className="w-3.5 h-3.5" />}
              {kpi.change}
            </span>
          )}
          {kpi.description && (
            <span className="text-slate-500 font-medium truncate">{kpi.description}</span>
          )}
        </div>
      )}
    </div>
  );
};
