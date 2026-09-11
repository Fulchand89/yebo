import React, { useState } from 'react';
import { YeboLogo } from '@/components/YeboLogo';
import { BellIcon, ChevronDownIcon } from '@/components/Icons';

export function MerchantNavbar({ activeTab = 'Dashboard', onSelectTab }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'Dashboard', label: 'Dashboard' },
    { id: 'Deals', label: 'Deals' },
    { id: 'QR Scanner', label: 'QR Scanner' },
    { id: 'Staff Fund', label: 'Staff Fund' },
    { id: 'Flash Megaphone', label: 'Flash Megaphone' },
  ];

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left section: Logo & Merchant Partner Badge */}
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              type="button"
              onClick={() => onSelectTab && onSelectTab('Dashboard')}
              className="flex items-center cursor-pointer select-none"
            >
              <YeboLogo className="h-8 sm:h-11 md:h-12 w-auto" />
            </button>

            <div className="hidden sm:inline-flex items-center px-3 py-0.5 sm:py-1 rounded-full border border-orange-200 bg-[#fff5eb] text-[#ea580c] font-bold text-[10px] sm:text-xs tracking-wide uppercase select-none">
              MERCHANT PARTNER
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab && onSelectTab(item.id)}
                  className={`text-xs xl:text-sm font-semibold transition-colors relative py-2 cursor-pointer ${
                    isActive
                      ? 'text-[#9a3412] font-bold'
                      : 'text-slate-600 hover:text-slate-900 font-medium'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#9a3412] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right section: Notifications & User Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Bell Notification */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                aria-label="Notifications"
                className="relative p-2 text-slate-700 hover:text-slate-900 rounded-full hover:bg-slate-100 transition cursor-pointer"
              >
                <BellIcon className="w-5 h-5" />
                {/* Red/pink notification dot */}
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#f43f5e] rounded-full ring-2 ring-white" />
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 sm:right-0 -mr-10 sm:mr-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 text-left">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Notifications</span>
                    <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold">1 New</span>
                  </div>
                  <div className="divide-y divide-slate-50">
                    <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer">
                      <p className="text-xs font-semibold text-slate-800">New perk claimed at The Daily Grind</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">2 min ago • R5.00 Staff Fund added</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer">
                      <p className="text-xs font-semibold text-slate-800">Weekly Performance Summary ready</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Yesterday • Ranked #4 in Sandton</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Vertical Divider */}
            <div className="h-7 w-px bg-slate-200 hidden sm:block" />

            {/* User Profile */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 sm:gap-3 p-1 rounded-xl hover:bg-slate-50 transition text-left cursor-pointer"
              >
                <div className="relative shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                    alt="Thabo M."
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-orange-500/80 p-0.5"
                  />
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-extrabold text-slate-900 leading-tight">
                    Thabo M.
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 leading-none mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    <span>Active</span>
                  </div>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-slate-700 ml-0.5" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">Thabo M.</p>
                    <p className="text-[11px] text-slate-500">The Daily Grind (Sandton)</p>
                  </div>
                  <div className="py-1 text-xs">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onSelectTab && onSelectTab('Business Profile');
                      }}
                      className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 font-medium cursor-pointer"
                    >
                      Store Profile Settings
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onSelectTab && onSelectTab('Staff Fund');
                      }}
                      className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 font-medium cursor-pointer"
                    >
                      Staff Social Fund Payouts
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-medium cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 py-3 space-y-1 animate-in slide-in-from-top-2 duration-150">
            <div className="px-3 py-1 mb-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-orange-200 bg-[#fff5eb] text-[#ea580c] font-bold text-[10px] tracking-wide uppercase">
                MERCHANT PARTNER
              </span>
            </div>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab && onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-orange-50 text-[#9a3412] font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}

export default MerchantNavbar;
