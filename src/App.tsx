import { Outlet, Route, Routes } from "react-router-dom";
import NewNavbar from "./components/NewNavbar";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import Classes from "./pages/Classes";
import Home from "./pages/Home";
import Lecture from "./pages/Lecture";
import Lectures from "./pages/Lectures";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="classes" element={<Classes />} />
            <Route path="classes/:classId" element={<Lectures />} />
            <Route path="lectures/:lectureId" element={<Lecture />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
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

export default App;
