export const contestService = {
  getContests: async () => ({ data: [] }),
  createContest: async (data) => ({ data }),
  updateContest: async (id, data) => ({ data }),
  deleteContest: async (id) => ({ success: true }),
};
