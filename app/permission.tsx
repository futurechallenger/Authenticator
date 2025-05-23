import { useRouter } from "expo-router";
import {
  Linking,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCameraPermission } from "react-native-vision-camera";

export default function PermissionScreen() {
  const router = useRouter();
  const { hasPermission } = useCameraPermission();

  const handleOpenSettings = async () => {
    // 打开系统设置
    await Linking.openSettings();
    // 返回首页（可选）
    router.push("/");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ padding: 20, maxWidth: "80%" }}>
        <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 30 }}>
          我们需要访问您的相机权限来扫描二维码。
          请授予相机权限以继续使用扫码功能。
        </Text>

        <TouchableOpacity
          onPress={handleOpenSettings}
          style={{
            backgroundColor: "#007AFF",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
            前往设置
          </Text>
        </TouchableOpacity>

        {!hasPermission && (
          <Text style={{ marginTop: 20, color: "#666", textAlign: "center" }}>
            您需要手动开启相机权限
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
