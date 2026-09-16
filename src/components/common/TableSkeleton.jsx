import React from 'react';

export default function TableSkeleton({ rows = 5 }) {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 p-4 space-y-3 animate-pulse shadow-xs">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-10 bg-slate-100 rounded-xl w-full" />
      ))}
    </div>
  );
}
