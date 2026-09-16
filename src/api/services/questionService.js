export const questionService = {
  getQuestions: async () => ({ data: [] }),
  uploadQuestions: async (data) => ({ success: true, count: 10 }),
  createQuestion: async (data) => ({ data }),
  updateQuestion: async (id, data) => ({ data }),
  deleteQuestion: async (id) => ({ success: true }),
};
