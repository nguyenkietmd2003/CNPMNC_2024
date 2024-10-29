import React, { useContext } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { AuthContext } from "../../context/wrapContext";
import { useNavigate } from "react-router-dom";
import { getInfo } from "../../util/api";

const CategoryDropDownComponent = ({ style }) => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("info"));
  const logOut = () => {
    localStorage.removeItem("info");
    localStorage.removeItem("cart");
    setAuth({
      isAuthenticated: false,
      user: {
        id: 0,
        email: "",
        name: "",
      },
    });

    navigate("/");
  };

  const showInfo = async () => {
    const user = JSON.parse(localStorage.getItem("info"));
    try {
      navigate("/account");
    } catch (error) {}
  };
  // Hàm xử lý menu click
  const handleMenuClick = (key) => {
    switch (key) {
      case "profile":
        showInfo();
        break;
      case "settings":
        navigate("/settings");
        break;
      case "logout":
        logOut();
        break;
      default:
        break;
    }
  };

  const items = (handleMenuClick) => {
    let menuItems = [
      {
        key: "1",
        label: `Menu`,
        disabled: true,
      },
      {
        type: "divider",
      },
      {
        key: "2",
        label: "Profile",
        onClick: () => handleMenuClick("profile"),
      },
      {
        key: "3",
        label: "Settings",
        onClick: () => handleMenuClick("settings"),
      },
      {
        type: "divider",
      },
    ];

    // Nếu người dùng đã đăng nhập, thêm mục "Logout"
    if (auth.isAuthenticated) {
      menuItems.push({
        key: "4",
        label: "Logout",
        onClick: () => handleMenuClick("logout"),
      });
    }

    return menuItems;
  };
  const userr = JSON.parse(localStorage.getItem("info"));
  return (
    <Dropdown
      menu={{
        items: items(handleMenuClick),
      }}
      overlayStyle={{ ...style }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <UserOutlined />
          {auth.isAuthenticated && userr
            ? `Xin Chào, ${user?.data?.name}`
            : "Xin chào, Khách"}
        </Space>
      </a>
    </Dropdown>
  );
};

export default CategoryDropDownComponent;
