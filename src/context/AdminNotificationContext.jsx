import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { mockAdminNotifications } from '@/data/adminMockData';

const AdminNotificationContext = createContext(null);

const STORAGE_KEY = 'yebo_admin_notifications_state_v1';

export function AdminNotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (err) {
        console.error('Failed to load notifications from localStorage:', err);
      }
    }
    return mockAdminNotifications;
  });

  // Sync state to localStorage whenever notifications change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
      } catch (err) {
        console.error('Failed to save notifications to localStorage:', err);
      }
    }
  }, [notifications]);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => n.unread).length;
  }, [notifications]);

  const readCount = useMemo(() => {
    return notifications.filter((n) => !n.unread).length;
  }, [notifications]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: false } : item))
    );
  };

  const markAsUnread = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: true } : item))
    );
  };

  const toggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: !item.unread } : item))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, unread: false }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const resetToMock = () => {
    setNotifications(mockAdminNotifications);
  };

  const value = {
    notifications,
    unreadCount,
    readCount,
    markAsRead,
    markAsUnread,
    toggleRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    resetToMock,
  };

  return (
    <AdminNotificationContext.Provider value={value}>
      {children}
    </AdminNotificationContext.Provider>
  );
}

export function useAdminNotifications() {
  const context = useContext(AdminNotificationContext);
  if (!context) {
    throw new Error('useAdminNotifications must be used within an AdminNotificationProvider');
  }
  return context;
}

export default AdminNotificationContext;
