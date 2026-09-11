import React, { useState } from 'react';
import {
  Navbar,
  Footer,
  ActiveBadge,
  PrimaryButton,
  OutlineButton,
  NavyButton,
  CommandPalette,
} from '@/components/common';
import {
  PercentIcon,
  RepeatIcon,
  CubeIcon,
  ShopFrontIcon,
  SquaresIcon,
  DealsTagIcon,
  EyeMiniIcon,
  CheckMiniIcon,
  SearchIcon,
  CalendarMiniIcon,
  ClockMiniIcon,
  ShieldMiniIcon,
  PlusCircleIcon,
} from '@/components/Icons';

export function MerchantDealBuilderPage({ onNavigate }) {
  const [selectedType, setSelectedType] = useState('SPECIFIC ITEM DEAL');
  const [dealTitle, setDealTitle] = useState('Boerewors Special');
  const [dealDesc, setDealDesc] = useState('Traditional artisanal South African boerewors prepared fresh daily.');
  const [productName, setProductName] = useState('Boerewors');
  const [standardPrice, setStandardPrice] = useState('R99');
  const [yeboPrice, setYeboPrice] = useState('R79');
  const [selectedDays, setSelectedDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');
  const [dailyCap, setDailyCap] = useState('50');
  const [showCommandModal, setShowCommandModal] = useState(false);

  const dealTypes = [
    {
      id: 'PERCENTAGE DISCOUNT',
      name: 'PERCENTAGE DISCOUNT',
      desc: 'Direct percentage off qualifying purchases',
      icon: PercentIcon,
      iconBg: 'bg-purple-50 text-purple-600',
    },
    {
      id: 'BOGO',
      name: 'BOGO',
      desc: 'Buy One, Get One offer structure',
      icon: RepeatIcon,
      iconBg: 'bg-sky-50 text-sky-600',
    },
    {
      id: 'BUNDLE',
      name: 'BUNDLE',
      desc: 'Combined set package deal',
      icon: CubeIcon,
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      id: 'STOREWIDE DEAL',
      name: 'STOREWIDE DEAL',
      desc: 'Sitewide or across-the-board store discount',
      icon: ShopFrontIcon,
      iconBg: 'bg-teal-50 text-teal-600',
    },
    {
      id: 'CATEGORY DEAL',
      name: 'CATEGORY DEAL',
      desc: 'Limited to exclusive items in a selected category',
      icon: SquaresIcon,
      iconBg: 'bg-orange-50 text-orange-600',
    },
    {
      id: 'SPECIFIC ITEM DEAL',
      name: 'SPECIFIC ITEM DEAL',
      desc: 'Targeted promotion for a specific selected menu item',
      icon: DealsTagIcon,
      iconBg: 'bg-orange-500 text-white',
    },
  ];

  const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSaveDeal = () => {
    alert(`Deal "${dealTitle}" published successfully!`);
    if (onNavigate) onNavigate('deals');
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex flex-col font-sans">
      {/* 1. Common Navbar */}
      <Navbar
        activeTab="Deals"
        onSelectTab={(tab) => {
          if (tab === 'Dashboard' && onNavigate) onNavigate('dashboard');
          else if (tab === 'Deals' && onNavigate) onNavigate('deals');
          else if (onNavigate) onNavigate('dashboard', tab);
        }}
        onOpenCommand={() => setShowCommandModal(true)}
      />

      {/* 2. Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs mb-5 select-none">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('deals')}
            className="flex items-center gap-1.5 text-slate-800 hover:text-orange-600 font-bold transition cursor-pointer"
          >
            <span className="text-sm">←</span>
            <span>Back to Deals</span>
          </button>
          <span className="text-slate-300 font-normal">/</span>
          <span className="text-[#ea580c] font-bold">New Deal</span>
        </div>

        {/* Page Title & Status */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase">
              DEAL BUILDER
            </h1>
            <ActiveBadge />
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create a deal for your YEBO PERKS customers.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Configuration Steps (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            {/* STEP 1: DEAL TYPE */}
            <section className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#0c1844] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                    DEAL TYPE
                  </h2>
                </div>
                <span className="bg-[#fff1e7] text-[#ea580c] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  REQUIRED
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 pl-7.5">
                Select what kind of promotion to offer customers
              </p>

              {/* 6 Deal Type Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                {dealTypes.map((type) => {
                  const isSelected = selectedType === type.id;
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`p-3.5 rounded-xl text-left transition flex items-start gap-3 relative border cursor-pointer ${
                        isSelected
                          ? 'border-2 border-orange-500 bg-orange-50/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${type.iconBg}`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0 pr-4">
                        <div className="text-xs font-black text-slate-900 tracking-tight">
                          {type.name}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                          {type.desc}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center">
                          <CheckMiniIcon className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* STEP 2: DEAL INFORMATION */}
            <section className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#0c1844] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </div>
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                  DEAL INFORMATION
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1 pl-7.5">
                Public customer-facing details for discoverability and voucher collection
              </p>

              <div className="space-y-4 mt-5 text-xs">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    DEAL TITLE <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={dealTitle}
                    onChange={(e) => setDealTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-800 bg-[#f8fafc] focus:bg-white focus:ring-1 focus:ring-orange-500 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    DEAL DESCRIPTION <span className="text-orange-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={dealDesc}
                    onChange={(e) => setDealDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-slate-700 bg-[#f8fafc] focus:bg-white focus:ring-1 focus:ring-orange-500 focus:outline-none transition resize-none leading-relaxed"
                  />
                </div>
              </div>
            </section>

            {/* STEP 3: OFFER CONFIGURATION */}
            <section className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#0c1844] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </div>
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                  OFFER CONFIGURATION
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1 pl-7.5">
                Configure specific parameters for the chosen deal type
              </p>

              <div className="space-y-5 mt-5 text-xs">
                {/* Product Search Input */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      PRODUCT <span className="text-orange-500">*</span>
                    </label>
                    <button
                      type="button"
                      className="text-orange-600 font-semibold text-[11px] hover:underline cursor-pointer"
                    >
                      + New Product Request
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full px-3.5 py-2.5 pr-10 border border-slate-200 rounded-xl font-bold text-slate-800 bg-[#f8fafc] focus:bg-white focus:ring-1 focus:ring-orange-500 focus:outline-none transition"
                    />
                    <SearchIcon className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Select an item from your catalog or create a new one.
                  </p>
                </div>

                {/* Pricing Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Standard Price */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      STANDARD PRICE <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={standardPrice}
                      onChange={(e) => setStandardPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-800 bg-[#f8fafc] focus:bg-white focus:ring-1 focus:ring-orange-500 focus:outline-none transition"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Normal retail price before discount
                    </p>
                  </div>

                  {/* Yebo Price */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        YEBO PRICE <span className="text-orange-500">*</span>
                      </label>
                      <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        R20 Savings for members
                      </span>
                    </div>
                    <input
                      type="text"
                      value={yeboPrice}
                      onChange={(e) => setYeboPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 border-2 border-orange-400 rounded-xl font-black text-orange-600 bg-white focus:ring-1 focus:ring-orange-500 focus:outline-none transition"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Exclusive member pricing
                    </p>
                  </div>
                </div>

                {/* Deal Image Box */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                    DEAL IMAGE <span className="text-slate-400 font-normal">(RECOMMENDED)</span>
                  </label>
                  <div className="p-3 border border-slate-200 rounded-xl bg-[#f8fafc] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1525351484163-7529414344d8?w=160&auto=format&fit=crop&q=80"
                        alt="Deal preview"
                        className="w-16 h-12 rounded-lg object-cover border border-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-800 text-xs">
                            morning_deal_cappuccino_spread.jpg
                          </span>
                          <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                            Ready
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          172kb • 768px • High resolution cafe promotion
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-[11px] font-bold transition cursor-pointer shrink-0"
                    >
                      Change Image
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* STEP 4: DEAL PROTECTION CONTROLS */}
            <section className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#0c1844] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  4
                </div>
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                  DEAL PROTECTION CONTROLS
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1 pl-7.5">
                Configure applicable days, time windows and daily redemption limits for this deal.
              </p>

              <div className="space-y-5 mt-5 text-xs">
                {/* Applicable Days */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    APPLICABLE DAYS <span className="text-orange-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {daysList.map((day) => {
                      const isDaySelected = selectedDays.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(day)}
                          className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition border cursor-pointer select-none ${
                            isDaySelected
                              ? 'bg-white border-slate-300 text-slate-900 shadow-2xs'
                              : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Redemption Time Window: 1 col on mobile, 2 cols on tablet+ */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    REDEMPTION TIME WINDOW <span className="text-orange-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                        START TIME
                      </span>
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-semibold text-slate-800 bg-[#f8fafc] focus:bg-white focus:ring-1 focus:ring-orange-500 focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                        END TIME
                      </span>
                      <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-semibold text-slate-800 bg-[#f8fafc] focus:bg-white focus:ring-1 focus:ring-orange-500 focus:outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Daily Redemption Cap */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    DAILY REDEMPTION CAP
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 50 (enter daily claims limit)..."
                    value={dailyCap}
                    onChange={(e) => setDailyCap(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-semibold text-slate-800 bg-[#f8fafc] focus:bg-white focus:ring-1 focus:ring-orange-500 focus:outline-none transition"
                  />
                  <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1.5">
                    <span>🔒</span>
                    <span>Maximum daily redemptions before the offer automatically pauses.</span>
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Deal Preview & Action Buttons (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
            {/* DEAL PREVIEW CONTAINER */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-orange-500">
                  <EyeMiniIcon className="w-4 h-4" />
                </span>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  DEAL PREVIEW
                </h3>
              </div>

              {/* Mock Mobile Voucher Card */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs">
                {/* Image Banner with Badges */}
                <div className="relative h-44 sm:h-48 w-full bg-slate-900 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80"
                    alt="Voucher preview"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />

                  {/* Badges on Image */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-[#ea580c] text-white font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-xs">
                      {yeboPrice} YEBO PRICE
                    </span>
                    <span className="bg-emerald-500 text-white font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                      SAVINGS
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="bg-[#0c1844]/80 backdrop-blur-xs text-white font-bold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/20">
                      SPECIFIC ITEM DEAL
                    </span>
                  </div>
                </div>

                {/* Content details inside preview card */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-extrabold text-[#ea580c] uppercase tracking-wider">
                      MERCHANT PARTNER
                    </span>
                    <span className="bg-emerald-50 text-emerald-600 font-bold text-[9px] px-2 py-0.5 rounded-full border border-emerald-200/50">
                      Item Deal
                    </span>
                  </div>

                  <h4 className="text-base font-black text-slate-900 leading-tight">
                    {dealTitle || 'Your Deal Title'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-snug line-clamp-2">
                    {dealDesc || 'Short description of this merchant special.'}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-slate-600 text-[11px]">
                    <div className="flex items-center gap-2">
                      <CalendarMiniIcon className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span>{selectedDays.length === 7 ? 'All days selected' : `${selectedDays.length} days selected`}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500">
                      <ClockMiniIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{startTime && endTime ? `${startTime} – ${endTime} window` : 'Set redemption time window'}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-600 font-semibold">
                      <ShieldMiniIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{dailyCap ? `${dailyCap} daily redemption limit` : 'No daily limit set'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              {/* CREATE DEAL button */}
              <PrimaryButton onClick={handleSaveDeal} className="w-full py-3 text-xs">
                <PlusCircleIcon className="w-4 h-4" />
                <span>CREATE DEAL</span>
              </PrimaryButton>

              {/* CANCEL button */}
              <OutlineButton
                onClick={() => onNavigate && onNavigate('deals')}
                className="w-full py-2.5 text-xs text-slate-700 uppercase"
              >
                CANCEL
              </OutlineButton>

              {/* Manage Products */}
              <OutlineButton
                onClick={() => onNavigate ? onNavigate('product-itemizer') : alert('Opening Product Catalog...')}
                className="w-full py-2.5 text-xs text-slate-700"
              >
                Manage Products
              </OutlineButton>
            </div>

            {/* Security Guarantee */}
            <div className="text-center pt-2">
              <p className="text-[11px] text-emerald-700 font-semibold flex items-center justify-center gap-1.5">
                <span>🔒</span>
                <span>Protected by YEBO smart limits & redemption caps</span>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Common Footer */}
      <Footer />

      {/* Common Command Palette */}
      <CommandPalette
        isOpen={showCommandModal}
        onClose={() => setShowCommandModal(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
}

export default MerchantDealBuilderPage;
