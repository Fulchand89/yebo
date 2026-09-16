import React from 'react';
import LoadingSkeleton from './LoadingSkeleton';
import EmptyState from './EmptyState';

export function DataTable({
  columns = [],
  data = [],
  keyField = 'id',
  isLoading = false,
  emptyTitle = 'No records found',
  emptyDescription = 'There are currently no records matching the specified criteria.',
  renderRow,
  className = '',
}) {
  if (isLoading) {
    return <LoadingSkeleton rows={5} cols={columns.length || 5} className={className} />;
  }

  if (!data || data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} className={className} />;
  }

  return (
    <div className={`w-full overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs ${className}`}>
      <table className="w-full text-left text-xs text-slate-700">
        <thead className="bg-slate-50/70 text-[11px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200/80">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={col.key || idx}
                className={`px-6 py-4 whitespace-nowrap ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100/90">
          {data.map((item, rowIdx) => {
            if (renderRow) {
              return renderRow(item, rowIdx);
            }

            return (
              <tr
                key={item[keyField] || rowIdx}
                className="hover:bg-slate-50/60 transition-colors"
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={col.key || colIdx}
                    className={`px-6 py-4 text-xs text-slate-700 ${col.cellClassName || ''}`}
                  >
                    {col.render ? col.render(item, rowIdx) : item[col.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
