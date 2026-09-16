import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Store,
  CreditCard,
  AlertTriangle,
  FileCheck2,
  DollarSign,
  TrendingUp,
  Landmark,
  Calendar,
  Layers,
  Send,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { StatCard } from '@/components/admin/StatCard';
import { FilterBar } from '@/components/admin/FilterBar';
import {
  adminStats,
  userGrowthData,
  merchantGrowthData,
  transactionOverviewData,
  successVsFailedData,
  commissionOverviewData,
} from '@/data/adminMockData';

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState('Last 30 Days');

  const dateFilterOptions = [
    { value: 'Today', label: 'Today' },
    { value: 'Last 7 Days', label: 'Last 7 Days' },
    { value: 'Last 30 Days', label: 'Last 30 Days' },
    { value: 'This Month', label: 'This Month' },
    { value: 'Custom Range', label: 'Custom Range' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Date Filter Controls */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              EXECUTIVE OVERVIEW
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE TELEMETRY
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time subscriber engagement, merchant settlements, and commission yield
          </p>
        </div>

        {/* Date Range Selector */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <Calendar className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
          <FilterBar
            options={dateFilterOptions}
            activeValue={dateFilter}
            onChange={setDateFilter}
          />
        </div>
      </div>

      {/* 11 Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <StatCard
          title="Total Users"
          value={adminStats.totalUsers}
          change="+14.2%"
          trend="up"
          period="Registered subscribers"
          icon={Users}
          onClick={() => navigate('/admin/users')}
        />

        {/* Active Users */}
        <StatCard
          title="Active Users"
          value={adminStats.activeUsers}
          change="+8.9%"
          trend="up"
          period="Active within 30 days"
          icon={CheckCircle2}
          onClick={() => navigate('/admin/users')}
        />

        {/* Total Merchants */}
        <StatCard
          title="Total Merchants"
          value={adminStats.totalMerchants}
          change="+12.5%"
          trend="up"
          period="Onboarded partners"
          icon={Store}
          onClick={() => navigate('/admin/merchants')}
        />

        {/* Pending Merchants */}
        <StatCard
          title="Pending Merchants"
          value={adminStats.pendingMerchants}
          change="Action Required"
          trend="neutral"
          period="Awaiting document audit"
          icon={Clock}
          onClick={() => navigate('/admin/merchants')}
        />

        {/* Total Transactions */}
        <StatCard
          title="Total Transactions"
          value={adminStats.totalTransactions}
          change="+22.4%"
          trend="up"
          period="All-time transactions"
          icon={CreditCard}
          onClick={() => navigate('/admin/payments')}
        />

        {/* Successful Transactions */}
        <StatCard
          title="Successful Transactions"
          value={adminStats.successfulTransactions}
          change="97.4%"
          trend="up"
          period="Gateway completion rate"
          icon={FileCheck2}
          onClick={() => navigate('/admin/payments')}
        />

        {/* Failed Transactions */}
        <StatCard
          title="Failed Transactions"
          value={adminStats.failedTransactions}
          change="2.1%"
          trend="down"
          period="Declines & card timeouts"
          icon={AlertTriangle}
          variant="danger"
          onClick={() => navigate('/admin/payments/failed')}
        />

        {/* Duplicate Events */}
        <StatCard
          title="Duplicate Events"
          value={adminStats.duplicateEvents}
          change="250 Blocked"
          trend="neutral"
          period="Idempotent suppression"
          icon={Layers}
          variant="warning"
          onClick={() => navigate('/admin/payments/duplicates')}
        />

        {/* Total Commission */}
        <StatCard
          title="Total Commission"
          value={adminStats.totalCommission}
          change="+18.7%"
          trend="up"
          period="Subscriber & platform pool"
          icon={TrendingUp}
          onClick={() => navigate('/admin/commission')}
        />

        {/* Treasury Balance */}
        <StatCard
          title="Treasury Balance"
          value={adminStats.treasuryBalance}
          change="+5.4%"
          trend="up"
          period="YEBO reserve account"
          icon={Landmark}
          onClick={() => navigate('/admin/commission')}
        />

        {/* Pending EFT */}
        <StatCard
          title="Pending EFT"
          value={adminStats.pendingEft}
          change="24 Batches"
          trend="neutral"
          period="Scheduled disbursement"
          icon={Send}
          onClick={() => navigate('/admin/eft')}
        />
      </div>

      {/* Row 1 Charts: User Growth & Merchant Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: User Growth */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                User Growth
              </h3>
              <p className="text-[11px] text-slate-500">
                Monthly total registered vs active users
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              +139% YoY
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0c1844" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0c1844" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis
                  width={45}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => (val >= 1000 ? `${val / 1000}k` : val)}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#e2e8f0', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="users" name="Total Users" stroke="#F97316" strokeWidth={2.5} fillOpacity={1} fill="url(#userGradient)" />
                <Area type="monotone" dataKey="active" name="Active Users" stroke="#0c1844" strokeWidth={2} fillOpacity={1} fill="url(#activeGradient)" />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Merchant Growth */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Merchant Growth
              </h3>
              <p className="text-[11px] text-slate-500">
                Partner stores onboarded and active
              </p>
            </div>
            <span className="text-xs font-bold text-[#F97316] bg-orange-50 px-2 py-0.5 rounded-md">
              245 Stores
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={merchantGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis width={35} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#e2e8f0', fontSize: '11px' }}
                />
                <Bar dataKey="approved" name="Approved Partners" fill="#0c1844" radius={[6, 6, 0, 0]} />
                <Bar dataKey="pending" name="Pending Review" fill="#F97316" radius={[6, 6, 0, 0]} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2 Charts: Transaction Overview & Successful vs Failed & Commission */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 3: Transaction Overview */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Transaction Overview
              </h3>
              <p className="text-[11px] text-slate-500">
                Daily transaction volume and gross throughput
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/admin/payments')}
              className="text-xs font-bold text-[#F97316] hover:underline flex items-center gap-1"
            >
              <span>View Records</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transactionOverviewData} margin={{ top: 10, right: 15, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis
                  yAxisId="left"
                  width={45}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => (val >= 1000 ? `${val / 1000}k` : val)}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  width={55}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => (val >= 1000 ? `₹${val / 1000}k` : `₹${val}`)}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#e2e8f0', fontSize: '11px' }}
                />
                <Line yAxisId="left" type="monotone" dataKey="volume" name="Scan Volume" stroke="#F97316" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line yAxisId="right" type="monotone" dataKey="amount" name="Amount (₹)" stroke="#0c1844" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Successful vs Failed Transactions */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Transaction Breakdown
            </h3>
            <p className="text-[11px] text-slate-500">
              Successful vs Failed vs Duplicate ratio
            </p>
          </div>

          <div className="h-52 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={successVsFailedData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {successVsFailedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#e2e8f0', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Successful
              </span>
              <span className="font-bold text-slate-900">57,420 (97.4%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                Failed
              </span>
              <span className="font-bold text-slate-900">1,250 (2.1%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                Duplicate Events
              </span>
              <span className="font-bold text-slate-900">250 (0.4%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart 5: Commission Overview */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Commission Overview
            </h3>
            <p className="text-[11px] text-slate-500">
              Yield split across Subscriber Cashback, Merchant Deductions, and Treasury Reserve
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/admin/commission')}
            className="text-xs font-bold text-[#F97316] hover:underline flex items-center gap-1"
          >
            <span>Open Ledger</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={commissionOverviewData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis
                width={65}
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => (value >= 1000 ? `₹${(value / 1000).toLocaleString()}k` : `₹${value}`)}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#e2e8f0', fontSize: '11px' }}
                formatter={(value, name) => [`₹${Number(value).toLocaleString()}`, name]}
              />
              <Bar dataKey="subscriber" name="Subscriber Cashback" stackId="a" fill="#F97316" />
              <Bar dataKey="merchant" name="Merchant Deductions" stackId="a" fill="#0c1844" />
              <Bar dataKey="treasury" name="Treasury Allocation" stackId="a" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
