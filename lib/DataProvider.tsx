import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AccountInfo {
  account: string;
  secret: string;
  issuer: string;
  rawInfo: string;
}

export async function getArrayAsync<T>(key: string): Promise<T[]> {
  const item = await AsyncStorage.getItem(key);
  return JSON.parse(item ?? "[]") as T[];
}

export function setArrayAsync<T>(key: string, value: T[]): Promise<void> {
  return AsyncStorage.setItem(key, JSON.stringify(value ?? []));
}
