import React, { useEffect } from 'react';
import { XMarkIcon } from '@/components/Icons';

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon: Icon,
  iconBg = 'bg-[#0c1844]',
  iconColor = 'text-white',
  maxWidth = 'max-w-lg',
  children,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 sm:p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`bg-white rounded-2xl sm:rounded-3xl ${maxWidth} w-full p-5 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition cursor-pointer"
          aria-label="Close modal"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {(title || Icon) && (
          <div className="flex items-center gap-3 pr-8">
            {Icon && (
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div>
              {title && <h3 className="text-sm sm:text-lg font-black text-slate-900 leading-snug">{title}</h3>}
              {subtitle && <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
        )}

        <div className="mt-4 sm:mt-5">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
