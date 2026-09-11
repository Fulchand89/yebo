import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { Modal } from '@/components/common/Modal';
import { CommandPalette } from '@/components/common/CommandPalette';
import {
  VideoCameraIcon,
  CameraIcon,
  QuestionCircleIcon,
  ChevronDownIcon,
  CheckMiniIcon,
  QrCodeIcon,
  XMarkIcon,
} from '@/components/Icons';

export default function MerchantQrScannerPage({ onNavigate }) {
  // Available deals for redemption
  const dealsList = [
    {
      id: 'boerewors',
      title: 'Boerewors Special (Specific Item Deal — Active)',
      labelShort: 'Boerewors Special',
      yeboPrice: 'R79 Yebo Price',
      dealType: 'Specific Item Deal',
      status: 'Active',
      regularPrice: 'R110.00',
      discountedPrice: 'R79.00',
      savings: 'R31.00',
      staffTip: 'R5.00',
    },
    {
      id: 'cappuccino',
      title: 'Cappuccino & Croissant Combo (Bundle Deal — Active)',
      labelShort: 'Cappuccino & Croissant',
      yeboPrice: 'R45 Yebo Price',
      dealType: 'Bundle Deal',
      status: 'Active',
      regularPrice: 'R65.00',
      discountedPrice: 'R45.00',
      savings: 'R20.00',
      staffTip: 'R3.00',
    },
    {
      id: 'wagyu',
      title: 'Flame-Grilled Wagyu Burger (Specific Item Deal — Active)',
      labelShort: 'Wagyu Burger Deal',
      yeboPrice: 'R120 Yebo Price',
      dealType: 'Specific Item Deal',
      status: 'Active',
      regularPrice: 'R165.00',
      discountedPrice: 'R120.00',
      savings: 'R45.00',
      staffTip: 'R8.00',
    },
    {
      id: 'lunch',
      title: 'Weekday Lunch Special (Category Deal — Active)',
      labelShort: 'Weekday Lunch 20% Off',
      yeboPrice: '20% Off',
      dealType: 'Category Deal',
      status: 'Active',
      regularPrice: 'Menu item',
      discountedPrice: '20% discount',
      savings: '20%',
      staffTip: 'R4.00',
    },
  ];

  const [selectedDealId, setSelectedDealId] = useState('boerewors');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cameraAccessGranted, setCameraAccessGranted] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCustomer, setScannedCustomer] = useState(null);
  const [showRedeemSuccessModal, setShowRedeemSuccessModal] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [activeCommonModal, setActiveCommonModal] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const currentDeal =
    dealsList.find((d) => d.id === selectedDealId) || dealsList[0];

  // Request camera access
  const handleAllowCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setCameraAccessGranted(true);
        setIsScanning(true);
      } else {
        // Fallback simulation mode if hardware camera is not available in sandbox
        setCameraAccessGranted(true);
        setIsScanning(true);
      }
    } catch (err) {
      console.warn('Camera access fallback enabled:', err);
      // Still enable simulation mode so merchant can test the scanner UI
      setCameraAccessGranted(true);
      setIsScanning(true);
    }
  };

  // Stop camera when unmounting
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Simulate customer scan
  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setScannedCustomer({
        name: 'Sipho Dlamini',
        membershipId: 'YB-8942-SANDTON',
        tier: 'Gold Member',
        memberSince: 'March 2023',
        dealRedeemed: currentDeal.title,
        finalPrice: currentDeal.discountedPrice,
        savings: currentDeal.savings,
        staffFundContribution: currentDeal.staffTip,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
      setShowRedeemSuccessModal(true);
      setIsScanning(false);
    }, 900);
  };

  // Manual code redemption
  const handleManualRedeem = (e) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    setScannedCustomer({
      name: 'Nandi Khumalo',
      membershipId: `YB-${manualCode.toUpperCase().slice(0, 6)}`,
      tier: 'Premium Member',
      memberSince: 'July 2023',
      dealRedeemed: currentDeal.title,
      finalPrice: currentDeal.discountedPrice,
      savings: currentDeal.savings,
      staffFundContribution: currentDeal.staffTip,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
    setShowRedeemSuccessModal(true);
    setManualCode('');
    setShowManualInput(false);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans flex flex-col justify-between selection:bg-orange-100 selection:text-orange-900">
      {/* 1. Standard YEBO Navbar */}
      <Navbar
        activeTab="QR Scanner"
        onSelectTab={(tabId) => {
          if (tabId === 'Dashboard') onNavigate('dashboard');
          else if (tabId === 'Deals') onNavigate('deals');
          else if (tabId === 'QR Scanner') onNavigate('qr-scanner');
          else if (tabId === 'Staff Fund') {
            onNavigate('staff-fund');
          } else if (tabId === 'Flash Megaphone') {
            onNavigate('flash-megaphone');
          }
        }}
        onOpenCommand={() => setActiveCommonModal('command')}
      />

      {/* 2. Main Page Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 flex-1 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold mb-4">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition cursor-pointer"
          >
            <span>&larr;</span>
            <span>Dashboard</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-[#ff6b00] font-bold">QR Scanner</span>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight uppercase">
            QR SCANNER
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Scan a customer QR code to validate their membership and redeem a deal.
          </p>
        </div>

        {/* CARD 1: SELECT DEAL */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] p-5 sm:p-6 mb-6">
          <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-3 select-none">
            SELECT DEAL
          </label>

          {/* Deal Picker Box */}
          <div className="relative">
            <div className="w-full bg-[#f8fafc] border border-slate-200/90 rounded-xl p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition hover:border-slate-300">
              {/* Left Selector Trigger */}
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between gap-3 text-left w-full sm:w-auto flex-1 cursor-pointer"
              >
                <span className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                  {currentDeal.title}
                </span>
                <ChevronDownIcon
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180 text-orange-500' : ''
                  }`}
                />
              </button>

              {/* Right Side Pill Metadata */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 w-full sm:w-auto justify-between sm:justify-end">
                {/* Yebo Price Pill */}
                <span className="bg-[#ff6b00] text-white text-[11px] sm:text-xs font-black px-3 py-1.5 rounded-full shadow-xs tracking-tight whitespace-nowrap">
                  {currentDeal.yeboPrice}
                </span>

                {/* Deal Type Label */}
                <span className="text-[11px] sm:text-xs font-semibold text-slate-700 whitespace-nowrap hidden md:inline">
                  {currentDeal.dealType}
                </span>

                {/* Active Badge */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#ecfdf5] text-[#059669] border border-emerald-200/70 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              </div>
            </div>

            {/* Dropdown Options Menu */}
            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-slate-200 shadow-xl z-30 overflow-hidden py-1 divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
                  {dealsList.map((deal) => {
                    const isSelected = deal.id === selectedDealId;
                    return (
                      <button
                        key={deal.id}
                        type="button"
                        onClick={() => {
                          setSelectedDealId(deal.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 flex items-center justify-between gap-3 text-xs sm:text-sm transition cursor-pointer ${
                          isSelected
                            ? 'bg-orange-50/70 text-orange-950 font-bold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isSelected ? 'bg-orange-500' : 'bg-slate-300'
                            }`}
                          />
                          <span className="truncate">{deal.title}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="bg-[#ff6b00] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {deal.yeboPrice}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* CARD 2: SCAN CUSTOMER QR */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] p-5 sm:p-6 mb-6 overflow-hidden">
          {/* Section Header */}
          <div className="mb-4">
            <h2 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
              SCAN CUSTOMER QR
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Position the customer's QR code inside the scanner frame.
            </p>
          </div>

          {/* Dark Scanner Viewport */}
          <div className="bg-[#111625] rounded-2xl min-h-[320px] sm:min-h-[410px] flex flex-col items-center justify-center p-4 sm:p-10 text-center relative overflow-hidden select-none border border-slate-800">
            {/* Background subtle grid effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {!cameraAccessGranted ? (
              /* State 1: Matching Reference Screenshot 100% (CAMERA ACCESS REQUIRED) */
              <div className="relative z-10 flex flex-col items-center max-w-sm animate-in fade-in duration-300">
                {/* Circular Camera Icon Badge */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1b233a] border border-slate-700/60 flex items-center justify-center mb-4 sm:mb-5 text-[#ff6b00] shadow-inner">
                  <VideoCameraIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                {/* Main Heading */}
                <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wider mb-2">
                  CAMERA ACCESS REQUIRED
                </h3>

                {/* Subtext */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-normal px-2">
                  Allow camera access to scan a customer QR code.
                </p>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={handleAllowCamera}
                  className="bg-[#ff6b00] hover:bg-[#e05e00] text-white font-black text-xs sm:text-sm uppercase tracking-wider px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2.5 transition active:scale-98 cursor-pointer group w-full sm:w-auto"
                >
                  <CameraIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>ALLOW CAMERA ACCESS</span>
                </button>

                {/* Alternative Quick Scan Option */}
                <div className="mt-5 flex flex-wrap justify-center items-center gap-2.5 text-xs text-slate-400">
                  <button
                    type="button"
                    onClick={() => onNavigate('scan-expired')}
                    className="hover:text-amber-400 text-amber-500 font-semibold underline underline-offset-2 transition cursor-pointer"
                  >
                    ⏳ Scan Expired
                  </button>
                  <span>&bull;</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('scan-rejected')}
                    className="hover:text-red-400 text-red-500 font-semibold underline underline-offset-2 transition cursor-pointer"
                  >
                    ❌ Scan Rejected
                  </button>
                  <span>&bull;</span>
                  <button
                    type="button"
                    onClick={() => setShowManualInput(!showManualInput)}
                    className="hover:text-orange-400 underline underline-offset-2 transition cursor-pointer"
                  >
                    Enter code
                  </button>
                </div>
              </div>
            ) : (
              /* State 2: Active Camera Viewport with Scanner HUD */
              <div className="relative z-10 flex flex-col items-center w-full max-w-md animate-in fade-in duration-300">
                {/* Video feed or simulated viewfinder */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border-2 border-slate-700/80 bg-black/60 shadow-2xl flex items-center justify-center">
                  <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    playsInline
                    muted
                  />

                  {/* 4 Corner Scanner Brackets */}
                  <div className="absolute top-4 left-4 w-7 h-7 border-t-4 border-l-4 border-[#ff6b00] rounded-tl-md" />
                  <div className="absolute top-4 right-4 w-7 h-7 border-t-4 border-r-4 border-[#ff6b00] rounded-tr-md" />
                  <div className="absolute bottom-4 left-4 w-7 h-7 border-b-4 border-l-4 border-[#ff6b00] rounded-bl-md" />
                  <div className="absolute bottom-4 right-4 w-7 h-7 border-b-4 border-r-4 border-[#ff6b00] rounded-br-md" />

                  {/* Animated laser scanning bar */}
                  <div className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[#ff6b00] to-transparent shadow-[0_0_12px_#ff6b00] animate-[pulse_1.5s_ease-in-out_infinite]" />

                  {/* Centered QR hint */}
                  <div className="flex flex-col items-center text-slate-400 pointer-events-none p-4">
                    <QrCodeIcon className="w-16 h-16 opacity-30 mb-2" />
                    <span className="text-[11px] font-semibold text-slate-300 bg-black/60 px-3 py-1 rounded-full backdrop-blur-xs">
                      Align QR code here
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-4 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Camera active &bull; Waiting for customer QR pass...
                </p>

                {/* Quick Simulation Buttons for Testing */}
                <div className="flex flex-wrap justify-center items-center gap-2.5 mt-4">
                  <button
                    type="button"
                    onClick={() => onNavigate('scan-success')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition shadow-md shadow-emerald-600/20 cursor-pointer"
                  >
                    ⚡ Success Page
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('scan-expired')}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition shadow-md shadow-amber-600/20 cursor-pointer"
                  >
                    ⏳ Expired Page
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('scan-rejected')}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition shadow-md shadow-red-600/20 cursor-pointer"
                  >
                    ❌ Rejected Page
                  </button>
                  <button
                    type="button"
                    onClick={() => setCameraAccessGranted(false)}
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-3 py-2 rounded-xl transition cursor-pointer"
                  >
                    Reset View
                  </button>
                </div>
              </div>
            )}

            {/* Manual Code Input Drawer */}
            {showManualInput && (
              <form
                onSubmit={handleManualRedeem}
                className="mt-4 z-20 flex items-center gap-2 max-w-sm w-full bg-slate-900/90 border border-slate-700 p-2 rounded-xl backdrop-blur-md animate-in slide-in-from-top-2"
              >
                <input
                  type="text"
                  placeholder="Enter Pass ID e.g. YB-7821"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  className="bg-slate-800 text-white placeholder-slate-400 text-xs px-3 py-2 rounded-lg flex-1 outline-none border border-slate-700 focus:border-orange-500 uppercase font-mono"
                />
                <button
                  type="submit"
                  className="bg-[#ff6b00] hover:bg-[#e05e00] text-white text-xs font-bold px-3 py-2 rounded-lg transition cursor-pointer"
                >
                  Verify
                </button>
              </form>
            )}
          </div>
        </div>

        {/* CARD 3: HOW TO SCAN */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] p-5 sm:p-6 mb-8">
          {/* Header */}
          <div className="flex items-center gap-2 mb-5">
            <QuestionCircleIcon className="w-5 h-5 text-[#ff6b00]" />
            <h2 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
              HOW TO SCAN
            </h2>
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="bg-[#f8fafc] border border-slate-100/90 rounded-xl p-4 sm:p-4.5 flex flex-col justify-between">
              <div>
                <div className="w-6 h-6 rounded-full bg-[#0c1844] text-white text-xs font-black flex items-center justify-center mb-3 select-none">
                  1
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-950 mb-1">
                  Select Deal
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                  Confirm the active offer from the dropdown menu above.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#f8fafc] border border-slate-100/90 rounded-xl p-4 sm:p-4.5 flex flex-col justify-between">
              <div>
                <div className="w-6 h-6 rounded-full bg-[#0c1844] text-white text-xs font-black flex items-center justify-center mb-3 select-none">
                  2
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-950 mb-1">
                  Request Pass
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                  Ask customer to display their YEBO PERKS dynamic QR code.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#f8fafc] border border-slate-100/90 rounded-xl p-4 sm:p-4.5 flex flex-col justify-between">
              <div>
                <div className="w-6 h-6 rounded-full bg-[#ff6b00] text-white text-xs font-black flex items-center justify-center mb-3 select-none">
                  3
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-950 mb-1">
                  Position Code
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                  Position the QR code inside the 4-corner camera viewport.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#f8fafc] border border-slate-100/90 rounded-xl p-4 sm:p-4.5 flex flex-col justify-between">
              <div>
                <div className="w-6 h-6 rounded-full bg-[#059669] text-white text-xs font-black flex items-center justify-center mb-3 select-none">
                  4
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-950 mb-1">
                  Validation
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                  The system validates the QR code and logs the redemption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Successful Redemption Modal */}
      {showRedeemSuccessModal && scannedCustomer && (
        <Modal
          isOpen={showRedeemSuccessModal}
          onClose={() => setShowRedeemSuccessModal(false)}
          title="Customer Pass Validated"
          subtitle="Redemption logged successfully to merchant ledger"
          maxWidth="max-w-md"
        >
          <div className="space-y-4 pt-2">
            {/* Verification Banner */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <CheckMiniIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                  Active Subscriber Verified
                </p>
                <p className="text-sm font-black text-emerald-900">
                  {scannedCustomer.name}
                </p>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full inline-block mt-0.5">
                  {scannedCustomer.tier} &bull; {scannedCustomer.membershipId}
                </span>
              </div>
            </div>

            {/* Deal Breakdown */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>Selected Offer:</span>
                <span className="font-bold text-slate-900">
                  {currentDeal.labelShort}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Original Price:</span>
                <span className="line-through text-slate-400">
                  {currentDeal.regularPrice}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>YEBO Discounted Total:</span>
                <span className="font-black text-[#ff6b00] text-sm">
                  {currentDeal.discountedPrice}
                </span>
              </div>
              <div className="flex justify-between items-center text-emerald-600 font-semibold pt-1 border-t border-slate-200">
                <span>Customer Saved:</span>
                <span className="font-bold">{currentDeal.savings}</span>
              </div>
              <div className="flex justify-between items-center text-blue-700 font-semibold">
                <span>Staff Social Fund Credit:</span>
                <span className="font-bold">+{currentDeal.staffTip}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowRedeemSuccessModal(false)}
                className="w-full bg-[#ff6b00] hover:bg-[#e05e00] text-white font-black text-xs uppercase py-3 rounded-xl transition shadow-md shadow-orange-500/20 cursor-pointer"
              >
                Complete & Print Slip
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* 4. Common Command Palette */}
      <CommandPalette
        isOpen={activeCommonModal === 'command'}
        onClose={() => setActiveCommonModal(null)}
        onNavigate={(page) => {
          onNavigate(page);
          setActiveCommonModal(null);
        }}
        onOpenModal={(modal) => {
          setActiveCommonModal(modal);
        }}
      />

      {/* 5. Standard Footer */}
      <Footer />
    </div>
  );
}
