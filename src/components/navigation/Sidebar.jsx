import Logo from "../../assets/images/Logo.png";
import { House, Telescope, Repeat2, UserRound, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const linkBase =
    "w-full flex flex-col items-center justify-center gap-1 py-3 rounded-2xl transition";

  const activeGlow = "bg-orange-400/40 shadow-[0_0_25px_rgba(255,106,43,0.55)]";
  const hoverSoft = "hover:bg-black/5";

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-24 bg-[#F5EAD7] flex flex-col items-center py-6 h-screen">
      {/* Logo */}
      <img src={Logo} alt="Bookies Logo" className="w-12 h-12 mb-6 mt-4" />

      {/* User info */}
      {user && (
        <div className="flex flex-col items-center mb-8">
          <div className="w-15 h-15 rounded-2xl border-2 border-black overflow-hidden bg-[#FFD9A0] flex items-center justify-center text-2xl font-bold">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            user.name?.charAt(0) || "U"
          )}
        </div>
          <span className="text-[11px] font-semibold text-black mt-1 text-center px-2">
            {user.name}
          </span>
        </div>
      )}

      {/* Links */}
      <nav className="flex flex-col gap-4 w-full px-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? activeGlow : hoverSoft}`
          }
        >
          <House size={26} className="text-black" />
          <span className="text-[11px] font-semibold text-black">Home</span>
        </NavLink>

        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? activeGlow : hoverSoft}`
          }
        >
          <Telescope size={26} className="text-black" />
          <span className="text-[11px] font-semibold text-black">Explore</span>
        </NavLink>

        <NavLink
          to="/exchange"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? activeGlow : hoverSoft}`
          }
        >
          <Repeat2 size={26} className="text-black" />
          <span className="text-[11px] font-semibold text-black">Exchange</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? activeGlow : hoverSoft}`
          }
        >
          <UserRound size={26} className="text-black" />
          <span className="text-[11px] font-semibold text-black">Profile</span>
        </NavLink>
      </nav>

      {/* Bottom Logout */}
      <div className="mt-auto mb-12 w-full px-3">
        <button onClick={handleLogout} className={`${linkBase} ${hoverSoft}`}>
          <LogOut size={24} className="text-black" />
          <span className="text-[11px] font-semibold text-black">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
