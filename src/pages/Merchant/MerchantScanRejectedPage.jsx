import React, { useState } from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { CommandPalette } from '@/components/common/CommandPalette';
import { ShieldCheckMiniIcon } from '@/components/Icons';

export default function MerchantScanRejectedPage({ onNavigate }) {
  const [activeCommonModal, setActiveCommonModal] = useState(null);

  const handleNav = (target) => {
    if (onNavigate) {
      onNavigate(target);
    } else {
      window.location.href = target === 'dashboard' ? '/' : `/${target}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans flex flex-col justify-between selection:bg-orange-100 selection:text-orange-900">
      {/* 1. Header / Navbar */}
      <Navbar
        activeTab="QR Scanner"
        onSelectTab={(tabId) => {
          if (tabId === 'Dashboard') handleNav('dashboard');
          else if (tabId === 'Deals') handleNav('deals');
          else if (tabId === 'QR Scanner') handleNav('qr-scanner');
          else if (tabId === 'Staff Fund') {
            handleNav('dashboard');
            setActiveCommonModal('staffFund');
          } else if (tabId === 'Flash Megaphone') {
            handleNav('dashboard');
            setActiveCommonModal('megaphone');
          }
        }}
        onOpenCommand={() => setActiveCommonModal('command')}
      />

      {/* 2. Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 flex-1 w-full">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold mb-6">
          <button
            type="button"
            onClick={() => handleNav('dashboard')}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition cursor-pointer"
          >
            <span>&larr;</span>
            <span>Dashboard</span>
          </button>
          <span className="text-slate-300">/</span>
          <button
            type="button"
            onClick={() => handleNav('qr-scanner')}
            className="text-slate-500 hover:text-slate-900 transition cursor-pointer"
          >
            QR Scanner
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-[#ff6b00] font-bold">Scan Rejected</span>
        </div>

        {/* Centered White Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 sm:p-12">
          {/* Top Status Icon */}
          <div className="w-20 h-20 rounded-full bg-[#dc2626] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          {/* Badge */}
          <div className="flex justify-center mb-4">
            <span className="bg-[#fee2e2] text-[#dc2626] border border-red-200/60 text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
              SCAN REJECTED
            </span>
          </div>

          {/* Header Title */}
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight uppercase text-center mb-2">
            REDEMPTION NOT APPROVED
          </h1>

          {/* Subtext */}
          <p className="text-xs sm:text-sm text-slate-500 font-medium text-center max-w-md mx-auto mb-8 leading-relaxed">
            The QR code could not be validated for this redemption.
          </p>

          {/* Inner Card 1: Selected Deal */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-900">
                SELECTED DEAL
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200/80">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                Not Redeemed
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Boerewors Special
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  Specific Item Deal
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  YEBO PRICE
                </span>
                <div className="flex items-baseline justify-end gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-[#ff6b00]">
                    R79
                  </span>
                  <span className="text-xs text-slate-400 line-through font-medium">
                    Standard R99
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Inner Card 2: Scan Result */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 mb-5">
            <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-900 mb-3">
              SCAN RESULT
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#fff5f5] border border-red-200/60 rounded-xl p-3.5">
                <p className="text-[11px] text-slate-500 font-medium mb-1">
                  Status
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#dc2626] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]"></span>
                  REJECTED
                </p>
              </div>
              <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-3.5">
                <p className="text-[11px] text-slate-500 font-medium mb-1">
                  Deal
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  NOT REDEEMED
                </p>
              </div>
              <div className="bg-[#fff5f5] border border-red-200/60 rounded-xl p-3.5">
                <p className="text-[11px] text-slate-500 font-medium mb-1">
                  Redemption
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#dc2626] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]"></span>
                  NOT PROCESSED
                </p>
              </div>
            </div>
          </div>

          {/* Inner Card 3: Rejection Reason */}
          <div className="bg-[#fff5f5] border border-red-200 rounded-2xl p-4 sm:p-5 mb-3 flex items-start gap-3">
            <div className="w-5 h-5 rounded-full border border-red-400 text-red-500 flex items-center justify-center font-serif text-xs font-bold shrink-0 mt-0.5 select-none">
              i
            </div>
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-wider text-red-900 mb-0.5">
                REJECTION REASON: QR CODE COULD NOT BE VALIDATED
              </h4>
              <p className="text-xs text-slate-600 font-normal">
                The QR code is not valid for this redemption.
              </p>
            </div>
          </div>

          {/* Inner Card 4: Redemption Not Processed */}
          <div className="bg-[#f8fafc] border border-slate-200/90 rounded-2xl p-4 sm:p-5 mb-8 flex items-center gap-3">
            <ShieldCheckMiniIcon className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-700">
              REDEMPTION NOT PROCESSED
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => handleNav('deals')}
              className="w-full sm:w-auto text-center border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-xl transition cursor-pointer"
            >
              BACK TO DEALS
            </button>
            <button
              type="button"
              onClick={() => handleNav('qr-scanner')}
              className="w-full sm:w-auto text-center bg-[#ff6b00] hover:bg-[#e05e00] text-white text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md shadow-orange-500/20 transition cursor-pointer"
            >
              SCAN ANOTHER QR
            </button>
          </div>
        </div>
      </main>

      {/* Command Palette */}
      <CommandPalette
        isOpen={activeCommonModal === 'command'}
        onClose={() => setActiveCommonModal(null)}
        onNavigate={(page) => {
          handleNav(page);
          setActiveCommonModal(null);
        }}
        onOpenModal={(modal) => {
          setActiveCommonModal(modal);
        }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
