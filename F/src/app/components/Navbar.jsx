import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User as UserIcon, LogOut } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  const navLinks = user
    ? [
        { name: "Dashboard", path: "/dashboard" },
        { name: "My Rides", path: "/history" },
      ]
    : [
        { name: "Features", path: "/#features" },
        { name: "Driver Partner", path: "/driver-register" },
      ];

  return (
    <nav className="bg-gradient-to-t from-black to-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              U<span className="text-blue-500">Cab</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm font-medium">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <div className="border-t border-gray-700 mt-2 pt-2">
                  <div className="flex items-center px-3 py-2">
                    <div className="flex-shrink-0">
                      <UserIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-gray-400">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="mt-2 w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-gray-800"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-gray-700 mt-2 pt-2 space-y-1">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center px-4 py-2 mt-2 text-base font-medium text-black bg-white rounded-md hover:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
