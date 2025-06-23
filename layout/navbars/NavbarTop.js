"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import {
  IoPersonOutline,
  IoMenuOutline,
  IoLogOutOutline,
  IoKeyOutline,
} from "react-icons/io5";

const NavbarTop = ({ onSidebarToggle }) => {
  const profileMenuRef = useRef(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleSideNav = () => {
    onSidebarToggle((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target)
    ) {
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-right">
            <div className="expandIcon" onClick={toggleSideNav}>
              <IoMenuOutline size={24} color="black" />
            </div>
            <h4 className="sidebar-logo">Kataria CRM</h4>
          </div>
          <div className="nav-right">
            {/* {userInfo && ( */}
            <div className="userName">
              GLOBALVOX
              {/* {userInfo?.firstName} {userInfo?.lastName} */}
            </div>
            {/* )} */}
            <div
              className={`profileIcon ${isProfileMenuOpen ? "active" : ""}`}
              onClick={toggleProfileMenu}
            >
              <FaUser size={18} color="black" />
            </div>
          </div>

          {isProfileMenuOpen && (
            <div className="profileMenuDiv" ref={profileMenuRef}>
              <ul>
                <li>
                  <IoPersonOutline className="profile-menu-icon" />
                  Super Admin
                </li>
                <li>
                  <IoKeyOutline className="profile-menu-icon" />
                  Reset Password
                </li>
                <li>
                  <IoLogOutOutline className="profile-menu-icon" />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavbarTop;
