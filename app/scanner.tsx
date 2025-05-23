import { useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useCameraPermission } from "react-native-vision-camera";

export default function Scanner() {
  const router = useRouter();
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    (async () => {
      if (!hasPermission) {
        const status = await requestPermission();
        if (!status) {
          router.push("/");
        }
      }
    })();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View
        style={{
          backgroundColor: "#f0f0f0",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#007AFF",
          }}
        >
          Scanner
        </Text>
      </View>
    </SafeAreaView>
  );
}
