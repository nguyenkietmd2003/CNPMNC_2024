import React from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  SettingFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  // Hàm đăng xuất
  const Logout = () => {
    localStorage.removeItem("info"); // Xóa thông tin người dùng trong localStorage
    localStorage.removeItem("cart"); // Xóa giỏ hàng nếu có
    navigate("/"); // Chuyển hướng về trang chính
  };

  // Định nghĩa menu items
  const items = [
    {
      key: "user-management",
      icon: <UserOutlined />,
      label: <Link to="users">Quản lý người dùng</Link>,
    },
    {
      key: "product-management",
      icon: <AppstoreOutlined />,
      label: <Link to="products">Quản lý sản phẩm</Link>,
    },
    {
      key: "order-management",
      icon: <BarChartOutlined />,
      label: <Link to="order-management">Quản lý đơn hàng</Link>,
    },
    {
      key: "log-out",
      icon: <SettingFilled />,
      label: <Link onClick={Logout}>Đăng Xuất</Link>, // Gọi hàm Logout khi nhấp vào
    },
  ];

  return (
    <div style={{ display: "flex" }}>
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={["user-management"]}
        mode="inline"
        items={items} // Sử dụng items đã định nghĩa
      />
      <div style={{ flex: 1, padding: "16px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
