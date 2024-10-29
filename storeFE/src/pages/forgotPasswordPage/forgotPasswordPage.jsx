import React from "react";
import { Form, Input, Button, notification } from "antd";
import { forgotPassword } from "../../util/api";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    // Thực hiện logic gửi email ở đây
    try {
      //   Giả sử bạn có API để gửi email
      const response = await forgotPassword(values.email);
      if (response.status === 200) {
        notification.success({
          message: "Gửi email thành công",
          description:
            "Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn.",
        });
        navigate("/verify-password", {
          state: { email: values.email },
        });
      } else {
        notification.error({
          message: "Gửi email thất bại",
          description: "Có lỗi xảy ra. Vui lòng thử lại sau.",
        });
      }
      // Nếu gửi thành công, hiển thị thông báo thành công
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
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email của bạn!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập email của bạn" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" block htmlType="submit">
            Gửi email
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPasswordPage;
