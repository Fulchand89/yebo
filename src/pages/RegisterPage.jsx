import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { YeboLogo } from '@/components/YeboLogo';
import { Footer } from '@/components/common/Footer';
import RegistrationSubmittedPage from '@/pages/RegistrationSubmittedPage';

// ─── Tiny icon helpers ───────────────────────────────────────────────────────
function SectionIcon({ emoji }) {
  return (
    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-base shrink-0">
      {emoji}
    </div>
  );
}

function UploadBox({ label, sublabel, icon }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="flex-1 min-w-[120px] border-2 border-dashed border-slate-200 hover:border-orange-400 rounded-xl flex flex-col items-center justify-center gap-2 py-6 px-4 text-center transition-colors group cursor-pointer bg-slate-50 hover:bg-orange-50/40"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFile}
      />
      {preview ? (
        <img src={preview} alt={label} className="w-14 h-14 object-cover rounded-lg" />
      ) : (
        <div className="text-slate-400 group-hover:text-orange-500 transition-colors">
          {icon}
        </div>
      )}
      <div>
        <p className="text-[11px] font-black text-slate-700 uppercase tracking-wider">{label}</p>
        <p className="text-[10px] text-slate-400 font-medium">{sublabel}</p>
      </div>
    </button>
  );
}

// ─── Suburb list ─────────────────────────────────────────────────────────────
const SA_SUBURBS = [
  { name: 'Gardens' },
  { name: 'Rosebank' },
  { name: 'Sea Point' },
  { name: 'Camps Bay' },
  { name: 'Kloof Street' },
  { name: 'Claremont' },
  { name: 'Sandton' },
  { name: 'Midrand' },
  { name: 'Fourways' },
  { name: 'Randburg' },
  { name: 'Bryanston' },
  { name: 'Centurion' },
  { name: 'Pretoria CBD' },
  { name: 'Soweto' },
  { name: 'Alexandra' },
  { name: 'Benoni' },
  { name: 'Boksburg' },
  { name: 'Germiston' },
  { name: 'Kempton Park' },
  { name: 'Edenvale' },
  { name: 'Cape Town CBD' },
  { name: 'Waterfront' },
  { name: 'Green Point' },
  { name: 'Stellenbosch' },
  { name: 'Paarl' },
  { name: 'Bellville' },
  { name: 'Mitchells Plain' },
  { name: 'Khayelitsha' },
  { name: 'Durban CBD' },
  { name: 'Umhlanga' },
  { name: 'Pinetown' },
  { name: 'Westville' },
  { name: 'Ballito' },
  { name: 'Port Elizabeth' },
  { name: 'East London' },
  { name: 'Bloemfontein' },
  { name: 'Polokwane' },
  { name: 'Nelspruit' },
];

