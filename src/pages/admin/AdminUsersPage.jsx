import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Eye,
  UserX,
  UserCheck,
  Download,
  X,
  User,
  Wallet,
  Crown,
  Share2,
  AlertTriangle,
  History,
  ShieldCheck,
  Building,
  ChevronRight,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  CreditCard,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  SearchBar,
  FilterBar,
  StatusBadge,
  ConfirmationDialog,
  Pagination,
} from '@/components/admin';
import { mockUsers } from '@/data/adminMockData';

// ─── Utility: Subscription pill color ────────────────────────────────────────
function SubscriptionBadge({ tier }) {
  const styles = {
    'VIP Member': 'bg-amber-50 text-amber-700 border border-amber-200',
    'Premium': 'bg-violet-50 text-violet-700 border border-violet-200',
    'Free Tier': 'bg-slate-100 text-slate-600 border border-slate-200',
  };
  const cls = styles[tier] || styles['Free Tier'];
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${cls}`}>
      {tier}
    </span>
  );
}

// ─── User Detail Modal ────────────────────────────────────────────────────────
function UserDetailModal({ user, onClose, onStatusChange }) {
  const [activeTab, setActiveTab] = useState('personal');
  const navigate = useNavigate();

  if (!user) return null;

  const tabs = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'financial', label: 'Financial', icon: Wallet },
    { id: 'subscription', label: 'Subscription', icon: Crown },
    { id: 'referral', label: 'Referral', icon: Share2 },
    { id: 'forfeiture', label: 'Forfeiture', icon: AlertTriangle },
    { id: 'transactions', label: 'Transactions', icon: History },
  ];

  const initials = user.name.split(' ').map((n) => n[0]).join('').slice(0, 2);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className="relative bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-start justify-between p-5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0c1844] text-white flex items-center justify-center font-black text-lg shrink-0">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-slate-900">{user.name}</h2>
                <StatusBadge status={user.status} />
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 font-mono">{user.id}</p>
              <p className="text-[11px] text-slate-500">{user.email} • {user.mobile}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => { onClose(); navigate(`/admin/users/${user.id}`); }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#0c1844] border border-[#0c1844]/20 hover:bg-[#0c1844]/5 transition cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Full Profile
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-4 divide-x divide-slate-100 bg-slate-50/60 border-b border-slate-100 shrink-0">
          {[
            { label: 'Balance', value: user.balance, color: 'text-[#F97316]' },
            { label: 'Subscription', value: user.subscription, color: 'text-violet-700' },
            { label: 'Forfeiture', value: user.forfeiture, color: user.forfeiture !== '₹0.00' ? 'text-rose-600' : 'text-slate-700' },
            { label: 'Referral', value: user.referral, color: 'text-slate-700' },
          ].map(({ label, value, color }) => (
            <div key={label} className="px-4 py-2.5 text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{label}</p>
              <p className={`text-xs font-bold mt-0.5 truncate ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Tab Bar */}
        <div className="flex overflow-x-auto scrollbar-none border-b border-slate-100 shrink-0 px-4 pt-3 pb-0 gap-0.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-t-xl text-[11px] font-bold whitespace-nowrap transition cursor-pointer border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-[#F97316] text-[#F97316] bg-orange-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5" style={{ scrollbarWidth: 'none' }}>
          {/* Personal Information */}
          {activeTab === 'personal' && (
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Personal Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Legal Name', value: user.personalInfo?.fullName || user.name, icon: User },
                  { label: 'National ID / Passport', value: user.personalInfo?.idNumber || '—', icon: CreditCard },
                  { label: 'KYC Verification', value: user.personalInfo?.kycStatus || '—', icon: ShieldCheck },
                  { label: 'City / Province', value: `${user.personalInfo?.city || '—'}, ${user.personalInfo?.province || '—'}`, icon: MapPin },
                  { label: 'Primary Mobile', value: user.mobile, icon: Phone },
                  { label: 'Email Address', value: user.email, icon: Mail },
                  { label: 'Registration Date', value: user.createdDate || '—', icon: null },
                  { label: 'Account Status', value: user.status, icon: null, isStatus: true },
                ].map(({ label, value, icon: Icon, isStatus }) => (
                  <div key={label} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mb-1">{label}</p>
                    {isStatus ? (
                      <StatusBadge status={value} />
                    ) : (
                      <div className="flex items-center gap-1.5">
                        {Icon && <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                        <p className="text-xs font-bold text-slate-800">{value}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Financial */}
          {activeTab === 'financial' && (
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Financial Summary</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-orange-50/60 border border-orange-200/70 rounded-2xl">
                  <p className="text-[10px] font-bold text-[#F97316] uppercase tracking-wide">Available Balance</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">{user.financialInfo?.walletBalance || user.balance}</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Total Lifetime Spent</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">{user.financialInfo?.totalSpent || '—'}</p>
                </div>
                <div className="p-4 bg-emerald-50/60 border border-emerald-200/70 rounded-2xl">
                  <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">Total Cashback Earned</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">{user.financialInfo?.totalCashback || '—'}</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-2">Payout Bank Account</p>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-800">{user.financialInfo?.bankName || '—'}</span>
                  <span className="text-xs font-mono text-slate-500">({user.financialInfo?.accountNumber || '—'})</span>
                  {user.financialInfo?.bankName && user.financialInfo?.bankName !== 'N/A' && (
                    <span className="text-emerald-600 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded-md ml-auto">Active for EFT</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Subscription */}
          {activeTab === 'subscription' && (
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Subscription Status</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Tier', value: user.subscriptionDetails?.tier || user.subscription },
                  { label: 'Monthly Fee', value: user.subscriptionDetails?.monthlyFee || '—' },
                  { label: 'Renewal Date', value: user.subscriptionDetails?.renewalDate || '—' },
                  { label: 'Perks Claimed', value: `${user.subscriptionDetails?.perksUsed ?? '—'} deals` },
                ].map(({ label, value }) => (
                  <div key={label} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{label}</p>
                    <p className={`text-sm font-extrabold mt-1 ${label === 'Tier' ? 'text-[#F97316]' : 'text-slate-900'}`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Referral */}
          {activeTab === 'referral' && (
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Referral Portfolio</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Referred By', value: user.referralDetails?.referredBy || user.referral },
                  { label: 'Referral Code', value: user.referralDetails?.referralCode || '—', mono: true },
                  { label: 'Total Referrals', value: `${user.referralDetails?.referralCount ?? '—'} friends` },
                  { label: 'Referral Earnings', value: user.referralDetails?.referralEarnings || '₹0.00', green: true },
                ].map(({ label, value, mono, green }) => (
                  <div key={label} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{label}</p>
                    <p className={`text-sm font-bold mt-1 ${mono ? 'font-mono text-[#F97316]' : green ? 'text-emerald-600' : 'text-slate-800'}`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Forfeiture */}
          {activeTab === 'forfeiture' && (
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Forfeiture & Compliance</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Total Forfeited Funds', value: user.forfeitureDetails?.totalForfeited || user.forfeiture, danger: true },
                  { label: 'Last Audit Review', value: user.forfeitureDetails?.lastReviewDate || '—' },
                  { label: 'Risk / Fraud Rating', value: user.forfeitureDetails?.riskScore || '—' },
                ].map(({ label, value, danger }) => (
                  <div key={label} className={`p-3 rounded-xl border ${danger && value !== '₹0.00' ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-100'}`}>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{label}</p>
                    <p className={`text-sm font-bold mt-1 ${danger && value !== '₹0.00' ? 'text-rose-700' : 'text-slate-800'}`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transaction History */}
          {activeTab === 'transactions' && (
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Recent Transactions</h4>
              {!user.transactions || user.transactions.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">No transactions found.</div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3">TXN ID</th>
                        <th className="px-4 py-3">Merchant / Purpose</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {user.transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-50 transition">
                          <td className="px-4 py-3 font-mono font-bold text-[#0c1844]">{tx.id}</td>
                          <td className="px-4 py-3 font-bold text-slate-800">{tx.merchant}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">{tx.type}</span>
                          </td>
                          <td className="px-4 py-3 font-bold text-slate-900">{tx.amount}</td>
                          <td className="px-4 py-3 text-slate-500 font-mono text-[11px]">{tx.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-100 px-5 py-3 flex items-center justify-between gap-3 bg-slate-50/50 shrink-0">
          <span className="text-[11px] text-slate-500">
            Joined: <span className="font-bold text-slate-700">{user.createdDate}</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onStatusChange(user);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                user.status === 'Active'
                  ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  : user.status === 'Blocked'
                  ? 'bg-rose-50 text-rose-700 cursor-not-allowed opacity-60'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
              disabled={user.status === 'Blocked'}
            >
              {user.status === 'Active' ? 'Suspend Access' : user.status === 'Blocked' ? 'Blocked (Admin Only)' : 'Activate Account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function AdminUsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [subscriptionFilter, setSubscriptionFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Modal state
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, type: 'suspend', user: null });

  // ─── Data Loading (API-first, fallback to mock) ─────────────────────────
  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      // Attempt real API
      const { default: userService } = await import('@/api/services/userService');
      const response = await userService.getUsers();
      const apiData = response?.data;
      if (Array.isArray(apiData) && apiData.length > 0) {
        setUsers(apiData);
      } else {
        // API returned empty — use rich mock data
        setUsers(mockUsers);
      }
    } catch {
      // Network/API error — fall back gracefully
      setUsers(mockUsers);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // ─── Filter options (dynamic from loaded users) ──────────────────────────
  const statusOptions = useMemo(() => [
    { value: 'All', label: 'All Users', count: users.length },
    { value: 'Active', label: 'Active', count: users.filter((u) => u.status === 'Active').length },
    { value: 'Suspended', label: 'Suspended', count: users.filter((u) => u.status === 'Suspended').length },
    { value: 'Inactive', label: 'Inactive', count: users.filter((u) => u.status === 'Inactive').length },
    { value: 'Blocked', label: 'Blocked', count: users.filter((u) => u.status === 'Blocked').length },
  ], [users]);

  // ─── Filtering ────────────────────────────────────────────────────────────
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        q === '' ||
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.mobile.includes(q) ||
        user.id.toLowerCase().includes(q) ||
        (user.referral && user.referral.toLowerCase().includes(q));

      const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
      const matchesSub =
        subscriptionFilter === 'All' || user.subscription.toLowerCase().includes(subscriptionFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesSub;
    });
  }, [users, searchQuery, statusFilter, subscriptionFilter]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, currentPage]);

  // ─── Status Toggle ────────────────────────────────────────────────────────
  const handleStatusChange = (user) => {
    if (user.status === 'Blocked') return;
    setConfirmDialog({
      isOpen: true,
      type: user.status === 'Active' ? 'suspend' : 'activate',
      user,
    });
  };

  const handleActionConfirm = () => {
    if (!confirmDialog.user) return;
    const newStatus = confirmDialog.type === 'suspend' ? 'Suspended' : 'Active';
    setUsers((prev) => prev.map((u) => (u.id === confirmDialog.user.id ? { ...u, status: newStatus } : u)));
    // Sync selected user if open
    if (selectedUser?.id === confirmDialog.user.id) {
      setSelectedUser((prev) => prev ? { ...prev, status: newStatus } : null);
    }
    toast.success(`${confirmDialog.user.name} status changed to ${newStatus}.`);
    setConfirmDialog({ isOpen: false, type: 'suspend', user: null });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setSubscriptionFilter('All');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery !== '' || statusFilter !== 'All' || subscriptionFilter !== 'All';

  return (
    <div className="space-y-5">
      {/* ─── Filter & Search Bar ──────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <SearchBar
            value={searchQuery}
            onChange={(q) => { setSearchQuery(q); setCurrentPage(1); }}
            placeholder="Search by name, email, mobile, ID or referral..."
            className="w-full sm:w-96"
          />

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <select
              value={subscriptionFilter}
              onChange={(e) => { setSubscriptionFilter(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#F97316] font-semibold text-slate-700 cursor-pointer"
            >
              <option value="All">All Plans</option>
              <option value="VIP">VIP Member</option>
              <option value="Premium">Premium</option>
              <option value="Free">Free Tier</option>
            </select>

            <button
              type="button"
              onClick={() => toast.success('Exporting users list...')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>

        <FilterBar
          options={statusOptions}
          activeValue={statusFilter}
          onChange={(val) => { setStatusFilter(val); setCurrentPage(1); }}
          showReset={hasActiveFilters}
          onReset={resetFilters}
        />
      </div>

      {/* ─── Users Table ─────────────────────────────────────────────────── */}
      <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
        {isLoading ? (
          <div className="py-16 text-center text-xs text-slate-400">
            <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
            Loading users...
          </div>
        ) : paginatedUsers.length === 0 ? (
          <div className="py-16 text-center">
            <Users className="w-10 h-10 mx-auto mb-3 text-slate-300" />
            <p className="text-sm font-bold text-slate-500">No subscribers found</p>
            <p className="text-xs text-slate-400 mt-1">Try clearing filters or adjusting your search.</p>
          </div>
        ) : (
          <table className="w-full text-left text-xs text-slate-700" style={{ minWidth: '1020px' }}>
            <thead className="bg-slate-50/80 text-[10px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200/80">
              <tr>
                <th className="px-4 py-3.5 whitespace-nowrap">User ID</th>
                <th className="px-4 py-3.5 whitespace-nowrap">Name</th>
                <th className="px-4 py-3.5 whitespace-nowrap">Email</th>
                <th className="px-4 py-3.5 whitespace-nowrap">Mobile</th>
                <th className="px-4 py-3.5 whitespace-nowrap">Status</th>
                <th className="px-4 py-3.5 whitespace-nowrap">Referral</th>
                <th className="px-4 py-3.5 whitespace-nowrap">Balance</th>
                <th className="px-4 py-3.5 whitespace-nowrap">Subscription</th>
                <th className="px-4 py-3.5 whitespace-nowrap">Forfeiture</th>
                <th className="px-4 py-3.5 whitespace-nowrap text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/90">
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-orange-50/30 transition-colors group"
                >
                  {/* USER ID */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-mono font-bold text-[#0c1844] text-[11px]">{user.id}</span>
                  </td>

                  {/* NAME */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-black text-[10px] shrink-0">
                        {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{user.name}</p>
                        {user.personalInfo?.city && (
                          <p className="text-[10px] text-slate-400">{user.personalInfo.city}</p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="px-4 py-3.5">
                    <span className="text-slate-500 font-normal max-w-[180px] block truncate">{user.email}</span>
                  </td>

                  {/* MOBILE */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-slate-600 font-medium">{user.mobile}</span>
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <StatusBadge status={user.status} />
                  </td>

                  {/* REFERRAL */}
                  <td className="px-4 py-3.5">
                    <span className="text-slate-600 font-medium max-w-[140px] block truncate">
                      {user.referral || 'Direct'}
                    </span>
                  </td>

                  {/* BALANCE */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-bold text-slate-900">{user.balance}</span>
                  </td>

                  {/* SUBSCRIPTION */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <SubscriptionBadge tier={user.subscription} />
                  </td>

                  {/* FORFEITURE */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span
                      className={`font-bold ${
                        user.forfeiture !== '₹0.00'
                          ? 'text-rose-600'
                          : 'text-slate-400'
                      }`}
                    >
                      {user.forfeiture}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3.5 whitespace-nowrap text-center">
                    <button
                      type="button"
                      onClick={() => setSelectedUser(user)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold text-[#0c1844] bg-slate-100 hover:bg-[#0c1844] hover:text-white transition cursor-pointer group-hover:shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ─── Pagination ───────────────────────────────────────────────────── */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredUsers.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />

      {/* ─── User Detail Modal ────────────────────────────────────────────── */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* ─── Suspend / Activate Confirmation ─────────────────────────────── */}
      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, type: 'suspend', user: null })}
        onConfirm={handleActionConfirm}
        variant={confirmDialog.type === 'suspend' ? 'warning' : 'success'}
        title={confirmDialog.type === 'suspend' ? 'Suspend User Access' : 'Reactivate User Account'}
        message={
          confirmDialog.type === 'suspend'
            ? `Suspend access for ${confirmDialog.user?.name} (${confirmDialog.user?.id})? They will not be able to claim deals until reactivated.`
            : `Reactivate account for ${confirmDialog.user?.name}? All membership privileges will be restored.`
        }
        confirmLabel={confirmDialog.type === 'suspend' ? 'Suspend User' : 'Activate User'}
      />
    </div>
  );
}

export default AdminUsersPage;
