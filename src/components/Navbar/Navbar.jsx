import React, { useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { ThemeContext } from "../../context/ThemContext";

const Navbar = ({ setShowLoginPopup }) => {
  const [menu, setMenu] = useState("home");
  const clearMenu = () => setMenu("");

  const { getTotalCartAmount } = useContext(StoreContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="navbar">
      <Link to="/" onClick={() => setMenu("home")} className="navbar-logo">
        <h2>TasteTrek</h2>
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          {" "}
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link onClick={() => clearMenu()} to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <button
          className="sign-in-btn"
          onClick={() => {
            setShowLoginPopup(true);
            clearMenu();
          }}
        >
          sign in
        </button>
        <div className="dark-mode-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
