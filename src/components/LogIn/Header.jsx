// src/components/Header.jsx
import React from "react";
import logo from "../../assets/Logo.png";

const Header = () => {
  return (
    <img src={logo} alt="Logo" style={{ maxWidth: "50%", maxHeight: "35%" }} />
  );
};

export default Header;
