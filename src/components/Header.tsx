import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import userImage from "../assets/images/user.png";
import logo from "../assets/images/logo.png";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import "../styles.css";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserContext();
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => setShowPopup((prev) => !prev);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "cs" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <header className={`header ${theme}`}>
      {/* User Info */}
      <div
        className="userInfo"
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={togglePopup}
      >
        <img src={user?.photo || userImage} alt="User" className="userPhoto" />
        <span style={{ marginLeft: "8px", fontWeight: "bold" }}>
          {user?.name || t("Guest")}
        </span>
      </div>

      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        className="logo"
        style={{ cursor: "pointer" }}
        onClick={togglePopup}
      />

      {/* Popup Box */}
      {showPopup && (
        <div className="popupBox">
          <button onClick={toggleTheme}>
            {t(theme === "light" ? "dark_mode" : "light_mode")}
          </button>
          <button onClick={toggleLanguage}>{t("CZ")}</button>
          <button onClick={handleLogout}>{t("logout")}</button>
        </div>
      )}
    </header>
  );
};

export default Header;
