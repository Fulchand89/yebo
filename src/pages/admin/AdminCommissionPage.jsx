import React, { useState, useMemo } from 'react';
import {
  BookOpenCheck,
  User,
  Store,
  Landmark,
  Eye,
  Calendar,
  Download,
  Search,
  Filter,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  DataTable,
  SearchBar,
  StatusBadge,
  AdminModal,
  Pagination,
} from '@/components/admin';
import { mockCommissionLedger } from '@/data/adminMockData';

export function AdminCommissionPage() {
  const [activeTab, setActiveTab] = useState('subscriber'); // 'subscriber' | 'merchant' | 'treasury'
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('This Month');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [appliedCustomRange, setAppliedCustomRange] = useState(null); // { start: string, end: string } | null
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [inspectEntry, setInspectEntry] = useState(null);

  const tabs = [
    { id: 'subscriber', label: 'Subscriber Cashback', icon: User, count: mockCommissionLedger.subscriber.length },
    { id: 'merchant', label: 'Merchant Deductions', icon: Store, count: mockCommissionLedger.merchant.length },
    { id: 'treasury', label: 'Treasury Allocation', icon: Landmark, count: mockCommissionLedger.treasury.length },
  ];

  const currentDataset = mockCommissionLedger[activeTab] || [];

  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
    setCurrentPage(1);
    if (newRange !== 'Custom Range') {
      setAppliedCustomRange(null);
    }
  };

  const handleApplyCustomRange = () => {
    if (!startDate || !endDate) {
      toast.error('Please select both Start Date and End Date');
      return;
    }
    if (endDate < startDate) {
      toast.error('End Date cannot be earlier than Start Date');
      return;
    }
    setAppliedCustomRange({ start: startDate, end: endDate });
    setCurrentPage(1);
    toast.success(`Applied date range: ${startDate} to ${endDate}`);
  };

  const filteredData = useMemo(() => {
    return currentDataset.filter((item) => {
      // Custom date range filter
      if (dateRange === 'Custom Range' && appliedCustomRange?.start && appliedCustomRange?.end) {
        if (item.date < appliedCustomRange.start || item.date > appliedCustomRange.end) {
          return false;
        }
      }

      const q = searchQuery.toLowerCase();
      return (
        searchQuery === '' ||
        item.ledgerId.toLowerCase().includes(q) ||
        item.entity.toLowerCase().includes(q) ||
        item.transactionId.toLowerCase().includes(q) ||
        item.sourceReceipt.toLowerCase().includes(q)
      );
    });
  }, [currentDataset, searchQuery, dateRange, appliedCustomRange]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage]);

  const columns = [
    {
      header: 'Ledger ID',
      key: 'ledgerId',
      cellClassName: 'whitespace-nowrap',
      render: (item) => <span className="font-mono font-bold text-[#0c1844] whitespace-nowrap">{item.ledgerId}</span>,
    },
    {
      header: 'Type',
      key: 'type',
      cellClassName: 'whitespace-nowrap',
      render: (item) => <span className="font-bold text-slate-800 whitespace-nowrap">{item.type}</span>,
    },
    {
      header: 'User / Merchant',
      key: 'entity',
      cellClassName: 'whitespace-nowrap',
      render: (item) => <span className="font-semibold text-slate-700 whitespace-nowrap">{item.entity}</span>,
    },
    {
      header: 'Transaction ID',
      key: 'transactionId',
      cellClassName: 'whitespace-nowrap',
      render: (item) => <span className="font-mono text-slate-500 text-[11px] whitespace-nowrap">{item.transactionId}</span>,
    },
    {
      header: 'Amount',
      key: 'amount',
      cellClassName: 'whitespace-nowrap',
      render: (item) => (
        <span
          className={`font-black whitespace-nowrap ${item.amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-900'
            }`}
        >
          {item.amount}
        </span>
      ),
    },
    {
      header: 'Date',
      key: 'date',
      cellClassName: 'whitespace-nowrap',
      render: (item) => <span className="font-mono text-slate-500 text-[11px] whitespace-nowrap">{item.date}</span>,
    },
    {
      header: 'Source Receipt',
      key: 'sourceReceipt',
      cellClassName: 'whitespace-nowrap',
      render: (item) => (
        <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-bold whitespace-nowrap">
          {item.sourceReceipt}
        </span>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      cellClassName: 'whitespace-nowrap',
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      header: 'Action',
      key: 'action',
      cellClassName: 'whitespace-nowrap',
      render: (item) => (
        <button
          type="button"
          onClick={() => setInspectEntry(item)}
          className="p-1.5 text-slate-600 hover:text-[#F97316] hover:bg-orange-50 rounded-lg transition whitespace-nowrap"
          title="Inspect Ledger Entry"
        >
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      {/* Overview Metric Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Subscriber Pool</span>
          <div className="text-xl font-black text-slate-900 mt-0.5">₹1,42,000</div>
          <span className="text-[11px] text-emerald-600 font-bold">+14.5% vs last month</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Merchant Fee Accruals</span>
          <div className="text-xl font-black text-slate-900 mt-0.5">₹1,10,000</div>
          <span className="text-[11px] text-slate-500 font-medium">Auto-settled via PayFast</span>
        </div>
        <div className="bg-white rounded-2xl border border-orange-200 p-4 shadow-xs bg-orange-50/20">
          <span className="text-[10px] font-bold uppercase text-[#F97316]">Treasury Net Yield</span>
          <div className="text-xl font-black text-slate-900 mt-0.5">₹2,00,000</div>
          <span className="text-[11px] text-[#F97316] font-bold">YEBO Platform Retained</span>
        </div>
      </div>

      {/* Tabs & Search Filter Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex overflow-x-auto scrollbar-none sm:flex-wrap gap-1 p-1 bg-slate-100 rounded-xl w-full sm:w-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 whitespace-nowrap ${isActive ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Date range & Export */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <select
              value={dateRange}
              onChange={(e) => handleDateRangeChange(e.target.value)}
              className="flex-1 sm:flex-initial px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316] font-semibold text-slate-700 cursor-pointer"
            >
              <option value="This Month">This Month</option>
              <option value="Last Month">Last Month</option>
              <option value="Custom Range">Custom Range</option>
            </select>

            <button
              type="button"
              onClick={() => toast.success('Exporting Commission Ledger CSV (UI Demo)...')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>

        {/* Custom Range Date Pickers */}
        {dateRange === 'Custom Range' && (
          <div className="flex flex-wrap items-center justify-start sm:justify-end gap-2.5 pt-3 border-t border-slate-100 w-full">
            {/* Start Date */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-500">Start Date:</label>
              <div className="relative flex items-center">
                <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  onClick={(e) => {
                    try {
                      e.currentTarget.showPicker?.();
                    } catch (err) {}
                  }}
                  className="pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 hover:bg-white border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-hidden focus:border-[#F97316] focus:ring-2 focus:ring-orange-100 transition cursor-pointer"
                />
              </div>
            </div>

            {/* End Date */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-500">End Date:</label>
              <div className="relative flex items-center">
                <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                <input
                  type="date"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(e) => setEndDate(e.target.value)}
                  onClick={(e) => {
                    try {
                      e.currentTarget.showPicker?.();
                    } catch (err) {}
                  }}
                  className="pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 hover:bg-white border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-hidden focus:border-[#F97316] focus:ring-2 focus:ring-orange-100 transition cursor-pointer"
                />
              </div>
            </div>

            {/* Apply Button */}
            <button
              type="button"
              onClick={handleApplyCustomRange}
              className="px-4 py-1.5 bg-[#F97316] hover:bg-[#ea580c] text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs active:scale-95 shrink-0"
            >
              Apply
            </button>
          </div>
        )}

        {/* Search */}
        <SearchBar
          value={searchQuery}
          onChange={(q) => {
            setSearchQuery(q);
            setCurrentPage(1);
          }}
          placeholder="Filter by Ledger ID, User/Merchant, TXN, or Source Receipt..."
        />
      </div>

      {/* Ledger Table */}
      <DataTable
        columns={columns}
        data={paginatedData}
        keyField="ledgerId"
        emptyTitle="No commission records found"
        minWidth="1150px"
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />

      {/* Ledger Details Modal */}
      {inspectEntry && (
        <AdminModal
          isOpen={Boolean(inspectEntry)}
          onClose={() => setInspectEntry(null)}
          title={`Ledger Entry: ${inspectEntry.ledgerId}`}
          subtitle="Double-entry accounting journal verification"
          icon={BookOpenCheck}
          footer={
            <button
              type="button"
              onClick={() => setInspectEntry(null)}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Close
            </button>
          }
        >
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Classification</span>
                <p className="font-bold text-slate-800 mt-0.5">{inspectEntry.type}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Amount</span>
                <p className="font-black text-[#F97316] text-sm mt-0.5">{inspectEntry.amount}</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400">Beneficiary / Source Entity</span>
              <p className="font-bold text-slate-800 mt-0.5">{inspectEntry.entity}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Linked TXN</span>
                <p className="font-mono text-slate-700 mt-0.5">{inspectEntry.transactionId}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Source Receipt</span>
                <p className="font-mono text-slate-700 mt-0.5">{inspectEntry.sourceReceipt}</p>
              </div>
            </div>


          </div>
        </AdminModal>
      )}
    </div>
  );
}

export default AdminCommissionPage;
