import { useEffect } from "react";
import api from "../api/api";
import { User } from "../models/User";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  let { user } = useAuth();
  const createAccount = () => {
    api.createAccount("test@example.com", "12345678", "Test User");
  };

  const getAccount = async () =>
    await api
      .getAccount()
      .then((res) => (user = res))
      .catch((err) => console.log("FEHLER JUNGE!"));
  const createSession = async () =>
    (user = await api.createSession("test@example.com", "12345678"));
  const deleteSession = async () => (user = await api.deleteCurrentSession());

  const logUser = () => console.log(user);
  // @ts-ignore-next-line
  /* useEffect(() => {
    console.log(user);
  }, [user]); */

  return (
    <div>
      <button onClick={createAccount}>create Account</button>
      <br />
      <button onClick={getAccount}>get Account</button>
      <br />
      <button onClick={createSession}>create Session</button>
      <br />
      <button onClick={logUser}>log User</button>
      <br />
      <button onClick={deleteSession}>delete Session</button>
    </div>
  );
}

export default Home;
