import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const hasFirebaseConfig = !!(
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY
);

if (hasFirebaseConfig) {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }
} else {
  console.warn("⚠️ Firebase configuration missing in environment variables. FCM notifications are disabled.");
}

export const messaging = hasFirebaseConfig
  ? admin.messaging()
  : ({
      send: async (message: any) => {
        console.warn("⚠️ FCM messaging is disabled (missing config). Message skipped:", message);
        return "skipped-no-config";
      },
    } as unknown as admin.messaging.Messaging);

