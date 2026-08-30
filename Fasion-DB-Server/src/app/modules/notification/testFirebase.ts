import { messaging } from "../../config/firebaseConfig";


async function test() {
  try {
    const result = await messaging.send({
      token: "your_test_device_fcm_token_here",
      notification: {
        title: "Test Notification",
        body: "Hello from Firebase Admin SDK 🎉",
      },
    });
    console.log("✅ Notification Sent:", result);
  } catch (error) {
    console.error("❌ Error sending test notification:", error);
  }
}

test();
