import { Pressable, StyleSheet, Text, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export default function TabTwoScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const handlePress = () => {
    router.push("/scanner");
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{t("home.settings")}</ThemedText>
      </ThemedView>
      <ThemedText>{t("settings.scanToStart")}</ThemedText>
      <Pressable style={{}} onPress={handlePress}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "blue",
            paddingVertical: 10,
            borderRadius: 10,
          }}
        >
          <FontAwesome
            name="qrcode"
            size={24}
            color="white"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.buttonTitle}>{t("settings.scan")}</Text>
        </View>
      </Pressable>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  buttonTitle: {
    color: "#fff",
  },
});
