import React, { useState } from 'react';
import {
  Settings,
  Sliders,
  CreditCard,
  Shield,
  Save,
  Lock,
  Building,
  Mail,
  Phone,
  Clock,
  Key,
  CheckCircle2,
  Upload,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { YeboLogo } from '@/components/YeboLogo';
import { mockSettings } from '@/data/adminMockData';

export function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'payment' | 'security'
  const [settings, setSettings] = useState(mockSettings);
  const [isSaving, setIsSaving] = useState(false);

  // Password fields state
  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirmPass: '',
  });

  const handleSave = (sectionName) => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success(`${sectionName} saved successfully (UI Simulation)!`);
    }, 600);
  };

  const tabs = [
    { id: 'general', label: 'General Configuration', icon: Sliders, desc: 'Profile, platform branding & contact details' },
    { id: 'payment', label: 'Payment & PayFast', icon: CreditCard, desc: 'Gateway keys, fees & commission structure' },
    { id: 'security', label: 'Security & Access', icon: Shield, desc: 'Password, sessions & role permissions' },
  ];

  return (
    <div className="space-y-6">
      {/* Settings Navigation Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-2xl border text-left transition cursor-pointer flex items-start gap-3.5 ${
                isActive
                  ? 'bg-white border-[#F97316] shadow-md ring-1 ring-orange-200'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl shrink-0 ${
                  isActive ? 'bg-orange-50 text-[#F97316]' : 'bg-slate-100 text-slate-500'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className={`text-xs font-black uppercase tracking-wider ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                  {tab.label}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{tab.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* 1. GENERAL SETTINGS */}
      {activeTab === 'general' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                General Settings & System Identity
              </h3>
              <p className="text-xs text-slate-500">Configure public platform metadata, branding, and administrative contacts</p>
            </div>
            <button
              type="button"
              onClick={() => handleSave('General Settings')}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#F97316] hover:bg-[#F97316] transition shadow-xs cursor-pointer disabled:opacity-60"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>

          <div className="space-y-6 text-xs">
            {/* Admin Profile */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F97316]" />
                Admin Profile
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Administrator Name</label>
                  <input
                    type="text"
                    value={settings.general.adminName}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, adminName: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Administrative Email</label>
                  <input
                    type="email"
                    value={settings.general.adminEmail}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, adminEmail: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* System Name & Logo */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0c1844]" />
                System Name & YEBO Logo
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">System Name</label>
                  <input
                    type="text"
                    value={settings.general.systemName}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, systemName: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">YEBO Brand Logo</label>
                  <div className="flex items-center gap-3 p-2 bg-transparent border border-slate-200 rounded-xl">
                    <YeboLogo className="h-8" />
                    <button
                      type="button"
                      onClick={() => toast.success('Upload logo dialog (UI simulation)...')}
                      className="ml-auto inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-bold hover:bg-slate-100 transition"
                    >
                      <Upload className="w-3 h-3" />
                      Upload New
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F97316]" />
                Contact Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Support Email</label>
                  <input
                    type="email"
                    value={settings.general.supportEmail}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, supportEmail: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Telephone</label>
                  <input
                    type="text"
                    value={settings.general.adminPhone}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, adminPhone: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Default Timezone</label>
                  <input
                    type="text"
                    value={settings.general.defaultTimezone}
                    disabled
                    className="w-full px-3 py-2 bg-slate-100 text-slate-500 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Registered Office Address</label>
                <input
                  type="text"
                  value={settings.general.officeAddress}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      general: { ...settings.general, officeAddress: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316] focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PAYMENT SETTINGS */}
      {activeTab === 'payment' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Payment Gateway & Commission Settings
              </h3>
              <p className="text-xs text-slate-500">Configure PayFast merchant keys, fees, and disbursement thresholds</p>
            </div>
            <button
              type="button"
              onClick={() => handleSave('Payment Settings')}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#F97316] hover:bg-[#F97316] transition shadow-xs cursor-pointer disabled:opacity-60"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>

          <div className="space-y-6 text-xs">
            {/* PayFast Configuration */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-[#F97316]" />
                  PayFast Configuration
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-500">Sandbox Mode</span>
                  <input
                    type="checkbox"
                    checked={settings.payment.isSandbox}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        payment: { ...settings.payment, isSandbox: e.target.checked },
                      })
                    }
                    className="w-4 h-4 rounded-sm border-slate-300 text-[#F97316] focus:ring-[#F97316]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">PayFast Merchant ID</label>
                  <input
                    type="text"
                    value={settings.payment.merchantId}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        payment: { ...settings.payment, merchantId: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316] font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Merchant Key</label>
                  <input
                    type="text"
                    value={settings.payment.merchantKey}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        payment: { ...settings.payment, merchantKey: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316] font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Passphrase</label>
                  <input
                    type="password"
                    value={settings.payment.passphrase}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        payment: { ...settings.payment, passphrase: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">PayFast IPN Webhook URL</label>
                <input
                  type="text"
                  value={settings.payment.notifyUrl}
                  disabled
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl font-mono text-slate-600"
                />
              </div>
            </div>

            {/* Payment Settings */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0c1844]" />
                Payment Settings
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Currency Code</label>
                  <input
                    type="text"
                    value={settings.payment.currency}
                    disabled
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Min Payout Threshold (₹ / R)</label>
                  <input
                    type="number"
                    value={settings.payment.minPayoutThreshold}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        payment: { ...settings.payment, minPayoutThreshold: Number(e.target.value) },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316]"
                  />
                </div>
              </div>
            </div>

            {/* Commission Settings */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F97316]" />
                Commission & Fee Percentages
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Merchant Fee (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.payment.defaultMerchantFeePct}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        payment: { ...settings.payment, defaultMerchantFeePct: Number(e.target.value) },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Referral Reward (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.payment.referralCommissionPct}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        payment: { ...settings.payment, referralCommissionPct: Number(e.target.value) },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Treasury Platform Retention (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.payment.treasuryRetentionPct}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        payment: { ...settings.payment, treasuryRetentionPct: Number(e.target.value) },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. SECURITY SETTINGS */}
      {activeTab === 'security' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Security & Access Control
              </h3>
              <p className="text-xs text-slate-500">Enforce strong passwords, session longevity, and role-based permissions</p>
            </div>
            <button
              type="button"
              onClick={() => handleSave('Security Policies')}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#F97316] hover:bg-[#F97316] transition shadow-xs cursor-pointer disabled:opacity-60"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>

          <div className="space-y-6 text-xs">
            {/* Change Password */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#F97316]" />
                Change Password
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">New Password</label>
                  <input
                    type="password"
                    value={passwords.newPass}
                    onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                    placeholder="Min. 12 characters"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwords.confirmPass}
                    onChange={(e) => setPasswords({ ...passwords, confirmPass: e.target.value })}
                    placeholder="Repeat new password"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316]"
                  />
                </div>
              </div>
            </div>

            {/* Session Settings */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#0c1844]" />
                Session Settings
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Inactivity Timeout (Minutes)</label>
                  <input
                    type="number"
                    value={settings.security.sessionTimeoutMinutes}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        security: { ...settings.security, sessionTimeoutMinutes: Number(e.target.value) },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#F97316]"
                  />
                </div>

                <div className="flex items-center gap-3 pt-5">
                  <input
                    type="checkbox"
                    checked={settings.security.twoFactorEnforced}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        security: { ...settings.security, twoFactorEnforced: e.target.checked },
                      })
                    }
                    className="w-4 h-4 rounded-sm border-slate-300 text-[#F97316] focus:ring-[#F97316]"
                  />
                  <div>
                    <span className="font-bold text-slate-800 block">Enforce Two-Factor Authentication (2FA)</span>
                    <span className="text-[11px] text-slate-400">Require OTP code for administrative sign-in</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Permissions */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-600" />
                Admin Roles & Permissions
              </h4>

              <div className="space-y-3">
                {settings.security.roles.map((role, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-extrabold text-slate-900 block">{role.name}</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {role.permissions.map((p, pIdx) => (
                          <span key={pIdx} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-semibold text-slate-600">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <span className="text-emerald-700 text-[11px] font-bold bg-emerald-50 px-2.5 py-1 rounded-md self-start sm:self-auto">
                      Active Role
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminSettingsPage;
