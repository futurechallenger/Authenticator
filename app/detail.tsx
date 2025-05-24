import { generateTOTP } from "@/lib/lib";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export default function DetailScreen() {
  const params = useLocalSearchParams();
  const { code, remaining } = generateTOTP(params.secret as string);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(`${code}`);
  };

  return (
    <View style={styles.container}>
      {/* 顶部信息行 */}
      <View style={styles.header}>
        <View>
          <Text style={styles.issuer}>{params.issuer}</Text>
          <Text style={styles.account}>{params.account}</Text>
        </View>
        <FontAwesome name="github" size={24} color="black" />
      </View>

      {/* 配置信息列表 */}
      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>已启用的一次性密码</Text>

        <View style={styles.totpRow}>
          <View style={styles.codeContainer}>
            <Text style={styles.codeLabel}>一次性密码代码</Text>
            <Text style={styles.codeValue}>{code}</Text>
          </View>

          <View style={styles.rightGroup}>
            <CountdownCircleTimer
              isPlaying
              size={28}
              strokeWidth={2}
              duration={remaining}
              colors="#007AFF"
            >
              {({ remainingTime }) => (
                <Text style={styles.timerText}>{remainingTime}</Text>
              )}
            </CountdownCircleTimer>
            <Pressable onPress={copyToClipboard} style={styles.copyButton}>
              <FontAwesome name="copy" size={20} color="#007AFF" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  issuer: {
    fontSize: 18,
    fontWeight: "bold",
  },
  account: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  listContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#999",
    marginBottom: 16,
  },
  totpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  codeContainer: {
    flex: 1,
    marginRight: 16,
  },
  codeLabel: {
    fontSize: 12,
    color: "#666",
  },
  codeValue: {
    fontSize: 24,
    color: "#007AFF",
    fontWeight: "bold",
    marginTop: 4,
  },
  rightGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  timerText: {
    fontSize: 10,
  },
  copyButton: {
    padding: 8,
  },
});
