export const categoryService = {
  getCategories: async () => ({ data: [] }),
  createCategory: async (data) => ({ data }),
  updateCategory: async (id, data) => ({ data }),
  deleteCategory: async (id) => ({ success: true }),
};
