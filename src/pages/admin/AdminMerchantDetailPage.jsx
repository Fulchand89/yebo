import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Tag,
  Users2,
  History,
  MapPin,
  FileCheck,
  Star,
  CheckCircle2,
  Plus,
  User,
  Phone,
  Mail,
  Calendar,
  Hash,
  FileText,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ConfirmationDialog } from '@/components/admin/ConfirmationDialog';
import { mockMerchants } from '@/data/adminMockData';

export function AdminMerchantDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const merchant = useMemo(() => {
    try {
      const saved = localStorage.getItem('yebo_admin_merchants');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const found = parsed.find((m) => m.id === id);
          if (found) return found;
        }
      }
    } catch {}
    return mockMerchants.find((m) => m.id === id) || mockMerchants[0];
  }, [id]);

  const [activeTab, setActiveTab] = useState('business'); // 'business' | 'deals' | 'staff' | 'transactions'
  const [currentStatus, setCurrentStatus] = useState(merchant.status);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const tabs = [
    { id: 'business', label: 'Business Information', icon: Building2 },
    { id: 'deals', label: 'Deals Portfolio', icon: Tag, count: merchant.dealsList?.length || merchant.deals },
    { id: 'staff', label: 'Staff Fund', icon: Users2 },
    { id: 'transactions', label: 'Transaction History', icon: History },
  ];

  const handleStatusToggle = () => {
    const nextStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    setCurrentStatus(nextStatus);
    try {
      const saved = localStorage.getItem('yebo_admin_merchants');
      const list = saved ? JSON.parse(saved) : mockMerchants;
      const updated = list.map((m) => (m.id === merchant.id ? { ...m, status: nextStatus } : m));
      localStorage.setItem('yebo_admin_merchants', JSON.stringify(updated));
    } catch {}
    toast.success(`Merchant status updated to ${nextStatus}.`);
    setConfirmOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Back button & ID */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/admin/merchants')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-bold text-xs transition cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Merchants
        </button>
        <span className="text-xs text-slate-400 font-mono">Merchant ID: {merchant.id}</span>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-1.5 flex flex-wrap gap-1 shadow-xs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                isActive
                  ? 'bg-[#0c1844] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panes */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        {/* 1. Business Information */}
        {activeTab === 'business' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F97316] border border-orange-200 flex items-center justify-center font-black text-lg shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                    Business Registration & Profile
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Complete verified merchant information, contact details & legal registration
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setConfirmOpen(true)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                    currentStatus === 'Active'
                      ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200/80'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200/80'
                  }`}
                >
                  {currentStatus === 'Active' ? 'Suspend Store' : 'Activate Store'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {/* Business Name */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#F97316]" />
                  Business Name
                </span>
                <p className="text-sm font-bold text-slate-900 mt-1">{merchant.businessName}</p>
              </div>

              {/* Merchant ID */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-slate-400" />
                  Merchant ID
                </span>
                <p className="text-sm font-bold font-mono text-slate-900 mt-1">{merchant.id}</p>
              </div>

              {/* Operating Status */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                  Account Status
                </span>
                <div className="mt-1">
                  <StatusBadge status={currentStatus} />
                </div>
              </div>

              {/* Owner */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Owner / Representative
                </span>
                <p className="text-sm font-bold text-slate-800 mt-1">{merchant.owner}</p>
              </div>

              {/* Contact Phone */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  Contact Phone
                </span>
                <p className="text-sm font-bold text-slate-800 mt-1">{merchant.contact}</p>
              </div>

              {/* Email Address */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  Email Address
                </span>
                <p className="text-sm font-bold text-slate-800 mt-1 truncate" title={merchant.email || 'N/A'}>
                  {merchant.email || 'N/A'}
                </p>
              </div>

              {/* Registered Date */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Registered Date
                </span>
                <p className="text-sm font-bold text-slate-800 mt-1">{merchant.registrationDate}</p>
              </div>

              {/* Industry Category */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  Industry Category
                </span>
                <p className="text-sm font-bold text-slate-800 mt-1">{merchant.businessInfo?.category || 'Retail'}</p>
              </div>

              {/* Customer Rating */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  Customer Rating
                </span>
                <p className="text-sm font-bold text-amber-600 mt-1 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  {merchant.businessInfo?.rating || 4.8} / 5.0
                </p>
              </div>

              {/* CIPC Registration */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-slate-400" />
                  CIPC Registration
                </span>
                <p className="text-sm font-bold font-mono text-slate-800 mt-1">{merchant.businessInfo?.regNumber || '2021/098124/07'}</p>
              </div>

              {/* VAT / Tax Number */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  VAT / Tax Number
                </span>
                <p className="text-sm font-bold font-mono text-slate-800 mt-1">{merchant.businessInfo?.vatNumber || '4920194821'}</p>
              </div>

              {/* Physical Store Address */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F97316]" />
                  Physical Store Address
                </span>
                <p className="text-sm font-bold text-slate-800 mt-1">
                  {merchant.businessInfo?.address || '142 5th Street, Sandton, Johannesburg'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. Deals */}
        {activeTab === 'deals' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Deals & Perks Portfolio
              </h3>
              <button
                type="button"
                onClick={() => toast.success('Add deal modal (UI demo)...')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-[#F97316] hover:bg-[#F97316] transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Deal
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {merchant.dealsList && merchant.dealsList.length > 0 ? (
                merchant.dealsList.map((deal) => (
                  <div key={deal.id} className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-slate-400">{deal.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${deal.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                        {deal.active ? 'LIVE' : 'PAUSED'}
                      </span>
                    </div>
                    <h4 className="text-sm font-black text-slate-900">{deal.title}</h4>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                      <span className="font-semibold text-slate-500">{deal.type}</span>
                      <span className="font-bold text-slate-900">{deal.claims} Redemptions</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 py-6 text-center col-span-2">No active deals configured for this merchant.</p>
              )}
            </div>
          </div>
        )}

        {/* 3. Staff Fund */}
        {activeTab === 'staff' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Staff Fund Accruals & Payouts
              </h3>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Available Fund</span>
                <span className="text-lg font-black text-[#F97316]">{merchant.staffFund}</span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase">
                  <tr>
                    <th className="p-3">Ref ID</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Distribution Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {merchant.staffFundLedger?.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-[#0c1844]">{entry.id}</td>
                      <td className="p-3 text-slate-500 font-mono text-[11px]">{entry.date}</td>
                      <td className="p-3 font-bold text-slate-800">{entry.type}</td>
                      <td className={`p-3 font-bold ${entry.amount.startsWith('-') ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {entry.amount}
                      </td>
                      <td className="p-3 text-slate-600">{entry.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. Transaction History */}
        {activeTab === 'transactions' && (
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Customer Perk Redemptions & Settlements
            </h3>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase">
                  <tr>
                    <th className="p-3">Transaction ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Date & Time</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {merchant.transactionHistory?.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-[#0c1844]">{tx.id}</td>
                      <td className="p-3 font-bold text-slate-800">{tx.customer}</td>
                      <td className="p-3 font-bold text-slate-900">{tx.amount}</td>
                      <td className="p-3 text-slate-500 font-mono text-[11px]">{tx.date}</td>
                      <td className="p-3">
                        <StatusBadge status={tx.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleStatusToggle}
        title={currentStatus === 'Active' ? 'Suspend Store Operations' : 'Activate Store Operations'}
        message={`Are you sure you want to change trading status for ${merchant.businessName} to ${currentStatus === 'Active' ? 'Suspended' : 'Active'}?`}
        confirmLabel={currentStatus === 'Active' ? 'Suspend Store' : 'Activate Store'}
        variant={currentStatus === 'Active' ? 'warning' : 'success'}
      />
    </div>
  );
}

export default AdminMerchantDetailPage;
