"use client";

import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { HiLogout, HiMenuAlt1 } from "react-icons/hi";
import {
  MdDashboard,
  MdNotifications,
  MdPassword,
  MdSettings,
} from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import useAuth from "../hooks/useAuth";

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { logOut, user } = useAuth();
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex bg-gray-900 min-h-screen">
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-[90] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleSidebarToggle={handleSidebarToggle}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="bg-gray-800 border-b border-gray-700 w-full flex justify-between items-center fixed top-0 left-0 z-[100] h-16 px-4 shadow-lg">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-gray-300 hover:bg-gray-700 p-2 rounded-lg transition-colors"
              onClick={handleSidebarToggle}
              aria-label="Toggle sidebar"
            >
              <HiMenuAlt1 className="w-6 h-6" />
            </button>
            <div className="hidden md:flex items-center">
              <MdDashboard className="text-blue-400 w-5 h-5 mr-2" />
              <h1 className="text-white font-semibold text-lg">
                Admin Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Settings */}
            <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors">
              <MdSettings className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors">
              <MdNotifications className="w-5 h-5" />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>

            {/* User Dropdown */}
            <div className="relative dropdown-container">
              <button
                className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              >
                <div className="avatar">
                  <div className="w-9 h-9 rounded-full ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-800">
                    <img
                      src={user?.imageUrl || user?.photoURL}
                      alt="avatar"
                      className="object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-white">
                    Admin {user?.name || user?.displayName}
                  </p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-800 shadow-xl rounded-lg overflow-hidden z-50 border border-gray-700 animate-fadeIn">
                  <div className="p-3 border-b border-gray-700 bg-gray-750">
                    <p className="text-sm font-medium text-white">
                      Admin {user?.name}
                    </p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                  </div>
                  <ul>
                    <li>
                      <Link
                        to="/admin-dashboard/my-profile"
                        className="p-3 flex items-center gap-3 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                        onClick={() => {
                          handleMenuClick();
                          setDropdownOpen(false);
                        }}
                      >
                        <CgProfile className="w-5 h-5 text-blue-400" />
                        <span>My Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin-dashboard/change-password"
                        className="p-3 flex items-center gap-3 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                        onClick={() => {
                          handleMenuClick();
                          setDropdownOpen(false);
                        }}
                      >
                        <MdPassword className="w-5 h-5 text-blue-400" />
                        <span>Change Password</span>
                      </Link>
                    </li>
                    <li className="border-t border-gray-700">
                      <button
                        onClick={logOut}
                        className="w-full p-3 flex items-center gap-3 hover:bg-red-600 text-red-400 hover:text-white font-medium transition-colors"
                      >
                        <HiLogout className="w-5 h-5" />
                        <span>Sign Out</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 pt-16 lg:ml-64 transition-all duration-300 ease-in-out bg-white">
          {/* Page Content */}
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl border border-indigo-700 min-h-[calc(100vh-8rem)]">
              <div className="p-6">
                <Outlet />
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-auto py-4 px-6 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>
              © {new Date().getFullYear()} Admin Dashboard - Built with CARE ❤️
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
