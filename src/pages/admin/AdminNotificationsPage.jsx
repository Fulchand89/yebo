import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  Store,
  CreditCard,
  Send,
  Users,
  ShieldAlert,
  BookOpenCheck,
  FileText,
  Clock,
  Trash2,
  ArrowRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdminNotifications } from '@/context/AdminNotificationContext';
import { Pagination } from '@/components/admin';

export function AdminNotificationsPage() {
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    readCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useAdminNotifications();

  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'unread' | 'read'
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Filtered notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      if (statusFilter === 'unread' && !item.unread) return false;
      if (statusFilter === 'read' && item.unread) return false;
      return true;
    });
  }, [notifications, statusFilter]);

  // Paginated notifications
  const paginatedNotifications = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredNotifications.slice(start, start + pageSize);
  }, [filteredNotifications, currentPage]);

  const handleMarkAllRead = () => {
    if (unreadCount === 0) {
      toast.error('All notifications are already marked as read');
      return;
    }
    markAllAsRead();
    toast.success(`Marked all ${unreadCount} notifications as read`);
  };

  const handleDeleteItem = (e, id) => {
    e.stopPropagation();
    deleteNotification(id);
    toast.success('Notification removed');
  };

  const handleNavigateItem = (item) => {
    if (item.unread) {
      markAsRead(item.id);
    }
    if (item.link) {
      navigate(item.link);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'merchants':
        return <Store className="w-4 h-4 text-orange-600" />;
      case 'payments':
        return <CreditCard className="w-4 h-4 text-blue-600" />;
      case 'eft':
        return <Send className="w-4 h-4 text-indigo-600" />;
      case 'users':
        return <Users className="w-4 h-4 text-emerald-600" />;
      case 'security':
        return <ShieldAlert className="w-4 h-4 text-rose-600" />;
      case 'commission':
        return <BookOpenCheck className="w-4 h-4 text-amber-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-600" />;
    }
  };

  const getCategoryBg = (category) => {
    switch (category) {
      case 'merchants':
        return 'bg-orange-100/70 border-orange-200 text-orange-700';
      case 'payments':
        return 'bg-blue-100/70 border-blue-200 text-blue-700';
      case 'eft':
        return 'bg-indigo-100/70 border-indigo-200 text-indigo-700';
      case 'users':
        return 'bg-emerald-100/70 border-emerald-200 text-emerald-700';
      case 'security':
        return 'bg-rose-100/70 border-rose-200 text-rose-700';
      case 'commission':
        return 'bg-amber-100/70 border-amber-200 text-amber-700';
      default:
        return 'bg-slate-100 border-slate-200 text-slate-700';
    }
  };

  return (
    <div className="space-y-5">
      {/* ─── Action Toolbar: Filter Tabs & Mark All As Read ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 shadow-xs">
        {/* Status Filter Tabs (All, Unread, Read) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl border border-slate-200/60 w-fit">
          <button
            type="button"
            onClick={() => {
              setStatusFilter('all');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setStatusFilter('unread');
              setCurrentPage(1);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              statusFilter === 'unread'
                ? 'bg-white text-[#F97316] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Unread</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] bg-orange-100 text-[#F97316] rounded-full font-bold">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setStatusFilter('read');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              statusFilter === 'read'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Read ({readCount})
          </button>
        </div>

        {/* Mark all as read button */}
        <button
          type="button"
          onClick={handleMarkAllRead}
          disabled={unreadCount === 0}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs shrink-0 ${
            unreadCount > 0
              ? 'bg-[#F97316] text-white hover:bg-[#ea580c] active:scale-95'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/80'
          }`}
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark all as read</span>
          {unreadCount > 0 && (
            <span className="ml-0.5 px-1.5 py-0.2 text-[10px] bg-white/25 rounded-full font-bold">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* ─── Notifications Feed List ─── */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white border border-slate-200/90 rounded-2xl p-10 text-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F97316] flex items-center justify-center mx-auto mb-3">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No notifications found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {statusFilter === 'unread'
                ? 'You have no unread notifications.'
                : statusFilter === 'read'
                ? 'You have no read notifications.'
                : 'There are no notifications in your activity inbox.'}
            </p>
            {statusFilter !== 'all' && (
              <button
                type="button"
                onClick={() => {
                  setStatusFilter('all');
                  setCurrentPage(1);
                }}
                className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                View all notifications
              </button>
            )}
          </div>
        ) : (
          paginatedNotifications.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNavigateItem(item)}
              className={`group bg-white border rounded-2xl p-4 sm:p-5 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer relative ${
                item.unread
                  ? 'border-l-4 border-l-[#F97316] border-slate-200/90 bg-orange-50/20 hover:bg-orange-50/40'
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left: Icon & Notification Info */}
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  {/* Category Themed Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 ${getCategoryBg(
                      item.category
                    )}`}
                  >
                    {getCategoryIcon(item.category)}
                  </div>

                  {/* Text Content */}
                  <div className="min-w-0 flex-1">
                    {/* Header: Title, Unread Dot, Relative Time */}
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {item.unread && (
                        <span
                          className="w-2 h-2 rounded-full bg-[#F97316] shrink-0"
                          title="Unread notification"
                        />
                      )}
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#F97316] transition leading-snug">
                        {item.title}
                      </h4>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {item.time}
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Right: Quick Action Controls */}
                <div
                  className="flex items-center gap-2.5 self-end sm:self-center shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Primary Action Button */}
                  {item.link && (
                    <button
                      type="button"
                      onClick={() => handleNavigateItem(item)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#F97316] hover:text-white bg-orange-50 hover:bg-[#F97316] border border-orange-200/80 rounded-xl transition cursor-pointer"
                    >
                      <span>{item.actionLabel || 'View Details'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Dismiss / Delete */}
                  <button
                    type="button"
                    onClick={(e) => handleDeleteItem(e, item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                    title="Delete notification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ─── Pagination ─── */}
      {filteredNotifications.length > pageSize && (
        <div className="flex justify-center pt-2">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredNotifications.length / pageSize)}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}

export default AdminNotificationsPage;
