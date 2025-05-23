import { useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

export default function Scanner() {
  const router = useRouter();
  const { hasPermission, requestPermission } = useCameraPermission();

  const device = useCameraDevice("back");

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

  // useEffect(() => {
  //   if (!device) {
  //     console.log(device);
  //   }
  // }, [device]);

  if (!device) return <div>No device</div>;

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Camera style={StyleSheet.absoluteFill} device={device} isActive />
    </SafeAreaView>
  );
}
