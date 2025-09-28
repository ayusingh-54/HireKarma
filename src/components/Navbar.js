import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 shadow-xl fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-10 w-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
              <span className="text-white font-bold text-xl">HK</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              HireKarma
            </span>
          </Link>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-orange-300 text-2xl focus:outline-none transition-colors duration-200"
              aria-label="Toggle Menu"
            >
              ☰
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className="text-white hover:text-orange-300 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-orange-300 transition-colors duration-200 font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-red-300 transition-colors duration-200 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-orange-300 transition-colors duration-200 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-purple-700 to-indigo-800 shadow-xl border-t border-purple-500">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <Link
              to="/"
              onClick={toggleMenu}
              className="block text-white hover:text-orange-300 transition-colors duration-200 font-medium py-2"
            >
              Home
            </Link>
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={toggleMenu}
                  className="block text-white hover:text-orange-300 transition-colors duration-200 font-medium py-2"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="w-full text-left text-white hover:text-red-300 transition-colors duration-200 font-medium py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="block text-white hover:text-orange-300 transition-colors duration-200 font-medium py-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={toggleMenu}
                  className="block bg-gradient-to-r from-orange-500 to-pink-500 text-white text-center px-6 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg mt-4"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
