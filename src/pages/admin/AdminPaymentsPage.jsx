import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CreditCard,
  Receipt,
  Layers,
  AlertTriangle,
  Eye,
  Printer,
  Download,
  Info,
  CheckCircle2,
  RefreshCw,
  Search,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  DataTable,
  SearchBar,
  StatusBadge,
  ReceiptModal,
  AdminModal,
} from '@/components/admin';
import {
  mockTransactions,
  mockDuplicateEvents,
  mockFailedEvents,
} from '@/data/adminMockData';

export function AdminPaymentsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab based on pathname
  const getTabFromPath = () => {
    if (location.pathname.includes('/receipts')) return 'receipts';
    if (location.pathname.includes('/duplicates')) return 'duplicates';
    if (location.pathname.includes('/failed')) return 'failed';
    return 'transactions';
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath());
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedReceiptTxn, setSelectedReceiptTxn] = useState(null);
  const [selectedDuplicateEvent, setSelectedDuplicateEvent] = useState(null);
  const [selectedFailedEvent, setSelectedFailedEvent] = useState(null);

  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'transactions') navigate('/admin/payments');
    else if (tab === 'receipts') navigate('/admin/payments/receipts');
    else if (tab === 'duplicates') navigate('/admin/payments/duplicates');
    else if (tab === 'failed') navigate('/admin/payments/failed');
  };

  const tabs = [
    { id: 'transactions', label: 'PayFast Transactions', icon: CreditCard, count: mockTransactions.length },
    { id: 'receipts', label: 'Transaction Receipts', icon: Receipt },
    { id: 'duplicates', label: 'Duplicate Events', icon: Layers, count: mockDuplicateEvents.length, badgeColor: 'bg-orange-100 text-orange-800' },
    { id: 'failed', label: 'Failed Events', icon: AlertTriangle, count: mockFailedEvents.length, badgeColor: 'bg-orange-100 text-orange-800' },
  ];

  // 1. Transactions Columns
  const transactionColumns = [
    {
      header: 'Transaction ID',
      key: 'id',
      render: (item) => <span className="font-mono font-bold text-[#0c1844]">{item.id}</span>,
    },
    {
      header: 'User',
      key: 'user',
      render: (item) => (
        <div>
          <span className="font-bold text-slate-800">{item.user}</span>
          <span className="text-[10px] text-slate-400 block truncate">{item.userEmail}</span>
        </div>
      ),
    },
    {
      header: 'Merchant',
      key: 'merchant',
      render: (item) => <span className="font-semibold text-slate-700">{item.merchant}</span>,
    },
    {
      header: 'Amount',
      key: 'amount',
      render: (item) => <span className="font-black text-slate-900">{item.amount}</span>,
    },
    {
      header: 'Payment Method',
      key: 'paymentMethod',
      render: (item) => <span className="font-medium text-slate-600">{item.paymentMethod}</span>,
    },
    {
      header: 'Gateway Reference',
      key: 'gatewayReference',
      render: (item) => <span className="font-mono text-[11px] text-slate-500">{item.gatewayReference}</span>,
    },
    {
      header: 'Status',
      key: 'status',
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      header: 'Date',
      key: 'date',
      render: (item) => <span className="text-slate-500 font-mono text-[11px]">{item.date}</span>,
    },
    {
      header: 'Action',
      key: 'action',
      render: (item) => (
        <button
          type="button"
          onClick={() => setSelectedReceiptTxn(item)}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-[#F97316] hover:bg-orange-50 rounded-lg transition"
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>Receipt</span>
        </button>
      ),
    },
  ];

  // 2. Duplicate Events Columns
  const duplicateColumns = [
    {
      header: 'Event ID',
      key: 'eventId',
      render: (item) => <span className="font-mono font-bold text-[#0c1844]">{item.eventId}</span>,
    },
    {
      header: 'Transaction ID',
      key: 'transactionId',
      render: (item) => <span className="font-mono text-slate-600">{item.transactionId}</span>,
    },
    {
      header: 'User',
      key: 'user',
      render: (item) => <span className="font-bold text-slate-800">{item.user}</span>,
    },
    {
      header: 'Merchant',
      key: 'merchant',
      render: (item) => <span className="font-semibold text-slate-700">{item.merchant}</span>,
    },
    {
      header: 'Amount',
      key: 'amount',
      render: (item) => <span className="font-bold text-slate-900">{item.amount}</span>,
    },
    {
      header: 'Event Count',
      key: 'eventCount',
      render: (item) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-[#FFF4EC] text-[#C2410C] border border-[#f0c2a2] shadow-2xs">
          {item.eventCount}x Duplicate
        </span>
      ),
    },
    {
      header: 'Original Event',
      key: 'originalEvent',
      render: (item) => <span className="font-mono text-[11px] text-slate-500">{item.originalEvent}</span>,
    },
    {
      header: 'Duplicate Event',
      key: 'duplicateEvent',
      render: (item) => <span className="font-mono text-[11px] text-[#C2410C] font-semibold">{item.duplicateEvent}</span>,
    },
    {
      header: 'Status',
      key: 'status',
      render: (item) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-orange-50 text-orange-900 border border-orange-200/90 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] shrink-0" />
          DUPLICATE BLOCKED
        </span>
      ),
    },
    {
      header: 'Action',
      key: 'action',
      render: (item) => (
        <button
          type="button"
          onClick={() => setSelectedDuplicateEvent(item)}
          className="p-1.5 text-slate-600 hover:text-[#F97316] hover:bg-orange-50 rounded-lg transition cursor-pointer"
          title="Inspect Event"
        >
          <Info className="w-4 h-4" />
        </button>
      ),
    },
  ];

  // 3. Failed Events Columns
  const failedColumns = [
    {
      header: 'Event ID',
      key: 'eventId',
      render: (item) => <span className="font-mono font-bold text-[#0c1844]">{item.eventId}</span>,
    },
    {
      header: 'Transaction ID',
      key: 'transactionId',
      render: (item) => <span className="font-mono text-slate-600">{item.transactionId}</span>,
    },
    {
      header: 'User',
      key: 'user',
      render: (item) => <span className="font-bold text-slate-800">{item.user}</span>,
    },
    {
      header: 'Merchant',
      key: 'merchant',
      render: (item) => <span className="font-semibold text-slate-700">{item.merchant}</span>,
    },
    {
      header: 'Amount',
      key: 'amount',
      render: (item) => <span className="font-bold text-slate-900">{item.amount}</span>,
    },
    {
      header: 'Failure Reason',
      key: 'failureReason',
      render: (item) => (
        <span className="text-[#C2410C] font-bold text-xs bg-[#FFF4EC] border border-[#f0c2a2]/80 px-2.5 py-1 rounded-lg inline-block shadow-2xs">
          {item.failureReason}
        </span>
      ),
    },
    {
      header: 'Gateway Response',
      key: 'gatewayResponse',
      render: (item) => (
        <span className="text-slate-500 text-[11px] truncate max-w-[200px] block">
          {item.gatewayResponse}
        </span>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      render: (item) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-orange-50 text-orange-900 border border-orange-200/90 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] shrink-0" />
          FAILED / ERROR
        </span>
      ),
    },
    {
      header: 'Action',
      key: 'action',
      render: (item) => (
        <button
          type="button"
          onClick={() => setSelectedFailedEvent(item)}
          className="p-1.5 text-slate-600 hover:text-[#F97316] hover:bg-orange-50 rounded-lg transition cursor-pointer"
          title="Inspect Failure"
        >
          <Info className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      {/* Top Tabs Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-2 flex overflow-x-auto scrollbar-none sm:flex-wrap gap-1.5 shadow-xs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 whitespace-nowrap ${isActive
                ? 'bg-[#0c1844] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isActive
                    ? 'bg-[#F97316] text-white'
                    : tab.badgeColor || 'bg-slate-200 text-slate-700'
                    }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 1. Tab Content: PayFast Transactions */}
      {activeTab === 'transactions' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by TXN, customer, or gateway ref..."
              className="w-full sm:w-80"
            />
            <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-500 font-medium">Gateway: PayFast Engine v3</span>
              <button
                type="button"
                onClick={() => toast.success('Re-checking PayFast webhook logs (UI Demo)...')}
                className="p-2 text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition"
                title="Refresh Status"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <DataTable
            columns={transactionColumns}
            data={mockTransactions}
            keyField="id"
            minWidth="920px"
          />
        </div>
      )}

      {/* 2. Tab Content: Transaction Receipts */}
      {activeTab === 'receipts' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div>
              <h3 className="text-sm font-black text-slate-900">YEBO PAYMENT RECEIPTS</h3>
              <p className="text-xs text-slate-500">Official tax invoices and subscriber settlement vouchers</p>
            </div>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search receipt ID or customer..."
              className="w-full sm:w-72"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTransactions.map((tx) => (
              <div
                key={tx.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-orange-300 hover:shadow-md transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-extrabold text-[#F97316] bg-orange-50 px-2 py-0.5 rounded-md">
                    {tx.receiptId}
                  </span>
                  <StatusBadge status={tx.status} />
                </div>

                <div>
                  <div className="text-xl font-black text-slate-900">{tx.amount}</div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">{tx.user}</div>
                  <div className="text-[11px] text-slate-400">{tx.merchant}</div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">{tx.date.split(' ')[0]}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedReceiptTxn(tx)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-[#0c1844] hover:bg-[#071131] transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Receipt</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Tab Content: Duplicate Events */}
      {activeTab === 'duplicates' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-orange-50/90 via-[#FFF4EC] to-amber-50/50 border border-[#f0c2a2] rounded-2xl p-4 flex items-start gap-3.5 shadow-2xs">
            <Layers className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span>IDEMPOTENCY SAFEGUARD ACTIVE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Duplicate webhooks and concurrent QR redemptions within 1,000ms window are automatically intercepted and quarantined to safeguard user ledger balance.
              </p>
            </div>
          </div>

          <DataTable
            columns={duplicateColumns}
            data={mockDuplicateEvents}
            keyField="eventId"
            minWidth="920px"
          />
        </div>
      )}

      {/* 4. Tab Content: Failed Events */}
      {activeTab === 'failed' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-orange-50/90 via-[#FFF4EC] to-amber-50/50 border border-[#f0c2a2] rounded-2xl p-4 flex items-start gap-3.5 shadow-2xs">
            <AlertTriangle className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span>TRANSACTION EXCEPTION MONITOR</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Displays real-time PayFast gateway declines, 3D secure timeouts, and insufficient fund rejections with raw bank diagnostic codes.
              </p>
            </div>
          </div>

          <DataTable
            columns={failedColumns}
            data={mockFailedEvents}
            keyField="eventId"
            minWidth="920px"
          />
        </div>
      )}

      {/* YEBO Payment Receipt Modal */}
      {selectedReceiptTxn && (
        <ReceiptModal
          isOpen={Boolean(selectedReceiptTxn)}
          onClose={() => setSelectedReceiptTxn(null)}
          transaction={selectedReceiptTxn}
          onPrint={(t) => {
            toast.success(`Opening print dialogue for ${t.receiptId}...`);
            window.print();
          }}
          onDownload={(t) => {
            toast.success(`Downloaded ${t.receiptId}.pdf (UI simulation).`);
          }}
        />
      )}

      {/* Duplicate Event Details Modal */}
      {selectedDuplicateEvent && (
        <AdminModal
          isOpen={Boolean(selectedDuplicateEvent)}
          onClose={() => setSelectedDuplicateEvent(null)}
          title={`Duplicate Event: ${selectedDuplicateEvent.eventId}`}
          subtitle="Idempotent replay interception audit"
          icon={Layers}
          iconBg="bg-orange-100 text-[#F97316]"
          footer={
            <button
              type="button"
              onClick={() => setSelectedDuplicateEvent(null)}
              className="px-4 py-2 text-xs font-bold text-white bg-[#0c1844] hover:bg-[#071131] rounded-xl transition cursor-pointer"
            >
              Close
            </button>
          }
        >
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#FFF4EC] rounded-xl border border-[#f0c2a2] text-slate-900">
              <span className="font-bold text-[#C2410C]">Summary: </span>
              <span className="font-medium text-slate-800">{selectedDuplicateEvent.details}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Original Request</span>
                <p className="font-mono text-slate-800 font-bold mt-0.5">{selectedDuplicateEvent.originalEvent}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Duplicate Intercept</span>
                <p className="font-mono text-[#C2410C] font-bold mt-0.5">{selectedDuplicateEvent.duplicateEvent}</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400">Resolution</span>
              <p className="text-slate-700 mt-0.5">
                The duplicate payment packet was safely dropped. No multiple debit occurred on user {selectedDuplicateEvent.user}.
              </p>
            </div>
          </div>
        </AdminModal>
      )}

      {/* Failed Event Details Modal */}
      {selectedFailedEvent && (
        <AdminModal
          isOpen={Boolean(selectedFailedEvent)}
          onClose={() => setSelectedFailedEvent(null)}
          title={`Failed Event: ${selectedFailedEvent.eventId}`}
          subtitle="Gateway rejection analysis & payload"
          icon={AlertTriangle}
          iconBg="bg-orange-100 text-[#F97316]"
          footer={
            <button
              type="button"
              onClick={() => setSelectedFailedEvent(null)}
              className="px-4 py-2 text-xs font-bold text-white bg-[#0c1844] hover:bg-[#071131] rounded-xl transition cursor-pointer"
            >
              Dismiss
            </button>
          }
        >
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#FFF4EC] rounded-xl border border-[#f0c2a2] text-slate-900">
              <span className="font-bold text-[#C2410C]">Error Reason: </span>
              <span className="font-semibold text-slate-800">{selectedFailedEvent.failureReason}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400">Bank Response</span>
              <p className="text-slate-800 font-semibold mt-1">{selectedFailedEvent.gatewayResponse}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Customer</span>
                <p className="text-slate-800 font-bold mt-0.5">{selectedFailedEvent.user}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Merchant</span>
                <p className="text-slate-800 font-bold mt-0.5">{selectedFailedEvent.merchant}</p>
              </div>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
}

export default AdminPaymentsPage;
