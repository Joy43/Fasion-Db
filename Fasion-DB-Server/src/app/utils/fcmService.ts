import { messaging } from "../config/firebaseConfig";


interface NotificationPayload {
  title: string;
  body: string;
  data?: Record<string, string>;
}

export const sendMessageToToken = async (token: string, payload: NotificationPayload) => {
  const message = {
    token,
    notification: {
      title: payload.title,
      body: payload.body,
    },
    data: payload.data || {},
  };

  return await messaging.send(message);
};
