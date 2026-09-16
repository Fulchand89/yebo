import React from 'react';

export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border border-slate-200/90 rounded-2xl text-xs text-slate-600 shadow-xs">
      <div>
        Page <span className="text-slate-900 font-bold">{currentPage}</span> of{' '}
        <span className="text-slate-900 font-bold">{totalPages}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 disabled:opacity-40 hover:bg-slate-100 transition-colors font-semibold cursor-pointer"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 disabled:opacity-40 hover:bg-slate-100 transition-colors font-semibold cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
