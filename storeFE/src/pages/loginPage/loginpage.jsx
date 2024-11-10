import { Button, Checkbox, Form, Input, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/wrapContext.jsx";
import { loginAPI } from "../../util/api.js";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth, fetchCart } = useContext(AuthContext);

  const onFinish = async ({ email, password }) => {
    try {
      const result = await loginAPI(email, password);
      if (result.status === 200) {
        const userData = {
          id: result.message.data.id ?? 0,
          email: result.message.data.email ?? "",
          name: result.message.data.name ?? "",
          role: result.message.data.role ?? "",
        };

        localStorage.setItem("info", JSON.stringify(result.message));
        await setAuth({ isAuthenticated: true, user: userData });

        if (userData.role === "admin") {
          navigate("/admin");
        } else {
          await fetchCart();
          navigate("/");
          window.location.reload();
        }
      } else {
        notification.error({
          message: "Login failed",
          description: "Email or password incorrect",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      notification.error({
        message: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm onFinish={onFinish} />
    </div>
  );
};

const LoginForm = ({ onFinish }) => (
  <Form
    name="login"
    initialValues={{ remember: true }}
    style={{ maxWidth: 360 }}
    onFinish={onFinish}
  >
    <Form.Item
      name="email"
      rules={[{ required: true, message: "Please input your Email!" }]}
    >
      <Input prefix={<UserOutlined />} placeholder="Email" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[{ required: true, message: "Please input your Password!" }]}
    >
      <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
    </Form.Item>
    <Form.Item>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/forgot-password">Forgot password</Link>
      </div>
    </Form.Item>
    <Form.Item>
      <Button block type="primary" htmlType="submit">
        Log in
      </Button>
      <span style={{ marginLeft: 8 }}>or</span>{" "}
      <Link to="/register">Register now!</Link>
    </Form.Item>
  </Form>
);

export default LoginPage;
