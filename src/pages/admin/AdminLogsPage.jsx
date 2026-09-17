import React, { useState, useMemo } from 'react';
import {
  FileText,
  AlertCircle,
  AlertTriangle,
  Info,
  Eye,
  RefreshCw,
  Search,
  Code,
  Terminal,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  DataTable,
  SearchBar,
  FilterBar,
  StatusBadge,
  AdminModal,
  Pagination,
} from '@/components/admin';
import { mockSystemLogs } from '@/data/adminMockData';

export function AdminLogsPage() {
  const [logs, setLogs] = useState(mockSystemLogs);
  const [levelFilter, setLevelFilter] = useState('All');
  const [moduleFilter, setModuleFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [selectedLog, setSelectedLog] = useState(null);

  const levelOptions = [
    { value: 'All', label: 'All Levels', count: logs.length },
    { value: 'INFO', label: 'INFO', count: logs.filter((l) => l.level === 'INFO').length },
    { value: 'WARN', label: 'WARN', count: logs.filter((l) => l.level === 'WARN').length },
    { value: 'ERROR', label: 'ERROR', count: logs.filter((l) => l.level === 'ERROR').length },
  ];

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesLevel = levelFilter === 'All' || log.level === levelFilter;
      const matchesModule = moduleFilter === 'All' || log.module === moduleFilter;

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === '' ||
        log.id.toLowerCase().includes(q) ||
        log.referenceId.toLowerCase().includes(q) ||
        log.transactionId.toLowerCase().includes(q) ||
        log.userId.toLowerCase().includes(q) ||
        log.message.toLowerCase().includes(q);

      return matchesLevel && matchesModule && matchesSearch;
    });
  }, [logs, levelFilter, moduleFilter, searchQuery]);

  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLogs.slice(start, start + pageSize);
  }, [filteredLogs, currentPage]);

  const columns = [
    {
      header: 'Log ID',
      key: 'id',
      render: (item) => <span className="font-mono font-bold text-[#0c1844] whitespace-nowrap">{item.id}</span>,
    },
    {
      header: 'Timestamp',
      key: 'timestamp',
      render: (item) => <span className="font-mono text-slate-500 text-[11px] whitespace-nowrap">{item.timestamp}</span>,
    },
    {
      header: 'Level',
      key: 'level',
      render: (item) => <StatusBadge status={item.level} />,
    },
    {
      header: 'Module',
      key: 'module',
      render: (item) => (
        <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md text-[11px] whitespace-nowrap">
          {item.module}
        </span>
      ),
    },
    {
      header: 'Message',
      key: 'message',
      render: (item) => (
        <span className="text-slate-800 font-medium text-xs block max-w-xs truncate" title={item.message}>
          {item.message}
        </span>
      ),
    },
    {
      header: 'Reference ID',
      key: 'referenceId',
      render: (item) => <span className="font-mono text-slate-500 text-[11px]">{item.referenceId}</span>,
    },
    {
      header: 'Transaction ID',
      key: 'transactionId',
      render: (item) => <span className="font-mono text-slate-500 text-[11px]">{item.transactionId}</span>,
    },
    {
      header: 'User ID',
      key: 'userId',
      render: (item) => <span className="font-mono text-slate-500 text-[11px]">{item.userId}</span>,
    },
    {
      header: 'Action',
      key: 'action',
      render: (item) => (
        <button
          type="button"
          onClick={() => setSelectedLog(item)}
          className="p-1.5 text-slate-600 hover:text-[#F97316] hover:bg-orange-50 rounded-lg transition"
          title="Inspect Telemetry Payload"
        >
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      {/* Controls: Search, Level filter, Module dropdown */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <SearchBar
            value={searchQuery}
            onChange={(q) => {
              setSearchQuery(q);
              setCurrentPage(1);
            }}
            placeholder="Search message, log ID, ref, TXN or user..."
            className="w-full sm:w-80"
          />

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <select
              value={moduleFilter}
              onChange={(e) => {
                setModuleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="flex-1 sm:flex-initial px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316] font-semibold text-slate-700 cursor-pointer"
            >
              <option value="All">All Modules</option>
              <option value="PayFast IPN">PayFast IPN</option>
              <option value="Scanner Validator">Scanner Validator</option>
              <option value="EFT Compiler">EFT Compiler</option>
            </select>

            <button
              type="button"
              onClick={() => toast.success('Telemetry streaming active (UI Demo)...')}
              className="p-2 text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition cursor-pointer shrink-0"
              title="Refresh Logs"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Level Filter Tabs */}
        <FilterBar
          options={levelOptions}
          activeValue={levelFilter}
          onChange={(val) => {
            setLevelFilter(val);
            setCurrentPage(1);
          }}
          showReset={searchQuery !== '' || levelFilter !== 'All' || moduleFilter !== 'All'}
          onReset={() => {
            setSearchQuery('');
            setLevelFilter('All');
            setModuleFilter('All');
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Logs Table */}
      <DataTable
        columns={columns}
        data={paginatedLogs}
        keyField="id"
        emptyTitle="No log entries match criteria"
        minWidth="950px"
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredLogs.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />

      {/* Log Details Modal */}
      {selectedLog && (
        <AdminModal
          isOpen={Boolean(selectedLog)}
          onClose={() => setSelectedLog(null)}
          title={`Log Details: ${selectedLog.id}`}
          subtitle={`Module: ${selectedLog.module} • Timestamp: ${selectedLog.timestamp}`}
          icon={Terminal}
          maxWidth="max-w-2xl"
          footer={
            <button
              type="button"
              onClick={() => setSelectedLog(null)}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Close
            </button>
          }
        >
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Status Level</span>
                <StatusBadge status={selectedLog.level} />
              </div>
              <p className="font-bold text-slate-900 text-sm">{selectedLog.message}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Reference ID</span>
                <p className="font-mono text-slate-800 font-semibold mt-0.5">{selectedLog.referenceId}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Transaction ID</span>
                <p className="font-mono text-slate-800 font-semibold mt-0.5">{selectedLog.transactionId}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">User ID</span>
                <p className="font-mono text-slate-800 font-semibold mt-0.5">{selectedLog.userId}</p>
              </div>
            </div>

            {/* Raw JSON Payload */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                Parsed JSON Telemetry Payload
              </span>
              <pre className="p-3.5 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto max-h-48">
                {JSON.stringify(selectedLog.payload || {}, null, 2)}
              </pre>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
}

export default AdminLogsPage;
