// Socket-based real-time notification hook
// Lives in redux/features/notifications since it's a real-time extension of the notification feature
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SERVER_URL =
  process.env.EXPO_PUBLIC_BASE_API?.replace("/api/v1", "") ||
  "https://fasiondb-server.vercel.app";

export const useNotificationSocket = (userId: string | null) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const newSocket = io(SERVER_URL, {
      transports: ['websocket'],
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
      newSocket.emit('register', userId);
    });

    newSocket.on('notification', (data: { message: string }) => {
      console.log('Notification received:', data.message);
      setNotification(data.message);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [userId]);

  return { socket, notification, setNotification };
};
