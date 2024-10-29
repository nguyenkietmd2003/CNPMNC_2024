//
import { Button, Checkbox, Form, Input, Flex, notification } from "antd";
import { loginAPI } from "../../util/api.js";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/wrapContext.jsx";

//
const LoginPage = () => {
  //
  const navigate = useNavigate();
  const { auth, setAuth, fetchCart, setCart } = useContext(AuthContext);

  const onFinish = async (data) => {
    try {
      const result = await loginAPI(data.email, data.password);
      console.log(">> check result", result);

      if (result.status === 200) {
        const userData = {
          id: result.message.data.id ?? 0,
          email: result.message.data.email ?? "",
          name: result.message.data.name ?? "",
          role: result.message.data.role ?? "",
        };

        console.log("User Data:", userData); // In ra userData để kiểm tra
        console.log("User Role:", userData.role); // In ra vai trò để kiểm tra

        localStorage.setItem("info", JSON.stringify(result.message));
        await setAuth({
          isAuthenticated: true,
          user: userData,
        });

        if (userData.role === "admin") {
          navigate("/admin");
        } else {
          await fetchCart();
          navigate("/");
          window.location.reload();
        }

        return;
      }

      notification.error({
        message: "Login failed",
        description: "Email or password incorrect",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //
  return (
    <div className="flex justify-center items-center h-screen">
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 360,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Link to={"/forgot-password"}>Forgot password</Link>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or <Link to="/register">Register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginPage;
