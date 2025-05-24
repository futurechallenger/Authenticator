import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AppState } from "react-native";
import { MMKVLoader } from "react-native-mmkv-storage";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { DataProvider } from "@/lib/DataProvider";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const MMKV = new MMKVLoader().initialize();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        console.log("App is now active");
      } else if (state === "background") {
        console.log("App is now in the background");
      } else if (state === "inactive") {
        console.log("App is now inactive");
      }
    });
    return () => {
      subscription.remove(); // Clean up the subscription
    };
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <DataProvider value={MMKV}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </DataProvider>
    </ThemeProvider>
  );
}
