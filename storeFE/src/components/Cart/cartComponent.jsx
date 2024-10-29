import React, { useContext, useEffect } from "react";
import { Avatar, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/wrapContext";
const CartComponent = () => {
  const cartt = JSON.parse(localStorage.getItem("cart")) || 0;
  const { auth, cart } = useContext(AuthContext);
  const idUser = auth?.user?.id;
  return (
    <div className="flex ">
      <Link to={`/cart/${idUser}`}>
        <Badge count={cartt}>
          <ShoppingCartOutlined
            shape="square"
            size="large"
            style={{ fontSize: "40px" }}
          />
        </Badge>
      </Link>
    </div>
  );
};
export default CartComponent;
