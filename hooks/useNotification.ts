// useNotificationSocket.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'https://fasion-db-server.vercel.app'; // change to your backend URL

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
      // Register userId with server to receive personal notifications
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
