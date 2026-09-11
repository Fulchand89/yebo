import React, { useState } from 'react';
import {
  Navbar,
  Footer,
  Modal,
  ActiveBadge,
  SampleDataBadge,
  RealTimeBadge,
  PrimaryButton,
  NavyButton,
  OutlineButton,
  CommandPalette,
} from '@/components/common';
import {
  BarChartIcon,
  RankingIcon,
  DealsTagIcon,
  QrCodeIcon,
  StaffFundIcon,
  MegaphoneIcon,
  BusinessProfileIcon,
  CheckCircle2Icon,
} from '@/components/Icons';

export function MerchantDashboardPage({ onNavigate, initialTab = 'Dashboard' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeModal, setActiveModal] = useState(null); // 'qr' | 'staffFund' | 'megaphone' | 'profile' | 'command' | null
  const [qrCodeInput, setQrCodeInput] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [megaphoneMessage, setMegaphoneMessage] = useState('25% off all artisan coffees between 2 PM - 5 PM today!');
  const [megaphoneSent, setMegaphoneSent] = useState(false);

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
    if (tab === 'Deals' && onNavigate) {
      onNavigate('deals');
      return;
    }
    if (tab === 'QR Scanner' && onNavigate) {
      onNavigate('qr-scanner');
      return;
    }
    if (tab === 'Staff Fund' && onNavigate) {
      onNavigate('staff-fund');
      return;
    }
    if (tab === 'Flash Megaphone' && onNavigate) {
      onNavigate('flash-megaphone');
      return;
    }
    if (tab === 'Business Profile' && onNavigate) {
      onNavigate('business-profile');
      return;
    }
    if (tab === 'QR Scanner') setActiveModal('qr');
    else if (tab === 'Staff Fund') setActiveModal('staffFund');
    else if (tab === 'Flash Megaphone') setActiveModal('megaphone');
    else if (tab === 'Business Profile') setActiveModal('profile');
    else setActiveModal(null);
  };

  const handleSimulateScan = () => {
    const code = qrCodeInput.trim() || 'YEB-SUB-782914';
    setScanResult({
      code,
      subscriber: 'Sipho Ndlovu',
      deal: 'Free Artisan Cappuccino with Breakfast',
      fundAdded: 'R5.00',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex flex-col font-sans">
      {/* 1. Common Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleTabSelect}
        onOpenCommand={() => setActiveModal('command')}
      />

      {/* 2. Main Merchant Dashboard Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Title and Active Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            MERCHANT DASHBOARD
          </h1>
          <ActiveBadge />
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your business, deals and YEBO PERKS activity.
        </p>

        {/* Info Bar Card: Responsive 2-to-4 Columns */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 mt-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Trading Name */}
            <div className="sm:border-r border-slate-100 sm:pr-6 pb-3 sm:pb-0 border-b sm:border-b-0">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                TRADING NAME
              </span>
              <span className="text-xs sm:text-base font-extrabold text-[#0c1844] mt-1 block truncate">
                The Daily Grind
              </span>
            </div>

            {/* Category */}
            <div className="lg:border-r border-slate-100 lg:pr-6 pb-3 sm:pb-0 border-b sm:border-b-0">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                CATEGORY
              </span>
              <span className="text-xs sm:text-base font-extrabold text-slate-900 mt-1 block truncate">
                Cafe & Coffee
              </span>
            </div>

            {/* Suburb */}
            <div className="sm:border-r border-slate-100 sm:pr-6 pb-3 sm:pb-0 border-b sm:border-b-0">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                SUBURB
              </span>
              <span className="text-xs sm:text-base font-extrabold text-slate-900 mt-1 block truncate">
                Sandton
              </span>
            </div>

            {/* Status */}
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                STATUS
              </span>
              <div className="mt-1">
                <ActiveBadge />
              </div>
            </div>
          </div>
        </div>

        {/* Staff Social Fund Hero Card */}
        <div className="bg-[#0c1844] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-white mt-6 shadow-md relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left info */}
          <div className="max-w-xl z-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              STAFF SOCIAL FUND
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 font-normal leading-relaxed">
              Your accumulated Staff Social Fund from eligible activity.
            </p>
          </div>

          {/* Right nested box */}
          <div className="z-10 bg-[#11235a]/80 border border-[#1e347b] rounded-2xl p-5 sm:p-6 min-w-full sm:min-w-[320px] lg:w-[340px]">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-300 uppercase block">
              ACCUMULATED STAFF FUND
            </span>
            <div className="text-3xl sm:text-4xl font-black text-[#facc15] my-1 tracking-tight">
              R40.00
            </div>
            <p className="text-xs text-slate-300/80 mb-3 font-normal">
              Accumulated to date from eligible activity
            </p>
            <div className="border-t border-white/10 pt-3">
              <button
                type="button"
                onClick={() => setActiveModal('staffFund')}
                className="text-xs sm:text-sm font-semibold text-white/90 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer group"
              >
                <span>View Allocation Details</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Row: Performance & Local Ranking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
          {/* Card 1: PERFORMANCE */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                    <BarChartIcon className="w-5 h-5 text-[#0c1844]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                      PERFORMANCE
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <SampleDataBadge />
                  <RealTimeBadge />
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-1 pl-12">
                Live merchant redemption and uptake signals
              </p>
            </div>

            {/* 3 Metrics Box */}
            <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-4 sm:p-5 mt-5">
              <div className="grid grid-cols-3 gap-2 text-left">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                    ELIGIBLE CLAIMS
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
                    8
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                    STAFF FUND EARNED
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[#16a34a] mt-1 block">
                    R40.00
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                    ACTIVE DEALS
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
                    6
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: LOCAL RANKING */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                    <RankingIcon className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                      LOCAL RANKING
                    </h3>
                  </div>
                </div>

                <SampleDataBadge />
              </div>
              <p className="text-xs text-slate-500 mt-1 pl-12">
                Community visibility within your suburb
              </p>
            </div>

            {/* Ranking Box */}
            <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-4 sm:p-5 mt-5 flex items-center gap-4 sm:gap-5">
              <div className="text-3xl sm:text-4xl font-black text-[#0c1844] tracking-tight shrink-0">
                #4
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                  LOCAL MERCHANT RANKING
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5">
                  Your business is currently ranked #4 in your suburb.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              QUICK ACTIONS
            </h2>
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              5 Core Actions
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 mb-6">
            Direct access to all merchant operations and promotional tools
          </p>

          {/* 5 Cards Grid: 1 col (mobile), 2 cols (tablet), 3 cols (desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* 1. DEALS */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#0c1844] text-white flex items-center justify-center shadow-xs">
                  <DealsTagIcon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-slate-900 tracking-tight mt-4">
                  DEALS
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-6">
                  Manage your YEBO PERKS deals.
                </p>
              </div>

              <PrimaryButton
                onClick={() => (onNavigate ? onNavigate('deals') : handleTabSelect('Deals'))}
                className="w-full"
              >
                <span>MANAGE DEALS</span>
                <span>→</span>
              </PrimaryButton>
            </div>

            {/* 2. QR SCANNER */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#f97316] text-white flex items-center justify-center shadow-xs">
                  <QrCodeIcon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-slate-900 tracking-tight mt-4">
                  QR SCANNER
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-6">
                  Scan subscriber QR codes.
                </p>
              </div>

              <NavyButton
                onClick={() => setActiveModal('qr')}
                className="w-full"
              >
                <span>OPEN QR SCANNER</span>
                <span>→</span>
              </NavyButton>
            </div>

            {/* 3. STAFF FUND */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-slate-100 text-[#0c1844] flex items-center justify-center">
                  <StaffFundIcon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-slate-900 tracking-tight mt-4">
                  STAFF FUND
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-6">
                  View your accumulated Staff Social Fund.
                </p>
              </div>

              <OutlineButton
                onClick={() => (onNavigate ? onNavigate('staff-fund') : setActiveModal('staffFund'))}
                className="w-full"
              >
                <span>VIEW STAFF FUND</span>
                <span>→</span>
              </OutlineButton>
            </div>

            {/* 4. FLASH MEGAPHONE */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center">
                  <MegaphoneIcon className="w-5 h-5 text-pink-500" />
                </div>
                <h3 className="text-base font-black text-slate-900 tracking-tight mt-4">
                  FLASH MEGAPHONE
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-6">
                  Send flash promotional notifications.
                </p>
              </div>

              <OutlineButton
                onClick={() => (onNavigate ? onNavigate('flash-megaphone') : setActiveModal('megaphone'))}
                className="w-full"
              >
                <span>OPEN FLASH MEGAPHONE</span>
                <span>→</span>
              </OutlineButton>
            </div>

            {/* 5. BUSINESS PROFILE */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <BusinessProfileIcon className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-base font-black text-slate-900 tracking-tight mt-4">
                  BUSINESS PROFILE
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-6">
                  Manage your merchant profile.
                </p>
              </div>

              <OutlineButton
                onClick={() => (onNavigate ? onNavigate('business-profile') : setActiveModal('profile'))}
                className="w-full"
              >
                <span>MANAGE PROFILE</span>
                <span>→</span>
              </OutlineButton>
            </div>
          </div>
        </section>
      </main>

      {/* 3. Common Footer */}
      <Footer />

      {/* --- Common Command Palette Component --- */}
      <CommandPalette
        isOpen={activeModal === 'command'}
        onClose={() => setActiveModal(null)}
        onNavigate={onNavigate}
        onOpenModal={(modal) => setActiveModal(modal)}
      />

      {/* --- Reusable Modals --- */}

      {/* MODAL: QR SCANNER */}
      <Modal
        isOpen={activeModal === 'qr'}
        onClose={() => {
          setActiveModal(null);
          setScanResult(null);
        }}
        title="Scan Subscriber QR"
        subtitle="Quick voucher redemption & staff tip"
        icon={QrCodeIcon}
        iconBg="bg-orange-500"
        maxWidth="max-w-md"
      >
        {!scanResult ? (
          <div className="space-y-4">
            <div className="relative border-2 border-dashed border-orange-300 bg-orange-50/50 rounded-2xl p-8 text-center flex flex-col items-center justify-center overflow-hidden">
              <div className="w-24 h-24 border-4 border-orange-500 rounded-2xl flex items-center justify-center relative">
                <QrCodeIcon className="w-12 h-12 text-orange-600" />
                <div className="absolute inset-x-0 top-0 h-0.5 bg-red-500 animate-pulse" />
              </div>
              <p className="text-xs text-slate-600 font-medium mt-3">Point merchant camera at customer's digital card</p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Or Enter Voucher Code Manually</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. YEB-SUB-782914"
                  value={qrCodeInput}
                  onChange={(e) => setQrCodeInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="button"
                  onClick={handleSimulateScan}
                  className="bg-[#0c1844] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#071131]"
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2Icon className="w-7 h-7" />
            </div>
            <h4 className="text-base font-black text-slate-900">Redemption Successful!</h4>
            <div className="bg-slate-50 p-4 rounded-2xl text-left text-xs space-y-1.5 border border-slate-100">
              <p><span className="text-slate-400">Subscriber:</span> <strong className="text-slate-800">{scanResult.subscriber}</strong></p>
              <p><span className="text-slate-400">Deal:</span> <strong className="text-slate-800">{scanResult.deal}</strong></p>
              <p><span className="text-slate-400">Social Fund Credit:</span> <strong className="text-emerald-600">+{scanResult.fundAdded}</strong></p>
              <p><span className="text-slate-400">Time:</span> <strong className="text-slate-800">{scanResult.timestamp}</strong></p>
            </div>
            <PrimaryButton
              onClick={() => setScanResult(null)}
              className="w-full"
            >
              Scan Another Code
            </PrimaryButton>
          </div>
        )}
      </Modal>

      {/* MODAL: STAFF FUND ALLOCATION */}
      <Modal
        isOpen={activeModal === 'staffFund'}
        onClose={() => setActiveModal(null)}
        title="Staff Social Fund Details"
        subtitle="Accumulated directly to support your team"
        icon={StaffFundIcon}
        iconBg="bg-[#0c1844]"
        iconColor="text-yellow-400"
        maxWidth="max-w-lg"
      >
        <div className="bg-[#0c1844] text-white p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-300 uppercase tracking-wider font-bold">Total Accumulated</p>
            <p className="text-3xl font-black text-[#facc15] mt-0.5">R40.00</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-full">
              8 Eligible Redemptions
            </span>
            <p className="text-[11px] text-slate-300 mt-1">R5.00 contributed per claim</p>
          </div>
        </div>

        <div className="mt-5 space-y-2 text-xs">
          <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Team Allocation Pool (4 Baristas):</p>
          <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
            <span>Nomvula K. (Head Barista)</span>
            <strong className="text-slate-900">R10.00</strong>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
            <span>Kagiso M. (Barista)</span>
            <strong className="text-slate-900">R10.00</strong>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
            <span>Zola D. (Service Staff)</span>
            <strong className="text-slate-900">R10.00</strong>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
            <span>Lethabo S. (Kitchen Lead)</span>
            <strong className="text-slate-900">R10.00</strong>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex gap-3">
          <NavyButton
            onClick={() => alert('Payout schedule set for end of current calendar month.')}
            className="flex-1"
          >
            Initiate Team Payout
          </NavyButton>
          <button
            onClick={() => setActiveModal(null)}
            className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </Modal>

      {/* MODAL: FLASH MEGAPHONE */}
      <Modal
        isOpen={activeModal === 'megaphone'}
        onClose={() => {
          setActiveModal(null);
          setMegaphoneSent(false);
        }}
        title="Flash Megaphone"
        subtitle="Broadcast instant alert to 1,240 subscribers in Sandton"
        icon={MegaphoneIcon}
        iconBg="bg-pink-50"
        iconColor="text-pink-500"
        maxWidth="max-w-md"
      >
        {!megaphoneSent ? (
          <div className="space-y-4 text-xs">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Flash Promo Message</label>
              <textarea
                rows={3}
                value={megaphoneMessage}
                onChange={(e) => setMegaphoneMessage(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>
            <div className="text-[11px] text-slate-500 bg-pink-50/50 p-3 rounded-xl border border-pink-100">
              ⚡ Flash promotions run for 2 hours and appear as top alerts on local subscriber mobile cards.
            </div>
            <button
              type="button"
              onClick={() => setMegaphoneSent(true)}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2.5 rounded-xl text-xs uppercase cursor-pointer"
            >
              Send Flash Broadcast Now
            </button>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2Icon className="w-7 h-7" />
            </div>
            <h4 className="text-base font-black text-slate-900">Megaphone Broadcast Live!</h4>
            <p className="text-xs text-slate-600">
              Notification dispatched to subscribers currently within a 5km radius of Sandton.
            </p>
            <NavyButton
              onClick={() => {
                setActiveModal(null);
                setMegaphoneSent(false);
              }}
              className="w-full"
            >
              Return to Dashboard
            </NavyButton>
          </div>
        )}
      </Modal>

      {/* MODAL: BUSINESS PROFILE */}
      <Modal
        isOpen={activeModal === 'profile'}
        onClose={() => setActiveModal(null)}
        title="Business Profile"
        subtitle="The Daily Grind • Cafe & Coffee"
        icon={BusinessProfileIcon}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
        maxWidth="max-w-lg"
      >
        <div className="space-y-3 text-xs">
          <div>
            <label className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Trading Name</label>
            <input
              type="text"
              defaultValue="The Daily Grind"
              className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-xl font-semibold"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Category</label>
              <input
                type="text"
                defaultValue="Cafe & Coffee"
                className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-xl font-semibold"
              />
            </div>
            <div>
              <label className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Suburb</label>
              <input
                type="text"
                defaultValue="Sandton, Johannesburg"
                className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-xl font-semibold"
              />
            </div>
          </div>
          <div>
            <label className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Trading Address</label>
            <input
              type="text"
              defaultValue="Shop 14, Sandton City, Rivonia Rd, Sandton"
              className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-xl font-semibold"
            />
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex gap-3">
          <NavyButton
            onClick={() => {
              alert('Business Profile updated successfully!');
              setActiveModal(null);
            }}
            className="flex-1"
          >
            Save Changes
          </NavyButton>
          <button
            onClick={() => setActiveModal(null)}
            className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default MerchantDashboardPage;
