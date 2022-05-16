import React, { ReactNode, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdSchool } from "react-icons/md";
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
    const activeClassNames = "py-5 px-3 text-white hover:text-secondary";
    const inActiveClassNames = "py-5 px-3 text-gray-200 hover:text-secondary";
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
        <MdSchool color="#3838F5" className="mr-4" size={25} />
        <span className="font-bold text-primary">Life Hackers</span>
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
                  <NavigationMenuItem to="/profile">Profil</NavigationMenuItem>
                  <NavigationMenuItem to="/classes">Kurse</NavigationMenuItem>
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
                    className="py-2 px-3 bg-primary text-black font-bold rounded hover:bg-secondary transition duration-300"
                  >
                    Signup
                  </Link>
                </div>
              ) : (
                <>
                  <div className="text-white">Hi, {user.name} </div>
                  <button
                    onClick={() => onLogout()}
                    className="px-3 bg-primary text-black font-bold rounded hover:bg-secondary transition duration-300 h-8"
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
        <div className={!isOpen ? "hidden" : "text-center"}>
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
                className="px-3 bg-primary text-black font-bold rounded hover:bg-secondary transition duration-300 my-3"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col p-3">
                <NavLink
                  to="/login"
                  className="py-2 my-2 px-3 w-full bg-primary text-black font-bold rounded hover:bg-secondary transition duration-300"
                >
                  Login
                </NavLink>
                <Link
                  to="/signup"
                  className="py-2  my-2 px-3 w-full bg-primary text-black font-bold rounded hover:bg-secondary transition duration-300"
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
