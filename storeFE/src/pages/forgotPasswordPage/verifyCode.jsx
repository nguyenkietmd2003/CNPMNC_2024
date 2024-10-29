import React from "react";
import { Form, Input, Button, notification } from "antd";
import { forgotPassword, verifyCOde } from "../../util/api";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyCodePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location?.state || "";
  console.log(email);
  const onFinish = async (values) => {
    try {
      const data = { email: email, code: values.code };
      console.log(data);
      const response = await verifyCOde(data);
      if (response.status === 200) {
        notification.success({
          message: "Xác Thực thành công",
          description: "Vui lòng đặt lại mật khẩu",
        });
        console.log(response);
        navigate("/reset-password", {
          state: { email: email },
        });
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
          name="code"
          rules={[{ required: true, message: "Vui lòng nhập code của bạn!" }]}
        >
          <Input placeholder="Nhập mã xác thực " />
        </Form.Item>

        <Form.Item>
          <Button type="primary" block htmlType="submit">
            Gửi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyCodePage;
