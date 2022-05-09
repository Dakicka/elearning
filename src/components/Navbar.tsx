import React, { ReactNode, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const MobileNavigationMenuItem: React.FC<{
    to: string;
    children: ReactNode;
    toggleMenu?: () => void;
  }> = ({ children, to, toggleMenu }) => {
    const activeClassNames =
      "block py-2 px-4 text-sm hover:bg-gray-700 text-green-600";
    const inActiveClassNames =
      "block py-2 px-4 text-sm hover:bg-gray-700 text-gray-200";
    return (
      <NavLink
        to={to}
        onClick={toggleMenu}
        className={({ isActive }) =>
          isActive ? activeClassNames : inActiveClassNames
        }
      >
        {children}
      </NavLink>
    );
  };

  const MobileNavigationHamburgerButton: React.FC<{
    toggleMenu: () => void;
  }> = ({ toggleMenu }) => (
    <button onClick={toggleMenu}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );

  const NavigationMenuItem: React.FC<{
    to: string;
    children: ReactNode;
  }> = ({ children, to }) => {
    const activeClassNames = "py-5 px-3 text-green-600 hover:text-green-600";
    const inActiveClassNames = "py-5 px-3 text-gray-200 hover:text-green-600";
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? activeClassNames : inActiveClassNames
        }
      >
        {children}
      </NavLink>
    );
  };

  const Logo = () => (
    <div>
      <Link to="/" className="flex items-center py-5 px-2 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-1 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="font-bold text-green-600">Life Hackers</span>
      </Link>
    </div>
  );
  const onLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <nav className="bg-black">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              {/* Logo */}
              <Logo />
              {/* primary nav */}
              {user && (
                <div className="hidden md:flex items-center space-x-1 ">
                  <NavigationMenuItem to="/transactions">
                    Transactions
                  </NavigationMenuItem>
                  <NavigationMenuItem to="/tradehistory">
                    Trade History
                  </NavigationMenuItem>
                </div>
              )}
            </div>
            {/* secondary nav */}
            <div className="hidden md:flex items-center space-x-1">
              {!user ? (
                <div>
                  <NavigationMenuItem to="login">Login</NavigationMenuItem>

                  {/* TODO: Abstract into button component */}
                  <Link
                    to="/signup"
                    className="py-2 px-3 bg-primary text-black font-bold rounded hover:bg-green-600 transition duration-300"
                  >
                    Signup
                  </Link>
                </div>
              ) : (
                <>
                  <div className="text-white">Hi, {user.name} </div>
                  <button
                    onClick={() => onLogout()}
                    className="px-3 bg-primary text-black font-bold rounded hover:bg-green-600 transition duration-300 h-8"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile button */}
            <div className="md:hidden flex items-center">
              <MobileNavigationHamburgerButton
                toggleMenu={() => setIsOpen(!isOpen)}
              />
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <div className={!isOpen ? "hidden" : "md:hidden text-center"}>
          <div className="flex flex-col p-3">
            {user && (
              <div>
                <MobileNavigationMenuItem
                  to="/transactions"
                  toggleMenu={() => setIsOpen(false)}
                >
                  Transactions
                </MobileNavigationMenuItem>
                <MobileNavigationMenuItem
                  to="/tradehistory"
                  toggleMenu={() => setIsOpen(false)}
                >
                  Trade History
                </MobileNavigationMenuItem>
              </div>
            )}
            {user ? (
              <button
                onClick={() => onLogout()}
                className="px-3 bg-primary text-black font-bold rounded hover:bg-green-600 transition duration-300 my-3"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col p-3">
                <NavLink
                  to="/login"
                  className="py-2 my-2 px-3 w-full bg-primary text-black font-bold rounded hover:bg-green-600 transition duration-300"
                >
                  Login
                </NavLink>
                <Link
                  to="/signup"
                  className="py-2  my-2 px-3 w-full bg-primary text-black font-bold rounded hover:bg-green-600 transition duration-300"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
