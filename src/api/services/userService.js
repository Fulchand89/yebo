const userService = {
  getUsers: async () => ({ data: [] }),
  createUser: async (data) => ({ data }),
  updateUser: async (id, data) => ({ data }),
  deleteUser: async (id) => ({ success: true }),
  blockUser: async (id) => ({ success: true }),
  unblockUser: async (id) => ({ success: true }),
};

export default userService;
