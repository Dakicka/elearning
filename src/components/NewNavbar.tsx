import { ReactNode, useEffect, useState } from "react";
import { MdSchool } from "react-icons/md";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function NewNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };
  const Logo = () => (
    <div>
      <Link to="/" className="flex items-center py-5 px-2 text-gray-400">
        <MdSchool color="#3838F5" className="mr-4" size={25} />
        <span className="font-bold text-primary">Life Hackers</span>
      </Link>
    </div>
  );

  const MobileNavigationMenuItem: React.FC<{
    to: string;
    children: ReactNode;
    toggleMenu?: () => void;
  }> = ({ children, to, toggleMenu }) => {
    const activeClassNames =
      "block py-2 px-4 text-sm hover:bg-gray-700 text-secondary";
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

  return (
    <>
      <div className="navbar bg-black max-w-5xl mx-auto px-8">
        <div className="flex-1">
          <Logo />
        </div>
        <div className="flex-none">
          {/* Mobile button */}
          {user ? (
            <div className="flex items-center">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={`/server/${user.avatar}`}
                    onClick={() => setIsOpen(!isOpen)}
                  />
                </div>
              </label>
            </div>
          ) : (
            <MobileNavigationHamburgerButton
              toggleMenu={() => setIsOpen(!isOpen)}
            />
          )}
        </div>
      </div>
      {/* Mobile menu */}
      <div className={!isOpen ? "hidden" : "text-center max-w-5xl mx-auto"}>
        <div className="flex flex-col p-3 max-w-md mx-auto">
          {user && (
            <div>
              <MobileNavigationMenuItem
                to="/profile"
                toggleMenu={() => setIsOpen(false)}
              >
                Profil
              </MobileNavigationMenuItem>
              <MobileNavigationMenuItem
                to="/courses"
                toggleMenu={() => setIsOpen(false)}
              >
                Kurse
              </MobileNavigationMenuItem>
            </div>
          )}
          {user ? (
            <button
              onClick={() => onLogout()}
              className="px-3 bg-primary text-black font-bold rounded hover:bg-secondary transition duration-300 my-3"
            >
              Ausloggen
            </button>
          ) : (
            <div className="flex flex-col p-3">
              <NavLink
                onClick={() => setIsOpen(false)}
                to="/login"
                className="py-2 my-2 px-3 w-full bg-primary text-black font-bold rounded hover:bg-secondary transition duration-300"
              >
                Einloggen
              </NavLink>
              <Link
                onClick={() => setIsOpen(false)}
                to="/register"
                className="py-2  my-2 px-3 w-full bg-primary text-black font-bold rounded hover:bg-secondary transition duration-300"
              >
                Registrieren
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default NewNavbar;
