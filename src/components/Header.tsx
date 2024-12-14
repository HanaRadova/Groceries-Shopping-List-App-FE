import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import userImage from "../assets/images/user.png";
import logo from "../assets/images/logo.png";
import "../styles.css";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserContext(); // Access user and logout from context
  const [showPopup, setShowPopup] = useState(false); // Popup visibility state

  const handleProfileClick = () => {
    setShowPopup(!showPopup); // Toggle popup visibility
  };

  return (
    <header className="header">
      <div className="userInfo" onClick={handleProfileClick} style={{ cursor: "pointer" }}>
        <img src={user?.photo || userImage} alt="User" className="userPhoto" />
        <span>{user ? user.name : "Guest"}</span>
      </div>
      {showPopup && (
        <div className="popupMenu">
          <ul>
            <li onClick={() => navigate("/profile")}>Profile Details</li>
            <li onClick={logout}>Log Out</li>
          </ul>
        </div>
      )}
      <img
        src={logo}
        alt="Logo"
        className="logo"
        onClick={() => navigate("/main-page")}
      />
    </header>
  );
};

export default Header;
