import { Stack } from 'expo-router';
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}