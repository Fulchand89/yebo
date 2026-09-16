import React from 'react';

export function StatusBadge({ status, className = '' }) {
  if (!status) return null;

  const normalized = String(status).toLowerCase();

  const getStyle = () => {
    switch (normalized) {
      case 'active':
      case 'successful':
      case 'success':
      case 'approved':
      case 'settled':
      case 'verified':
      case 'ready for bank':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
        };

      case 'pending':
      case 'pending batch':
      case 'accrued':
      case 'allocated':
      case 'locked':
      case 'needs review':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
        };

      case 'suspended':
      case 'flagged':
      case 'blocked':
      case 'warn':
      case 'warning':
        return {
          bg: 'bg-orange-50 text-orange-700 border-orange-200',
          dot: 'bg-orange-500',
        };

      case 'failed':
      case 'rejected':
      case 'error':
      case 'forfeited':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-rose-500',
        };

      case 'duplicate':
        return {
          bg: 'bg-purple-50 text-purple-700 border-purple-200 shadow-xs ring-1 ring-purple-300 font-extrabold',
          dot: 'bg-purple-600 animate-pulse',
        };

      case 'info':
        return {
          bg: 'bg-sky-50 text-sky-700 border-sky-200',
          dot: 'bg-sky-500',
        };

      case 'inactive':
      default:
        return {
          bg: 'bg-slate-100 text-slate-600 border-slate-200',
          dot: 'bg-slate-400',
        };
    }
  };

  const style = getStyle();

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border select-none whitespace-nowrap uppercase ${style.bg} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}

export default StatusBadge;
