import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '@/components/common';

// Custom SVG icon matching the S2B Staff Fund callout box in the screenshot
function StaffFundCalloutIcon({ className = 'w-5 h-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <path d="M16 12h2" />
      <circle cx="9" cy="12" r="2.5" />
      <path d="M2 10h20" />
    </svg>
  );
}

export function MerchantStaffFundPage({ onNavigate }) {
  // Activity data matching the 4 weeks from the screenshot
  const weeklyActivity = [
    {
      week: 'Week 1',
      amount: 'R5',
      claims: '1 claim',
      heightPercent: 33, // 1 claim proportional height
      heightPx: '36px',
    },
    {
      week: 'Week 2',
      amount: 'R10',
      claims: '2 claims',
      heightPercent: 66, // 2 claims proportional height
      heightPx: '68px',
    },
    {
      week: 'Week 3',
      amount: 'R10',
      claims: '2 claims',
      heightPercent: 66, // 2 claims proportional height
      heightPx: '68px',
    },
    {
      week: 'Week 4',
      amount: 'R15',
      claims: '3 claims',
      heightPercent: 100, // 3 claims proportional height
      heightPx: '98px',
    },
  ];

  const navigate = useNavigate();

  const handleNavigateTo = (target) => {
    if (onNavigate) {
      onNavigate(target);
    } else {
      if (target === 'dashboard') navigate('/');
      else navigate(`/${target}`);
    }
  };

  const handleTabSelect = (tab) => {
    if (tab === 'Dashboard') handleNavigateTo('dashboard');
    else if (tab === 'Deals') handleNavigateTo('deals');
    else if (tab === 'QR Scanner') handleNavigateTo('qr-scanner');
    else if (tab === 'Staff Fund') {
      // already on this page
    } else if (tab === 'Flash Megaphone') {
      handleNavigateTo('flash-megaphone');
    } else {
      handleNavigateTo(tab.toLowerCase().replace(/\s+/g, '-'));
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex flex-col font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* 1. Header Navbar */}
      <Navbar
        activeTab="Staff Fund"
        onSelectTab={handleTabSelect}
      />

      {/* 2. Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold mb-6 select-none">
          <button
            type="button"
            onClick={() => handleNavigateTo('dashboard')}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <span>&larr;</span>
            <span>Dashboard</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-[#ea580c] font-bold">Staff Fund</span>
        </nav>

        {/* Page Title & Subtitle */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
            STAFF FUND
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
            View your accumulated YEBO PERKS Staff Fund.
          </p>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="h-px bg-slate-200/80 w-full mb-8" />

        <div className="space-y-6">
          {/* CARD 1: ACCUMULATED BALANCE & REWARD STRUCTURE */}
          <section className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.03)] p-6 sm:p-8 flex flex-col md:flex-row justify-between md:items-center gap-6">
            {/* Left: Current Accumulated Balance */}
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-md bg-[#fff5eb] text-[#ea580c] font-bold text-[10px] sm:text-[11px] tracking-wider uppercase mb-3">
                CURRENT ACCUMULATED BALANCE
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                ACCUMULATED STAFF FUND
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl sm:text-5xl font-black text-[#0c1844] tracking-tight">
                  R5.00
                </span>
                <span className="text-xs font-bold text-slate-400">
                  ZAR
                </span>
              </div>
            </div>

            {/* Right: Reward Structure Box */}
            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-5 w-full md:w-80 shadow-xs">
              <p className="text-xs font-medium text-slate-500">
                Reward Structure
              </p>
              <p className="text-base sm:text-lg font-black text-[#0c1844] mt-1 leading-snug">
                R5 per eligible claim
              </p>
              <p className="text-[11px] text-slate-400 font-normal mt-1 leading-normal">
                Standard YEBO PERKS merchant reward rule
              </p>
            </div>
          </section>

          {/* CARD 2: INFORMATIONAL S2B REWARD CALLOUT */}
          <section className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.02)] p-4 sm:p-5 flex items-center gap-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#fff5eb] border border-orange-200/80 flex items-center justify-center text-[#ea580c] shrink-0">
              <StaffFundCalloutIcon className="w-5 h-5 text-[#ea580c]" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-black text-slate-900 tracking-wide uppercase">
                STAFF FUND
              </h2>
              <p className="text-xs text-slate-600 font-normal mt-0.5 leading-relaxed">
                Eligible S2B rewards are allocated to the merchant Staff Fund according to the YEBO PERKS reward model.
              </p>
            </div>
          </section>

          {/* CARD 3: STAFF FUND PERFORMANCE & ACTIVITY */}
          <section className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-6">
            {/* Card Header with SAMPLE DATA badge */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xs sm:text-sm font-extrabold text-slate-700 tracking-wider uppercase">
                  STAFF FUND PERFORMANCE
                </h2>
                <p className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                  LAST 30 DAYS
                </p>
              </div>
              <span className="px-3 py-1 rounded-full border border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                SAMPLE DATA
              </span>
            </div>

            {/* 3 Metric Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Metric 1 */}
              <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-5">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  ELIGIBLE CLAIMS
                </p>
                <p className="text-2xl sm:text-3xl font-black text-[#0c1844] mt-1.5">
                  8
                </p>
                <p className="text-[11px] text-slate-400 font-medium mt-1">
                  Processed transactions
                </p>
              </div>

              {/* Metric 2 */}
              <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-5">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  STAFF FUND EARNED
                </p>
                <p className="text-2xl sm:text-3xl font-black text-[#0c1844] mt-1.5">
                  R40.00
                </p>
                <p className="text-[11px] text-slate-400 font-medium mt-1">
                  ZAR accumulated
                </p>
              </div>

              {/* Metric 3 */}
              <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-5">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  AVERAGE PER CLAIM
                </p>
                <p className="text-2xl sm:text-3xl font-black text-[#0c1844] mt-1.5">
                  R5.00
                </p>
                <p className="text-[11px] text-slate-400 font-medium mt-1">
                  Standard reward rate
                </p>
              </div>
            </div>

            {/* Inset Subcard: Staff Fund Activity Bar Chart */}
            <div className="bg-[#f8fafc]/70 border border-slate-200/80 rounded-2xl p-5 sm:p-7">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  STAFF FUND ACTIVITY
                </h3>
                <span className="text-xs font-medium text-slate-400">
                  Total 8 claims &middot; R40.00
                </span>
              </div>

              {/* Weekly Bars: Responsive widths and gaps */}
              <div className="grid grid-cols-4 gap-2 sm:gap-6 md:gap-8 pt-4 pb-2">
                {weeklyActivity.map((item) => (
                  <div key={item.week} className="flex flex-col items-center justify-end h-40 sm:h-44 group">
                    {/* Amount on top of the bar */}
                    <span className="text-[11px] sm:text-sm font-black text-[#0c1844] mb-1.5 sm:mb-2 tracking-tight group-hover:text-orange-600 transition-colors">
                      {item.amount}
                    </span>

                    {/* Bar container with fixed height aligned to bottom */}
                    <div className="w-full flex items-end justify-center h-24 sm:h-28">
                      <div
                        style={{ height: item.heightPx }}
                        className="w-7 sm:w-10 md:w-14 bg-[#f97316] rounded-t-md group-hover:bg-[#ea580c] transition-all duration-300 shadow-xs"
                      />
                    </div>

                    {/* Week Label */}
                    <span className="text-[11px] sm:text-xs font-bold text-slate-800 mt-2.5 sm:mt-3 text-center">
                      {item.week}
                    </span>

                    {/* Claims count */}
                    <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium text-center mt-0.5 whitespace-nowrap">
                      {item.claims}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}

export default MerchantStaffFundPage;
