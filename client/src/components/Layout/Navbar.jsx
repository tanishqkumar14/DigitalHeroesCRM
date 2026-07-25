import {
  Search,
  Bell,
  CalendarDays,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import {
  getNotifications,
  markAllAsRead,
} from "../../services/notification";

const Navbar = () => {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = notifications.filter(
    (n) => !n.isRead
  ).length;

  const handleMarkAll = async () => {
    try {
      await markAllAsRead();
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="flex items-center justify-between rounded-3xl border border-gray-200 bg-white px-8 py-5 shadow-sm">

      {/* Left */}

      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back,
          <span className="ml-2 text-blue-600">
            {user?.name || "Admin"} 👋
          </span>
        </h1>

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays size={16} />
          {today}
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="relative hidden md:block">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none transition-all focus:border-blue-500 focus:bg-white"
          />

        </div>

        {/* Notification */}

        <div className="relative">

          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-2xl bg-gray-100 p-3 transition hover:bg-blue-50"
          >

            <Bell
              size={22}
              className="text-gray-700"
            />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                {unreadCount}
              </span>
            )}

          </button>

          {showNotifications && (

            <div className="absolute right-0 mt-3 w-96 rounded-2xl border border-gray-200 bg-white shadow-xl z-50">

              <div className="flex items-center justify-between border-b p-4">

                <h3 className="font-bold text-lg">
                  Notifications
                </h3>

                {notifications.length > 0 && (
                  <button
                    onClick={handleMarkAll}
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    Mark all as read
                  </button>
                )}

              </div>

              <div className="max-h-96 overflow-y-auto">

                {notifications.length === 0 ? (

                  <div className="p-6 text-center text-gray-500">
                    No notifications
                  </div>

                ) : (

                  notifications.map((item) => (

                    <div
                      key={item._id}
                      className={`border-b p-4 ${
                        item.isRead
                          ? "bg-white"
                          : "bg-blue-50"
                      }`}
                    >

                      <p className="font-medium text-gray-800">
                        {item.message}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>

                    </div>

                  ))

                )}

              </div>

            </div>

          )}

        </div>

        {/* User */}

        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-lg font-bold text-white">
            {(user?.name || "A")
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <div className="hidden sm:block">

            <p className="font-semibold text-gray-800">
              {user?.name || "Admin"}
            </p>

            <p className="text-sm text-gray-500">
              {user?.role === "admin"
                ? "Administrator"
                : "Member"}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;