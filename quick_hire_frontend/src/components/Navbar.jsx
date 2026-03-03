import React, { useContext, useState } from "react";
import headerLogo from "../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import useAdmin from "../hooks/useAdmin";
import Swal from "sweetalert2";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire("Success", "Logged out successfully!", "success");
        navigate("/login");
      })
      .catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/jobs"
          onClick={() => setIsMenuOpen(false)}
          className={({ isActive }) =>
            isActive ? "text-[#4F46E5]" : "hover:text-[#4F46E5] transition"
          }
        >
          Find Jobs
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/browse-companies"
          onClick={() => setIsMenuOpen(false)}
          className={({ isActive }) =>
            isActive ? "text-[#4F46E5]" : "hover:text-[#4F46E5] transition"
          }
        >
          Browse Companies
        </NavLink>
      </li>
      {user && isAdmin && (
        <li>
          <NavLink
            to="/admin"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-red-600 font-extrabold"
                : "hover:text-red-500 transition"
            }
          >
            Admin View
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="pt-6 pb-4 bg-[#F8FAFD] sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10 lg:gap-14">
            <Link to={"/"} className="flex items-center gap-2">
              <img src={headerLogo} alt="Logo" className="w-[38px]" />
              <div className="font-extrabold tracking-tight text-[26px] text-[#1E293B] logo">
                QuickHire
              </div>
            </Link>
            <nav className="hidden lg:block mt-1">
              <ul className="flex items-center gap-8 font-semibold text-[15px] text-[#64748B]">
                {navLinks}
              </ul>
            </nav>
          </div>

          <div className="header-btns flex items-center gap-4 lg:gap-8">
            <div className="hidden md:flex items-center gap-8">
              {user ? (
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-[38px] h-[38px] rounded-full overflow-hidden border-2 border-[#4F46E5]">
                      <img
                        src={
                          user.photoURL ||
                          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                        alt="User avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-bold text-[15px] hidden lg:block text-[#1E293B]">
                      {user.displayName || user.email?.split("@")[0]}
                    </span>
                  </div>
                  <button onClick={handleLogout} className="btn btn-error">
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[#4F46E5] font-bold text-[15px] hover:text-[#3730A3] transition"
                  >
                    Login
                  </Link>
                  <Link to="/sign-up">
                    <button className="bg-[#4F46E5] hover:bg-[#3730A3] text-white px-7 py-2.5 rounded-[4px] font-bold text-[15px] shadow-sm transition">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-[#1E293B] text-3xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <ul className="flex flex-col gap-4 font-semibold text-[16px] text-[#64748B]">
              {navLinks}
              <hr className="border-gray-200" />
              {user ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        user.photoURL ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-bold text-[#1E293B]">
                      {user.displayName || user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn btn-error w-full"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn btn-outline border-[#4F46E5] text-[#4F46E5] w-full"
                  >
                    Login
                  </Link>
                  <Link
                    to="/sign-up"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn bg-[#4F46E5] text-white w-full border-none"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
