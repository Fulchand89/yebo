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
  Phone,
  Mail,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  DataTable,
  SearchBar,
  FilterBar,
  StatusBadge,
  ConfirmationDialog,
  AdminModal,
  Pagination,
} from '@/components/admin';
import { mockMerchants } from '@/data/adminMockData';

const CATEGORY_OPTIONS = [
  'Food & Beverage',
  'Retail & Fashion',
  'Health & Wellness',
  'Entertainment & Leisure',
  'Automotive & Fuel',
  'Beauty & Personal Care',
  'Groceries & Daily Essentials',
  'Services & Repairs',
];

export function AdminMerchantsPage() {
  const navigate = useNavigate();
  const [merchants, setMerchants] = useState(() => {
    try {
      const saved = localStorage.getItem('yebo_admin_merchants');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return mockMerchants;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMerchant, setNewMerchant] = useState({
    businessName: '',
    owner: '',
    contact: '',
    email: '',
    category: 'Food & Beverage',
    address: '',
    status: 'Active',
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    action: 'approve', // 'approve' | 'reject' | 'suspend' | 'activate'
    merchant: null,
  });

  const handleAddMerchant = (e) => {
    e.preventDefault();

    if (!newMerchant.businessName.trim()) {
      toast.error('Please enter business name');
      return;
    }
    if (!newMerchant.owner.trim()) {
      toast.error('Please enter owner / manager name');
      return;
    }
    if (!newMerchant.contact.trim()) {
      toast.error('Please enter contact number');
      return;
    }
    if (!newMerchant.email.trim()) {
      toast.error('Please enter email address');
      return;
    }

    const maxNum = merchants.reduce((acc, m) => {
      const parsed = parseInt(String(m.id).replace(/\D/g, ''), 10);
      return !isNaN(parsed) && parsed > acc ? parsed : acc;
    }, 2000);
    const newId = `MER-${maxNum + 1}`;

    const created = {
      id: newId,
      businessName: newMerchant.businessName.trim(),
      owner: newMerchant.owner.trim(),
      contact: newMerchant.contact.trim(),
      email: newMerchant.email.trim(),
      status: newMerchant.status || 'Active',
      deals: 0,
      staffFund: '₹0.00',
      registrationDate: new Date().toISOString().split('T')[0],
      businessInfo: {
        category: newMerchant.category || 'Food & Beverage',
        address: newMerchant.address.trim() || 'Johannesburg, South Africa',
        vatNumber: `49${Math.floor(10000000 + Math.random() * 90000000)}`,
        regNumber: `${new Date().getFullYear()}/${Math.floor(100000 + Math.random() * 900000)}/07`,
        rating: 5.0,
      },
      dealsList: [],
      staffFundLedger: [],
      transactionHistory: [],
    };

    const updatedList = [created, ...merchants];
    setMerchants(updatedList);
    try {
      localStorage.setItem('yebo_admin_merchants', JSON.stringify(updatedList));
    } catch {}

    setIsAddModalOpen(false);
    setNewMerchant({
      businessName: '',
      owner: '',
      contact: '',
      email: '',
      category: 'Food & Beverage',
      address: '',
      status: 'Active',
    });
    setCurrentPage(1);
    toast.success(`Merchant "${created.businessName}" added successfully!`);
  };

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
        (merchant.email && merchant.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
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

    setMerchants((prev) => {
      const updated = prev.map((m) => (m.id === merchant.id ? { ...m, status: nextStatus } : m));
      try {
        localStorage.setItem('yebo_admin_merchants', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    toast.success(`Merchant ${merchant.businessName} marked as ${nextStatus}.`);
    setConfirmDialog({ isOpen: false, action: 'approve', merchant: null });
  };

  const columns = [
    {
      header: 'Merchant ID',
      key: 'id',
      cellClassName: 'whitespace-nowrap',
      render: (item) => (
        <span className="font-mono font-extrabold text-[#0c1844] whitespace-nowrap">{item.id}</span>
      ),
    },
    {
      header: 'Business Name',
      key: 'businessName',
      cellClassName: 'whitespace-nowrap',
      render: (item) => (
        <div className="whitespace-nowrap">
          <div className="font-bold text-slate-900 whitespace-nowrap">{item.businessName}</div>
          <div className="text-[11px] text-slate-400 whitespace-nowrap">{item.businessInfo?.category}</div>
        </div>
      ),
    },
    {
      header: 'Owner',
      key: 'owner',
      cellClassName: 'whitespace-nowrap',
      render: (item) => <span className="font-bold text-slate-800 whitespace-nowrap">{item.owner}</span>,
    },
    {
      header: 'Contact',
      key: 'contact',
      cellClassName: 'whitespace-nowrap',
      render: (item) => (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <Phone className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="text-slate-600 font-medium whitespace-nowrap">{item.contact}</span>
        </div>
      ),
    },
    {
      header: 'Email',
      key: 'email',
      cellClassName: 'whitespace-nowrap',
      render: (item) => (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <Mail className="w-3 h-3 text-slate-400 shrink-0" />
          <a
            href={`mailto:${item.email}`}
            className="text-[#F97316] hover:underline font-medium whitespace-nowrap block"
            onClick={(e) => e.stopPropagation()}
          >
            {item.email}
          </a>
        </div>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      cellClassName: 'whitespace-nowrap',
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
      cellClassName: 'whitespace-nowrap',
      render: (item) => <span className="font-bold text-slate-900 whitespace-nowrap">{item.staffFund}</span>,
    },
    {
      header: 'Registration Date',
      key: 'registrationDate',
      cellClassName: 'whitespace-nowrap',
      render: (item) => <span className="text-slate-500 font-mono text-[11px] whitespace-nowrap">{item.registrationDate}</span>,
    },
    {
      header: 'Actions',
      key: 'actions',
      cellClassName: 'whitespace-nowrap',
      render: (item) => (
        <div className="flex items-center gap-1 whitespace-nowrap">
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
              onClick={() => setIsAddModalOpen(true)}
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
        minWidth="1250px"
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

      {/* Add Merchant Modal */}
      <AdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Merchant"
        subtitle="Register a new partner store or service provider"
        icon={Store}
        iconBg="bg-orange-50 text-[#F97316]"
        maxWidth="max-w-xl"
        footer={
          <div className="flex items-center justify-end gap-2.5 w-full">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="add-merchant-form"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#F97316] hover:bg-[#EA580C] transition shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Merchant
            </button>
          </div>
        }
      >
        <form id="add-merchant-form" onSubmit={handleAddMerchant} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Business Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={newMerchant.businessName}
              onChange={(e) => setNewMerchant({ ...newMerchant, businessName: e.target.value })}
              placeholder="e.g. Ocean Basket Waterfront"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#F97316] focus:bg-white focus:ring-2 focus:ring-orange-100 text-slate-900 font-medium transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Owner / Manager Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={newMerchant.owner}
              onChange={(e) => setNewMerchant({ ...newMerchant, owner: e.target.value })}
              placeholder="e.g. David Naidoo"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#F97316] focus:bg-white focus:ring-2 focus:ring-orange-100 text-slate-900 font-medium transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Contact Phone <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={newMerchant.contact}
                  onChange={(e) => setNewMerchant({ ...newMerchant, contact: e.target.value })}
                  placeholder="+27 21 555 1234"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#F97316] focus:bg-white focus:ring-2 focus:ring-orange-100 text-slate-900 font-medium transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={newMerchant.email}
                  onChange={(e) => setNewMerchant({ ...newMerchant, email: e.target.value })}
                  placeholder="contact@oceanbasket.co.za"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#F97316] focus:bg-white focus:ring-2 focus:ring-orange-100 text-slate-900 font-medium transition"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={newMerchant.category}
                onChange={(e) => setNewMerchant({ ...newMerchant, category: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#F97316] focus:bg-white focus:ring-2 focus:ring-orange-100 text-slate-900 font-medium transition cursor-pointer"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Status
              </label>
              <select
                value={newMerchant.status}
                onChange={(e) => setNewMerchant({ ...newMerchant, status: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#F97316] focus:bg-white focus:ring-2 focus:ring-orange-100 text-slate-900 font-medium transition cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending Review</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Physical Address (Optional)
            </label>
            <input
              type="text"
              value={newMerchant.address}
              onChange={(e) => setNewMerchant({ ...newMerchant, address: e.target.value })}
              placeholder="e.g. Shop 4, Victoria Wharf, Cape Town"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#F97316] focus:bg-white focus:ring-2 focus:ring-orange-100 text-slate-900 font-medium transition"
            />
          </div>
        </form>
      </AdminModal>
    </div>
  );
}

export default AdminMerchantsPage;
