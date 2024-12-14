import React from "react";
import { useNavigate } from "react-router-dom";
import userImage from "../assets/images/user.png";
import logo from "../assets/images/logo.png";
import "../styles.css";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="userInfo">
        <img src={userImage} alt="User" className="userPhoto" />
        <span>Hana Radová</span>
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
