import React, { useState } from "react";
import {
  AccountBookFilled,
  AppstoreOutlined,
  BookOutlined,
  GlobalOutlined,
  LaptopOutlined,
  MailOutlined,
  MobileOutlined,
  MutedOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  TabletOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import SearchComponent from "../Search/search";
import logo from "../../assets/logo3.svg";

const Header = () => {
  const items = [
    {
      label: <img src={logo} className="w-28 h-11" />,
      key: "logo",
      onClick: () => {
        navigate("/");
      },
    },
    {
      label: <SearchComponent style={{ backgroundColor: "#CC6600" }} />,
      key: "search",
    },
    {
      label: "Iphone",
      key: "iphone",
      icon: <MobileOutlined />,
      style: { color: "blue" },
    },
    {
      label: "Ipad",
      key: "ipad",
      icon: <TabletOutlined />,
      style: { color: "blue" },
    },
    {
      label: "Imac",
      key: "imac",
      icon: <LaptopOutlined />,
      style: { color: "blue" },
    },

    {
      label: "Airpods",
      key: "app",
      icon: <MutedOutlined />,
      style: { color: "blue" },
    },
    {
      label: "News",
      key: "news",
      icon: <GlobalOutlined />,
      style: { color: "blue" },
    },
    {
      label: "Cart",
      key: "cart",
      icon: <ShoppingCartOutlined />,
      style: { color: "blue" },
    },
    {
      label: "Account",
      key: "account",
      icon: <UserOutlined className="text-blue-900" />,
      style: { color: "blue" },
    },
    {
      label: (
        <Button
          onClick={() => {
            navigate("/login");
          }}
          className="text-blue-700"
        >
          Sign In
        </Button>
      ),
      key: "signin",
    },
    {
      label: (
        <Button
          onClick={() => {
            navigate("/register");
          }}
          className="text-blue-700"
        >
          Sign Up
        </Button>
      ),
      key: "signup",
    },
  ];
  const navigate = useNavigate();
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      style={{
        flex: 1,
        justifyContent: "center",
        fontSize: "20px",
      }}
    />
  );
};
export default Header;
