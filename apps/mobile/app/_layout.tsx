import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { theme } from "@/theme";
export default function RootLayout() {
  return <>
    <StatusBar style="dark" />
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.paper } }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="module/[slug]" options={{ presentation: "card", animation: "slide_from_right" }} />
    </Stack>
  </>;
}