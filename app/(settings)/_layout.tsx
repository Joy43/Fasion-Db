import { Stack } from 'expo-router';
export default function tabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="privacy" />
      <Stack.Screen name="terms" />
     
    </Stack>
  );
}
