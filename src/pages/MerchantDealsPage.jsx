import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Footer,
  Modal,
  ActiveBadge,
  InactiveBadge,
  DealTypeBadge,
  PrimaryButton,
  OutlineButton,
  NavyButton,
  CommandPalette,
} from '@/components/common';
import {
  CalendarMiniIcon,
  ClockMiniIcon,
  ShieldMiniIcon,
  PlusCircleIcon,
  ProductsIcon,
  SearchIcon,
  FilterIcon,
  EllipsisVerticalIcon,
  ChevronDownIcon,
} from '@/components/Icons';

export function MerchantDealsPage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'ACTIVE' | 'INACTIVE'
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [showCommandModal, setShowCommandModal] = useState(false);

  // Initial 6 deals matching the image
  const [deals, setDeals] = useState([
    {
      id: 1,
      name: 'Boerewors Special',
      subtitle: 'Our famous boerewors at a special...',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=120&auto=format&fit=crop&q=80',
      type: 'Specific Item Deal',
      offerTitle: 'Yebo Price',
      offerMain: 'R79',
      offerSub: '(Standard R99)',
      offerColor: 'text-[#f97316]',
      days: 'MON - SUN',
      hours: '09:00 – 18:00',
      cap: 'CAP 50/DAY',
      status: 'ACTIVE',
    },
    {
      id: 2,
      name: 'Weekday Saver',
      subtitle: 'Get 15% off your total bill on weekdays.',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=120&auto=format&fit=crop&q=80',
      type: 'Percentage Discount',
      offerTitle: '',
      offerMain: '15% OFF',
      offerSub: 'Total bill discount',
      offerColor: 'text-slate-900',
      days: 'MON - FRI',
      hours: '10:00 – 16:00',
      cap: 'CAP 30/DAY',
      status: 'ACTIVE',
    },
    {
      id: 3,
      name: 'Buy One Get One Burger',
      subtitle: 'Double the flavour for less.',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=120&auto=format&fit=crop&q=80',
      type: 'BOGO',
      offerTitle: '',
      offerMain: 'BUY 1 GET 1',
      offerSub: 'Equal or lesser value',
      offerColor: 'text-[#f43f5e]',
      days: 'SAT - SUN',
      hours: '12:00 – 18:00',
      cap: 'CAP 20/DAY',
      status: 'ACTIVE',
    },
    {
      id: 4,
      name: 'Breakfast Bundle',
      subtitle: 'Coffee, muffin and toast for a great...',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=120&auto=format&fit=crop&q=80',
      type: 'Bundle',
      offerTitle: '',
      offerMain: '3 ITEMS FOR R150',
      offerSub: 'Curated combo',
      offerColor: 'text-slate-900',
      days: 'MON - SUN',
      hours: '07:00 – 11:00',
      cap: 'CAP 25/DAY',
      status: 'ACTIVE',
    },
    {
      id: 5,
      name: 'Storewide Weekend',
      subtitle: 'Enjoy 10% off everything in-store.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=120&auto=format&fit=crop&q=80',
      type: 'Storewide Deal',
      offerTitle: '',
      offerMain: '10% OFF',
      offerSub: 'All inventory',
      offerColor: 'text-slate-900',
      days: 'SAT - SUN',
      hours: '09:00 – 20:00',
      cap: 'CAP 40/DAY',
      status: 'INACTIVE',
    },
    {
      id: 6,
      name: 'Lunch Category Special',
      subtitle: 'Great deals on all lunch items.',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=120&auto=format&fit=crop&q=80',
      type: 'Category Deal',
      offerTitle: '',
      offerMain: 'CATEGORY OFFER',
      offerSub: 'Selected category',
      offerColor: 'text-[#f97316]',
      days: 'MON - FRI',
      hours: '11:00 – 15:00',
      cap: 'CAP 35/DAY',
      status: 'ACTIVE',
    },
  ]);

  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' ? true : deal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleStatus = (id) => {
    setDeals((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: d.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }
          : d
      )
    );
    if (selectedDeal && selectedDeal.id === id) {
      setSelectedDeal((prev) => ({
        ...prev,
        status: prev.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex flex-col font-sans">
      {/* 1. Common Navbar */}
      <Navbar
        activeTab="Deals"
        onSelectTab={(tab) => {
          if (tab === 'Dashboard' && onNavigate) onNavigate('dashboard');
          else if (tab === 'Deals') {
            // current page
          } else if (tab === 'QR Scanner' && onNavigate) {
            onNavigate('qr-scanner');
          } else if (tab === 'Staff Fund' && onNavigate) {
            onNavigate('staff-fund');
          } else if (tab === 'Flash Megaphone' && onNavigate) {
            onNavigate('flash-megaphone');
          } else if (onNavigate) {
            onNavigate('dashboard', tab);
          }
        }}
        onOpenCommand={() => setShowCommandModal(true)}
      />

      {/* 2. Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumbs: ← Dashboard / New Deal */}
        <div className="flex items-center gap-2 text-xs mb-5 select-none">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('dashboard')}
            className="flex items-center gap-1.5 text-slate-800 hover:text-orange-600 font-bold transition cursor-pointer"
          >
            <span className="text-sm">←</span>
            <span>Dashboard</span>
          </button>
          <span className="text-slate-300 font-normal">/</span>
          <button
            type="button"
            onClick={() => onNavigate ? onNavigate('deal-builder') : setShowCreateModal(true)}
            className="text-[#ea580c] font-bold hover:underline cursor-pointer"
          >
            New Deal
          </button>
        </div>

        {/* Page Title & Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase">
              DEALS
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage your configured YEBO PERKS deals and member discounts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
            {/* Manage Products Button */}
            <OutlineButton
              onClick={() => onNavigate ? onNavigate('product-itemizer') : setShowProductsModal(true)}
              className="border-slate-900 text-slate-900 flex-1 sm:flex-initial justify-center"
            >
              <ProductsIcon className="w-4 h-4 text-slate-900" />
              <span>MANAGE PRODUCTS</span>
            </OutlineButton>

            {/* Protection Matrix Button */}
            <OutlineButton
              onClick={() => onNavigate && onNavigate('protection-matrix')}
              className="border-slate-300 text-slate-700 hover:border-orange-500 hover:text-orange-600 flex-1 sm:flex-initial justify-center"
            >
              <ShieldMiniIcon className="w-4 h-4 text-[#0c1844]" />
              <span>PROTECTION MATRIX</span>
            </OutlineButton>

            {/* Create Deal Button */}
            <PrimaryButton 
              onClick={() => onNavigate ? onNavigate('deal-builder') : setShowCreateModal(true)}
              className="w-full sm:w-auto justify-center"
            >
              <PlusCircleIcon className="w-4 h-4 text-white" />
              <span>CREATE DEAL</span>
            </PrimaryButton>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.03)] mt-6 sm:mt-8 overflow-hidden">
          {/* Card Header Toolbar */}
          <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <h2 className="text-sm sm:text-lg font-black text-slate-900 tracking-tight">
                YOUR DEALS
              </h2>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                {filteredDeals.length} DEALS
              </span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              {/* Search Deals */}
              <div className="relative flex-1 sm:flex-initial">
                <SearchIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search deals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500 w-full sm:w-56"
                />
              </div>

              {/* Status Filter Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  <FilterIcon className="w-3.5 h-3.5 text-slate-500" />
                  <span>
                    {statusFilter === 'All' ? 'All Status' : statusFilter}
                  </span>
                  <ChevronDownIcon className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showStatusDropdown && (
                  <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-100 rounded-xl shadow-lg py-1 z-30 text-xs">
                    <button
                      onClick={() => {
                        setStatusFilter('All');
                        setShowStatusDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium ${
                        statusFilter === 'All' ? 'text-orange-600 font-bold' : 'text-slate-700'
                      }`}
                    >
                      All Status
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter('ACTIVE');
                        setShowStatusDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium ${
                        statusFilter === 'ACTIVE' ? 'text-emerald-600 font-bold' : 'text-slate-700'
                      }`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter('INACTIVE');
                        setShowStatusDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium ${
                        statusFilter === 'INACTIVE' ? 'text-red-600 font-bold' : 'text-slate-700'
                      }`}
                    >
                      Inactive
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-[#f8f9fc] border-b border-slate-100 text-[10px] sm:text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-5 sm:px-6">DEAL</th>
                  <th className="py-3.5 px-4">TYPE</th>
                  <th className="py-3.5 px-4">OFFER</th>
                  <th className="py-3.5 px-4">PROTECTION</th>
                  <th className="py-3.5 px-4 text-center">STATUS</th>
                  <th className="py-3.5 px-5 sm:px-6 text-center">ACTIONS</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {filteredDeals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Deal Column */}
                    <td className="py-4 px-5 sm:px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={deal.image}
                          alt={deal.name}
                          className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200/80 shadow-2xs"
                        />
                        <div className="min-w-0">
                          <div className="font-extrabold text-slate-900 text-sm truncate">
                            {deal.name}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate max-w-[220px]">
                            {deal.subtitle}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Type Column */}
                    <td className="py-4 px-4 align-middle">
                      <DealTypeBadge type={deal.type} />
                    </td>

                    {/* Offer Column */}
                    <td className="py-4 px-4 align-middle">
                      {deal.offerTitle && (
                        <div className="text-[10px] text-slate-400 font-semibold leading-tight">
                          {deal.offerTitle}
                        </div>
                      )}
                      <div className="flex items-baseline gap-1.5">
                        <span className={`text-sm sm:text-base font-extrabold ${deal.offerColor}`}>
                          {deal.offerMain}
                        </span>
                        {deal.offerSub && (
                          <span className="text-[10px] text-slate-400 font-normal">
                            {deal.offerSub}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Protection Column (Clickable to open Protection Matrix) */}
                    <td
                      onClick={() => onNavigate && onNavigate('protection-matrix')}
                      className="py-4 px-4 align-middle text-[11px] cursor-pointer hover:bg-orange-50/60 rounded-xl transition group"
                      title="Click to configure Protection Matrix"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800 group-hover:text-orange-900">
                          <span className="text-[#f97316]">
                            <CalendarMiniIcon className="w-3.5 h-3.5" />
                          </span>
                          <span>{deal.days}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-slate-500 font-normal">
                          <ClockMiniIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>{deal.hours}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                          <ShieldMiniIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-500" />
                          <span>{deal.cap}</span>
                          <span className="text-[10px] text-orange-600 opacity-0 group-hover:opacity-100 transition ml-1 font-bold">
                            Edit Matrix →
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Status Column */}
                    <td className="py-4 px-4 align-middle text-center">
                      {deal.status === 'ACTIVE' ? (
                        <ActiveBadge />
                      ) : (
                        <InactiveBadge />
                      )}
                    </td>

                    {/* Actions Column */}
                    <td className="py-4 px-5 sm:px-6 align-middle text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <OutlineButton
                          onClick={() => setSelectedDeal(deal)}
                          className="px-3 py-1.5 text-[10px] sm:text-[11px] rounded-lg"
                        >
                          VIEW / MANAGE
                        </OutlineButton>
                        <button
                          type="button"
                          onClick={() => toggleStatus(deal.id)}
                          title="Toggle Active / Inactive"
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition cursor-pointer"
                        >
                          <EllipsisVerticalIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* 3. Common Footer */}
      <Footer />

      {/* --- Common Command Palette Component --- */}
      <CommandPalette
        isOpen={showCommandModal}
        onClose={() => setShowCommandModal(false)}
        onNavigate={onNavigate}
        onOpenModal={(modal) => {
          if (modal === 'createDeal') setShowCreateModal(true);
          else if (modal === 'products') setShowProductsModal(true);
        }}
      />

      {/* --- Common Modal: VIEW / MANAGE DEAL --- */}
      <Modal
        isOpen={Boolean(selectedDeal)}
        onClose={() => setSelectedDeal(null)}
        title={selectedDeal?.name}
        subtitle={selectedDeal?.subtitle}
        maxWidth="max-w-lg"
      >
        {selectedDeal && (
          <div>
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Deal Type:</span>
                <DealTypeBadge type={selectedDeal.type} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Offer Details:</span>
                <span className="font-extrabold text-slate-800">{selectedDeal.offerMain} {selectedDeal.offerSub}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Days Active:</span>
                <span className="font-bold text-[#f97316]">{selectedDeal.days}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Time Window:</span>
                <span className="font-semibold text-slate-700">{selectedDeal.hours}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Protection Daily Cap:</span>
                <span className="font-semibold text-slate-700">{selectedDeal.cap}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Current Status:</span>
                <button
                  type="button"
                  onClick={() => toggleStatus(selectedDeal.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                    selectedDeal.status === 'ACTIVE'
                      ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  {selectedDeal.status === 'ACTIVE' ? '● ACTIVE (Click to Pause)' : '● INACTIVE (Click to Enable)'}
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <OutlineButton
                onClick={() => {
                  setSelectedDeal(null);
                  if (onNavigate) onNavigate('protection-matrix');
                }}
                className="border-orange-200 text-orange-600 hover:bg-orange-50 text-xs"
              >
                <ShieldMiniIcon className="w-4 h-4 text-orange-600" />
                <span>Protection Matrix</span>
              </OutlineButton>

              <NavyButton
                onClick={() => {
                  alert('Deal settings saved successfully!');
                  setSelectedDeal(null);
                }}
                className="flex-1"
              >
                Save Changes
              </NavyButton>
              <button
                type="button"
                onClick={() => setSelectedDeal(null)}
                className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* --- Common Modal: CREATE NEW DEAL --- */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Configure New Deal"
        subtitle="The Daily Grind • Sandton"
        icon={PlusCircleIcon}
        iconBg="bg-[#f97316]"
        maxWidth="max-w-lg"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const newDealObj = {
              id: Date.now(),
              name: form.dealName.value || 'Special Summer Perk',
              subtitle: form.dealDesc.value || 'Limited exclusive merchant offer.',
              image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=120&auto=format&fit=crop&q=80',
              type: form.dealType.value || 'Specific Item Deal',
              offerTitle: 'Yebo Price',
              offerMain: form.dealPrice.value || 'R65',
              offerSub: '(Standard R85)',
              offerColor: 'text-[#f97316]',
              days: 'MON - SUN',
              hours: '08:00 – 17:00',
              cap: 'CAP 40/DAY',
              status: 'ACTIVE',
            };
            setDeals([newDealObj, ...deals]);
            setShowCreateModal(false);
          }}
          className="space-y-3 text-xs"
        >
          <div>
            <label className="text-slate-400 font-bold uppercase text-[10px] block">Deal Title</label>
            <input
              name="dealName"
              required
              placeholder="e.g. Afternoon Latte & Croissant Special"
              className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-slate-400 font-bold uppercase text-[10px] block">Short Description</label>
            <input
              name="dealDesc"
              placeholder="e.g. Enjoy freshly brewed coffee with warm pastry"
              className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 font-bold uppercase text-[10px] block">Deal Type</label>
              <select
                name="dealType"
                className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-xl font-semibold bg-white"
              >
                <option value="Specific Item Deal">Specific Item Deal</option>
                <option value="Percentage Discount">Percentage Discount</option>
                <option value="BOGO">BOGO (Buy 1 Get 1)</option>
                <option value="Bundle">Bundle Combo</option>
                <option value="Storewide Deal">Storewide Deal</option>
              </select>
            </div>
            <div>
              <label className="text-slate-400 font-bold uppercase text-[10px] block">Offer Value</label>
              <input
                name="dealPrice"
                placeholder="e.g. R65 or 20% OFF"
                className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-xl font-semibold"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <PrimaryButton type="submit" className="flex-1">
              Publish Deal
            </PrimaryButton>
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* --- Common Modal: MANAGE PRODUCTS --- */}
      <Modal
        isOpen={showProductsModal}
        onClose={() => setShowProductsModal(false)}
        title="Manage Store Products"
        subtitle="Attach menu items to discount configurations"
        icon={ProductsIcon}
        iconBg="bg-[#0c1844]"
        maxWidth="max-w-lg"
      >
        <div className="space-y-2.5 max-h-[50vh] overflow-y-auto text-xs">
          {[
            { name: 'Classic Artisanal Boerewors Roll', price: 'R99.00', cat: 'Mains' },
            { name: 'Double Gourmet Beef Burger', price: 'R125.00', cat: 'Mains' },
            { name: 'Flat White / Cappuccino (Large)', price: 'R38.00', cat: 'Beverages' },
            { name: 'Butter Croissant with Preserve', price: 'R42.00', cat: 'Bakery' },
            { name: 'Superfood Granola & Greek Yoghurt', price: 'R65.00', cat: 'Breakfast' },
          ].map((item, idx) => (
            <div key={idx} className="p-3 border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">{item.name}</p>
                <p className="text-[11px] text-slate-400">{item.cat}</p>
              </div>
              <span className="font-extrabold text-slate-800">{item.price}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100">
          <NavyButton
            onClick={() => {
              setShowProductsModal(false);
              if (onNavigate) onNavigate('product-itemizer');
            }}
            className="w-full"
          >
            Open Full Product Itemizer Page →
          </NavyButton>
        </div>
      </Modal>
    </div>
  );
}

export default MerchantDealsPage;
