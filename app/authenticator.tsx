import { AuthContext } from "@/lib/context";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";

const AuthScreen = () => {
  const router = useRouter();
  const authentication = useContext(AuthContext);
  const { t } = useTranslation();

  const promptScreen = async () => {
    const biometrics = new ReactNativeBiometrics({
      allowDeviceCredentials: true,
    });
    const { biometryType } = await biometrics.isSensorAvailable();

    if (biometryType === "FaceID" || biometryType === "Biometrics") {
      biometrics
        .simplePrompt({
          promptMessage: t("auth.prompt"),
        })
        .then(({ success, error }) => {
          if (error) {
            // TODO: dealing with erroo
            return;
          }

          authentication?.setAuthenticated(true);
          // nav to app content
          router.replace("/(tabs)");
        });
    }
  };

  useEffect(() => {
    promptScreen();
  }, []);

  const handlePress = () => {
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
        <Text style={styles.text}>{t("auth.title")}</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Pressable onPress={handlePress}>
          <Text style={styles.buttonTitle}>{t("auth.login")}</Text>
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
