import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Authenticator() {
  const params = useLocalSearchParams();

  console.log(">>>>>Authenticator>>>", params);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Authenticator</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
