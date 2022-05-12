import { ReactNode, useEffect, useState } from "react";
import { MdSchool } from "react-icons/md";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { api, AppwriteProfile } from "../api/api";
import { useAuth } from "../contexts/AuthContext";

function NewNavbar() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<AppwriteProfile>(null!);
  const [avatar, setAvatar] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.$id) {
      api.getProfile(user.$id).then((res) => setProfile(res.documents[0]));
    }
  }, [user]);

  useEffect(() => {
    if (profile != null && profile.avatarId != null) {
      api.getUserAvatar(profile.avatarId).then((res) => setAvatar(res));
    }
  }, [profile]);

  useEffect(() => {
    if (
      profile != null &&
      (profile.avatarId === "" || profile.avatarId === null) &&
      user
    ) {
      api.getUserAvatarInitials(user?.name).then((res) => setAvatar(res));
    }
  }, [profile]);

  const onLogout = () => {
    logout();
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
  return (
    <>
      <div className="navbar bg-black max-w-5xl mx-auto px-8">
        <div className="flex-1">
          <Logo />
        </div>
        <div className="flex-none">
          {user ? (
            <>
              <p className="mr-5 text-white">{user.name}</p>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={avatar} />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="profile" className="justify-between">
                      Profil
                    </Link>
                  </li>
                  <li>
                    <a>Einstellungen</a>
                  </li>
                  <li>
                    <a onClick={onLogout}>Logout</a>
                  </li>
                </ul>
              </div>{" "}
            </>
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
}

export default NewNavbar;
