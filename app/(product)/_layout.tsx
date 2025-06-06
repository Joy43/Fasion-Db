import { Stack } from 'expo-router';
export default function ProductLayout() {
  return (
    <Stack>
      <Stack.Screen name="products" options={{ headerShown: false }} />
    </Stack>
  );
}