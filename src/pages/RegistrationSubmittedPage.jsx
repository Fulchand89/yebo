import React from 'react';
import { YeboLogo } from '@/components/YeboLogo';
import { Footer } from '@/components/common/Footer';

// ─── Top Header ─────────────────────────────────────────────────────────────
export function SubmittedHeader() {
  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Logo + Merchant Partner badge */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="/" className="flex items-center select-none">
              <YeboLogo className="h-8 sm:h-11 md:h-12 w-auto" />
            </a>
            <div className="hidden sm:inline-flex items-center px-3 py-0.5 sm:py-1 rounded-full border border-orange-200 bg-[#fff5eb] text-[#ea580c] font-black text-[10px] sm:text-[11px] tracking-wide uppercase select-none">
              MERCHANT PARTNER
            </div>
          </div>

          {/* Right: Back to YEBO PERKS + Support */}
          <div className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm font-semibold">
            <a
              href="/"
              className="flex items-center gap-1.5 text-slate-800 hover:text-orange-600 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span className="hidden sm:inline">Back to YEBO PERKS</span>
              <span className="sm:hidden">Back</span>
            </a>
            <button
              type="button"
              className="flex items-center gap-1.5 text-slate-800 hover:text-orange-600 transition cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
              <span>Support</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Hourglass Icon ──────────────────────────────────────────────────────────
function HourglassFilledIcon({ className = "w-10 h-10" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 22h14" />
      <path d="M5 2h14" />
      <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" fill="#ea580c" />
      <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" fill="#ea580c" />
    </svg>
  );
}

export default function RegistrationSubmittedPage({ details = {} }) {
  const tradingName = details.tradingName || 'Origin Artisanal Roastery';
  const category = details.category || 'Food & Dining';
  
  let suburb = details.suburb;
  if (!suburb) {
    suburb = 'Gardens, Cape Town';
  } else if (!suburb.toLowerCase().includes('cape town')) {
    suburb = `${suburb}, Cape Town`;
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col font-sans">
      {/* ── Top Header ── */}
      <SubmittedHeader />

      {/* ── Main Content ── */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-12 flex flex-col items-center">
        {/* Hourglass Icon Card */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#fff2e8] border border-[#fed7aa]/80 flex items-center justify-center shadow-xs mb-3.5">
          <HourglassFilledIcon className="w-9 h-9 sm:w-10 sm:h-10 text-[#ea580c]" />
        </div>

        {/* Pending Badge */}
        <div className="inline-flex items-center px-4 py-1 rounded-full bg-[#fde5d7] text-[#c2410c] text-[11px] font-black uppercase tracking-widest mb-3">
          PENDING
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-[#0c1844] tracking-tight uppercase text-center mb-6">
          REGISTRATION SUBMITTED
        </h1>

        {/* Card 1: MERCHANT STATUS */}
        <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border-l-4 border-l-[#ff6b00] p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-base sm:text-lg font-black text-[#0c1844] tracking-wide uppercase">
              MERCHANT STATUS
            </h2>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fde5d7] text-[#c2410c] text-xs font-bold uppercase tracking-wider">
              <svg className="w-3.5 h-3.5 text-[#c2410c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 15 14" />
              </svg>
              PENDING
            </span>
          </div>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            All merchant profiles require administrator validation before they become active on YEBO PERKS.
          </p>
        </div>

        {/* Interstitial description text */}
        <p className="text-xs sm:text-sm text-slate-600 font-medium text-center my-6 max-w-lg leading-relaxed">
          Your merchant registration has been submitted and is awaiting administrator validation.
        </p>

        {/* Card 2: Registration Details */}
        <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-6 sm:p-7">
          <h3 className="text-base sm:text-lg font-black text-[#0c1844] mb-4">
            Registration Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Trading Name */}
            <div className="bg-[#f8fafc] rounded-xl p-4 border border-slate-200/60">
              <p className="text-[11px] text-slate-500 font-medium mb-1">Trading Name</p>
              <p className="text-sm font-black text-[#0c1844] break-words">
                {tradingName}
              </p>
            </div>

            {/* Category */}
            <div className="bg-[#f8fafc] rounded-xl p-4 border border-slate-200/60">
              <p className="text-[11px] text-slate-500 font-medium mb-1">Category</p>
              <p className="text-sm font-black text-[#0c1844] break-words">
                {category}
              </p>
            </div>

            {/* Suburb */}
            <div className="bg-[#f8fafc] rounded-xl p-4 border border-slate-200/60">
              <p className="text-[11px] text-slate-500 font-medium mb-1">Suburb</p>
              <p className="text-sm font-black text-[#0c1844] break-words">
                {suburb}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Access Notice */}
        <div className="w-full mt-6 bg-[#fff9f4] border border-[#fed7aa] rounded-2xl p-5 sm:p-6 flex items-start gap-3.5 shadow-xs">
          <div className="w-5 h-5 rounded-full border-2 border-[#ea580c] text-[#ea580c] flex items-center justify-center font-serif text-xs font-bold shrink-0 mt-0.5 select-none">
            i
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-[#0c1844]">
              Access Notice
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-relaxed">
              Access to the Merchant Dashboard will be unlocked once administrator approval is completed.
            </p>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-8 flex justify-center w-full">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2.5 bg-[#0c1844] hover:bg-[#071030] text-white font-black text-xs sm:text-sm tracking-wider uppercase px-8 py-3.5 rounded-xl shadow-md transition cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            BACK TO YEBO PERKS
          </a>
        </div>
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
