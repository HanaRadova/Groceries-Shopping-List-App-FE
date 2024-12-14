import React from "react";
import { useNavigate } from "react-router-dom";
import userImage from "../assets/images/user.png";
import enFlag from "../assets/images/EN.png";
import deFlag from "../assets/images/DE.png";
import logo from "../assets/images/logo.png";
import { useLanguage } from "../context/LanguageContext";
import "../styles.css";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();

  return (
    <header className="header">
      <div className="userInfo">
        <img src={userImage} alt="User" className="userPhoto" />
        <span>Hana Radová</span>
      </div>
      <div className="languageSwitch">
        <img
          src={enFlag}
          alt="EN"
          className={`flag ${language === "en" ? "selected" : ""}`}
          onClick={() => toggleLanguage("en")}
        />
        <img
          src={deFlag}
          alt="DE"
          className={`flag ${language === "de" ? "selected" : ""}`}
          onClick={() => toggleLanguage("de")}
        />
      </div>
      <img
        src={logo}
        alt="Logo"
        className="logo"
        onClick={() => navigate("/")}
      />
    </header>
  );
};

export default Header;
