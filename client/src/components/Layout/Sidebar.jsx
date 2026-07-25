import {
  LayoutDashboard,
  Users,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  const menu = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      title: "Leads",
      icon: <Users size={20} />,
      path: "/dashboard/leads",
    },
  ];

  return (
    <aside className="w-72 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col shadow-2xl">

      {/* Logo */}

      <div className="border-b border-slate-700/50 p-8">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-2xl font-bold shadow-lg">
            DH
          </div>

          <div>

            <h1 className="text-xl font-bold">
              Digital Heroes
            </h1>

            <p className="text-sm text-slate-400">
              CRM Dashboard
            </p>

          </div>

        </div>

      </div>

      {/* Menu */}

      <nav className="flex-1 px-5 py-6">

        <p className="mb-4 px-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Main Menu
        </p>

        {menu.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `group mb-3 flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <div className="transition-transform duration-300 group-hover:scale-110">
              {item.icon}
            </div>

            <span className="font-medium tracking-wide">
              {item.title}
            </span>
          </NavLink>
        ))}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-700/50 p-5">

        <div className="mb-5 rounded-2xl bg-slate-800 p-4">

          <p className="text-xs uppercase tracking-widest text-slate-400">
            Workspace
          </p>

          <h3 className="mt-2 font-semibold">
            Digital Heroes
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Manage your leads efficiently.
          </p>

        </div>

        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-500 px-5 py-3 font-medium transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;