import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  function Layout() {
    return (
      <div>
        <Navbar />

        <Outlet />
      </div>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
    </Routes>
  );
}

export default App;
