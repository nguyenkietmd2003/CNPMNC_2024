import { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Row,
  Divider,
  Spin,
  Space,
  Col,
  Button,
  Modal,
  Form,
  Input,
} from "antd";
import { getInfo } from "../../util/api";

const { Title, Text } = Typography;

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("info"));
        const id = storedUser?.data?.id;
        if (id) {
          const data = await getInfo(id);
          if (data?.data) {
            setUser(data.data);
            form.setFieldsValue({
              name: data.data.name,
              phone: data.data.phone,
              email: data.data.email,
              address: data.data.address,
              role: data.data.role,
            });
          } else {
            console.error("User data is undefined");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchDataUser();
  }, [form]);

  const handleUpdate = async () => {
    try {
      const updatedData = await form.validateFields();
      setUser((prevUser) => ({
        ...prevUser,
        ...updatedData,
      })); // Update user data locally
      setIsModalOpen(false);
      form.resetFields(); // Reset form fields after update
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: 0,
          left: 0,
          background: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <Spin />
        <Text style={{ marginTop: "15px" }}>Loading...</Text>
      </div>
    );
  }

  return (
    <Card
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: "30px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
      }}
    >
      <Title level={2} style={{ textAlign: "center", color: "#3a3a3a" }}>
        Thông Tin Cá Nhân
      </Title>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div style={{ textAlign: "center" }}>
          <Avatar
            size={120}
            src={user.profile || "https://via.placeholder.com/120"}
            alt="Profile"
            style={{ border: "2px solid #1890ff" }}
          />
          <Divider />
          <Text strong style={{ fontSize: "16px", color: "#595959" }}>
            Vai trò:
          </Text>
          <Text
            style={{ fontSize: "15px", color: "#0077b6", display: "block" }}
          >
            {user.role}
          </Text>
        </div>

        <Divider
          orientation="center"
          style={{ color: "#3a3a3a", fontWeight: "bold" }}
        >
          Chi Tiết
        </Divider>

        {[
          { label: "Họ tên", value: user.name },
          { label: "Số điện thoại", value: user.phone },
          { label: "Email", value: user.email },
          { label: "Địa chỉ", value: user.address },
        ].map((info, index) => (
          <Row key={index} style={{ marginBottom: "15px" }}>
            <Col span={8}>
              <Text strong style={{ color: "#595959" }}>
                {info.label}:
              </Text>
            </Col>
            <Col span={16}>
              <Text style={{ fontSize: "15px", color: "#595959" }}>
                {info.value}
              </Text>
            </Col>
          </Row>
        ))}

        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Sửa Thông Tin
        </Button>
      </Space>

      <Modal
        title="Chỉnh sửa thông tin cá nhân"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleUpdate}
        okText="Cập Nhật"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Họ tên"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input placeholder="Nhập họ tên" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Vui lòng nhập email hợp lệ",
              },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default AccountPage;
