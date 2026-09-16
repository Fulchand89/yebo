import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { YeboLogo } from '@/components/YeboLogo';
import { AdminModal } from '@/components/admin/AdminModal';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@yeboperks.co.za');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter an admin email.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Welcome back, Administrator!', {
        id: 'admin-login',
        duration: 2500,
      });
      navigate('/admin/dashboard');
    }, 600);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error('Please enter your recovery email.');
      return;
    }
    toast.success('Password reset instructions sent (UI Simulation).');
    setForgotModalOpen(false);
    setResetEmail('');
  };

  return (
    <div className="min-h-screen bg-[#FDDCC5] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Gradient Accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#F97316]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Card Container */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Logo & Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center justify-center">
            <YeboLogo className="h-14 brightness-110" />
          </div>
          <div>
            <p className="mt-1 text-xs text-[#5F6675] font-medium">
              Enterprise management portal for YEBO PERKS platform
            </p>
          </div>
        </div>

        {/* Login Form Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 h-[350px] shadow-2xl border border-slate-100 space-y-10">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@yeboperks.co.za"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#F97316] focus:bg-white focus:ring-2 focus:ring-orange-100 text-slate-900 font-medium transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your admin password"
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#F97316] focus:bg-white focus:ring-2 focus:ring-orange-100 text-slate-900 font-medium transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-sm border-slate-300 text-[#F97316] focus:ring-[#F97316]"
                />
                <span className="text-xs font-semibold text-slate-600">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-xs font-bold text-[#F97316] hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-[#F97316] hover:bg-[#F97316] active:bg-[#9a3412] text-white font-black text-xs uppercase tracking-wider transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>LOGIN TO DASHBOARD</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-slate-400 mt-6">
          Protected by YEBO High-Assurance Perimeter Auth & IP Telemetry
        </p>
      </div>

      {/* Forgot Password Modal */}
      <AdminModal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        title="Reset Admin Password"
        subtitle="We will dispatch a secure recovery token to your registered corporate email"
        icon={Lock}
        maxWidth="max-w-md"
        footer={
          <>
            <button
              type="button"
              onClick={() => setForgotModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleResetPassword}
              className="px-4 py-2 text-xs font-bold text-white bg-[#F97316] hover:bg-[#F97316] rounded-xl transition shadow-xs"
            >
              Send Recovery Link
            </button>
          </>
        }
      >
        <form onSubmit={handleResetPassword} className="space-y-3">
          <label className="block text-xs font-bold text-slate-700 uppercase">
            Registered Email Address
          </label>
          <input
            type="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            placeholder="admin@yeboperks.co.za"
            className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#F97316] text-slate-900"
          />
          <p className="text-[11px] text-slate-400">
            For security reasons, recovery links expire after 15 minutes and require dual-factor clearance.
          </p>
        </form>
      </AdminModal>
    </div>
  );
}

export default AdminLoginPage;
