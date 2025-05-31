import { AccountInfo, getArrayAsync, setArrayAsync } from "@/lib/DataProvider";
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import Toast from "react-native-root-toast";

import { TotpRow } from "@/components/TOTPRow";
import { parseQRStringInfo } from "@/lib/lib";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams() as { params: string };
  const [list, setList] = useState<AccountInfo[]>([]);
  const [exists, setExists] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    const getTotpList = async () => {
      const totpList = await getArrayAsync<AccountInfo>("totpList");
      setList(totpList ?? []);
      console.log("getTotpList", totpList);
    };

    getTotpList();

    return () => {
      console.log("component will unmount");
      setExists(false);
    };
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

      await setArrayAsync("totpList", [...(originalList ?? []), accountInfo]);
      setList([...(originalList ?? []), accountInfo]);
    };

    putTotpList();
  }, [params?.params]);

  useEffect(() => {
    if (exists) {
      setTimeout(() => {
        setExists(false);
      }, 5000);
    }
  }, [exists]);

  const handleScannPress = () => {
    console.log("Button pressed!");
    router.push("/scanner");
  };

  const renderItem = (itemInfo: ListRenderItemInfo<AccountInfo>) => {
    const { item } = itemInfo;

    return <TotpRow item={item} />;
  };
  return (
    <SafeAreaProvider>
      <Stack.Screen
        options={{
          headerShown: true,
          title: t("home.title"),
        }}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F4F4" }}>
        <FlatList data={list} renderItem={renderItem} />
        <Pressable onPress={handleScannPress} style={styles.scanButton}>
          <Text style={{ color: "#fff", fontSize: 24 }}>+</Text>
        </Pressable>
        <Toast
          visible={exists}
          position={-60}
          onHidden={() => setExists(false)}
        >
          Account already exists!
        </Toast>
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
