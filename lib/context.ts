import { createContext } from "react";

type AuthContextType = {
  authenticated: React.RefObject<boolean>;
  setAuthenticated: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

AuthContext.displayName = "AuthContext";
