import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminLoginPage from './AdminLoginPage';
import AdminDashboardPage from './AdminDashboardPage';
import AdminUsersPage from './AdminUsersPage';
import AdminUserDetailPage from './AdminUserDetailPage';
import AdminMerchantsPage from './AdminMerchantsPage';
import AdminMerchantDetailPage from './AdminMerchantDetailPage';
import AdminPaymentsPage from './AdminPaymentsPage';
import AdminCommissionPage from './AdminCommissionPage';
import AdminLogsPage from './AdminLogsPage';
import AdminEftPage from './AdminEftPage';
import AdminSettingsPage from './AdminSettingsPage';

export default function AdminApp() {
  return (
    <Routes>
      {/* 1. Admin Login (Standalone full screen) */}
      <Route path="login" element={<AdminLoginPage />} />

      {/* 2. Admin Protected Shell with Sidebar & Header */}
      <Route element={<AdminLayout />}>
        {/* Default route redirect to dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />

        {/* 2. Dashboard */}
        <Route path="dashboard" element={<AdminDashboardPage />} />

        {/* 3. User Management */}
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="users/:id" element={<AdminUserDetailPage />} />

        {/* 4. Merchant Management */}
        <Route path="merchants" element={<AdminMerchantsPage />} />
        <Route path="merchants/:id" element={<AdminMerchantDetailPage />} />

        {/* 5-8. Payment Monitoring, Receipts, Duplicates, Failed */}
        <Route path="payments" element={<AdminPaymentsPage />} />
        <Route path="payments/receipts" element={<AdminPaymentsPage />} />
        <Route path="payments/duplicates" element={<AdminPaymentsPage />} />
        <Route path="payments/failed" element={<AdminPaymentsPage />} />

        {/* 9. Commission Ledger */}
        <Route path="commission" element={<AdminCommissionPage />} />

        {/* 10. System Logs */}
        <Route path="logs" element={<AdminLogsPage />} />

        {/* 11. EFT Management */}
        <Route path="eft" element={<AdminEftPage />} />

        {/* 12. Settings */}
        <Route path="settings" element={<AdminSettingsPage />} />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
}
