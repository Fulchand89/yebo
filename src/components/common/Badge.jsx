import React from 'react';

export function ActiveBadge({ label = 'ACTIVE', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#dcfce7] text-[#16a34a] border border-emerald-200/50 select-none ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
      {label}
    </span>
  );
}

export function InactiveBadge({ label = 'INACTIVE', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#fee2e2] text-[#dc2626] border border-red-200/50 select-none ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
      {label}
    </span>
  );
}

export function PartnerBadge({ label = 'MERCHANT PARTNER', className = '' }) {
  return (
    <span className={`inline-flex items-center px-3.5 py-1 rounded-full border border-orange-200 bg-[#fff5eb] text-[#ea580c] font-bold text-[11px] sm:text-xs tracking-wide uppercase select-none ${className}`}>
      {label}
    </span>
  );
}

export function SampleDataBadge({ label = 'SAMPLE DATA', className = '' }) {
  return (
    <span className={`bg-[#fff1e7] text-[#ea580c] text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wider uppercase select-none ${className}`}>
      {label}
    </span>
  );
}

export function RealTimeBadge({ label = 'Real-time', className = '' }) {
  return (
    <span className={`bg-slate-100 text-slate-500 text-[10px] font-semibold px-2 py-0.5 rounded-full select-none ${className}`}>
      {label}
    </span>
  );
}

export function DealTypeBadge({ type, className = '' }) {
  const styles = {
    'Specific Item Deal': 'bg-[#f3e8ff] text-[#9333ea] border-purple-100',
    'Percentage Discount': 'bg-[#e0f2fe] text-[#0284c7] border-sky-100',
    'BOGO': 'bg-[#ffe4e6] text-[#e11d48] border-pink-100',
    'Bundle': 'bg-[#fef3c7] text-[#d97706] border-amber-100',
    'Storewide Deal': 'bg-[#ccfbf1] text-[#0d9488] border-teal-100',
    'Category Deal': 'bg-[#ffedd5] text-[#ea580c] border-orange-100',
  };

  const style = styles[type] || 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold border ${style} select-none ${className}`}>
      {type}
    </span>
  );
}
