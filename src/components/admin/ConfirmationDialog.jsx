import React from 'react';
import { AlertTriangle, Info, CheckCircle2, ShieldAlert } from 'lucide-react';
import { AdminModal } from './AdminModal';

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to perform this action? This can be modified later.',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'primary', // 'primary' | 'danger' | 'warning' | 'success'
  isLoading = false,
}) {
  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: ShieldAlert,
          iconBg: 'bg-rose-50 text-rose-600',
          confirmBtn: 'bg-rose-600 hover:bg-rose-700 text-white',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          iconBg: 'bg-amber-50 text-amber-600',
          confirmBtn: 'bg-amber-600 hover:bg-amber-700 text-white',
        };
      case 'success':
        return {
          icon: CheckCircle2,
          iconBg: 'bg-emerald-50 text-emerald-600',
          confirmBtn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
        };
      case 'primary':
      default:
        return {
          icon: Info,
          iconBg: 'bg-orange-50 text-[#F97316]',
          confirmBtn: 'bg-[#F97316] hover:bg-[#F97316] text-white',
        };
    }
  };

  const { icon: Icon, iconBg, confirmBtn } = getVariantStyles();

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      icon={Icon}
      iconBg={iconBg}
      maxWidth="max-w-md"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 text-xs font-bold rounded-xl shadow-xs transition cursor-pointer disabled:opacity-50 ${confirmBtn}`}
          >
            {isLoading ? 'Processing...' : confirmLabel}
          </button>
        </>
      }
    >
      <p className="text-xs text-slate-600 leading-relaxed">{message}</p>
    </AdminModal>
  );
}

export default ConfirmationDialog;
