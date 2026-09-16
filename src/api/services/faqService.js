export const faqService = {
  getFAQs: async () => ({ data: [] }),
  createFAQ: async (data) => ({ data }),
  updateFAQ: async (id, data) => ({ data }),
  deleteFAQ: async (id) => ({ success: true }),
};
