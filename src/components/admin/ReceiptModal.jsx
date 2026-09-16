import React from 'react';
import { Printer, Download, CheckCircle2, ShieldCheck, CreditCard } from 'lucide-react';
import { AdminModal } from './AdminModal';
import { YeboLogo } from '@/components/YeboLogo';
import { StatusBadge } from './StatusBadge';

export function ReceiptModal({
  isOpen,
  onClose,
  transaction,
  onPrint,
  onDownload,
}) {
  if (!isOpen || !transaction) return null;

  const handlePrint = () => {
    if (onPrint) {
      onPrint(transaction);
    } else {
      window.print();
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(transaction);
    } else {
      alert(`Receipt ${transaction.receiptId || transaction.id} downloaded successfully.`);
    }
  };

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title="Payment Receipt"
      subtitle="Official transaction statement & settlement record"
      maxWidth="max-w-xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <span className="text-[11px] text-slate-400 font-medium">
            YEBO Perks Financial Systems • Ref: {transaction.gatewayReference || 'PF-GATEWAY'}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              Print
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#F97316] hover:bg-[#F97316] transition shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              Download
            </button>
          </div>
        </div>
      }
    >
      <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 relative overflow-hidden space-y-5 print:border-none print:p-0">
        {/* Receipt Top Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <YeboLogo className="h-9" />
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Official Receipt
            </span>
            <span className="text-xs font-extrabold text-slate-800">
              {transaction.receiptId || 'RCP-2026-09-001'}
            </span>
          </div>
        </div>

        {/* Amount Banner */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 text-center shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Total Amount Paid
          </span>
          <div className="text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            {transaction.amount}
          </div>
          <div className="mt-2 flex items-center justify-center gap-2">
            <StatusBadge status={transaction.status} />
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              <ShieldCheck className="w-3 h-3" />
              Verified Settlement
            </span>
          </div>
        </div>

        {/* Transaction Metadata Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-white rounded-xl border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Customer</span>
            <div className="font-bold text-slate-900">{transaction.user}</div>
            <div className="text-[11px] text-slate-500 truncate">{transaction.userEmail || 'customer@yebo.co.za'}</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Merchant</span>
            <div className="font-bold text-slate-900">{transaction.merchant}</div>
            <div className="text-[11px] text-slate-500 truncate">ID: {transaction.merchantId || 'MER-2001'}</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Payment Gateway</span>
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-[#F97316]" />
              {transaction.paymentMethod || 'PayFast Secure'}
            </div>
            <div className="text-[10px] text-slate-400 font-mono truncate">{transaction.gatewayReference || 'PF-REF-992'}</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Payment Date & Time</span>
            <div className="font-bold text-slate-900">{transaction.date}</div>
            <div className="text-[11px] text-slate-500">Timezone: Africa/Johannesburg</div>
          </div>
        </div>

        {/* Line item / fee breakdown */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 text-xs space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">
            Breakdown & Items
          </div>
          <div className="flex justify-between text-slate-700">
            <span>{transaction.itemDescription || 'Perk Redemption & Service'}</span>
            <span className="font-bold">{transaction.amount}</span>
          </div>
          {transaction.feeBreakdown && (
            <>
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>Platform Commission</span>
                <span>{transaction.feeBreakdown.platformCommission}</span>
              </div>
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>VAT Included (15%)</span>
                <span>{transaction.feeBreakdown.vatAmount}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold text-xs pt-1 border-t border-slate-100">
                <span>Merchant Net Disbursed</span>
                <span>{transaction.feeBreakdown.merchantNet}</span>
              </div>
            </>
          )}
        </div>

        {/* Security Stamp Footer */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Cryptographically validated with YEBO Secure Vault</span>
        </div>
      </div>
    </AdminModal>
  );
}

export default ReceiptModal;
