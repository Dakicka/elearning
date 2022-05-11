import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import NewNavbar from "./components/NewNavbar";
import { AuthProvider } from "./contexts/AuthContext";
import Classes from "./pages/Classes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="classes" element={<Classes />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function Layout() {
  return (
    <div>
      {/*   <Navbar /> */}
      <NewNavbar />
      <div className="bg-gray-100">
        <div className="max-w-5xl mx-auto bg-white min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
