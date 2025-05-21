import { SafeAreaView, Text, View } from "react-native";

export default function Scanner() {
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
