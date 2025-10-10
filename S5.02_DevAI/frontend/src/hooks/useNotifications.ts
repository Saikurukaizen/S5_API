import { useState, useEffect } from 'react';

interface UseNotificationsProps {
  initialCount?: number;
  updateInterval?: number;
}

export const useNotifications = ({ 
  initialCount = 0, 
  updateInterval = 10000 
}: UseNotificationsProps = {}) => {
  const [notifications, setNotifications] = useState(initialCount);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random notification updates
      if (Math.random() > 0.7) {
        setNotifications(prev => prev + Math.floor(Math.random() * 3) + 1);
      }
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  const clearNotifications = () => {
    setNotifications(0);
  };

  const addNotification = (count: number = 1) => {
    setNotifications(prev => prev + count);
  };

  return {
    notifications,
    clearNotifications,
    addNotification,
  };
};