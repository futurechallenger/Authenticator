import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";

export default function Scanner() {
  const router = useRouter();
  const { hasPermission, requestPermission } = useCameraPermission();
  const { t } = useTranslation();

  const device = useCameraDevice("back");
  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: (code) => {
      console.log(code);
      router.replace({
        pathname: "/(tabs)",
        params: { params: code[0].value },
      });
    },
  });

  useEffect(() => {
    (async () => {
      if (!hasPermission) {
        const status = await requestPermission();
        if (!status) {
          router.push("/permission");
        }
      }
    })();
  }, []);

  if (!device) return <div>No device</div>;

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Stack.Screen
        options={{ headerShown: true, title: t("scanner.title") }}
        name="Scanner"
      />
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive
        codeScanner={codeScanner}
      />
    </SafeAreaView>
  );
}
