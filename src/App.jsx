import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AdminApp from '@/pages/admin/AdminApp';

import MerchantDashboardPage from '@/pages/Merchant/MerchantDashboardPage';
import MerchantDealsPage from '@/pages/Merchant/MerchantDealsPage';
import MerchantDealBuilderPage from '@/pages/Merchant/MerchantDealBuilderPage';
import MerchantProductItemizerPage from '@/pages/Merchant/MerchantProductItemizerPage';
import MerchantProtectionMatrixPage from '@/pages/Merchant/MerchantProtectionMatrixPage';
import MerchantQrScannerPage from '@/pages/Merchant/MerchantQrScannerPage';
import MerchantScanSuccessPage from '@/pages/Merchant/MerchantScanSuccessPage';
import MerchantScanExpiredPage from '@/pages/Merchant/MerchantScanExpiredPage';
import MerchantScanRejectedPage from '@/pages/Merchant/MerchantScanRejectedPage';
import MerchantStaffFundPage from '@/pages/Merchant/MerchantStaffFundPage';
import MerchantFlashMegaphonePage from '@/pages/Merchant/MerchantFlashMegaphonePage';
import MerchantBusinessProfilePage from '@/pages/Merchant/MerchantBusinessProfilePage';
import RegisterPage from '@/pages/Merchant/RegisterPage';
import RegistrationSubmittedPage from '@/pages/Merchant/RegistrationSubmittedPage';
import LoginPage from '@/pages/Merchant/LoginPage';

// Helper component to scroll to top on router path changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// Main merchant website app (state-based internal navigation)
function MerchantApp() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentPage]);

  const nav = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <div className="relative min-h-screen">
      {/* Render Current Page */}
      {currentPage === 'dashboard' && <MerchantDashboardPage onNavigate={nav} />}
      {currentPage === 'deals' && <MerchantDealsPage onNavigate={nav} />}
      {currentPage === 'deal-builder' && <MerchantDealBuilderPage onNavigate={nav} />}
      {currentPage === 'product-itemizer' && <MerchantProductItemizerPage onNavigate={nav} />}
      {currentPage === 'protection-matrix' && <MerchantProtectionMatrixPage onNavigate={nav} />}
      {currentPage === 'qr-scanner' && <MerchantQrScannerPage onNavigate={nav} />}
      {currentPage === 'staff-fund' && <MerchantStaffFundPage onNavigate={nav} />}
      {currentPage === 'flash-megaphone' && <MerchantFlashMegaphonePage onNavigate={nav} />}
      {currentPage === 'business-profile' && <MerchantBusinessProfilePage onNavigate={nav} />}
      {currentPage === 'scan-success' && <MerchantScanSuccessPage onNavigate={nav} />}
      {currentPage === 'scan-expired' && <MerchantScanExpiredPage onNavigate={nav} />}
      {currentPage === 'scan-rejected' && <MerchantScanRejectedPage onNavigate={nav} />}
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#0f172a',
            color: '#fff',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: '600',
            padding: '10px 16px',
            boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)',
          },
        }}
      />
      <Routes>
        {/* Admin Panel routes: /admin and /admin/* */}
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/admin" element={<AdminApp />} />

        {/* Website Auth & Sub routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/registration-submitted" element={<RegistrationSubmittedPage />} />
        <Route path="/scan-success" element={<MerchantScanSuccessPage />} />
        <Route path="/scan-expired" element={<MerchantScanExpiredPage />} />
        <Route path="/scan-rejected" element={<MerchantScanRejectedPage />} />
        <Route path="/staff-fund" element={<MerchantStaffFundPage />} />
        <Route path="/flash-megaphone" element={<MerchantFlashMegaphonePage />} />
        <Route path="/business-profile" element={<MerchantBusinessProfilePage />} />

        {/* Root Route / → Main Website */}
        <Route path="/*" element={<MerchantApp />} />
      </Routes>
    </>
  );
}
