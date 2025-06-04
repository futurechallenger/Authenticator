import "@/i18n";
import { AuthContext } from "@/lib/context";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import "react-native-reanimated";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useColorScheme } from "@/hooks/useColorScheme";
import * as Fonts from "expo-font";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const authenticated = useRef(false);
  const setAuthenticated = (value: boolean) => {
    authenticated.current = value;
  };

  useEffect(() => {
    const prepare = async () => {
      try {
        await Fonts.loadAsync({
          SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        });
      } catch (e) {
        console.error("prepare app error", e);
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

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

  if (!appIsReady) {
    return null;
  } else {
    SplashScreen.hide();
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
        <RootSiblingParent>
          <SafeAreaProvider>
            <Stack>
              <Stack.Screen
                name="authenticator"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false, title: "" }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
          </SafeAreaProvider>
        </RootSiblingParent>
      </AuthContext.Provider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
