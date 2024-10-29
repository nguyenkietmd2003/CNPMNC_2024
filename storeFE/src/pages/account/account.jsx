import { useEffect, useState } from "react";
import { Card, Avatar, Typography, Row, Col, Divider, Spin, Space } from "antd";
import { getInfo } from "../../util/api";

const { Title, Text } = Typography;

const AccountPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("info"));
        const id = user?.data?.id;
        if (user) {
          const data = await getInfo(id);
          setUser(data?.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchDataUser();
  }, []);

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin tip="Loading..." />
      </div>
    );
  }

  return (
    <Card
      style={{
        maxWidth: 800,
        margin: "auto",
        padding: "30px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
      }}
    >
      <Title level={2} style={{ textAlign: "center", color: "#3a3a3a" }}>
        Thông Tin Cá Nhân
      </Title>

      <Row gutter={[16, 24]} align="middle">
        <Col xs={24} sm={8} style={{ textAlign: "center" }}>
          <Avatar
            size={120}
            src={user.profile || "https://via.placeholder.com/120"}
            alt="Profile"
            style={{ border: "2px solid #1890ff" }}
          />
          <Divider />
          <Space direction="vertical" size="small">
            <Text strong style={{ fontSize: "16px", color: "#595959" }}>
              Vai trò:
            </Text>
            <Text style={{ fontSize: "15px", color: "#0077b6" }}>
              {user.role}
            </Text>
          </Space>
        </Col>

        <Col xs={24} sm={16}>
          <Divider
            orientation="left"
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
        </Col>
      </Row>
    </Card>
  );
};

export default AccountPage;
