import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ExternalLink,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { Tooltip } from './Tooltip';

export function AdminHeader({
  title = 'Dashboard',
  subtitle = 'Overview of YEBO operations and financial metrics',
  isSidebarOpen = false,
  onToggleSidebar,
  onGlobalSearch,
}) {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [viewAllNotifs, setViewAllNotifs] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
        setViewAllNotifs(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [notificationsList, setNotificationsList] = useState([
    {
      id: 1,
      title: 'Pending Merchant Applications',
      desc: '18 new merchant registrations require verification.',
      time: '12m ago',
      unread: true,
      link: '/admin/merchants',
    },
    {
      id: 2,
      title: 'Duplicate Event Intercepted',
      desc: 'Double QR scan at The Daily Grind was suppressed.',
      time: '1h ago',
      unread: true,
      link: '/admin/payments',
    },
    {
      id: 3,
      title: 'EFT Payout Batch Generated',
      desc: 'September mid-month disbursement file is ready.',
      time: '3h ago',
      unread: true,
      link: '/admin/eft',
    },
    {
      id: 4,
      title: 'New High-Volume Merchant Onboarded',
      desc: 'Apex Fitness & Recovery Hub completed registration.',
      time: '5h ago',
      unread: false,
      link: '/admin/merchants',
    },
    {
      id: 5,
      title: 'KYC Document Verified',
      desc: 'Sipho Ndlovu identification and proof of address approved.',
      time: '8h ago',
      unread: false,
      link: '/admin/users',
    },
    {
      id: 6,
      title: 'Weekly Commission Settled',
      desc: '₹142,000 treasury allocation booked to ledger.',
      time: '1d ago',
      unread: false,
      link: '/admin/commission',
    },
    {
      id: 7,
      title: 'Velocity Security Alert',
      desc: 'Rate limiter activated for 3 rapid attempts on terminal #14.',
      time: '2d ago',
      unread: false,
      link: '/admin/payments',
    },
    {
      id: 8,
      title: 'Database Backup Completed',
      desc: 'Daily snapshot archived to secure cloud storage.',
      time: '3d ago',
      unread: false,
      link: '/admin/settings',
    },
  ]);

  const unreadCount = useMemo(() => {
    return notificationsList.filter((n) => n.unread).length;
  }, [notificationsList]);

  const displayedNotifications = useMemo(() => {
    let list = notificationsList;
    if (filterType === 'unread') {
      list = list.filter((n) => n.unread);
    }
    if (!viewAllNotifs) {
      return list.slice(0, 3);
    }
    return list;
  }, [notificationsList, filterType, viewAllNotifs]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onGlobalSearch) {
      onGlobalSearch(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 sm:h-[70px] bg-white/95 backdrop-blur-xs border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left Title and Hamburger Menu */}
      <div className="flex items-center gap-3 min-w-0">
        {/* ☰ Hamburger Menu Button */}
        <Tooltip
          content={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          position="bottom"
          delay={150}
          className="shrink-0"
        >
          <button
            type="button"
            onClick={onToggleSidebar}
            className="w-10 h-10 rounded-xl border border-slate-200/90 text-slate-700 hover:bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 active:scale-95 transition cursor-pointer flex items-center justify-center shrink-0"
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <Menu className="w-5 h-5" />
          </button>
        </Tooltip>

        {/* Dynamic Page Title & Subtitle */}
        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight truncate leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-slate-500 truncate hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Controls: Search, Notifications, Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-48 lg:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Quick search (Users, TXN)..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#F97316] focus:bg-white focus:ring-2 focus:ring-orange-100 text-slate-800 placeholder-slate-400 transition"
          />
        </form>

        {/* Notification Icon & Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              if (notificationsOpen) setViewAllNotifs(false);
            }}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F97316] ring-2 ring-white" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-100">
              {/* Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 px-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Notifications
                  </span>
                  {unreadCount > 0 ? (
                    <span className="text-[10px] bg-orange-100 text-[#F97316] font-bold px-1.5 py-0.5 rounded-full">
                      {unreadCount} New
                    </span>
                  ) : (
                    <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded-full">
                      All Read
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setViewAllNotifs(!viewAllNotifs)}
                  className="text-[11px] font-bold text-[#F97316] hover:text-[#ea580c] hover:underline cursor-pointer transition"
                >
                  {viewAllNotifs ? 'Show Recent' : `View All (${notificationsList.length})`}
                </button>
              </div>

              {/* Filter Tabs when View All is Active */}
              {viewAllNotifs && (
                <div className="flex items-center justify-between gap-1 mb-2 px-1">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setFilterType('all')}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition cursor-pointer ${filterType === 'all'
                          ? 'bg-[#0c1844] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                      All ({notificationsList.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterType('unread')}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition cursor-pointer ${filterType === 'unread'
                          ? 'bg-[#0c1844] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                      Unread ({unreadCount})
                    </button>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setNotificationsList((prev) =>
                          prev.map((n) => ({ ...n, unread: false }))
                        );
                      }}
                      className="text-[10px] font-semibold text-slate-500 hover:text-[#F97316] transition cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
              )}

              {/* Notifications List */}
              <div
                className="space-y-1.5 max-h-80 overflow-y-auto smooth-no-scrollbar scroll-smooth pr-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {displayedNotifications.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-400">
                    No notifications in this filter.
                  </div>
                ) : (
                  displayedNotifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setNotificationsList((prev) =>
                          prev.map((item) =>
                            item.id === n.id ? { ...item, unread: false } : item
                          )
                        );
                        setNotificationsOpen(false);
                        navigate(n.link);
                      }}
                      className={`p-2.5 rounded-xl cursor-pointer transition ${n.unread ? 'bg-orange-50/50 hover:bg-orange-50' : 'hover:bg-slate-50'
                        }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          {n.unread && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] shrink-0" />
                          )}
                          <p className="text-xs font-bold text-slate-800 truncate">{n.title}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{n.desc}</p>
                    </div>
                  ))
                )}
              </div>

              {/* View All Button Footer */}
              <div className="pt-2 mt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setViewAllNotifs(!viewAllNotifs)}
                  className="w-full py-2 px-3 text-center text-xs font-bold text-[#F97316] hover:text-[#ea580c] hover:bg-orange-50/80 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {viewAllNotifs ? (
                    <span>Show Less Notifications</span>
                  ) : (
                    <>
                      <span>View All Notifications ({notificationsList.length})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-slate-100 transition border border-slate-200/80 cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-[#0c1844] text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-black text-slate-900 leading-tight">Admin</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="p-2.5 border-b border-slate-100 mb-1">
                <p className="text-xs font-bold text-slate-900">Administrator</p>
                <p className="text-[11px] text-slate-500 truncate">admin@yeboperks.co.za</p>
                <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <Shield className="w-3 h-3" />
                  Full Privileges
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  navigate('/admin/settings');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition cursor-pointer"
              >
                <User className="w-4 h-4 text-slate-400" />
                Admin Profile
              </button>

              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  navigate('/admin/settings');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition cursor-pointer"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                Platform Settings
              </button>

              <div className="my-1 border-t border-slate-100" />

              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  navigate('/admin/login');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
