import { Stack } from 'expo-router';
export default function settingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="privacy" />
      <Stack.Screen name="terms" />
      <Stack.Screen name="account-manage" />
      <Stack.Screen name="support" />
    </Stack>
  );
}
