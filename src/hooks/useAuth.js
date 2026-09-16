import { useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState({ id: 1, name: 'Admin User', email: 'admin@quizapp.com', role: 'ADMIN' });
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    setLoading(false);
    setUser({ id: 1, name: 'Admin User', email: credentials.email || 'admin@quizapp.com', role: 'ADMIN' });
    return { type: 'auth/login/fulfilled' };
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    isAuthenticated: true,
    loading,
    login,
    logout,
  };
}
