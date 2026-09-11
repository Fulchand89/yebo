import React, { useState, useEffect } from 'react';
import {
  SearchIcon,
  XMarkIcon,
  DealsTagIcon,
  QrCodeIcon,
  StaffFundIcon,
  MegaphoneIcon,
  BusinessProfileIcon,
  PlusCircleIcon,
  ProductsIcon,
  BarChartIcon,
  ShieldMiniIcon,
} from '@/components/Icons';

export function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
  onOpenModal,
}) {
  const [query, setQuery] = useState('');

  // Listen for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else if (onOpenModal) onOpenModal('command');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onOpenModal]);

  if (!isOpen) return null;

  const commands = [
    {
      id: 'dashboard',
      category: 'Navigation',
      label: 'Open Merchant Dashboard',
      description: 'View performance, rankings and business status',
      icon: BarChartIcon,
      action: () => {
        onNavigate && onNavigate('dashboard');
        onClose();
      },
    },
    {
      id: 'deals',
      category: 'Navigation',
      label: 'Manage Configured Deals',
      description: 'Browse all 6 active and inactive member promotions',
      icon: DealsTagIcon,
      action: () => {
        onNavigate && onNavigate('deals');
        onClose();
      },
    },
    {
      id: 'create-deal',
      category: 'Actions',
      label: 'Create New Deal',
      description: 'Configure and publish a new discount or bundle offer',
      icon: PlusCircleIcon,
      action: () => {
        onNavigate && onNavigate('deals');
        onOpenModal && onOpenModal('createDeal');
        onClose();
      },
    },
    {
      id: 'qr-scanner',
      category: 'Actions',
      label: 'Open QR Scanner',
      description: 'Scan subscriber digital card or enter manual code',
      icon: QrCodeIcon,
      action: () => {
        onNavigate && onNavigate('qr-scanner');
        onClose();
      },
    },
    {
      id: 'staff-fund',
      category: 'Actions',
      label: 'Staff Social Fund Details',
      description: 'Check accumulated R40.00 team balance and allocations',
      icon: StaffFundIcon,
      action: () => {
        onNavigate && onNavigate('dashboard');
        onOpenModal && onOpenModal('staffFund');
        onClose();
      },
    },
    {
      id: 'megaphone',
      category: 'Actions',
      label: 'Broadcast Flash Megaphone',
      description: 'Send instant 2-hour push notification to local Sandton users',
      icon: MegaphoneIcon,
      action: () => {
        onNavigate && onNavigate('dashboard');
        onOpenModal && onOpenModal('megaphone');
        onClose();
      },
    },
    {
      id: 'products',
      category: 'Settings',
      label: 'Product Itemizer & Catalog',
      description: 'Manage menu items, prices and category assignments',
      icon: ProductsIcon,
      action: () => {
        onNavigate && onNavigate('product-itemizer');
        onClose();
      },
    },
    {
      id: 'protection-matrix',
      category: 'Settings',
      label: 'Deal Protection Matrix',
      description: 'Configure redemption days, operating windows and daily caps',
      icon: ShieldMiniIcon,
      action: () => {
        onNavigate && onNavigate('protection-matrix');
        onClose();
      },
    },
    {
      id: 'deal-builder',
      category: 'Actions',
      label: 'Open Deal Builder',
      description: 'Create and configure new merchant deals and promotions',
      icon: PlusCircleIcon,
      action: () => {
        onNavigate && onNavigate('deal-builder');
        onClose();
      },
    },
    {
      id: 'profile',
      category: 'Settings',
      label: 'Edit Merchant Profile',
      description: 'Update The Daily Grind business address, category and hours',
      icon: BusinessProfileIcon,
      action: () => {
        onNavigate && onNavigate('dashboard');
        onOpenModal && onOpenModal('profile');
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-24 md:pt-28 px-3 sm:px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Command Search Bar */}
        <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-100">
          <SearchIcon className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search action..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block text-[10px] font-bold bg-slate-100 border border-slate-200 text-slate-500 px-2 py-0.5 rounded">
            ESC
          </kbd>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Command List */}
        <div className="p-2 max-h-[60vh] sm:max-h-80 overflow-y-auto divide-y divide-slate-50">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={cmd.action}
                  className="w-full p-3 rounded-xl hover:bg-orange-50/60 flex items-center gap-3 text-left transition group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-orange-100 group-hover:text-orange-600 flex items-center justify-center text-slate-600 transition shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-900 group-hover:text-orange-900">
                        {cmd.label}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                        {cmd.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {cmd.description}
                    </p>
                  </div>
                  <span className="text-xs text-slate-300 group-hover:text-orange-500 font-bold">
                    ↵
                  </span>
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              No matching commands found for "{query}"
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigation & Quick Actions</span>
          <span>Tip: Press <strong className="text-slate-600">Ctrl + K</strong> anywhere</span>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
