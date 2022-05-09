import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import * as auth from "../AuthProvider";
import { User } from "../models/User";
import FullPageSpinner from "../components/FullPageSpinner";
import FullPageErrorFallback from "../components/FullPageErrorFallback";
import { useAsync } from "../hooks/useAsync";
import api from "../api/api";

// TODO: Add session to auth context

interface AuthContextType {
  user: User | null;
  login: (form: { email: string; password: string }) => Promise<any>;
  signup: (form: {
    email: string;
    password: string;
    name: string;
  }) => Promise<any>;
  logout: () => void;
}

const bootstrapAppData = async () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  let user: User = null!;

  const userToken = await auth.getToken();
  if (userToken && userToken != "[]") {
    const data = await api
      .getAccount()
      .then((res) => (user = res))
      .catch(() => {});
    user = data;
  }
  return user;
};

let AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = (props: { children: ReactNode }) => {
  const {
    state: { data: user },
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync<User>();

  // Get user data when initialize
  useEffect(() => {
    const appDataPromise = bootstrapAppData();
    run(appDataPromise);
  }, [run]);

  const login = useCallback(
    (form: auth.LoginForm) =>
      // login user (create session)
      auth.login(form).then(() => {
        // get user data
        api.getAccount().then((res) => setData(res));
      }),
    [setData]
  );
  const signup = useCallback(
    (form: auth.SignupForm) => auth.signup(form).then((user) => setData(user)),
    [setData]
  );

  const logout = useCallback(() => {
    auth.logout();
    setData(null!);
  }, [setData]);

  const value = useMemo(
    () => ({ user, login, logout, signup }),
    [signup, login, logout, user]
  );
  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />;
  }

  throw new Error(`Unhandled status: ${status}`);
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

export { AuthProvider, useAuth };
