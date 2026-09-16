import { useState, useCallback } from 'react';

export function useAnalyticsReports({ timeframe = '1y' } = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const analyticsData = {
    overview: {
      totalUsers: 1280,
      activeUsers: 1150,
      liveContests: 2,
      totalRevenue: 248500,
      walletStats: {
        totalWalletBalance: 93000,
        totalCredits: 185000,
        totalDebits: 92000,
        totalDeposits: 150000,
        totalWithdrawals: 42000,
        pendingWithdrawals: 8500,
      }
    },
    revenueTrend: [
      { value: 15 }, { value: 28 }, { value: 34 }, { value: 48 }, { value: 42 }, { value: 56 }, { value: 65 }
    ]
  };

  const refetchAnalytics = useCallback(async () => {
    setIsFetching(true);
    await new Promise(r => setTimeout(r, 400));
    setIsFetching(false);
  }, []);

  return {
    analyticsData,
    isLoading,
    isFetching,
    refetchAnalytics,
  };
}
