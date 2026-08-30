import 'dotenv/config';

export default {
  expo: {
    extra: {
      BASE_API: process.env.EXPO_PUBLIC_BASE_API,
      RECAPTCHA_SERVER_KEY: process.env.EXPO_PUBLIC_RECAPTCHA_SERVER_KEY,
    },
  },
};
