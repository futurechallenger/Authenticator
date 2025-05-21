import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";

const AuthScreen = () => {
  const router = useRouter();

  const promptScreen = async () => {
    console.log("App is now active");
    const biometrics = new ReactNativeBiometrics({
      allowDeviceCredentials: true,
    });
    const { biometryType } = await biometrics.isSensorAvailable();

    console.log(`>>>biometryType: ${biometryType}`);

    if (biometryType === "FaceID") {
      console.log("FaceID is available");
      biometrics
        .simplePrompt({
          promptMessage: "Authenticate to access the app",
        })
        .then(({ success, error }) => {
          if (error) {
            // TODO: dealing with erroo
            return;
          }

          console.log(`>>>success: ${success}, >>> error: ${error}`);

          router.push("/(tabs)");
        });
    }
  };

  useEffect(() => {
    promptScreen();
  }, []);

  const handlePress = () => {
    console.log("Button pressed!");
    // router.push("/authenticator");
    promptScreen();
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
