import React from 'react';

export default function Table({ headers = [], data = [], renderRow, isLoading = false, emptyMessage = "No data available." }) {
  if (isLoading) {
    return (
      <div className="w-full p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent text-[#ea580c] rounded-full" />
        <p className="mt-2 text-xs font-semibold">Loading data...</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
      <table className="w-full text-left text-sm text-slate-700">
        <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200/80">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3.5">
                {typeof h === 'object' ? h.label : h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="px-4 py-8 text-center text-slate-400 text-xs font-medium">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, idx) => renderRow ? renderRow(item, idx) : (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                {Object.values(item).map((val, cIdx) => (
                  <td key={cIdx} className="px-4 py-3 text-xs">
                    {String(val)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
