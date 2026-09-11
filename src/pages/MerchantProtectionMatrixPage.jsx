import React, { useState } from 'react';
import {
  Navbar,
  Footer,
  ActiveBadge,
  InactiveBadge,
  DealTypeBadge,
  PrimaryButton,
  OutlineButton,
  CommandPalette,
} from '@/components/common';
import {
  ClockMiniIcon,
  ShieldMiniIcon,
  ChevronDownIcon,
} from '@/components/Icons';

export function MerchantProtectionMatrixPage({ onNavigate }) {
  // Deals data for selector
  const deals = [
    {
      id: 1,
      name: 'Boerewors Special',
      type: 'Specific Item Deal',
      status: 'ACTIVE',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=120&auto=format&fit=crop&q=80',
      yeboPrice: 'R79',
      standardPrice: 'R99',
      days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      startTime: '09:00 AM',
      endTime: '06:00 PM',
      operatingWindow: '09:00 – 18:00',
      cap: '50',
    },
    {
      id: 2,
      name: 'Weekday Saver',
      type: 'Percentage Discount',
      status: 'ACTIVE',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=120&auto=format&fit=crop&q=80',
      yeboPrice: '15% OFF',
      standardPrice: 'Standard Bill',
      days: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
      startTime: '10:00 AM',
      endTime: '04:00 PM',
      operatingWindow: '10:00 – 16:00',
      cap: '30',
    },
    {
      id: 3,
      name: 'Buy One Get One Burger',
      type: 'BOGO',
      status: 'ACTIVE',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=120&auto=format&fit=crop&q=80',
      yeboPrice: 'BUY 1 GET 1',
      standardPrice: 'Equal or lesser',
      days: ['SAT', 'SUN'],
      startTime: '12:00 PM',
      endTime: '06:00 PM',
      operatingWindow: '12:00 – 18:00',
      cap: '20',
    },
  ];

  const [selectedDealId, setSelectedDealId] = useState(1);
  const currentDeal = deals.find((d) => d.id === selectedDealId) || deals[0];

  const allDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const [activeDays, setActiveDays] = useState(currentDeal.days);
  const [startTime, setStartTime] = useState(currentDeal.startTime);
  const [endTime, setEndTime] = useState(currentDeal.endTime);
  const [dailyCap, setDailyCap] = useState(currentDeal.cap);
  const [showCommandModal, setShowCommandModal] = useState(false);

  const handleSelectDeal = (id) => {
    setSelectedDealId(id);
    const deal = deals.find((d) => d.id === id);
    if (deal) {
      setActiveDays(deal.days);
      setStartTime(deal.startTime);
      setEndTime(deal.endTime);
      setDailyCap(deal.cap);
    }
  };

  const toggleDay = (day) => {
    if (activeDays.includes(day)) {
      setActiveDays(activeDays.filter((d) => d !== day));
    } else {
      setActiveDays([...activeDays, day]);
    }
  };

  const handleSave = () => {
    alert(`Protection Matrix for "${currentDeal.name}" saved successfully!`);
    if (onNavigate) onNavigate('deals');
  };

  const formatDaysSummary = () => {
    if (activeDays.length === 7) return 'MON – SUN';
    if (activeDays.length === 0) return 'None';
    if (activeDays.length === 5 && !activeDays.includes('SAT') && !activeDays.includes('SUN')) return 'MON – FRI';
    if (activeDays.length === 2 && activeDays.includes('SAT') && activeDays.includes('SUN')) return 'SAT – SUN';
    return activeDays.join(', ');
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex flex-col font-sans">
      {/* 1. Common Navbar */}
      <Navbar
        activeTab="Deals"
        onSelectTab={(tab) => {
          if (tab === 'Dashboard' && onNavigate) onNavigate('dashboard');
          else if (tab === 'Deals' && onNavigate) onNavigate('deals');
          else if (tab === 'QR Scanner' && onNavigate) onNavigate('qr-scanner');
          else if (onNavigate) onNavigate('dashboard', tab);
        }}
        onOpenCommand={() => setShowCommandModal(true)}
      />

      {/* 2. Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumbs: ← Back to Deals / Protection Matrix */}
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
          <span className="text-[#ea580c] font-bold">Protection Matrix</span>
        </div>

        {/* Page Title & Subtitle */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase">
            PROTECTION MATRIX
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure when your YEBO PERKS deals can be redeemed and how many redemptions are allowed each day.
          </p>
        </div>

        <div className="space-y-6">
          {/* Card 1: SELECT DEAL */}
          <section className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              SELECT DEAL
            </label>

            {/* Deal Dropdown Selector */}
            <div className="relative">
              <select
                value={selectedDealId}
                onChange={(e) => handleSelectDeal(Number(e.target.value))}
                className="w-full appearance-none px-4 py-3 border border-slate-200 rounded-xl bg-white font-bold text-xs sm:text-sm text-slate-800 pr-10 focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
              >
                {deals.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.type} — {d.status === 'ACTIVE' ? 'Active' : 'Inactive'})
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Selected Deal Summary Banner */}
            <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-3.5 mt-4 flex items-center gap-3.5">
              <img
                src={currentDeal.image}
                alt={currentDeal.name}
                className="w-11 h-11 rounded-lg object-cover border border-slate-200 shrink-0"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-sm">
                    {currentDeal.name}
                  </span>
                  <DealTypeBadge type={currentDeal.type} />
                  {currentDeal.status === 'ACTIVE' ? (
                    <ActiveBadge />
                  ) : (
                    <InactiveBadge />
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs mt-1">
                  <span className="font-extrabold text-[#f97316]">
                    Yebo Price {currentDeal.yeboPrice}
                  </span>
                  <span className="text-slate-400 font-normal">
                    • Standard {currentDeal.standardPrice}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Card 2: DEAL PROTECTION CONFIGURATION */}
          <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="mb-6">
              <h2 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight">
                DEAL PROTECTION
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Set the days, time window and daily redemption limit for this deal.
              </p>
            </div>

            {/* 1. APPLICABLE DAYS */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                APPLICABLE DAYS
              </label>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {allDays.map((day) => {
                  const isActive = activeDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-black uppercase tracking-wider transition cursor-pointer select-none ${
                        isActive
                          ? 'bg-[#0c1844] text-white shadow-xs hover:bg-[#071131]'
                          : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-slate-400 mt-2 font-normal">
                {activeDays.length === 7
                  ? 'All 7 days are currently active for redemption'
                  : `${activeDays.length} day(s) currently active for redemption`}
              </p>
            </div>

            {/* 2. TIME WINDOW */}
            <div className="mt-7">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                TIME WINDOW
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                    START TIME
                  </span>
                  <input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl font-bold text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                    END TIME
                  </span>
                  <input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl font-bold text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-2">
                <ClockMiniIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>Active window: {startTime} – {endTime} daily</span>
              </p>
            </div>

            {/* 3. DAILY REDEMPTION CAP */}
            <div className="mt-7">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                DAILY REDEMPTION CAP
              </label>

              <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl w-full max-w-xs focus-within:bg-white focus-within:ring-1 focus-within:ring-orange-500">
                <input
                  type="number"
                  value={dailyCap}
                  onChange={(e) => setDailyCap(e.target.value)}
                  className="w-24 bg-transparent font-bold text-sm sm:text-base text-slate-900 focus:outline-none"
                />
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase select-none">
                  CLAIMS / DAY
                </span>
              </div>

              <p className="text-[11px] text-slate-400 mt-1.5 font-normal">
                Maximum {dailyCap} claims/day
              </p>
            </div>

            {/* 4. CURRENT PROTECTION CONFIGURATION (Summary Box) */}
            <div className="bg-[#f8f9fc] border border-slate-100 rounded-2xl p-5 mt-8">
              <span className="text-[10px] font-black tracking-wider text-[#0c1844] uppercase mb-3 block">
                CURRENT PROTECTION CONFIGURATION
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
                {/* Redemption Days Box */}
                <div className="p-3.5 bg-white rounded-xl border border-slate-200/70 shadow-2xs">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                    REDEMPTION DAYS
                  </span>
                  <span className="font-extrabold text-slate-900 text-xs sm:text-sm mt-1 block">
                    {formatDaysSummary()}
                  </span>
                </div>

                {/* Operating Window Box */}
                <div className="p-3.5 bg-white rounded-xl border border-slate-200/70 shadow-2xs">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                    OPERATING WINDOW
                  </span>
                  <span className="font-extrabold text-slate-900 text-xs sm:text-sm mt-1 block">
                    {startTime && endTime ? `${startTime.replace(' AM', '')} – ${endTime.replace(' PM', '')}` : '09:00 – 18:00'}
                  </span>
                </div>

                {/* Cap Enforcement Box */}
                <div className="p-3.5 bg-white rounded-xl border border-slate-200/70 shadow-2xs">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                    CAP ENFORCEMENT
                  </span>
                  <span className="font-extrabold text-slate-900 text-xs sm:text-sm mt-1 block">
                    {dailyCap} claims/day
                  </span>
                </div>
              </div>
            </div>

            {/* 5. DAILY CAP REACHED POLICY (Amber Alert Box) */}
            <div className="bg-[#fefce8] border border-amber-200 rounded-xl p-4 mt-5 flex items-start gap-3">
              <div className="text-amber-600 shrink-0 mt-0.5">
                <ShieldMiniIcon className="w-4 h-4" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 block">
                  DAILY CAP REACHED POLICY
                </span>
                <p className="text-xs text-amber-800/90 mt-0.5 leading-snug">
                  When the daily redemption cap is reached, this deal becomes unavailable for further redemption.
                </p>
              </div>
            </div>

            {/* 6. Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-3 mt-8 pt-5 border-t border-slate-100">
              <OutlineButton
                onClick={() => onNavigate && onNavigate('deals')}
                className="w-full sm:w-auto justify-center px-5 py-2.5 text-slate-700"
              >
                Cancel
              </OutlineButton>

              <PrimaryButton onClick={handleSave} className="w-full sm:w-auto justify-center px-6 py-2.5">
                SAVE CHANGES
              </PrimaryButton>
            </div>
          </section>
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

export default MerchantProtectionMatrixPage;
