import { Tabs } from "expo-router";
import { Text } from "react-native";
import { theme } from "@/theme";
const glyphs: Record<string,string> = { index:"⌂", protect:"◈", learn:"▤", build:"⌘", earn:"↗" };
export default function TabLayout() {
  return <Tabs screenOptions={({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: theme.colors.accent,
    tabBarInactiveTintColor: theme.colors.muted,
    tabBarStyle: { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.line, height: 68, paddingTop: 8, paddingBottom: 9 },
    tabBarLabelStyle: { fontSize: 10, fontWeight: "700", marginTop: 2 },
    tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 21, fontWeight: "700" }}>{glyphs[route.name] ?? "•"}</Text>
  })}>
    <Tabs.Screen name="index" options={{ title: "Home", tabBarLabel: "Home" }} />
    <Tabs.Screen name="protect" options={{ title: "Protect" }} />
    <Tabs.Screen name="learn" options={{ title: "Learn" }} />
    <Tabs.Screen name="build" options={{ title: "Build" }} />
    <Tabs.Screen name="earn" options={{ title: "Earn" }} />
  </Tabs>;
}