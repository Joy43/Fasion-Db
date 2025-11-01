import { Stack } from "expo-router";
export default function OrderLayout() {
  return (
    <Stack>
      <Stack.Screen name="order" options={{ headerShown: false }} />
    </Stack>
  );
}
