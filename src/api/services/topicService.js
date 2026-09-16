export const topicService = {
  getTopics: async () => ({ data: [] }),
  createTopic: async (data) => ({ data }),
  updateTopic: async (id, data) => ({ data }),
  deleteTopic: async (id) => ({ success: true }),
};