// ─── Categories List ─────────────────────────────────────────────────────────
const CATEGORIES = [
  { name: 'Food & Dining', emoji: '📖' },
  { name: 'Coffee & Cafes', emoji: '☕' },
  { name: 'Health & Wellness', emoji: '🤍' },
  { name: 'Fitness & Gyms', emoji: '⚡' },
  { name: 'Beauty & Grooming', emoji: '😊' },
  { name: 'Retail & Shopping', emoji: '🛍️' },
  { name: 'Entertainment & Experiences', emoji: '▶' },
  { name: 'Lifestyle & Services', emoji: '✨' },
  { name: 'Bar & Nightlife', emoji: '🍸' },
  { name: 'Automotive', emoji: '🚗' },
  { name: 'Education & Training', emoji: '📚' },
  { name: 'Other', emoji: '🔹' },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function RegisterPage() {
  const [form, setForm] = useState({
    tradingName: '',
    tagline: '',
    suburb: '',
    category: '',
    ownerFullName: '',
    ownerPhone: '',
    ownerEmail: '',
    recruiterCode: '',
    contractType: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [scannerOpen, setScannerOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Modal States
  const [suburbModalOpen, setSuburbModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.tradingName.trim()) e.tradingName = 'Trading name is required';
    if (!form.suburb) e.suburb = 'Select a suburb';
    if (!form.category) e.category = 'Select a category';
    if (!form.ownerFullName.trim()) e.ownerFullName = 'Owner full name is required';
    if (!form.ownerPhone.trim()) e.ownerPhone = 'Contact number is required';
    if (!form.ownerEmail.trim()) e.ownerEmail = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(form.ownerEmail)) e.ownerEmail = 'Enter a valid email';
    if (!form.agreeTerms) e.agreeTerms = 'You must accept the terms';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (submitted) {
    return <RegistrationSubmittedPage details={form} />;
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans flex flex-col">
      <RegisterHeader />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight uppercase">
            MERCHANT REGISTRATION
          </h1>
          <p className="text-sm text-[#ff6b00] font-semibold mt-1">
            Lekker merchant onboarding for premier local vendors, venues, and experiences.
          </p>
        </div>

        {/* Status Pending Banner */}
        <div className="bg-white border border-slate-200/90 border-l-4 border-l-amber-400 rounded-xl px-5 py-4 mb-8 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-3 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[11px] font-black uppercase tracking-wide border border-amber-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Status: PENDING
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <span>Lifecycle:</span>
              <span className="font-bold text-slate-600">Pending</span>
              <span>→</span>
              <span>Active</span>
              <span>→</span>
              <span>Suspended</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            All merchant profiles require administrator validation before they become active on YEBO PERKS.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-6">
              <SectionCard
                icon={<SectionIcon emoji="🏪" />}
                number="1."
                title="Business Information"
              >
                <FormField label="TRADING NAME" required error={errors.tradingName}>
                  <input
                    type="text"
                    name="tradingName"
                    value={form.tradingName}
                    onChange={handleChange}
                    placeholder="e.g. Origin Artisanal Roastery or Lekker Café"
                    className={inputCls(errors.tradingName)}
                  />
                </FormField>

                <FormField
                  label="TAGLINE"
                  hint="Short, catchy pitch for your perks discovery card (Max 90 characters)."
                >
                  <input
                    type="text"
                    name="tagline"
                    value={form.tagline}
                    onChange={handleChange}
                    placeholder="e.g. Handcrafted specialty brews and fresh artisan bakery"
                    maxLength={90}
                    className={inputCls()}
                  />
                </FormField>

                {/* Suburb + Category Custom Modals Trigger Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="SUBURB" required error={errors.suburb}>
                    <div
                      onClick={() => {
                        setSearchQuery('');
                        setSuburbModalOpen(true);
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium bg-slate-50 text-slate-900 cursor-pointer flex items-center justify-between transition ${errors.suburb ? 'border-red-300 bg-red-50' : 'border-slate-200 hover:border-[#ff6b00]'
                        }`}
                    >
                      <span className={form.suburb ? 'text-slate-900 font-semibold' : 'text-slate-400'}>
                        {form.suburb || 'Select South African Suburb'}
                      </span>
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </FormField>

                  <FormField label="CATEGORY" required error={errors.category}>
                    <div
                      onClick={() => {
                        setSearchQuery('');
                        setCategoryModalOpen(true);
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium bg-slate-50 text-slate-900 cursor-pointer flex items-center justify-between transition ${errors.category ? 'border-red-300 bg-red-50' : 'border-slate-200 hover:border-[#ff6b00]'
                        }`}
                    >
                      <span className={form.category ? 'text-slate-900 font-semibold' : 'text-slate-400'}>
                        {form.category || 'Select Business Category'}
                      </span>
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </FormField>
                </div>

                {/* Brand Assets */}
                <div>
                  <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider mb-3">
                    BRAND ASSETS & MEDIA
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <UploadBox
                      label="COVER IMAGE"
                      sublabel="Upload cover image"
                      icon={
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="3" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
                        </svg>
                      }
                    />
                    <UploadBox
                      label="LOGO ASSET"
                      sublabel="Upload logo"
                      icon={
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="3" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                        </svg>
                      }
                    />
                  </div>
                </div>
              </SectionCard>

              <SectionCard
                icon={<SectionIcon emoji="👤" />}
                number="2."
                title="Owner Information"
                subtitle="Entity link & primary executive contact for official communication."
              >
                <FormField label="OWNER FULL NAME" required error={errors.ownerFullName}>
                  <input
                    type="text"
                    name="ownerFullName"
                    value={form.ownerFullName}
                    onChange={handleChange}
                    placeholder="e.g. Willem Van Der Merwe"
                    className={inputCls(errors.ownerFullName)}
                  />
                </FormField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="OWNER CONTACT NUMBER"
                    required
                    error={errors.ownerPhone}
                    hint="Standard South African mobile format."
                  >
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-600 select-none shrink-0">
                        🇿🇦 <span>+27</span>
                      </div>
                      <input
                        type="tel"
                        name="ownerPhone"
                        value={form.ownerPhone}
                        onChange={handleChange}
                        placeholder="+27 82 123 4567"
                        className={`flex-1 ${inputCls(errors.ownerPhone)}`}
                      />
                    </div>
                  </FormField>

                  <FormField
                    label="OWNER EMAIL ADDRESS"
                    required
                    error={errors.ownerEmail}
                    hint="Used for official verification notifications."
                  >
                    <input
                      type="email"
                      name="ownerEmail"
                      value={form.ownerEmail}
                      onChange={handleChange}
                      placeholder="owner@business.co.za"
                      className={inputCls(errors.ownerEmail)}
                    />
                  </FormField>
                </div>
              </SectionCard>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-5">
              <SectionCard
                icon={<SectionIcon emoji="🤝" />}
                number="3."
                title="Recruiter Information"
                subtitle="B2B Partner Attribution"
                compact
              >
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  If a YEBO PERKS Business Recruiter referred your business, scan their Business
                  Recruiter QR code to connect your merchant attribution.
                </p>
                <button
                  type="button"
                  onClick={() => setScannerOpen(true)}
                  className="w-full flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-orange-400 text-slate-700 hover:text-orange-600 font-bold text-xs py-3 rounded-xl transition cursor-pointer group"
                >
                  <svg className="w-4 h-4 transition group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M17 7h.01M7 17h.01M17 17h.01" />
                  </svg>
                  SCAN BUSINESS RECRUITER QR
                </button>
                {form.recruiterCode && (
                  <p className="text-[11px] text-emerald-600 font-bold mt-2 text-center">
                    ✓ Recruiter code linked: {form.recruiterCode}
                  </p>
                )}
              </SectionCard>

              <SectionCard
                icon={<SectionIcon emoji="📄" />}
                number="4."
                title="Contract Information"
                compact
              >
                <div className="space-y-3">
                  {['Standard Partner', 'Premium Partner', 'Enterprise'].map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${form.contractType === type
                            ? 'border-[#ff6b00] bg-[#ff6b00]'
                            : 'border-slate-300 group-hover:border-orange-300'
                          }`}
                        onClick={() => setForm((p) => ({ ...p, contractType: type }))}
                      >
                        {form.contractType === type && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <div onClick={() => setForm((p) => ({ ...p, contractType: type }))}>
                        <p className="text-xs font-bold text-slate-800">{type}</p>
                        <p className="text-[10px] text-slate-400">
                          {type === 'Standard Partner' && 'Basic deal listing & QR redemption'}
                          {type === 'Premium Partner' && 'Priority placement + analytics access'}
                          {type === 'Enterprise' && 'Multi-location + dedicated account manager'}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </SectionCard>

              <div>
                <label className="flex items-start gap-2.5 cursor-pointer group">
                  <div
                    onClick={() => setForm((p) => ({ ...p, agreeTerms: !p.agreeTerms }))}
                    className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0 cursor-pointer ${form.agreeTerms
                        ? 'bg-[#ff6b00] border-[#ff6b00]'
                        : errors.agreeTerms
                          ? 'border-red-400 bg-red-50'
                          : 'border-slate-300 group-hover:border-orange-400'
                      }`}
                  >
                    {form.agreeTerms && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    I agree to YEBO PERKS{' '}
                    <a href="#" className="text-[#ff6b00] font-bold hover:underline">Terms</a>,{' '}
                    <a href="#" className="text-[#ff6b00] font-bold hover:underline">Privacy Policy</a>{' '}
                    &amp;{' '}
                    <a href="#" className="text-[#ff6b00] font-bold hover:underline">Merchant Agreement</a>.
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="text-red-500 text-[11px] mt-1 font-semibold ml-7">{errors.agreeTerms}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#ff6b00] hover:bg-[#e05e00] active:bg-[#c95300] text-white font-black text-sm sm:text-base uppercase tracking-wider py-4 rounded-2xl shadow-xl shadow-orange-500/25 flex items-center justify-center gap-3 transition cursor-pointer group"
              >
                SUBMIT REGISTRATION
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </main>

      {/* ── Suburb Selector Modal (Matching Design) ── */}
      {suburbModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-lg font-black text-[#0f172a] uppercase tracking-wide">Select Suburb</h2>
                <p className="text-xs text-slate-500 mt-0.5">Choose the suburb where your business operates.</p>
              </div>
              <button
                type="button"
                onClick={() => setSuburbModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative my-4">
              <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search suburb"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-[#ff6b00] outline-none bg-slate-50/50"
              />
            </div>

            {/* Suburb List */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 max-h-[300px]">
              {SA_SUBURBS.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).map((s) => {
                const isSelected = form.suburb === s.name;
                return (
                  <div
                    key={s.name}
                    onClick={() => {
                      setForm(p => ({ ...p, suburb: s.name }));
                      if (errors.suburb) setErrors(p => ({ ...p, suburb: '' }));
                      setSuburbModalOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition ${isSelected
                        ? 'bg-orange-50/80 border border-orange-200 text-slate-900 font-bold'
                        : 'hover:bg-slate-50 text-slate-700 font-medium'
                      }`}
                  >
                    <span className="text-sm">{s.name}</span>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#ff6b00] flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSuburbModalOpen(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer px-2 py-1"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setSuburbModalOpen(false)}
                className="bg-[#ff6b00] hover:bg-[#e05e00] text-white text-xs font-bold px-6 py-2.5 rounded-xl transition cursor-pointer"
              >
                Select Suburb
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Category Selector Modal (Matching Design) ── */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-lg font-black text-[#0f172a] uppercase tracking-wide">Select Business Category</h2>
                <p className="text-xs text-slate-500 mt-0.5">Choose the category that best describes your business.</p>
              </div>
              <button
                type="button"
                onClick={() => setCategoryModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative my-4">
              <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search category"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-[#ff6b00] outline-none bg-slate-50/50"
              />
            </div>

            {/* Category List */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 max-h-[300px]">
              {CATEGORIES.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((c) => {
                const isSelected = form.category === c.name;
                return (
                  <div
                    key={c.name}
                    onClick={() => {
                      setForm(p => ({ ...p, category: c.name }));
                      if (errors.category) setErrors(p => ({ ...p, category: '' }));
                      setCategoryModalOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition ${isSelected
                        ? 'bg-orange-50/80 border border-orange-200 text-slate-900 font-bold'
                        : 'hover:bg-slate-50 text-slate-700 font-medium'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${isSelected ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'}`}>
                        {c.emoji}
                      </div>
                      <span className="text-sm">{c.name}</span>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#ff6b00] flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCategoryModalOpen(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer px-2 py-1"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setCategoryModalOpen(false)}
                className="bg-[#ff6b00] hover:bg-[#e05e00] text-white text-xs font-bold px-6 py-2.5 rounded-xl transition cursor-pointer"
              >
                Select Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Scanner Modal (simulated) ── */}
      {scannerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Scan Recruiter QR</h2>
              <button
                type="button"
                onClick={() => setScannerOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="bg-[#111625] rounded-2xl h-48 flex flex-col items-center justify-center mb-4">
              <svg className="w-10 h-10 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
              </svg>
              <p className="text-xs text-slate-400 font-medium">Camera access required</p>
            </div>
            <p className="text-[11px] text-slate-500 text-center mb-4 font-medium">
              Or enter recruiter code manually:
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. REC-8842-JHB"
                className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 focus:border-[#ff6b00] outline-none bg-slate-50 uppercase"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    setForm((p) => ({ ...p, recruiterCode: e.target.value.trim().toUpperCase() }));
                    setScannerOpen(false);
                  }
                }}
              />
              <button
                type="button"
                onClick={(e) => {
                  const input = e.currentTarget.previousSibling;
                  if (input.value.trim()) {
                    setForm((p) => ({ ...p, recruiterCode: input.value.trim().toUpperCase() }));
                    setScannerOpen(false);
                  }
                }}
                className="bg-[#ff6b00] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition hover:bg-[#e05e00] cursor-pointer"
              >
                Link
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

// ─── Reusable sub-components ──────────────────────────────────────────────────
function RegisterHeader() {
  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="/" className="flex items-center select-none">
              <YeboLogo className="h-8 sm:h-11 md:h-12 w-auto" />
            </a>
            <div className="hidden sm:inline-flex items-center px-3 py-0.5 sm:py-1 rounded-full border border-orange-200 bg-[#fff5eb] text-[#ea580c] font-bold text-[10px] sm:text-[11px] tracking-wide uppercase select-none">
              MERCHANT PARTNER
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs font-semibold">
            <Link
              to="/login"
              className="flex items-center gap-1.5 bg-[#ea580c] hover:bg-[#c2410c] text-white px-3 sm:px-4 py-1.5 rounded-xl font-bold transition shadow-xs cursor-pointer text-xs"
            >
              <span>Login</span>
              <span>→</span>
            </Link>
            <a
              href="/"
              className="hidden sm:flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <span>Back to YEBO PERKS</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function SectionCard({ icon, number, title, subtitle, compact = false, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className={`flex items-center gap-3 px-5 sm:px-6 ${compact ? 'py-4' : 'py-5'} border-b border-slate-100/80`}>
        {icon}
        <div>
          <h2 className="text-sm font-black text-slate-900">
            {number} {title}
          </h2>
          {subtitle && (
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      <div className={`px-5 sm:px-6 ${compact ? 'py-4' : 'py-5 sm:py-6'} space-y-4`}>
        {children}
      </div>
    </div>
  );
}

function FormField({ label, required, error, hint, children }) {
  return (
    <div>
      <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider mb-1.5">
        {label}{' '}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-[10px] text-slate-400 font-medium mt-1">{hint}</p>
      )}
      {error && (
        <p className="text-red-500 text-[11px] mt-1 font-semibold">{error}</p>
      )}
    </div>
  );
}

function inputCls(error = '') {
  return `w-full px-4 py-2.5 rounded-xl border text-sm font-medium bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition ${error
      ? 'border-red-300 bg-red-50 focus:border-red-500'
      : 'border-slate-200 focus:border-[#ff6b00] focus:bg-white'
    }`;
}