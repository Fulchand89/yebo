import React, { useState } from 'react';
import {
  Send,
  FileSpreadsheet,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Sparkles,
  FileCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  DataTable,
  StatusBadge,
  AdminModal,
} from '@/components/admin';
import { mockEftData } from '@/data/adminMockData';

export function AdminEftPage() {
  const [eftStats, setEftStats] = useState(mockEftData.stats);
  const [generatedFiles, setGeneratedFiles] = useState(mockEftData.generatedFiles);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0] // defaults to today: 'YYYY-MM-DD'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewingFile, setViewingFile] = useState(null);

  const handleGenerateFile = () => {
    setIsGenerating(true);
    const dateObj = new Date(selectedDate);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth(); // 0-indexed
    const day = String(dateObj.getDate()).padStart(2, '0');
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const monthName = monthNames[month];
    const monthPadded = String(month + 1).padStart(2, '0');
    const dateStamp = `${year}${monthPadded}${day}`;

    setTimeout(() => {
      setIsGenerating(false);
      const newFileId = `EFT-FILE-${year}${monthPadded}-${String(generatedFiles.length + 1).padStart(2, '0')}`;
      const newFile = {
        fileId: newFileId,
        fileName: `YEBO_EFT_DISBURSEMENT_${dateStamp}_AUTO.csv`,
        month: `${monthName} ${year} (${day} ${monthName})`,
        recipients: eftStats.totalRecipients,
        totalAmount: eftStats.totalPayout,
        generatedDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'Ready for Bank',
      };

      setGeneratedFiles([newFile, ...generatedFiles]);
      toast.success('EFT file generated successfully!');
    }, 1200);
  };

  const columns = [
    {
      header: 'File ID',
      key: 'fileId',
      render: (item) => <span className="font-mono font-bold text-[#0c1844]">{item.fileId}</span>,
    },
    {
      header: 'File Name',
      key: 'fileName',
      render: (item) => (
        <span className="font-mono text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          {item.fileName}
        </span>
      ),
    },
    {
      header: 'Month',
      key: 'month',
      render: (item) => <span className="font-semibold text-slate-700">{item.month}</span>,
    },
    {
      header: 'Recipients',
      key: 'recipients',
      render: (item) => <span className="font-bold text-slate-900">{item.recipients} accounts</span>,
    },
    {
      header: 'Total Amount',
      key: 'totalAmount',
      render: (item) => <span className="font-black text-[#F97316]">{item.totalAmount}</span>,
    },
    {
      header: 'Generated Date',
      key: 'generatedDate',
      render: (item) => <span className="font-mono text-slate-500 text-[11px]">{item.generatedDate}</span>,
    },
    {
      header: 'Status',
      key: 'status',
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      header: 'Action',
      key: 'action',
      render: (item) => (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setViewingFile(item)}
            className="p-1.5 text-slate-600 hover:text-[#F97316] hover:bg-orange-50 rounded-lg transition"
            title="View Batch Summary"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => toast.success(`Downloading ${item.fileName} (CSV Simulation)...`)}
            className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
            title="Download Bank CSV"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Billing Cycle</span>
          <div className="text-sm font-black text-slate-900 mt-1 truncate">{eftStats.currentMonth}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Recipients</span>
          <div className="text-lg font-black text-slate-900 mt-0.5">{eftStats.totalRecipients}</div>
        </div>

        <div className="bg-white rounded-2xl border border-orange-200 bg-orange-50/20 p-4 shadow-xs">
          <span className="text-[10px] font-bold text-[#F97316] uppercase">Total Payout</span>
          <div className="text-lg font-black text-[#F97316] mt-0.5">{eftStats.totalPayout}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
          <span className="text-[10px] font-bold text-emerald-600 uppercase">Successful</span>
          <div className="text-lg font-black text-emerald-600 mt-0.5">{eftStats.successful}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
          <span className="text-[10px] font-bold text-amber-600 uppercase">Pending</span>
          <div className="text-lg font-black text-amber-600 mt-0.5">{eftStats.pending}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
          <span className="text-[10px] font-bold text-rose-600 uppercase">Failed</span>
          <div className="text-lg font-black text-rose-600 mt-0.5">{eftStats.failed}</div>
        </div>
      </div>

      {/* Generate Monthly File Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-orange-50 text-[#F97316]">
                <Sparkles className="w-5 h-5" />
              </span>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">
                Generate Monthly EFT File
              </h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Compiles all verified subscriber cashback balances and merchant staff tip pools into standardized PASA/ACB compliant direct debit disbursement batch files.
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-4 w-full md:w-auto">
            {/* ── Full Date Picker ─────────────────────────────── */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 tracking-wider">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Select Disbursement Date
                </span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="eft-date-picker"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={new Date(new Date().setFullYear(new Date().getFullYear() + 5))
                    .toISOString().split('T')[0]}
                  min="2020-01-01"
                  className="pl-3 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800
                    focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20
                    hover:border-slate-300 transition-all duration-150 cursor-pointer
                    [color-scheme:light] min-w-[180px]"
                />
              </div>
              {selectedDate && (
                <p className="text-[10px] text-slate-400 mt-1 font-medium">
                  {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-ZA', {
                    weekday: 'short', day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </p>
              )}
            </div>

            <div className="pb-0">
              <button
                type="button"
                onClick={handleGenerateFile}
                disabled={isGenerating || !selectedDate}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-black text-xs uppercase tracking-wider transition shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Compiling...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Generate EFT File</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Files Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            Generated EFT Batches
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            {generatedFiles.length} disbursement records
          </span>
        </div>

        <DataTable
          columns={columns}
          data={generatedFiles}
          keyField="fileId"
        />
      </div>

      {/* File Details Modal */}
      {viewingFile && (
        <AdminModal
          isOpen={Boolean(viewingFile)}
          onClose={() => setViewingFile(null)}
          title={`EFT Batch: ${viewingFile.fileId}`}
          subtitle={`Disbursement File: ${viewingFile.fileName}`}
          icon={FileSpreadsheet}
          footer={
            <div className="flex items-center justify-between w-full">
              <button
                type="button"
                onClick={() => setViewingFile(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  toast.success(`Downloaded ${viewingFile.fileName} (CSV Simulation).`);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#F97316] hover:bg-[#F97316] transition shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                Download CSV
              </button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Period</span>
                <p className="font-bold text-slate-800 mt-0.5">{viewingFile.month}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Total Disbursement</span>
                <p className="font-black text-[#F97316] mt-0.5 text-sm">{viewingFile.totalAmount}</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Bank Compliance Specs</span>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div>Standard: <span className="font-bold text-slate-800">BankservAfrica ACB Magtape</span></div>
                <div>Hash Verification: <span className="font-mono text-emerald-600 font-bold">SHA256: 8a42...9f01</span></div>
                <div>Originator Code: <span className="font-mono text-slate-800">YEBO-ZA-890</span></div>
                <div>Currency: <span className="font-bold text-slate-800">ZAR South African Rand</span></div>
              </div>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
}

export default AdminEftPage;
