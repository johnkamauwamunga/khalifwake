import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

// If you don't use Tailwind, remove the next line:
import "@/global.css";

import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import { theme } from "../config/theme";
import { AlarmsProvider } from "../context/AlarmsContext";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light" config={theme}>
      <AlarmsProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </AlarmsProvider>
    </GluestackUIProvider>
  );
}
