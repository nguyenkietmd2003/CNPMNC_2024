//
import { Button, Checkbox, Form, Input, Flex, notification } from "antd";
import { getAllUser, loginAPI } from "../../util/api.js";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

//
const LoginPage = () => {
  //
  const navigate = useNavigate();

  const onFinish = async (data) => {
    console.log(">>> data from login ", data);
    try {
      const result = await loginAPI(data.email, data.password);
      console.log(">> check result", result);
      if (result.status === 200) {
        notification.success({
          message: "Login successful",
          description: "You have logged in successfully.",
        });
        navigate("/");
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
            <a href="">Forgot password</a>
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
