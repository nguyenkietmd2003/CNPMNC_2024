import React, { useState, useContext, useEffect } from "react";
import "./Header.css"; // Import CSS
import { AuthContext } from "../../context/wrapContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { auth, setAuth } = useContext(AuthContext); // Lấy thông tin auth từ context
  const [current, setCurrent] = useState("iphone");
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="logo">
        <img
          src="https://bizweb.dktcdn.net/100/401/951/themes/927635/assets/logo.png?1726647372356"
          alt="Logo"
          onClick={() => navigate("/")} // Nếu cần điều hướng về trang chủ
        />
      </div>
      <div className="nav">
        <ul className="menu">
          <li
            className={`menu-item `}
            onClick={() => {
              navigate("/iphone");
            }}
          >
            Iphone
          </li>
          <li
            className={`menu-item `}
            onClick={() => {
              navigate("/ipad");
            }}
          >
            Ipad
          </li>
          <li
            className={`menu-item `}
            onClick={() => {
              navigate("/imac");
            }}
          >
            Imac
          </li>
          <li
            className={`menu-item `}
            onClick={() => {
              navigate("/airpods");
            }}
          >
            Airpods
          </li>
          <li
            className={`menu-item `}
            onClick={() => {
              navigate("/news");
            }}
          >
            News
          </li>
        </ul>
      </div>
      <div className="account">
        {auth.isAuthenticated ? (
          <></>
        ) : (
          <>
            <span className="menu-item" onClick={() => navigate("/login")}>
              Login
            </span>
            <span className="menu-item" onClick={() => navigate("/register")}>
              Register
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
