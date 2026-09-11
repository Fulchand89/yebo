import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MerchantDashboardPage from '@/pages/MerchantDashboardPage';
import MerchantDealsPage from '@/pages/MerchantDealsPage';
import MerchantDealBuilderPage from '@/pages/MerchantDealBuilderPage';
import MerchantProductItemizerPage from '@/pages/MerchantProductItemizerPage';
import MerchantProtectionMatrixPage from '@/pages/MerchantProtectionMatrixPage';
import MerchantQrScannerPage from '@/pages/MerchantQrScannerPage';
import MerchantScanSuccessPage from '@/pages/MerchantScanSuccessPage';
import MerchantScanExpiredPage from '@/pages/MerchantScanExpiredPage';
import MerchantScanRejectedPage from '@/pages/MerchantScanRejectedPage';
import MerchantStaffFundPage from '@/pages/MerchantStaffFundPage';
import MerchantFlashMegaphonePage from '@/pages/MerchantFlashMegaphonePage';
import MerchantBusinessProfilePage from '@/pages/MerchantBusinessProfilePage';
import RegisterPage from '@/pages/RegisterPage';
import RegistrationSubmittedPage from '@/pages/RegistrationSubmittedPage';
import LoginPage from '@/pages/LoginPage';

// Helper component to scroll to top on router path changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// Main merchant dashboard app (state-based internal navigation)
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
      <Routes>
        {/* /login → Login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* /register → Registration page */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/registration-submitted" element={<RegistrationSubmittedPage />} />

        {/* Direct routes for scan result pages */}
        <Route path="/scan-success" element={<MerchantScanSuccessPage />} />
        <Route path="/scan-expired" element={<MerchantScanExpiredPage />} />
        <Route path="/scan-rejected" element={<MerchantScanRejectedPage />} />
        <Route path="/staff-fund" element={<MerchantStaffFundPage />} />
        <Route path="/flash-megaphone" element={<MerchantFlashMegaphonePage />} />
        <Route path="/business-profile" element={<MerchantBusinessProfilePage />} />

        {/* / → Merchant App (all internal pages) */}
        <Route path="/*" element={<MerchantApp />} />
      </Routes>
    </>
  );
}
