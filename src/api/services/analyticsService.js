export const analyticsService = {
  getAnalytics: async () => ({
    data: {
      overview: { totalUsers: 1280, activeUsers: 1150, liveContests: 2, totalRevenue: 248500 },
      revenueTrend: [{ value: 10 }, { value: 20 }]
    }
  }),
};
