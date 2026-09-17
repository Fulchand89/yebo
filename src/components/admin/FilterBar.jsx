import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

export function FilterBar({
  options = [],
  activeValue,
  onChange,
  children,
  onReset,
  showReset = false,
  className = '',
}) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${className}`}>
      <div className="flex overflow-x-auto scrollbar-none sm:flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl max-w-full">
        {options.map((option) => {
          const val = typeof option === 'object' ? option.value : option;
          const label = typeof option === 'object' ? option.label : option;
          const count = typeof option === 'object' ? option.count : null;
          const isActive = activeValue === val;

          return (
            <button
              key={val}
              type="button"
              onClick={() => onChange && onChange(val)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                isActive
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>{label}</span>
              {count !== null && count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-orange-100 text-[#F97316]' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {children}

        {showReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

export default FilterBar;
