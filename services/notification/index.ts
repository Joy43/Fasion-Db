import { getValidToken } from "@/lib/tokenUtils";

const BASE_API =
  process.env.EXPO_PUBLIC_BASE_API || "http://localhost:5000/api/v1";

/**
 * Register the device's FCM token with the backend
 */
export const registerFcmToken = async (fcmToken: string) => {
  const token = await getValidToken();

  const res = await fetch(`${BASE_API}/notification/register`, {
    method: "POST",
    headers: {
      Authorization: token || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: fcmToken }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || "Failed to register FCM token");
  }

  return json;
};

/**
 * Send a test notification (optional for admin/dev)
 */
export const sendTestNotification = async ({
  userId,
  title,
  body,
}: {
  userId: string;
  title: string;
  body: string;
}) => {
  const token = await getValidToken();

  const res = await fetch(`${BASE_API}/notification/send`, {
    method: "POST",
    headers: {
      Authorization: token || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, title, body }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to send notification");
  }

  return json;
};
