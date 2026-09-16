export const featureService = {
  getFeatures: async () => ({ data: [] }),
  createFeature: async (data) => ({ data }),
  updateFeature: async (id, data) => ({ data }),
  deleteFeature: async (id) => ({ success: true }),
};
