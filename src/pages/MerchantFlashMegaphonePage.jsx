import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '@/components/common';
import { ChevronDownIcon } from '@/components/Icons';

// Custom SVG Icons
function MegaphoneAlertIcon({ className = 'w-4 h-4' }) {
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
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );
}

function ImageIcon({ className = 'w-4 h-4' }) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function UsersAudienceIcon({ className = 'w-4 h-4' }) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function SendPlaneIcon({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export function MerchantFlashMegaphonePage({ onNavigate }) {
  const navigate = useNavigate();

  const [promotionType, setPromotionType] = useState('Bakery Waste');
  const [promotionalMessage, setPromotionalMessage] = useState(
    'Fresh bakery stock available today — 30% off until 4 PM.'
  );
  const [hasImage, setHasImage] = useState(true);
  const [imageFileName, setImageFileName] = useState('bakery_fresh_croissants.jpg');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&auto=format&fit=crop&q=80'
  );
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const promotionTypes = [
    'Bakery Waste',
    'Surplus Clearance',
    'Daily Special',
    'Happy Hour Flash',
    'Fresh Produce Markdown',
    'Chef Special Event',
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
    else if (tab === 'Flash Megaphone') {
      // already on this page
    } else {
      handleNavigateTo(tab.toLowerCase().replace(/\s+/g, '-'));
    }
  };

  const handleSendPromotion = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 5000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex flex-col font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* 1. Header Navbar */}
      <Navbar
        activeTab="Flash Megaphone"
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
          <span className="text-[#ea580c] font-bold">Flash Megaphone</span>
        </nav>

        {/* Page Title & Subtitle */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
            FLASH MEGAPHONE
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
            Send urgent promotional messages to subscribers associated with your business.
          </p>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="h-px bg-slate-200/80 w-full mb-8" />

        {/* Success Alert Banner */}
        {isSent && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                ✓
              </span>
              <div>
                <p className="text-xs font-bold text-emerald-900">
                  Flash Broadcast Delivered Successfully!
                </p>
                <p className="text-[11px] text-emerald-700">
                  Push notification dispatched to active subscribers connected to The Daily Grind.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsSent(false)}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Two-Column Grid: Left Form + Right Notification Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: CREATE FLASH PROMOTION */}
          <section className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-6">
            {/* Form Title & Description */}
            <div>
              <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase">
                CREATE FLASH PROMOTION
              </h2>
              <p className="text-xs text-slate-500 font-normal mt-0.5">
                Create a short promotional message for your subscribers.
              </p>
            </div>

            <div className="h-px bg-slate-100 w-full" />

            {/* Field 1: PROMOTION TYPE */}
            <div>
              <label htmlFor="promotion-type" className="block text-[11px] font-extrabold text-slate-700 tracking-wider uppercase mb-2">
                PROMOTION TYPE <span className="text-[#ea580c]">*</span>
              </label>
              <div className="relative">
                <select
                  id="promotion-type"
                  value={promotionType}
                  onChange={(e) => setPromotionType(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition cursor-pointer pr-10"
                >
                  {promotionTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-[11px] text-slate-400 font-normal mt-1.5 leading-normal">
                Select the category that best matches your urgent surplus or special offer.
              </p>
            </div>

            {/* Field 2: PROMOTIONAL MESSAGE */}
            <div>
              <label htmlFor="promotional-message" className="block text-[11px] font-extrabold text-slate-700 tracking-wider uppercase mb-2">
                PROMOTIONAL MESSAGE <span className="text-[#ea580c]">*</span>
              </label>
              <textarea
                id="promotional-message"
                rows={4}
                value={promotionalMessage}
                onChange={(e) => setPromotionalMessage(e.target.value)}
                placeholder="Enter your urgent promotional offer..."
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition resize-none leading-relaxed"
              />
              <p className="text-[11px] text-slate-400 font-normal mt-1.5 leading-normal">
                Keep messages concise for quick subscriber comprehension on mobile lock screens.
              </p>
            </div>

            {/* Field 3: PROMOTION IMAGE (optional) */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-700 tracking-wider uppercase mb-2">
                PROMOTION IMAGE <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>

              {hasImage ? (
                <div className="border border-dashed border-slate-200 rounded-2xl p-4 bg-slate-50/50 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={imageUrl}
                      alt="Promotional Attachment"
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-[#ea580c]">
                        <ImageIcon className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {imageFileName}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Optional promotional image
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setHasImage(false)}
                    className="px-3 py-1 rounded-lg border border-orange-200 text-[#ea580c] bg-white hover:bg-orange-50 text-[11px] font-bold transition-colors cursor-pointer shrink-0"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setHasImage(true);
                    setImageFileName('bakery_fresh_croissants.jpg');
                    setImageUrl('https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&auto=format&fit=crop&q=80');
                  }}
                  className="w-full border border-dashed border-slate-300 rounded-2xl p-4 text-center hover:bg-slate-50 transition cursor-pointer"
                >
                  <span className="text-xs font-bold text-orange-600">
                    + Attach Promotional Image
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Recommended: 1:1 square JPG or PNG
                  </p>
                </button>
              )}
            </div>

            {/* Bottom Form Actions */}
            <div className="pt-4 flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => handleNavigateTo('dashboard')}
                className="w-full sm:w-auto text-center px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                CANCEL
              </button>

              <button
                type="button"
                onClick={handleSendPromotion}
                disabled={isSending}
                className="w-full sm:w-auto justify-center px-6 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-50"
              >
                <SendPlaneIcon className="w-3.5 h-3.5" />
                <span>{isSending ? 'SENDING...' : 'SEND FLASH PROMOTION'}</span>
              </button>
            </div>
          </section>

          {/* RIGHT COLUMN: NOTIFICATION PREVIEW */}
          <section className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.03)] p-6 sm:p-7 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500">
                  <MegaphoneAlertIcon className="w-4 h-4 text-orange-500" />
                </span>
                <h2 className="text-xs font-black text-slate-900 tracking-wider uppercase">
                  NOTIFICATION PREVIEW
                </h2>
              </div>
              <p className="text-xs text-slate-500 font-normal leading-relaxed mt-2">
                This is how your flash promotion will appear as a push notification to subscribers:
              </p>
            </div>

            {/* Push Notification Card (Dark Navy) */}
            <div className="bg-[#0a1128] text-white rounded-2xl p-5 shadow-lg border border-white/10 space-y-3.5">
              {/* Top Row: App name · Category pill */}
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider">
                <span className="text-slate-300 uppercase">YEBO PERKS</span>
                <span className="text-slate-500">&middot;</span>
                <span className="text-[#facc15] font-black uppercase">
                  {promotionType}
                </span>
              </div>

              {/* Middle Row: Content & Image */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <p className="text-xs font-extrabold text-white">
                    The Daily Grind
                  </p>
                  <p className="text-xs text-slate-300 font-normal leading-snug break-words">
                    {promotionalMessage || 'Your promotional message will appear here...'}
                  </p>
                </div>

                {hasImage && (
                  <img
                    src={imageUrl}
                    alt="Preview Thumbnail"
                    className="w-12 h-12 rounded-xl object-cover shrink-0 ring-1 ring-white/10"
                  />
                )}
              </div>

              {/* Bottom Row: Window status & Tap to open */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                <span className="text-[#facc15] font-bold">
                  Flash Promotion &middot; Limited Window
                </span>
                <span className="text-slate-400">
                  Tap to open
                </span>
              </div>
            </div>

            {/* Audience Targeting Callout */}
            <div className="bg-[#fffbf6] border border-orange-200/60 rounded-2xl p-4 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-orange-100/80 flex items-center justify-center text-[#ea580c] shrink-0 mt-0.5">
                <UsersAudienceIcon className="w-4 h-4 text-[#ea580c]" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 leading-tight">
                  Subscribers associated with your business
                </h3>
                <p className="text-[11px] text-slate-500 font-normal leading-relaxed mt-1">
                  This push notification is automatically targeted only to active subscribers connected to The Daily Grind.
                </p>
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

export default MerchantFlashMegaphonePage;
