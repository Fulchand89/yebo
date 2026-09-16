import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Store,
  Eye,
  CheckCircle,
  XCircle,
  AlertOctagon,
  Check,
  Download,
  Plus,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  DataTable,
  SearchBar,
  FilterBar,
  StatusBadge,
  ConfirmationDialog,
  Pagination,
} from '@/components/admin';
import { mockMerchants } from '@/data/adminMockData';

export function AdminMerchantsPage() {
  const navigate = useNavigate();
  const [merchants, setMerchants] = useState(mockMerchants);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    action: 'approve', // 'approve' | 'reject' | 'suspend' | 'activate'
    merchant: null,
  });

  const statusOptions = [
    { value: 'All', label: 'All Merchants', count: merchants.length },
    { value: 'Active', label: 'Active', count: merchants.filter((m) => m.status === 'Active').length },
    { value: 'Pending', label: 'Pending Review', count: merchants.filter((m) => m.status === 'Pending').length },
    { value: 'Suspended', label: 'Suspended', count: merchants.filter((m) => m.status === 'Suspended').length },
    { value: 'Rejected', label: 'Rejected', count: merchants.filter((m) => m.status === 'Rejected').length },
  ];

  const filteredMerchants = useMemo(() => {
    return merchants.filter((merchant) => {
      const matchesSearch =
        searchQuery === '' ||
        merchant.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        merchant.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        merchant.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        merchant.contact.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' || merchant.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [merchants, searchQuery, statusFilter]);

  const paginatedMerchants = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredMerchants.slice(start, start + pageSize);
  }, [filteredMerchants, currentPage]);

  const handleActionConfirm = () => {
    if (!confirmDialog.merchant) return;
    const { action, merchant } = confirmDialog;

    let nextStatus = merchant.status;
    if (action === 'approve' || action === 'activate') nextStatus = 'Active';
    else if (action === 'reject') nextStatus = 'Rejected';
    else if (action === 'suspend') nextStatus = 'Suspended';

    setMerchants((prev) =>
      prev.map((m) => (m.id === merchant.id ? { ...m, status: nextStatus } : m))
    );

    toast.success(`Merchant ${merchant.businessName} marked as ${nextStatus}.`);
    setConfirmDialog({ isOpen: false, action: 'approve', merchant: null });
  };

  const columns = [
    {
      header: 'Merchant ID',
      key: 'id',
      render: (item) => (
        <span className="font-mono font-extrabold text-[#0c1844]">{item.id}</span>
      ),
    },
    {
      header: 'Business Name',
      key: 'businessName',
      render: (item) => (
        <div>
          <div className="font-bold text-slate-900">{item.businessName}</div>
          <div className="text-[11px] text-slate-400">{item.businessInfo?.category}</div>
        </div>
      ),
    },
    {
      header: 'Owner',
      key: 'owner',
      render: (item) => <span className="font-bold text-slate-800">{item.owner}</span>,
    },
    {
      header: 'Contact',
      key: 'contact',
      render: (item) => <span className="text-slate-500 truncate max-w-[150px] block">{item.contact}</span>,
    },
    {
      header: 'Status',
      key: 'status',
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      header: 'Deals',
      key: 'deals',
      cellClassName: 'whitespace-nowrap',
      render: (item) => (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-[#F97316] border border-orange-200 whitespace-nowrap leading-tight">
          <span>{item.deals}</span>
          <span>Active</span>
        </span>
      ),
    },
    {
      header: 'Staff Fund',
      key: 'staffFund',
      render: (item) => <span className="font-bold text-slate-900">{item.staffFund}</span>,
    },
    {
      header: 'Registration Date',
      key: 'registrationDate',
      render: (item) => <span className="text-slate-500 font-mono text-[11px]">{item.registrationDate}</span>,
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (item) => (
        <div className="flex items-center gap-1">
          {/* View Action */}
          <button
            type="button"
            onClick={() => navigate(`/admin/merchants/${item.id}`)}
            className="p-1.5 text-slate-600 hover:text-[#F97316] hover:bg-orange-50 rounded-lg transition"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Pending: Approve / Reject */}
          {item.status === 'Pending' && (
            <>
              <button
                type="button"
                onClick={() => setConfirmDialog({ isOpen: true, action: 'approve', merchant: item })}
                className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
                title="Approve Merchant"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setConfirmDialog({ isOpen: true, action: 'reject', merchant: item })}
                className="p-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                title="Reject Merchant"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Active: Suspend */}
          {item.status === 'Active' && (
            <button
              type="button"
              onClick={() => setConfirmDialog({ isOpen: true, action: 'suspend', merchant: item })}
              className="p-1.5 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition"
              title="Suspend Merchant"
            >
              <AlertOctagon className="w-4 h-4" />
            </button>
          )}

          {/* Suspended or Rejected: Activate */}
          {(item.status === 'Suspended' || item.status === 'Rejected') && (
            <button
              type="button"
              onClick={() => setConfirmDialog({ isOpen: true, action: 'activate', merchant: item })}
              className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
              title="Activate Merchant"
            >
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <SearchBar
            value={searchQuery}
            onChange={(q) => {
              setSearchQuery(q);
              setCurrentPage(1);
            }}
            placeholder="Search merchants, owners or ID..."
            className="w-full sm:w-80"
          />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toast.success('Merchant application form opening (UI Demo)...')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-[#F97316] hover:bg-[#EA580C] transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Merchant
            </button>

            <button
              type="button"
              onClick={() => toast.success('Exporting merchants CSV (UI Demo)...')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>

        {/* Status Tabs */}
        <FilterBar
          options={statusOptions}
          activeValue={statusFilter}
          onChange={(val) => {
            setStatusFilter(val);
            setCurrentPage(1);
          }}
          showReset={searchQuery !== '' || statusFilter !== 'All'}
          onReset={() => {
            setSearchQuery('');
            setStatusFilter('All');
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Merchants Table */}
      <DataTable
        columns={columns}
        data={paginatedMerchants}
        keyField="id"
        emptyTitle="No merchants found"
        emptyDescription="No registered merchants match your current filter settings."
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredMerchants.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, action: 'approve', merchant: null })}
        onConfirm={handleActionConfirm}
        variant={
          confirmDialog.action === 'reject' || confirmDialog.action === 'suspend'
            ? 'danger'
            : 'success'
        }
        title={
          confirmDialog.action === 'approve'
            ? 'Approve Merchant Application'
            : confirmDialog.action === 'reject'
            ? 'Reject Merchant Application'
            : confirmDialog.action === 'suspend'
            ? 'Suspend Merchant Account'
            : 'Reactivate Merchant Account'
        }
        message={
          confirmDialog.action === 'approve'
            ? `Authorize ${confirmDialog.merchant?.businessName} as a live YEBO partner merchant? Their deals will become active.`
            : confirmDialog.action === 'reject'
            ? `Reject partner application for ${confirmDialog.merchant?.businessName}? An audit notice will be logged.`
            : confirmDialog.action === 'suspend'
            ? `Suspend ${confirmDialog.merchant?.businessName}? All QR voucher scans at this location will be temporarily frozen.`
            : `Restore full trading status for ${confirmDialog.merchant?.businessName}?`
        }
        confirmLabel={
          confirmDialog.action === 'approve'
            ? 'Approve Partner'
            : confirmDialog.action === 'reject'
            ? 'Reject Application'
            : confirmDialog.action === 'suspend'
            ? 'Suspend Store'
            : 'Activate Store'
        }
      />
    </div>
  );
}

export default AdminMerchantsPage;
