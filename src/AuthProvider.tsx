import { User } from "./models/User";
import { config } from "./utils/config";
import dayjs from "dayjs";
import jwt_decode, { JwtPayload } from "jwt-decode";
import axios from "axios";

const localStorageKey = "__auth_provider_token__";
const localStorageKeyRefreshToken = "__auth_provider_refreshtoken__";
const API_BASE_URL = config.apiBaseUrl;

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface LoginResponse extends User {
  accessToken: string;
  refreshToken: string;
}
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
  const response = await fetch(`${API_AUTH_URL}/identity/login/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  })
    .then((res) => res.json())
    .catch((error) => {
      throw error;
    });
  if (response.code === "token_not_valid") {
    logout();
    return null;
  }

  const newAuthTokens = {
    accessToken: response.access,
    refreshToken: response.refresh,
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
  window.localStorage.setItem(localStorageKey, accessToken);
  window.localStorage.setItem(localStorageKeyRefreshToken, refreshToken);
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
  return client("identity/login", { email, password }).then(handleUserResponse);
};
const register = ({ email, password }: LoginRegisterForm) => {
  return client("identity/register", { email, password }).then(
    handleUserResponse
  );
};
const requestResetPassword = async ({ email }: { email: string }) => {
  return client<{ email: string }>("identity/user/password-reset", {
    email,
  });
};

const logout = async () => {
  const refreshToken = window.localStorage.getItem(localStorageKeyRefreshToken);
  if (refreshToken) {
    try {
      await client("identity/logout", { refresh: refreshToken });
    } catch (error) {
      console.error("We have to log you out please try to authenticate again.");
    }
  }
  window.localStorage.removeItem(localStorageKey);
  window.localStorage.removeItem(localStorageKeyRefreshToken);
};

const API_AUTH_URL = config.apiBaseUrl; // Define API_BASE_URL from .env

const client = <ClientData,>(
  endpoint: string,
  data?: ClientData,
  method?: string,
  token?: string
) => {
  const config = {
    method: method ? method : "POST",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  return window
    .fetch(`${API_AUTH_URL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 204) {
        return Promise.resolve();
      }
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return Promise.reject({
          message: data.message,
          statusCode: response.status,
        });
      }
    });
};

export {
  getTokens,
  setTokens,
  login,
  logout,
  register,
  localStorageKey,
  refreshTokens,
  requestResetPassword,
  localStorageKeyRefreshToken,
};
