import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '@/components/common';
import { YeboLogo } from '@/components/YeboLogo';
import { ChevronDownIcon } from '@/components/Icons';

// Custom Icons for Business Profile
function UploadTrayIcon({ className = 'w-3.5 h-3.5' }) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function CameraMiniIcon({ className = 'w-3.5 h-3.5' }) {
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
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

export function MerchantBusinessProfilePage({ onNavigate }) {
  const navigate = useNavigate();

  // Form State matching screenshot
  const [tradingName, setTradingName] = useState('Lekker Café');
  const [tagline, setTagline] = useState('Artisan Coffee, Sourdough Bakes & Fresh Cape Bites');
  const [suburb, setSuburb] = useState('Gardens (Cape Town)');
  const [category, setCategory] = useState('Coffee & Cafés');
  const [coverImageUrl, setCoverImageUrl] = useState(
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80'
  );
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const suburbsList = [
    'Gardens (Cape Town)',
    'Sea Point (Cape Town)',
    'Camps Bay (Cape Town)',
    'Sandton (Johannesburg)',
    'Rosebank (Johannesburg)',
    'Umhlanga (Durban)',
    'Pretoria East',
  ];

  const categoriesList = [
    'Coffee & Cafés',
    'Bakery & Confectionery',
    'Casual Dining',
    'Fast Food & Takeaway',
    'Bar & Grill',
    'Health & Fitness',
    'Retail & Groceries',
  ];

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
    else if (tab === 'Staff Fund') handleNavigateTo('staff-fund');
    else if (tab === 'Flash Megaphone') handleNavigateTo('flash-megaphone');
    else {
      handleNavigateTo(tab.toLowerCase().replace(/\s+/g, '-'));
    }
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    }, 600);
  };

  const handleReplaceCoverImage = () => {
    const alternativeCovers = [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&auto=format&fit=crop&q=80',
    ];
    const nextCover = alternativeCovers.find((c) => c !== coverImageUrl) || alternativeCovers[0];
    setCoverImageUrl(nextCover);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex flex-col font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* 1. Header Navbar */}
      <Navbar
        activeTab=""
        onSelectTab={handleTabSelect}
      />

      {/* 2. Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {/* Page Title with Active Badge */}
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
            BUSINESS PROFILE
          </h1>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-600 text-[11px] font-bold tracking-wider select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            <span>ACTIVE</span>
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Manage your business information shown across YEBO PERKS.
        </p>

        {/* Subtle Horizontal Divider */}
        <div className="h-px bg-slate-200/80 w-full mt-6 mb-8" />

        {/* Success Alert Banner */}
        {savedSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                ✓
              </span>
              <div>
                <p className="text-xs font-bold text-emerald-900">
                  Business Profile Updated!
                </p>
                <p className="text-[11px] text-emerald-700">
                  Your store details and branding updates have been saved.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSavedSuccess(false)}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="space-y-6">
          {/* CARD 1: BUSINESS INFORMATION */}
          <section className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-5">
            {/* Header */}
            <div>
              <h2 className="text-sm font-black text-[#0c1844] tracking-tight uppercase">
                BUSINESS INFORMATION
              </h2>
              <p className="text-xs text-slate-400 font-normal mt-0.5">
                Core trading details for customer deal discovery
              </p>
            </div>

            {/* Field 1: TRADING NAME */}
            <div>
              <label htmlFor="trading-name" className="block text-[11px] font-extrabold text-slate-700 tracking-wider uppercase mb-2">
                TRADING NAME
              </label>
              <input
                id="trading-name"
                type="text"
                value={tradingName}
                onChange={(e) => setTradingName(e.target.value)}
                className="w-full bg-[#fafbfc] border border-slate-200/90 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition"
              />
            </div>

            {/* Field 2: TAGLINE */}
            <div>
              <label htmlFor="tagline" className="block text-[11px] font-extrabold text-slate-700 tracking-wider uppercase mb-2">
                TAGLINE
              </label>
              <input
                id="tagline"
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-[#fafbfc] border border-slate-200/90 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition"
              />
            </div>

            {/* Field 3 & 4: SUBURB and CATEGORY (2 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
              {/* SUBURB */}
              <div>
                <label htmlFor="suburb" className="block text-[11px] font-extrabold text-slate-700 tracking-wider uppercase mb-2">
                  SUBURB
                </label>
                <div className="relative">
                  <select
                    id="suburb"
                    value={suburb}
                    onChange={(e) => setSuburb(e.target.value)}
                    className="w-full appearance-none bg-[#fafbfc] border border-slate-200/90 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition cursor-pointer pr-10"
                  >
                    {suburbsList.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* CATEGORY */}
              <div>
                <label htmlFor="category" className="block text-[11px] font-extrabold text-slate-700 tracking-wider uppercase mb-2">
                  CATEGORY
                </label>
                <div className="relative">
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none bg-[#fafbfc] border border-slate-200/90 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition cursor-pointer pr-10"
                  >
                    {categoriesList.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </section>

          {/* CARD 2: BRANDING */}
          <section className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-5">
            {/* Header */}
            <div>
              <h2 className="text-sm font-black text-[#0c1844] tracking-tight uppercase">
                BRANDING
              </h2>
              <p className="text-xs text-slate-400 font-normal mt-0.5">
                Visual brand identity shown on vouchers and customer deal discovery
              </p>
            </div>

            {/* 2 Columns: Logo & Cover Image */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2">
              {/* Column 1: LOGO */}
              <div className="md:col-span-5 space-y-3">
                <label className="block text-[11px] font-extrabold text-slate-700 tracking-wider uppercase">
                  LOGO
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl border border-slate-200/90 bg-white p-2.5 flex items-center justify-center shadow-xs shrink-0">
                    <YeboLogo className="h-10 w-auto" />
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('Logo selection dialog opened')}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors shadow-xs cursor-pointer"
                  >
                    <UploadTrayIcon className="w-3.5 h-3.5 text-slate-600" />
                    <span>Replace Logo</span>
                  </button>
                </div>
              </div>

              {/* Column 2: COVER IMAGE */}
              <div className="md:col-span-7 space-y-3">
                <label className="block text-[11px] font-extrabold text-slate-700 tracking-wider uppercase">
                  COVER IMAGE
                </label>
                <div className="relative w-full h-32 sm:h-36 rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 group">
                  <img
                    src={coverImageUrl}
                    alt="Cover Image"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating Change Cover Image button */}
                  <div className="absolute bottom-3 left-3">
                    <button
                      type="button"
                      onClick={handleReplaceCoverImage}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-slate-900 font-bold text-[11px] shadow-md backdrop-blur-xs transition cursor-pointer"
                    >
                      <CameraMiniIcon className="w-3.5 h-3.5 text-slate-700" />
                      <span>Change Cover Image</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Action Buttons */}
          <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => handleNavigateTo('dashboard')}
              className="w-full sm:w-auto text-center px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              CANCEL
            </button>

            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={isSaving}
              className="w-full sm:w-auto justify-center px-6 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{isSaving ? 'SAVING...' : 'SAVE CHANGES'}</span>
            </button>
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}

export default MerchantBusinessProfilePage;
