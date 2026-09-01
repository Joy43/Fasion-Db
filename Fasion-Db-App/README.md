Here's an improved `README.md` file with your environment variables added in a clear way:

````markdown
# Welcome to FashionDB Mobile App 👗📱

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## 🚀 Get Started

1. Install dependencies
   ```bash
   yarn install
   ```
````

2. Set up environment variables  
   Create a `.env` file in the root directory with these values:

   ```
   EXPO_PUBLIC_BASE_API=
   NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY=6Le-QeUqAAAAAKKUgbeo1PMIGTI1djE32bediPrY
   NEXT_PUBLIC_RECAPTCHA_SERVER_KEY=6Le-QeUqAAAAAA2QOCIBzk4Hrm2B97OgI2f9OyFO
   CLOUDINARY_CLOUD_NAME=dluuillmt
   CLOUDINARY_UPLOAD_PRESET=upload_car
   CLOUDINARY_API=
   ```

3. Start the app
   ```bash
   npx expo start
   ```

## 📱 Running the App

In the output, you'll find options to open the app in:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go) (limited sandbox)

## 🛠 Development

Start developing by editing files in the **app** directory. This project uses:

- [File-based routing](https://docs.expo.dev/router/introduction)
- React Native
- TypeScript (if configured)

## 🔄 Reset Project

When you need a fresh start:

```bash
npm run reset-project
```

This moves starter code to **app-example** and creates a blank **app** directory.

## 🌐 API & Services Configuration

The app uses these services:

- **Backend API**: `https://fasion-db-server.vercel.app/api/v1`
- **reCAPTCHA**: Client and server keys configured
- **Cloudinary**: Configured for image uploads

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Guides](https://docs.expo.dev/guides)
- [Learn Expo Tutorial](https://docs.expo.dev/tutorial/introduction/)

## 💬 Join the Community

- [Expo on GitHub](https://github.com/expo/expo)
- [Discord Community](https://chat.expo.dev)

---

✨ Happy coding! Let's build an amazing fashion app!

```

Key improvements:
1. Added clear section for environment variables
2. Organized services configuration section
3. Better visual hierarchy with emojis
4. More professional tone while keeping it friendly
5. Fixed some formatting issues from the original
6. Added a friendly closing note

The markdown is now more readable and provides all the necessary information in a structured way.


## 2. Generate the native Android project

```bash
npx expo prebuild --clean
```

## 3. Run the app on an Android device/emulator

```bash
yarn android
```

or

```bash
yarn run android
```

## 4. Build a Preview APK/AAB using EAS (Cloud)

```bash
eas build -p android --profile preview
```

## 5. Build locally (requires Android SDK, Java, and NDK if needed)

```bash
eas build -p android --profile preview --local
```
``` bash 
npx expo prebuild --clean
```
```bash
cd ios && pod install && cd ..

```
## Requirements

- Node.js
- Yarn
- Expo CLI
- EAS CLI

Install EAS CLI if you haven't already:

```bash
npm install -g eas-cli
```

Log in to your Expo account:

```bash
eas login
```

Configure EAS in your project:

```bash
eas build:configure
```

## Output

- **Cloud build:** Download the APK/AAB from the Expo build page after the build completes.
- **Local build:** The APK/AAB will be generated on your local machine, and the build output will display its location.a
```
1)yarn run reset-project
2)npx expo customize metro.config.js
3) ts.config.json file =>"typeRoots": ["./types", "./node_modules/@types"],
✔ Build finished

🤖 Android app:
https://expo.dev/artifacts/eas/7kmRPSok2NPdVvPQwhMcrf.aab
** 
https://www.figma.com/design/m8pSNbqjBJAvalw0MzflTZ/
Shoppe---eCommerce-Clothing-Fashion-Store-Multi-Purpose-UI-Mobile-App-Design--Community-?node-id=0-1&p=f&t=haImQd1oAzzRFpDq-0
**
https://dev.to/yhoungbrown/build-your-react-native-project-into-an-apk-59c
4)npx expo start -c

api--https://documenter.getpostman.com/view/28371413/2sAYQXpCyd#17d1fed2-96c5-49b8-8cca-a455e4036e39

https://github.com/Apollo-Level2-Web-Dev/NextMart-Client/tree/part-6
npx expo start --clear
yarn add @react-native-firebase/app @react-native-firebase/messaging
yarn add expo-notifications expo-device expo-permissions


# Format code (Prettier)
yarn format

# Lint and auto-fix (ESLint via Expo)
yarn lint

# Type-check only (TS)
yarn type-check  # Or directly: npx tsc --noEmit

# Full build check (formats, lints, types)
yarn build:check

# Start dev server
yarn start

# Run iOS/Android
yarn ios
yarn android

# Reset project (with your error-checked script)
yarn reset-project

npx expo prebuild --clean
find node_modules -name "._*" -type f -delete