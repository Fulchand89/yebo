export const adminNotificationService = {
  getNotifications: async () => ({ data: [] }),
  sendNotification: async (data) => ({ data }),
  deleteNotification: async (id) => ({ success: true }),
};
