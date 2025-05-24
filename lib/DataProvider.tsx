import { createContext } from "react";
import { MMKVInstance } from "react-native-mmkv-storage";

export const DataContext = createContext<MMKVInstance | null>(null);

DataContext.displayName = "MMKVDataContext";

type Props = {
  value: MMKVInstance | null;
  children: React.ReactNode;
};

export function DataProvider({ value, children }: Props) {
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export interface AccountInfo {
  account: string;
  secret: string;
  issuer: string;
  rawInfo: string;
}
