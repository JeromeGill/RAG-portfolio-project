import { TokenProvider } from "./TokenProvider";
import { loginAction } from "@/actions/authActions";

export const AuthProvider = {
  isAuthenticated: TokenProvider.getToken() !== null,
  async signin(username: string, password: string) {
    const response = await loginAction(username, password);

    if (response.ok) {
      const { token } = await response.json();
      // @todo do proper session handling
      TokenProvider.setToken(token);
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
    return response;
  },
};
