import { User } from "./models/User";
import { config } from "./utils/config";
import dayjs from "dayjs";
import jwt_decode, { JwtPayload } from "jwt-decode";
import axios from "axios";

const localStorageKey = "__auth_provider_token__";
const localStorageKeyRefreshToken = "__auth_provider_refreshtoken__";
const API_BASE_URL = config.apiBaseUrl;

const authClient = axios.create({
  baseURL: API_BASE_URL,
});

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface LoginResponse extends User, AuthTokens {}
export interface LoginRegisterForm {
  email: string;
  password: string;
}

export const isTokenExpired = (token: string) => {
  const decodedToken = jwt_decode<JwtPayload>(token);
  const expieryTime = dayjs.unix(decodedToken.exp ? decodedToken.exp : 0);
  const isExpired = expieryTime.diff(dayjs()) < 1;
  return isExpired;
};

const refreshTokens = async (refreshToken: string) => {
  const response = await authClient
    .post("identity/login/refresh", { refresh: refreshToken })
    .catch((error) => {
      throw error;
    });
  if (response.data.code === "token_not_valid") {
    logout();
    return null;
  }

  const newAuthTokens = {
    accessToken: response.data.access,
    refreshToken: response.data.refresh,
  };
  setTokens(newAuthTokens);
  return newAuthTokens;
};

const getTokens = () => {
  const authTokens = {
    accessToken: window.localStorage.getItem(localStorageKey),
    refreshToken: window.localStorage.getItem(localStorageKeyRefreshToken),
  };
  if (authTokens.accessToken === null || authTokens.refreshToken === null) {
    return null;
  }

  return authTokens as AuthTokens;
};

const setTokens = (authTokens: AuthTokens) => {
  window.localStorage.setItem(localStorageKey, authTokens.accessToken);
  window.localStorage.setItem(
    localStorageKeyRefreshToken,
    authTokens.refreshToken
  );
};

const handleUserResponse = ({
  id,
  email,
  name,
  avatar,
  grade,
  xp,
  accessToken,
  refreshToken,
}: LoginResponse) => {
  setTokens({ accessToken, refreshToken });
  return {
    id,
    email,
    name,
    avatar,
    grade,
    xp,
    accessToken,
    refreshToken,
  };
};

const login = ({ email, password }: LoginRegisterForm) => {
  return authClient
    .post("identity/login", { email, password })
    .then((res) => handleUserResponse(res.data));
  // return client("identity/login", { email, password }).then(handleUserResponse);
};
const register = ({ email, password }: LoginRegisterForm) => {
  return authClient
    .post("identity/register", { email, password })
    .then((res) => handleUserResponse(res.data));
};
/* const requestResetPassword = async ({ email }: { email: string }) => {
  return client<{ email: string }>("identity/user/password-reset", {
    email,
  });
}; */

const logout = async () => {
  const refreshToken = window.localStorage.getItem(localStorageKeyRefreshToken);
  if (refreshToken) {
    try {
      await authClient.post("identity/logout", { refresh: refreshToken });
    } catch (error) {
      console.error("We have to log you out please try to authenticate again.");
    }
  }
  window.localStorage.removeItem(localStorageKey);
  window.localStorage.removeItem(localStorageKeyRefreshToken);
};

export { getTokens, setTokens, login, logout, register, refreshTokens };
