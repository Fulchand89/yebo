import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Store,
  CreditCard,
  BookOpenCheck,
  FileText,
  Send,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { YeboLogo } from '@/components/YeboLogo';
import { Tooltip } from './Tooltip';

/**
 * Subcomponent: SidebarHeader
 * Brand header with Logo, YEBO ADMIN, and Control Center text.
 * In collapsed mode, only the Logo is shown centered with Tooltip.
 */
function SidebarHeader({ isCollapsed }) {
  return (
    <div
      className={`h-16 sm:h-[70px] border-b border-[#f0c2a2] flex items-center shrink-0 transition-all duration-300 ${isCollapsed ? 'justify-center px-2' : 'px-4'
        }`}
    >
      <div className={`flex items-center gap-2.5 overflow-hidden ${isCollapsed ? 'justify-center w-full' : ''}`}>
        <Tooltip
          content={
            <div className="flex items-center gap-1.5">
              <span className="font-bold">YEBO ADMIN</span>
              <span className="text-[10px] text-orange-400 font-medium">Control Center</span>
            </div>
          }
          position="right"
          delay={50}
          enabled={isCollapsed}
          className={isCollapsed ? 'justify-center' : ''}
        >
          <div className="flex items-center justify-center shrink-0 cursor-pointer">
            <YeboLogo className={`${isCollapsed ? 'h-9 max-w-[48px]' : 'h-8'} w-auto shrink-0`} />
          </div>
        </Tooltip>

        {!isCollapsed && (
          <div className="min-w-0">
            <div className="text-xs font-black tracking-widest uppercase text-slate-900 flex items-center gap-1.5 truncate">
              <span>YEBO ADMIN</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] shrink-0" />
            </div>
            <p className="text-[10px] text-slate-500 font-medium truncate">Control Center</p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Subcomponent: SidebarMenuItem
 * Full text label in expanded mode; only icon in collapsed mode.
 * Wrapped with Tooltip for preview on hover and click.
 */
function SidebarMenuItem({ item, onItemClick, isCollapsed }) {
  const location = useLocation();
  const Icon = item.icon;

  const isActive =
    location.pathname === item.to ||
    (item.subPaths && item.subPaths.some((p) => location.pathname.startsWith(p))) ||
    (item.to !== '/admin/dashboard' && location.pathname.startsWith(item.to));

  return (
    <Tooltip
      content={
        <div className="flex items-center gap-2 py-0.5">
          <span className="font-bold text-xs tracking-wide text-white">{item.label}</span>
          {item.badge && (
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${item.badgeVariant === 'danger'
                  ? 'bg-rose-500 text-white'
                  : item.badgeVariant === 'warning'
                    ? 'bg-amber-500 text-white'
                    : 'bg-[#F97316] text-white'
                }`}
            >
              {item.badge}
            </span>
          )}
        </div>
      }
      position="right"
      delay={0}
      enabled={isCollapsed}
      className={isCollapsed ? 'justify-center' : 'w-full'}
    >
      <NavLink
        to={item.to}
        onClick={onItemClick}
        className={`flex items-center transition-all duration-150 group relative ${isCollapsed
            ? `justify-center w-11 h-11 mx-auto rounded-xl ${isActive
              ? 'bg-[#F97316] text-white shadow-md font-extrabold'
              : 'text-slate-700 hover:bg-white/70 hover:text-slate-900'
            }`
            : `gap-3 px-3 py-2.5 rounded-xl text-xs font-bold w-full ${isActive
              ? 'bg-[#F97316] text-white shadow-xs font-extrabold'
              : 'text-slate-700 hover:bg-white/60 hover:text-slate-900'
            }`
          }`}
        aria-label={item.label}
      >
        <Icon
          className={`shrink-0 transition-transform group-hover:scale-110 ${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'
            } ${isActive ? 'text-white' : 'text-slate-600 group-hover:text-slate-900'}`}
        />

        {/* In collapsed mode, subtle badge dot if badge exists */}
        {isCollapsed && item.badge && (
          <span
            className={`absolute top-2 right-2 w-2 h-2 rounded-full ring-2 ring-[#FDDCC5] ${item.badgeVariant === 'danger'
                ? 'bg-rose-500'
                : item.badgeVariant === 'warning'
                  ? 'bg-amber-500'
                  : 'bg-[#F97316]'
              }`}
          />
        )}

        {!isCollapsed && (
          <>
            <span className="flex-1 truncate text-left">{item.label}</span>

            {item.badge && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${item.badgeVariant === 'danger'
                    ? 'bg-rose-500 text-white'
                    : item.badgeVariant === 'warning'
                      ? 'bg-amber-500 text-white'
                      : isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-white/80 text-slate-700 shadow-2xs'
                  }`}
              >
                {item.badge}
              </span>
            )}

            {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-80 shrink-0" />}
          </>
        )}
      </NavLink>
    </Tooltip>
  );
}

/**
 * Subcomponent: SidebarMenu
 * Fits all items comfortably. In collapsed mode, shows icons only.
 */
function SidebarMenu({ navItems, onItemClick, isCollapsed }) {
  return (
    <div
      className={`flex-1 py-3 space-y-1.5 overflow-y-auto scrollbar-none admin-sidebar-scroll transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-3'
        }`}
    >
      {!isCollapsed ? (
        <div className="px-3 pb-2 text-[10px] font-bold text-slate-500 tracking-wider uppercase select-none">
          NAVIGATION
        </div>
      ) : (
        <div className="my-1 border-t border-[#f0c2a2]/60 mx-2" />
      )}

      {navItems.map((item) => (
        <SidebarMenuItem
          key={item.to}
          item={item}
          isCollapsed={isCollapsed}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
}

/**
 * Subcomponent: SidebarFooter
 * Clean Logout action at the bottom with Tooltip. In collapsed mode, icon only.
 */
function SidebarFooter({ onLogout, isCollapsed }) {
  return (
    <div
      className={`border-t border-[#f0c2a2] shrink-0 transition-all duration-300 ${isCollapsed ? 'p-2 flex justify-center' : 'p-3'
        }`}
    >
      <Tooltip
        content={<span className="font-bold text-xs text-rose-300">Sign out of admin session</span>}
        position="right"
        delay={0}
        enabled={isCollapsed}
        className={isCollapsed ? 'justify-center' : 'w-full'}
      >
        <button
          type="button"
          onClick={onLogout}
          className={`flex items-center justify-center font-bold text-slate-700 hover:text-rose-600 hover:bg-rose-500/10 hover:border-rose-500/20 rounded-xl transition border border-transparent cursor-pointer group ${isCollapsed
              ? 'w-11 h-11 mx-auto'
              : 'w-full gap-2 py-2 text-xs'
            }`}
          aria-label="Logout"
        >
          <LogOut
            className={`text-rose-500 shrink-0 transition-transform group-hover:scale-110 ${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'
              }`}
          />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </Tooltip>
    </div>
  );
}

/**
 * Main Component: AdminSidebar
 * Desktop: Toggle between full w-64 and mini w-20 (showing logo and icons only).
 * Mobile: Slide-in drawer with backdrop.
 */
export function AdminSidebar({
  isDesktopOpen = true,
  isMobileOpen = false,
  onCloseMobile,
}) {
  const navigate = useNavigate();

  const navItems = [
    {
      to: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      to: '/admin/users',
      label: 'Users',
      icon: Users,
    },
    {
      to: '/admin/merchants',
      label: 'Merchants',
      icon: Store,
    },
    {
      to: '/admin/payments',
      label: 'Payments',
      icon: CreditCard,
      subPaths: ['/admin/payments/receipts', '/admin/payments/duplicates', '/admin/payments/failed'],
    },
    {
      to: '/admin/commission',
      label: 'Commission Ledger',
      icon: BookOpenCheck,
    },
    {
      to: '/admin/logs',
      label: 'System Logs',
      icon: FileText,
    },
    {
      to: '/admin/eft',
      label: 'EFT',
      icon: Send,
    },
    {
      to: '/admin/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    if (onCloseMobile) onCloseMobile();
    navigate('/admin/login');
  };

  const renderContent = (isCollapsed = false) => (
    <div className="flex flex-col h-full bg-[#FDDCC5] text-slate-800">
      <SidebarHeader isCollapsed={isCollapsed} />

      <SidebarMenu
        navItems={navItems}
        isCollapsed={isCollapsed}
        onItemClick={() => {
          if (typeof window !== 'undefined' && window.innerWidth < 768 && onCloseMobile) {
            onCloseMobile();
          }
        }}
      />

      <SidebarFooter onLogout={handleLogout} isCollapsed={isCollapsed} />
    </div>
  );

  return (
    <>
      {/* ─── DESKTOP SIDEBAR (Full w-64 vs Collapsed w-20 with Logo & Icons) ─── */}
      <aside
        aria-label="Admin Navigation Sidebar"
        className={`hidden md:flex flex-col fixed top-0 left-0 bottom-0 z-40 h-screen border-r border-[#f0c2a2] shadow-sm bg-[#FDDCC5] overflow-hidden select-none transition-all duration-300 ease-in-out ${isDesktopOpen ? 'w-64' : 'w-20'
          }`}
      >
        {renderContent(!isDesktopOpen)}
      </aside>

      {/* ─── MOBILE DRAWER & BACKDROP OVERLAY ─── */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-visibility duration-300 ${isMobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        aria-hidden={!isMobileOpen}
      >
        {/* Semi-transparent Backdrop Overlay */}
        <div
          onClick={onCloseMobile}
          className={`fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 ${isMobileOpen ? 'opacity-100' : 'opacity-0'
            }`}
        />

        {/* Slide-in Mobile Drawer */}
        <div
          className={`relative w-72 max-w-[85vw] h-full z-10 shadow-2xl transition-transform duration-300 ease-in-out bg-[#FDDCC5] ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          {renderContent(false)}
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;
