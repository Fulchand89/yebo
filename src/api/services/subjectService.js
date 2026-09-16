export const subjectService = {
  getSubjects: async () => ({ data: [] }),
  createSubject: async (data) => ({ data }),
  updateSubject: async (id, data) => ({ data }),
  deleteSubject: async (id) => ({ success: true }),
};
