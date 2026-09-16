import React from 'react';

export function LoadingSkeleton({ rows = 5, cols = 6, className = '' }) {
  return (
    <div className={`w-full bg-white rounded-2xl border border-slate-200/90 p-4 space-y-3 animate-pulse ${className}`}>
      <div className="h-9 bg-slate-100 rounded-xl w-full" />
      {Array.from({ length: rows }).map((_, rIdx) => (
        <div key={rIdx} className="flex items-center gap-4 py-2 border-b border-slate-100 last:border-b-0">
          {Array.from({ length: cols }).map((_, cIdx) => (
            <div
              key={cIdx}
              className="h-4 bg-slate-100 rounded-md"
              style={{ width: `${Math.max(15, (cIdx + 1) * 15)}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200/90 animate-pulse space-y-3">
          <div className="h-3 w-24 bg-slate-100 rounded-sm" />
          <div className="h-7 w-32 bg-slate-100 rounded-md" />
          <div className="h-3 w-40 bg-slate-100 rounded-sm pt-2" />
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
