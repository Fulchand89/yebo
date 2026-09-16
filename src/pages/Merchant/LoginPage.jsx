import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Tag,
  ShoppingBag,
  Store,
  CheckCircle2,
  Flame,
  Star,
  KeyRound,
  X,
} from 'lucide-react';
import { YeboLogo } from '@/components/YeboLogo';
import login3dCartImg from '@/assets/login_3d_cart.jpg';

// ─── Social SVG Icons ────────────────────────────────────────────────────────
function GoogleIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function FacebookIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="#1877F2" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function AppleIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.36c.66-.8 1.11-1.92.99-3.04-.96.04-2.13.64-2.82 1.44-.61.71-1.14 1.85-1 2.96 1.08.08 2.17-.56 2.83-1.36z" />
    </svg>
  );
}

export function LoginPage() {
  const navigate = useNavigate();

  // Role selector: 'shopper' or 'merchant'
  const [role, setRole] = useState('shopper');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  // Quick preset fills for testability
  const fillDemoCredentials = (type) => {
    if (type === 'shopper') {
      setRole('shopper');
      setEmail('sipho.shopper@yeboperks.co.za');
      setPassword('YeboSaver@2026!');
      toast.success('Loaded Demo Shopper credentials!');
    } else if (type === 'merchant') {
      setRole('merchant');
      setEmail('partner@kloofstreetbistro.co.za');
      setPassword('MerchantLekker#1');
      toast.success('Loaded Demo Merchant credentials!');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error('Please provide both email and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (role === 'merchant') {
        toast.success('Welcome to Merchant Portal!');
        navigate('/');
      } else {
        toast.success(`Welcome back, ${email.split('@')[0]}!`);
        navigate('/');
      }
    }, 600);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Connected with ${provider}! Redirecting...`);
      navigate('/');
    }, 500);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      toast.error('Please enter your registered email address.');
      return;
    }
    setResetLoading(true);
    setTimeout(() => {
      setResetLoading(false);
      setShowForgotModal(false);
      setResetEmail('');
      toast.success('Password reset instructions sent to your inbox!');
    }, 700);
  };

  return (
    <div className="min-h-screen w-full bg-[#fbf9f5] font-sans relative overflow-x-hidden flex flex-col justify-between selection:bg-orange-200 selection:text-orange-900">
      
      {/* ─── Ambient Glow Accents ─── */}
      <div className="absolute -top-36 right-0 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-orange-200/40 via-amber-100/30 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-amber-200/35 via-orange-100/25 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 rounded-full bg-orange-100/25 blur-[90px] pointer-events-none" />

      {/* ─── Top Navigation Bar ─── */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-3 sm:pt-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <YeboLogo className="h-9 sm:h-11 w-auto drop-shadow-xs transition-transform group-hover:scale-[1.02]" />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-orange-600 bg-white/90 hover:bg-white border border-slate-200/80 shadow-2xs transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Deals</span>
            <span className="sm:hidden">Deals</span>
          </Link>

          <Link
            to="/admin/login"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100/90 hover:bg-slate-200/90 border border-slate-200/60 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
            <span className="hidden sm:inline">Admin Portal</span>
          </Link>
        </div>
      </header>

      {/* ─── Main Content Container ─── */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-5 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* ═══════════ LEFT SIDE: VALUE PROPOSITION & 3D SHOWCASE ═══════════ */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-left">
            
            {/* Header Tag / Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-300/60 text-orange-700 text-[11px] sm:text-xs font-bold shadow-2xs">
                <Flame className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
                <span>Mzansi's #1 Everyday Deals & Rewards</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold border border-slate-200/80">
                🇿🇦 100% Local
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-black text-slate-900 tracking-tight leading-[1.14]">
                {role === 'shopper' ? (
                  <>
                    Your Favorite Deals <br />
                    <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                      Are Just a Login Away!
                    </span>
                  </>
                ) : (
                  <>
                    Supercharge Your <br />
                    <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                      Merchant Growth & Scans
                    </span>
                  </>
                )}
              </h1>

              <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-lg">
                {role === 'shopper'
                  ? 'Access exclusive discounts, earn loyalty points, and unlock effortless dining, shopping, and weekend perks right across South Africa.'
                  : 'Manage active promotions, validate customer QR vouchers instantly, track staff performance funds, and view real-time settlement reports.'}
              </p>
            </div>

            {/* Feature Highlights Pills */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="bg-white/90 backdrop-blur-sm border border-orange-100 rounded-2xl p-2.5 sm:p-3 shadow-2xs hover:border-orange-200 transition">
                <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 mb-1.5">
                  <Tag className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs font-bold text-slate-900">Up to 70% Off</p>
                <p className="text-[10px] text-slate-500 font-medium">Top local brands</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm border border-orange-100 rounded-2xl p-2.5 sm:p-3 shadow-2xs hover:border-orange-200 transition">
                <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs font-bold text-slate-900">Instant Points</p>
                <p className="text-[10px] text-slate-500 font-medium">Redeem at checkout</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm border border-orange-100 rounded-2xl p-2.5 sm:p-3 shadow-2xs hover:border-orange-200 transition">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs font-bold text-slate-900">Verified Deals</p>
                <p className="text-[10px] text-slate-500 font-medium">Guaranteed perks</p>
              </div>
            </div>

            {/* Visual Showcase Card with Blended 3D Cart & Floating Social Proof */}
            <div className="relative pt-1">
              <div className="relative rounded-2xl bg-gradient-to-b from-orange-100/50 via-amber-50/30 to-white/70 p-3 sm:p-4 border border-orange-200/50 shadow-[0_12px_30px_-10px_rgba(249,115,22,0.08)] overflow-hidden">
                
                {/* Background radial highlight */}
                <div className="absolute inset-0 bg-radial from-orange-200/25 to-transparent pointer-events-none" />

                {/* 3D Illustration blended cleanly */}
                <div className="flex items-center justify-center py-1">
                  <img
                    src={login3dCartImg}
                    alt="YEBO PERKS Deals Cart"
                    className="w-44 sm:w-52 lg:w-60 max-h-[170px] sm:max-h-[190px] h-auto object-contain mix-blend-multiply drop-shadow-sm transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Floating Micro-Badge Top Right: Rating */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md rounded-xl py-1 px-2.5 border border-orange-100 shadow-xs flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-black text-slate-900">4.9/5</span>
                  <span className="text-[10px] text-slate-400 font-medium">(48k+ reviews)</span>
                </div>

                {/* Floating Micro-Badge Bottom Left: Live Savings Ticker */}
                <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-white/95 backdrop-blur-md rounded-xl py-1.5 px-3 border border-orange-100 shadow-xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-slate-900 leading-tight">
                      🎉 Sarah K. just saved R340
                    </p>
                    <p className="text-[9.5px] text-slate-500 font-medium">
                      at Kloof Street Grill • 2 mins ago
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* ═══════════ RIGHT SIDE: LOGIN FORM CARD ═══════════ */}
          <div className="lg:col-span-6 w-full max-w-[460px] mx-auto">
            <div className="bg-white rounded-[1.75rem] sm:rounded-[2rem] p-5 sm:p-7 shadow-[0_15px_45px_-12px_rgba(15,23,42,0.07)] border border-slate-100/90 relative">
              
              {/* Role Toggle Switcher (Shopper vs Merchant) */}
              <div className="mb-4">
                <div className="p-1 rounded-xl bg-slate-100/90 border border-slate-200/80 flex items-center">
                  <button
                    type="button"
                    onClick={() => setRole('shopper')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      role === 'shopper'
                        ? 'bg-white text-orange-600 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Shopper / Saver</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('merchant')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      role === 'merchant'
                        ? 'bg-white text-orange-600 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Merchant Partner</span>
                  </button>
                </div>
              </div>

              {/* Card Header */}
              <div className="text-left mb-4">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {role === 'shopper' ? 'Login to Your Account' : 'Merchant Portal Login'}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {role === 'shopper'
                    ? 'Enter your credentials to unlock daily savings and vouchers.'
                    : 'Access your merchant dashboard, staff funds, and deal analytics.'}
                </p>
              </div>

              {/* Quick 1-Click Demo Fill Presets */}
              <div className="mb-4 bg-orange-50/70 border border-orange-100/80 rounded-xl px-2.5 py-1.5 flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-orange-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-orange-600" />
                  Quick Demo:
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => fillDemoCredentials('shopper')}
                    className="px-2 py-0.5 rounded-md bg-white hover:bg-orange-100/60 border border-orange-200/70 text-[10.5px] font-bold text-orange-700 transition cursor-pointer shadow-2xs"
                  >
                    Shopper
                  </button>
                  <button
                    type="button"
                    onClick={() => fillDemoCredentials('merchant')}
                    className="px-2 py-0.5 rounded-md bg-white hover:bg-orange-100/60 border border-orange-200/70 text-[10.5px] font-bold text-orange-700 transition cursor-pointer shadow-2xs"
                  >
                    Merchant
                  </button>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-3.5">
                
                {/* Email Address */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {role === 'shopper' ? 'Email Address' : 'Merchant Business Email'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={
                        role === 'shopper'
                          ? 'name@example.co.za'
                          : 'business@restaurant.co.za'
                      }
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 bg-slate-50/60 hover:bg-white focus:bg-white transition font-medium"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 bg-slate-50/60 hover:bg-white focus:bg-white transition font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between pt-0.5 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer select-none text-slate-600 font-medium text-[11px]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded text-orange-500 focus:ring-orange-400 border-slate-300 cursor-pointer accent-orange-500"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-orange-600 hover:text-orange-700 hover:underline font-bold transition cursor-pointer text-[11px]"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-xs sm:text-sm py-3 rounded-xl shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition cursor-pointer mt-2 tracking-wide disabled:opacity-75"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{role === 'shopper' ? 'Login to Yebo Perks' : 'Open Merchant Portal'}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {/* Social Login Divider */}
                <div className="relative py-1.5 flex items-center justify-center">
                  <div className="border-t border-slate-100 w-full" />
                  <span className="bg-white px-2.5 text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider absolute">
                    Or continue with
                  </span>
                </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-3 gap-2 pt-0.5">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Google')}
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-[11px] font-bold text-slate-700 transition cursor-pointer shadow-2xs hover:shadow-xs"
                  >
                    <GoogleIcon className="w-3.5 h-3.5" />
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Facebook')}
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-[11px] font-bold text-slate-700 transition cursor-pointer shadow-2xs hover:shadow-xs"
                  >
                    <FacebookIcon className="w-3.5 h-3.5" />
                    <span>Facebook</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Apple')}
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-[11px] font-bold text-slate-700 transition cursor-pointer shadow-2xs hover:shadow-xs"
                  >
                    <AppleIcon className="w-3.5 h-3.5 text-slate-900" />
                    <span>Apple</span>
                  </button>
                </div>

                {/* Create Account Link */}
                <div className="text-center pt-2 text-[11px] text-slate-500 font-medium">
                  {role === 'shopper' ? (
                    <>
                      <span>Don't have an account? </span>
                      <Link
                        to="/register"
                        className="text-orange-600 font-bold hover:underline ml-0.5"
                      >
                        Create an account
                      </Link>
                    </>
                  ) : (
                    <>
                      <span>Want to partner with Yebo? </span>
                      <Link
                        to="/register"
                        className="text-orange-600 font-bold hover:underline ml-0.5"
                      >
                        Register your business
                      </Link>
                    </>
                  )}
                </div>

              </form>

              {/* Security Footnote */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-center gap-3 text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5 text-slate-400" />
                  256-Bit SSL
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                  POPIA Compliant
                </span>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 py-2.5 text-center text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-1.5">
        <p>© {new Date().getFullYear()} YEBO PERKS (Pty) Ltd. Big Savings, Lekker Living.</p>
        <div className="flex items-center gap-3 text-[10.5px]">
          <Link to="/" className="hover:text-orange-600 transition">Privacy Policy</Link>
          <span>•</span>
          <Link to="/" className="hover:text-orange-600 transition">Terms of Service</Link>
          <span>•</span>
          <Link to="/" className="hover:text-orange-600 transition">Help & Support</Link>
        </div>
      </footer>

      {/* ─── Forgot Password Modal ─── */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-3.5">
              <KeyRound className="w-5 h-5" />
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Reset Your Password
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1 mb-4">
              Enter your registered email address and we will send you secure instructions to reset your password.
            </p>

            <form onSubmit={handlePasswordReset} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1.5">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-black shadow-md shadow-orange-500/20 transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {resetLoading ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span>Send Link</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default LoginPage;
