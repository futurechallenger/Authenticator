import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const renderItem = (
    itemInfo: ListRenderItemInfo<{
      key: string;
      icon?: string;
      title: string;
      subtitle: string;
      value: number; // 6 digits
      timer: number;
    }>
  ) => {
    const { item } = itemInfo;
    const formattedValue = item.value.toLocaleString("en-US", {
      maximumFractionDigits: 0,
    });

    return (
      <View style={{ flexDirection: "row", padding: 16 }}>
        <View style={{ marginRight: 16 }}>
          {/* <Image
            source={
              item.icon
                ? { uri: item.icon }
                : require("@/assets/images/default-icon.png")
            }
            style={{ width: 40, height: 40, borderRadius: 20 }}
          /> */}
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#007AFF",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.title}</Text>
          <Text style={{ fontSize: 14, color: "#666", marginTop: 4 }}>
            {item.subtitle}
          </Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginRight: 8 }}>
              {formattedValue}
            </Text>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: "#007AFF",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 10 }}>{item.timer}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.scanButton}>
          <Text style={{ color: "#fff", fontSize: 24 }}>+</Text>
        </View>
        <FlatList
          data={[
            {
              key: "Dev Mode",
              title: "Dev Mode",
              subtitle: "Enable Dev Mode",
              value: 123456,
              timer: 10,
            },
            {
              key: "Learn React",
              title: "Learn React",
              subtitle: "Learn React",
              value: 123456,
              timer: 10,
            },
            {
              key: "GitHub",
              title: "GitHub",
              subtitle: "GitHub",
              value: 123456,
              timer: 10,
            },
          ]}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  scanButton: {
    position: "absolute",
    bottom: 100,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
