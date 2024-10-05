import React from "react";
import {
  BankFilled,
  LockOutlined,
  MailFilled,
  PhoneFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Flex, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerAPI } from "../../util/api";
const RegisterPage = () => {
  const naviage = useNavigate();
  const onFinish = async (values) => {
    const { name, password, email, phone } = values;
    try {
      const result = await registerAPI(name, password, email, phone);
      if (result.status === 200) {
        notification.success({
          message: "Successfully registered",
          description: "You can now login to your account",
        });
        naviage("/login");
        return;
      }
      notification.error({
        message: "Error",
        description: "An error occurred",
      });
    } catch (error) {
      console.log(error);
    }
  };
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
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="name" />
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
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input prefix={<MailFilled />} type="email" placeholder="email" />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your Phone!",
            },
          ]}
        >
          <Input prefix={<PhoneFilled />} type="phone" placeholder="phone" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Register
          </Button>
          or{" "}
          <Link to={"/login"} className="text-blue-700 underline">
            Already have an account, login here
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default RegisterPage;
