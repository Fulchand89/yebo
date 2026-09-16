import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  CreditCard,
  Crown,
  Share2,
  AlertTriangle,
  History,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Wallet,
  Calendar,
  Building,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ConfirmationDialog } from '@/components/admin/ConfirmationDialog';
import { mockUsers } from '@/data/adminMockData';

export function AdminUserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = mockUsers.find((u) => u.id === id) || mockUsers[0];
  const [activeTab, setActiveTab] = useState('personal'); // 'personal' | 'financial' | 'subscription' | 'referral' | 'forfeiture' | 'transactions'
  const [currentStatus, setCurrentStatus] = useState(user.status);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: User },
    { id: 'financial', label: 'Financial Information', icon: Wallet },
    { id: 'subscription', label: 'Subscription', icon: Crown },
    { id: 'referral', label: 'Referral', icon: Share2 },
    { id: 'forfeiture', label: 'Forfeiture', icon: AlertTriangle },
    { id: 'transactions', label: 'Transaction History', icon: History },
  ];

  const handleStatusToggle = () => {
    const nextStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    setCurrentStatus(nextStatus);
    toast.success(`User status changed to ${nextStatus}.`);
    setConfirmOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Back Nav & Quick Summary Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/admin/users')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-bold text-xs transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Users
        </button>
        <span className="text-xs text-slate-400 font-mono">ID: {user.id}</span>
      </div>

      {/* User Executive Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0c1844] text-white flex items-center justify-center font-black text-xl shrink-0">
            {user.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900">{user.name}</h2>
              <StatusBadge status={currentStatus} />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {user.email} • {user.mobile} • Joined {user.createdDate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              currentStatus === 'Active'
                ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            {currentStatus === 'Active' ? 'Suspend Access' : 'Activate Account'}
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
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
            </button>
          );
        })}
      </div>

      {/* Tab Content Panes */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        {/* 1. Personal Information */}
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Legal Name</span>
                <p className="text-sm font-bold text-slate-800 mt-1">{user.personalInfo?.fullName || user.name}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px]">National ID / Passport</span>
                <p className="text-sm font-bold font-mono text-slate-800 mt-1">{user.personalInfo?.idNumber || '8904125432081'}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px]">KYC Verification</span>
                <p className="text-sm font-bold text-emerald-600 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  {user.personalInfo?.kycStatus || 'Verified'}
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px]">City / Region</span>
                <p className="text-sm font-bold text-slate-800 mt-1">{user.personalInfo?.city || 'Johannesburg'}, {user.personalInfo?.province || 'Gauteng'}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Primary Contact</span>
                <p className="text-sm font-bold text-slate-800 mt-1">{user.mobile}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Registration Date</span>
                <p className="text-sm font-bold text-slate-800 mt-1">{user.createdDate}</p>
              </div>
            </div>
          </div>
        )}

        {/* 2. Financial Information */}
        {activeTab === 'financial' && (
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Financial & Ledger Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-orange-50/60 border border-orange-200/70 rounded-2xl">
                <span className="text-xs font-bold text-[#F97316] uppercase">Current Available Balance</span>
                <div className="text-2xl font-black text-slate-900 mt-1">{user.financialInfo?.walletBalance || user.balance}</div>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
                <span className="text-xs font-bold text-slate-500 uppercase">Total Lifetime Spent</span>
                <div className="text-2xl font-black text-slate-900 mt-1">{user.financialInfo?.totalSpent || '₹18,400.00'}</div>
              </div>
              <div className="p-4 bg-emerald-50/60 border border-emerald-200/70 rounded-2xl">
                <span className="text-xs font-bold text-emerald-700 uppercase">Total Cashback Earned</span>
                <div className="text-2xl font-black text-slate-900 mt-1">{user.financialInfo?.totalCashback || '₹2,340.00'}</div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2 mt-4">
              <span className="text-xs font-bold text-slate-600 uppercase">Payout Bank Account</span>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-slate-500" />
                  <span className="font-bold text-slate-800">{user.financialInfo?.bankName || 'Standard Bank'}</span>
                  <span className="font-mono text-slate-500">({user.financialInfo?.accountNumber || '•••• 4192'})</span>
                </div>
                <span className="text-emerald-600 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-md">
                  Active for EFT
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 3. Subscription */}
        {activeTab === 'subscription' && (
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Subscription Status
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Tier</span>
                <p className="text-sm font-extrabold text-[#F97316] mt-1">{user.subscriptionDetails?.tier || user.subscription}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Monthly Fee</span>
                <p className="text-sm font-bold text-slate-900 mt-1">{user.subscriptionDetails?.monthlyFee || '₹99.00'}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Next Renewal Date</span>
                <p className="text-sm font-bold text-slate-900 mt-1">{user.subscriptionDetails?.renewalDate || '2026-11-12'}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Perks Claimed</span>
                <p className="text-sm font-bold text-slate-900 mt-1">{user.subscriptionDetails?.perksUsed || 42} deals</p>
              </div>
            </div>
          </div>
        )}

        {/* 4. Referral */}
        {activeTab === 'referral' && (
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Referral Portfolio
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Referral Code</span>
                <p className="text-sm font-bold font-mono text-[#F97316] mt-1">{user.referralDetails?.referralCode || 'SIPHO-YEB'}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Referred By</span>
                <p className="text-sm font-bold text-slate-800 mt-1">{user.referralDetails?.referredBy || user.referral}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Total Referrals</span>
                <p className="text-sm font-bold text-slate-800 mt-1">{user.referralDetails?.referralCount || 14} friends</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Referral Commission</span>
                <p className="text-sm font-bold text-emerald-600 mt-1">{user.referralDetails?.referralEarnings || '₹1,260.00'}</p>
              </div>
            </div>
          </div>
        )}

        {/* 5. Forfeiture */}
        {activeTab === 'forfeiture' && (
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Forfeiture & Compliance Risk
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Total Forfeited Funds</span>
                <p className="text-sm font-bold text-slate-800 mt-1">{user.forfeitureDetails?.totalForfeited || user.forfeiture}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Last Audit Review</span>
                <p className="text-sm font-bold text-slate-800 mt-1">{user.forfeitureDetails?.lastReviewDate || '2026-08-01'}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Risk / Fraud Rating</span>
                <p className="text-sm font-bold text-slate-800 mt-1">{user.forfeitureDetails?.riskScore || 'Low (0.02)'}</p>
              </div>
            </div>
          </div>
        )}

        {/* 6. Transaction History */}
        {activeTab === 'transactions' && (
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Recent Transactions
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase">
                  <tr>
                    <th className="p-3">TXN ID</th>
                    <th className="p-3">Merchant / Purpose</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {user.transactions?.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-[#0c1844]">{tx.id}</td>
                      <td className="p-3 font-bold text-slate-800">{tx.merchant}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                          {tx.type}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-slate-900">{tx.amount}</td>
                      <td className="p-3 text-slate-500 font-mono text-[11px]">{tx.date}</td>
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
        title={currentStatus === 'Active' ? 'Suspend User Access' : 'Activate User Account'}
        message={`Are you sure you want to change status to ${currentStatus === 'Active' ? 'Suspended' : 'Active'}?`}
        confirmLabel={currentStatus === 'Active' ? 'Suspend' : 'Activate'}
        variant={currentStatus === 'Active' ? 'warning' : 'success'}
      />
    </div>
  );
}

export default AdminUserDetailPage;
