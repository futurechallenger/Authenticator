import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const AuthScreen = () => {
  const router = useRouter();
  const handlePress = () => {
    console.log("Button pressed!");
    router.push("/authenticator");
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>Authenticator</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Pressable onPress={handlePress}>
          <Text style={styles.buttonTitle}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonTitle: {
    fontSize: 18,
    color: "blue",
  },
});

export default AuthScreen;
