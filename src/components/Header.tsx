import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import userImage from "../assets/images/user.png";
import logo from "../assets/images/logo.png";
import "../styles.css";


const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserContext(); 
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => setShowPopup((prev) => !prev);

  const handleLogout = () => {
    logout(); 
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <header className="header">
     
      <div
        className="userInfo"
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={togglePopup} 
      >
        <img src={user?.photo || userImage} alt="User" className="userPhoto" />
        <span style={{ marginLeft: "8px", fontWeight: "bold" }}>
          {user?.name || "Guest"}
        </span>
      </div>

    
      {showPopup && (
        <div className="popupMenu">
          <button className="logoutButton" onClick={handleLogout}>
            Logout
          </button>
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
