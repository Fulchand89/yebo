import React from 'react';
import { YeboLogo } from '@/components/YeboLogo';
import { ShareIcon, CameraIcon } from '@/components/Icons';

export function Footer() {
  return (
    <footer className="bg-[#fef4ed] mt-12 sm:mt-16 pt-10 sm:pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 pb-10 sm:pb-12">
          {/* Column 1: Logo & Socials */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <YeboLogo className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto max-w-xs sm:max-w-none" />

            {/* Social circles */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                aria-label="Share"
                className="w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-slate-200/70 hover:bg-slate-300/80 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ShareIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Camera"
                className="w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-slate-200/70 hover:bg-slate-300/80 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <CameraIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 2: Subscriber Portal */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Subscriber Portal
            </h3>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li><a href="#" className="hover:text-slate-900 transition-colors">Dashboard Home</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Deals & Merchants</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">My Digital Card</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">My Vault & Payouts</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Refer & Earn Link</a></li>
            </ul>
          </div>

          {/* Column 3: Support & Trust */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Support & Trust
            </h3>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li><a href="#" className="hover:text-slate-900 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">FAQ & Rules</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Merchant Partner Portal</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">PayFast Billing Queries</a></li>
            </ul>
          </div>

          {/* Column 4: Legal & Privacy */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Legal & Privacy
            </h3>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li><a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">POPIA Compliance Notice</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">S2S Attribution Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Divider & Copyright */}
        <div className="pt-6 border-t border-slate-200/80 text-center">
          <p className="text-[11px] sm:text-xs text-slate-500 font-normal">
            &copy; 2024 YEBO PERKS. Lekker Living for everyone.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
