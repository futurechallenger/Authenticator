// 在文件顶部新增导入
import { AccountInfo } from "@/lib/DataProvider";
import { generateTOTP } from "@/lib/lib";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import type { TotpInfo } from "@/lib/lib";

export function TotpRow({ item }: { item: AccountInfo }) {
  const router = useRouter();
  const [totp, setTotp] = useState<TotpInfo | null>(null);
  const totpRef = useRef<TotpInfo | null>(null);

  useEffect(() => {
    const { code, remaining } = generateTOTP(item.secret);
    setTotp({ code, remaining });

    // 设置一个计时器，在remaining时间后再次生成totp
    const timer = setTimeout(() => {
      const { code: newCode, remaining: newRemaining } = generateTOTP(
        item.secret
      );
      setTotp({ code: newCode, remaining: newRemaining });
    }, remaining * 1000); // 将剩余时间转换为毫秒

    // 清理计时器
    return () => {
      clearTimeout(timer);
    };
  }, [item.secret]); // 依赖于item.secret以确保每次生成新的totp

  useEffect(() => {
    if (!totp || totpRef.current?.code === totp.code) return;

    totpRef.current = { code: totp.code, remaining: totp.remaining };

    // 设置一个计时器，在remaining时间后再次生成totp
    const timer = setTimeout(() => {
      const { code, remaining } = generateTOTP(item.secret);
      setTotp({ code, remaining });
    }, totp.remaining * 1000); // 将剩余时间转换为毫秒

    // 清理计时器
    return () => {
      clearTimeout(timer);
    };
  }, [totp]);

  if (!totp) {
    return <View>Generating...</View>; // 在totp生成前显示加载状态
  }

  return (
    <Pressable
      onPress={() => router.push({ pathname: "/detail", params: { ...item } })}
    >
      <View style={{ flexDirection: "row", padding: 16 }}>
        <View style={{ marginRight: 16 }}>
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
            style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginRight: 8 }}>
              {totp!.code}
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
                key={totp!.code}
                isPlaying
                size={28}
                strokeWidth={2}
                duration={totp!.remaining}
                colors="#007AFF"
                onComplete={() => {
                  return {
                    shouldRepeat: true,
                    delay: 0,
                  };
                }}
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
}
