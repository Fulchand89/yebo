import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export function AdminLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('yebo_admin_sidebar_open');
      if (saved !== null) {
        return saved === 'true';
      }
    }
    return true;
  });
  const location = useLocation();
  const navigate = useNavigate();

  // ☰ Menu button: toggles mobile drawer on mobile, expands/collapses mini-sidebar on desktop
  const toggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsDesktopOpen((prev) => {
        const next = !prev;
        if (typeof window !== 'undefined') {
          localStorage.setItem('yebo_admin_sidebar_open', String(next));
        }
        return next;
      });
    }
  };

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock mobile body scroll when drawer is open
  useEffect(() => {
    const handleBodyScroll = () => {
      if (isMobileOpen && window.innerWidth < 768) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    handleBodyScroll();
    window.addEventListener('resize', handleBodyScroll);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleBodyScroll);
    };
  }, [isMobileOpen]);

  const getPageMeta = (pathname) => {
    if (pathname.includes('/admin/users/')) {
      return { title: 'User Profile & Audit', subtitle: 'Detailed member records, financial history & forfeiture status' };
    }
    if (pathname === '/admin/users') {
      return { title: 'User Management', subtitle: 'Search, filter and audit all registered platform subscribers' };
    }
    if (pathname.includes('/admin/merchants/')) {
      return { title: 'Merchant Details & Compliance', subtitle: 'Business records, deals portfolio, and staff fund allocation' };
    }
    if (pathname === '/admin/merchants') {
      return { title: 'Merchant Management', subtitle: 'Approve, review, or suspend participating partner merchants' };
    }
    if (pathname === '/admin/payments/receipts') {
      return { title: 'Transaction Receipts', subtitle: 'Official customer and merchant payment settlement statements' };
    }
    if (pathname === '/admin/payments/duplicates') {
      return { title: 'Duplicate Events', subtitle: 'Intercepted double webhooks, idempotency collisions & replay attempts' };
    }
    if (pathname === '/admin/payments/failed') {
      return { title: 'Failed Events', subtitle: 'Declined transactions, timeout exceptions & gateway errors' };
    }
    if (pathname.startsWith('/admin/payments')) {
      return { title: 'Payment Monitoring', subtitle: 'Live PayFast gateway transactions, receipts, and event diagnostics' };
    }
    if (pathname === '/admin/commission') {
      return { title: 'Commission Ledger', subtitle: 'Double-entry accounting records across Subscriber, Merchant & Treasury pools' };
    }
    if (pathname === '/admin/logs') {
      return { title: 'System Logs', subtitle: 'Real-time telemetry across IPN webhooks, scanner validator and EFT compilers' };
    }
    if (pathname === '/admin/eft') {
      return { title: 'EFT Payout Management', subtitle: 'Monthly disbursement batches, recipient reconciliations and file generation' };
    }
    if (pathname === '/admin/settings') {
      return { title: 'Platform Settings', subtitle: 'Configure general profile, PayFast gateway credentials and security access policies' };
    }
    return { title: 'Admin Dashboard', subtitle: 'Executive overview of active users, transactions, commission & platform health' };
  };

  const meta = getPageMeta(location.pathname);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 font-sans antialiased w-full max-w-full overflow-x-hidden relative">
      {/* Sidebar: Slide-in/out on Desktop, Drawer on Mobile */}
      <AdminSidebar
        isDesktopOpen={isDesktopOpen}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Layout Area - Transitions between md:pl-64 (full open) and md:pl-20 (collapsed mini-sidebar) */}
      <div
        className={`min-h-screen flex flex-col min-w-0 w-full max-w-full transition-all duration-300 ease-in-out ${isDesktopOpen ? 'md:pl-64' : 'md:pl-20'
          }`}
      >
        {/* Header */}
        <AdminHeader
          title={meta.title}
          subtitle={meta.subtitle}
          isSidebarOpen={isDesktopOpen}
          onToggleSidebar={toggleSidebar}
          onGlobalSearch={(q) => {
            if (q.toUpperCase().startsWith('USR-')) {
              navigate(`/admin/users/${q.toUpperCase()}`);
            } else if (q.toUpperCase().startsWith('MER-')) {
              navigate(`/admin/merchants/${q.toUpperCase()}`);
            } else if (q.toUpperCase().startsWith('TXN-')) {
              navigate(`/admin/payments`);
            } else {
              navigate(`/admin/users`);
            }
          }}
        />

        {/* Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-full min-w-0 space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;

