import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { YeboLogo } from '@/components/YeboLogo';
import login3dCartImg from '@/assets/login_3d_cart.jpg';

// ─── Custom Feature Icons ───────────────────────────────────────────────────
function TagIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2H2v10l11.29 11.29a1 1 0 0 0 1.41 0l7.3-7.3a1 1 0 0 0 0-1.41L12 2z" />
      <path d="M7 7h.01" />
    </svg>
  );
}

function StarIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function BagIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function MailIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LockIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

// ─── Social Icons ────────────────────────────────────────────────────────────
function GoogleIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  );
}

function FacebookIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="#1877F2" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function AppleIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="#000000" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.36c.66-.8 1.11-1.92.99-3.04-.96.04-2.13.64-2.82 1.44-.61.71-1.14 1.85-1 2.96 1.08.08 2.17-.56 2.83-1.36z"/>
    </svg>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full bg-[#fffcf7] flex flex-col items-center justify-center font-sans relative overflow-hidden p-4 sm:p-6 lg:p-10">
      
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-radial from-[#ffeada]/60 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[650px] h-[650px] rounded-full bg-radial from-[#ffe4d0]/50 to-transparent blur-3xl pointer-events-none" />

      {/* Main Grid Wrapper */}
      <div className="max-w-6xl w-full mx-auto my-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* ─── LEFT SIDE CONTENT ─── */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-left pr-0 lg:pr-6">
            
            {/* Welcome Back Badge */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fff2e8] border border-[#ffca99]/80 text-[#ea580c] text-xs font-semibold select-none shadow-2xs">
                <span className="text-xs">🔒</span>
                <span>Welcome Back</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#0f172a] leading-[1.16]">
              Your Favorite Deals <br />
              <span className="text-[#f97316]">
                Are Just a Login Away!
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-md">
              Access your account to explore exclusive offers, manage your rewards and enjoy a better shopping experience with Yebo Perks.
            </p>

            {/* Feature Badges Row */}
            <div className="flex items-center gap-3 sm:gap-5 pt-1 select-none">
              
              {/* Feature 1 */}
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#ffefe5] flex items-center justify-center text-[#ea580c] shrink-0">
                  <TagIcon className="w-4.5 h-4.5 text-[#ea580c]" />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-[#0f172a] leading-tight">Exclusive</p>
                  <p className="text-[11px] sm:text-xs font-bold text-[#0f172a] leading-tight">Deals</p>
                </div>
              </div>

              {/* Line Divider */}
              <div className="h-8 w-px bg-slate-200/90" />

              {/* Feature 2 */}
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#ffefe5] flex items-center justify-center text-[#ea580c] shrink-0">
                  <StarIcon className="w-4.5 h-4.5 text-[#ea580c]" />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-[#0f172a] leading-tight">Earn</p>
                  <p className="text-[11px] sm:text-xs font-bold text-[#0f172a] leading-tight">Rewards</p>
                </div>
              </div>

              {/* Line Divider */}
              <div className="h-8 w-px bg-slate-200/90" />

              {/* Feature 3 */}
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#ffefe5] flex items-center justify-center text-[#ea580c] shrink-0">
                  <BagIcon className="w-4.5 h-4.5 text-[#ea580c]" />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-[#0f172a] leading-tight">Shop</p>
                  <p className="text-[11px] sm:text-xs font-bold text-[#0f172a] leading-tight">Smarter</p>
                </div>
              </div>
            </div>

            {/* 3D Shopping Cart Graphic - Proportional Compact Size */}
            <div className="pt-2 flex justify-center lg:justify-start select-none">
              <img
                src={login3dCartImg}
                alt="YEBO PERKS Shopping Cart"
                className="w-60 sm:w-72 lg:w-80 max-w-full h-auto object-contain drop-shadow-md hover:scale-[1.01] transition-transform duration-300"
              />
            </div>
          </div>

          {/* ─── RIGHT SIDE LOGIN CARD ─── */}
          <div className="lg:col-span-6 w-full max-w-[480px] mx-auto">
            <div className="bg-white rounded-[2.5rem] p-7 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 relative">
              
              {/* Card Header Logo */}
              <div className="flex flex-col items-center text-center mb-6 select-none">
                <Link to="/">
                  <YeboLogo className="h-14 sm:h-16 w-auto" />
                </Link>

                <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0f172a] tracking-tight mt-3">
                  Login to Your Account
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-normal mt-1">
                  Enter your details to continue and enjoy exclusive deals.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <MailIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200/90 text-xs sm:text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] bg-white transition font-medium"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <LockIcon className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-10 py-3.5 rounded-xl border border-slate-200/90 text-xs sm:text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] bg-white transition font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
                    >
                      {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between pt-0.5 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-slate-500 font-normal">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-[#f97316] focus:ring-orange-500 border-slate-300 cursor-pointer"
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-[#f97316] hover:underline font-semibold transition">
                    Forgot password?
                  </a>
                </div>

                {/* Login Action Button */}
                <button
                  type="submit"
                  className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-extrabold text-sm sm:text-base py-3.5 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition cursor-pointer mt-3 tracking-wide"
                >
                  <span>Login</span>
                  <span className="text-lg leading-none">→</span>
                </button>

                {/* Social Divider */}
                <div className="relative py-3 flex items-center justify-center">
                  <div className="border-t border-slate-100 w-full" />
                  <span className="bg-white px-3 text-[11px] font-normal text-slate-400 uppercase tracking-wider absolute">
                    Or continue with
                  </span>
                </div>

                {/* Social Media Login Buttons */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition cursor-pointer shadow-2xs"
                  >
                    <GoogleIcon className="w-4 h-4" />
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition cursor-pointer shadow-2xs"
                  >
                    <FacebookIcon className="w-4 h-4" />
                    <span>Facebook</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition cursor-pointer shadow-2xs"
                  >
                    <AppleIcon className="w-4 h-4" />
                    <span>Apple</span>
                  </button>
                </div>

                {/* Create Account Footer Link */}
                <div className="text-center pt-4 text-xs text-slate-400 font-normal">
                  <span>Don't have an account? </span>
                  <Link to="/register" className="text-[#f97316] font-semibold hover:underline ml-0.5">
                    Create an account
                  </Link>
                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;
