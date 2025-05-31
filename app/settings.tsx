import { getArrayAsync, setArrayAsync } from "@/lib/DataProvider";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { t } = useTranslation();

  const handleDelete = async () => {
    Alert.alert("", t("settings.deleteConfirm"), [
      {
        text: t("settings.cancel"),
        onPress: () => {
          console.log("mission canceled");
        },
      },
      {
        text: t("settings.ok"),
        onPress: async () => {
          const list = await getArrayAsync("totpList");
          const filtered = list.filter(
            (item: any) =>
              item.account !== params.account && item.secret !== params.secret
          );
          await setArrayAsync("totpList", filtered);
          router.dismissAll();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: t("settings.title") }} />
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {params.issuer}
        </Text>
        <Text style={{ color: "gray" }}>{params.account}</Text>
      </View>
      <Pressable onPress={handleDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>{t("settings.deleteAccount")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 16,
    backgroundColor: "white",
  },
  deleteButton: {
    marginTop: 16,
    backgroundColor: "#ff3b30",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    fontSize: 16,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
});
