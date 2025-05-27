import { getArrayAsync, setArrayAsync } from "@/lib/DataProvider";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const handleDelete = async () => {
    Alert.alert("", "删除账户后，您将无法再使用此设备验证身份", [
      {
        text: "Cancel",
        onPress: () => {
          "mission canceled";
        },
      },
      {
        text: "OK",
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
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {params.issuer}
        </Text>
        <Text style={{ color: "gray" }}>{params.account}</Text>
      </View>
      <Pressable onPress={handleDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>删除账户</Text>
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
