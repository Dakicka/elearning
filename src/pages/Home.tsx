import { useAuth } from "../contexts/AuthContext";
import FullPageSpinner from "../components/FullPageSpinner";
import { Suspense } from "react";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { UnauthenticatedApp } from "./UnauthenticatedApp";

function Home() {
  const { user } = useAuth();

  return (
    <Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  );
}

export default Home;
