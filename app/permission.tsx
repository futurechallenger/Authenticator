import { Stack, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

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
      <Stack.Screen
        options={{ headerShown: true, title: t("permission.title") }}
        name="Permission"
      />

      <View style={{ padding: 20, maxWidth: "80%" }}>
        <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 30 }}>
          {t("permission.permissionText")}
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
            {t("permission.goSettings")}
          </Text>
        </TouchableOpacity>

        {!hasPermission && (
          <Text style={{ marginTop: 20, color: "#666", textAlign: "center" }}>
            {t("permission.settingManually")}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
