import { Stack } from "expo-router";
export default function ProductDetialsLayout() {
  return (
    <Stack>
      <Stack.Screen name="productdetials" options={{ headerShown: false }} />
    </Stack>
  );
}
