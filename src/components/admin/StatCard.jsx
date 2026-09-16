import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export function StatCard({
  title,
  value,
  change,
  trend = 'up',
  period = '',
  icon: Icon,
  variant = 'default',
  highlight = false,
  onClick,
}) {
  const getTrendIcon = () => {
    if (trend === 'up') return <ArrowUpRight className="w-3 h-3 shrink-0" />;
    if (trend === 'down') return <ArrowDownRight className="w-3 h-3 shrink-0" />;
    return <Minus className="w-3 h-3 shrink-0" />;
  };

  const getTrendColor = () => {
    if (variant === 'danger') return 'text-rose-600 bg-rose-50';
    if (variant === 'warning') return 'text-amber-700 bg-amber-50';
    if (trend === 'up') return 'text-emerald-700 bg-emerald-50';
    if (trend === 'down') return 'text-rose-600 bg-rose-50';
    return 'text-slate-600 bg-slate-100';
  };

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 hover:border-slate-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-200 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 flex-1 min-w-0">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block truncate">
            {title}
          </span>
          <div className="text-2xl font-black text-slate-900 tracking-tight truncate">
            {value}
          </div>
        </div>

        {Icon && (
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
              highlight
                ? 'bg-orange-50 text-[#F97316]'
                : variant === 'danger'
                ? 'bg-rose-50 text-rose-600'
                : 'bg-slate-50 text-slate-700 border border-slate-100'
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(change || period) && (
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-1.5 min-w-0">
          {change && (
            <span
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md font-bold text-[10px] whitespace-nowrap shrink-0 ${getTrendColor()}`}
            >
              {getTrendIcon()}
              <span>{change}</span>
            </span>
          )}
          {period && (
            <span className="text-slate-400 font-medium text-[10px] truncate min-w-0 flex-1">
              {period}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default StatCard;
