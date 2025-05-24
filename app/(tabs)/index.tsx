import { AccountInfo, getArrayAsync, setArrayAsync } from "@/lib/DataProvider";
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

import { generateTOTP, parseQRStringInfo } from "@/lib/lib";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams() as { params: string };
  const [list, setList] = useState<AccountInfo[]>([]);
  const [exists, setExists] = useState<boolean>(false);

  useEffect(() => {
    const getTotpList = async () => {
      const totpList = await getArrayAsync<AccountInfo>("totpList");
      setList(totpList ?? []);
      console.log("getTotpList", totpList);
    };

    getTotpList();
  }, []);

  useEffect(() => {
    const putTotpList = async () => {
      console.log("component did update", params);
      if (!params?.params) return;

      const originalList = await getArrayAsync<AccountInfo>("totpList");
      console.log(">>>original list>>>", originalList);

      const parsed = parseQRStringInfo(params.params);
      console.log(">>>parsed>>>", parsed);

      if (originalList?.some((item) => item.account === parsed.account)) {
        console.log("Account already exists");
        setExists(true);
        return;
      }

      const accountInfo = {
        account: parsed["account"],
        issuer: parsed["issuer"],
        secret: parsed["secret"],
        rawInfo: params?.params,
      };

      console.log(">>>format account info", accountInfo);

      await setArrayAsync("totpList", [...(originalList ?? []), accountInfo]);

      setList([...(originalList ?? []), accountInfo]);
    };

    putTotpList();
  }, [params?.params]);

  const handleScannPress = () => {
    console.log("Button pressed!");
    router.push("/scanner");
  };

  const renderItem = (itemInfo: ListRenderItemInfo<AccountInfo>) => {
    const { item } = itemInfo;
    const { code, remaining } = generateTOTP(item.secret);

    console.log(`Current TOTP code: ${code}, Remaining: ${remaining} seconds`);

    return (
      <Pressable onPress={() => router.push("/detail")}>
        <View style={{ flexDirection: "row", padding: 16 }}>
          <View style={{ marginRight: 16 }}>
            {/* TODO: Icon is hard coded */}
            <FontAwesome name="github" size={30} color="black" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item.issuer}
            </Text>
            <Text style={{ fontSize: 14, color: "#666", marginTop: 4 }}>
              {item.account}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginRight: 8 }}
              >
                {code}
              </Text>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CountdownCircleTimer
                  isPlaying
                  size={28}
                  strokeWidth={2}
                  duration={remaining}
                  colors="#007AFF"
                >
                  {({ remainingTime }) => (
                    <Text style={{ fontSize: 10 }}>{remainingTime}</Text>
                  )}
                </CountdownCircleTimer>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <SafeAreaProvider>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Authenticator",
        }}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <FlatList data={list} renderItem={renderItem} />
        <Pressable onPress={handleScannPress} style={styles.scanButton}>
          <Text style={{ color: "#fff", fontSize: 24 }}>+</Text>
        </Pressable>
        {exists && (
          <View style={{ position: "absolute", bottom: 100 }}>
            <Text>Account already exists</Text>
          </View>
        )}
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
    zIndex: 1000,
  },
});
