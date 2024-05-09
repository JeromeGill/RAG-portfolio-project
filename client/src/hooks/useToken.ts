import { useState } from "react";
import { TokenProvider } from "@/auth/TokenProvider";

export const useToken = () => {
  const [token, setTokenState] = useState<string | null>(
    TokenProvider.getToken,
  );

  const setToken = (newToken: string | null) => {
    TokenProvider.setToken(newToken);
    setTokenState(newToken);
  };

  return { token, setToken };
};
