import React from 'react';

export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white border border-slate-200/90 rounded-2xl p-5 text-slate-900 shadow-xs ${className}`}>
      {children}
    </div>
  );
}
