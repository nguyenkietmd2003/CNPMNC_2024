import React from "react";
import { Form, Input, Button, notification } from "antd";
import { forgotPassword, resetPassword, verifyCOde } from "../../util/api";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location?.state || "";
  console.log(email);
  const onFinish = async (values) => {
    try {
      const data = { email: email, password: values.password };
      console.log(data);
      const response = await resetPassword(data);
      if (response.status === 200) {
        notification.success({
          message: "reset Passs thành công",
          description: "Reset Success ",
        });
        navigate("/login");
      } else {
        notification.error({
          message: "Xác thực mã thất bại",
          description: "Mã đã hết hạn hoặc không đúng. Vui lòng thử lại.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Gửi email thất bại",
        description: "Có lỗi xảy ra. Vui lòng thử lại sau.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Form
        name="forgot-password"
        onFinish={onFinish}
        style={{ maxWidth: 400 }}
      >
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input placeholder="Nhập mật khẩu mới " />
        </Form.Item>
        {/* <Form.Item
          name="newpassword"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { type: "password", message: "mat khau không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập lại mật khẩu mới " />
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" block htmlType="submit">
            Gửi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPasswordPage;
