import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import NewNavbar from "./components/NewNavbar";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import Lecture from "./pages/Lecture";
import Lectures from "./pages/Lectures";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import FullPageError404 from "./components/FullPageError404";
import FullPageErrorFallback from "./components/FullPageErrorFallback";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: true,
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="register" element={<Signup />} />
              <Route path="login" element={<Login />} />
              {/* Private routes */}
              <Route
                path="courses"
                element={
                  <RequireAuth>
                    <Courses />
                  </RequireAuth>
                }
              />
              <Route
                path="courses/:courseId"
                element={
                  <RequireAuth>
                    <Lectures />
                  </RequireAuth>
                }
              />
              <Route
                path="lectures/:lectureId"
                element={
                  <RequireAuth>
                    <Lecture />
                  </RequireAuth>
                }
              />
              <Route
                path="profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
            </Route>
            {/* Error Routes */}
            <Route path="*" element={<FullPageError404 />} />
            <Route
              path="error"
              element={
                <FullPageErrorFallback error={Error("Test error message")} />
              }
            />
          </Routes>
        </BrowserRouter>
        {/*  <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </AuthProvider>
  );
}

function Layout() {
  return (
    <div>
      {/*   <Navbar /> */}
      <NewNavbar />
      <div className="bg-gray-100">
        <div className="max-w-5xl mx-auto bg-black min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default App;
