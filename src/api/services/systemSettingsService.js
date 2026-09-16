export const systemSettingsService = {
  getSettings: async () => ({
    data: {
      platformName: 'KnowChamp',
      logoUrl: '/logo_knowchamp.png',
      entryFee: 10,
      minWithdrawal: 100,
    }
  }),
  updateSettings: async (data) => ({ data }),
};
