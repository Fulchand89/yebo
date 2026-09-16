export const loadUser = () => async () => {
  return { type: 'auth/loadUser/fulfilled' };
};
