const authService = {
  login: async (credentials) => ({ data: { user: { name: 'Admin', email: credentials.email }, token: 'mock-token' } }),
  getProfile: async () => ({ data: { name: 'Admin', email: 'admin@quizapp.com' } }),
  updateProfile: async (data) => ({ data }),
};

export default authService;
