import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCart, getCart, order } from "../../util/api";
import {
  Card,
  List,
  Typography,
  Divider,
  Button,
  Image,
  Row,
  Col,
  Modal,
  Form,
  Input,
  Space,
  message,
  notification,
  Empty,
} from "antd";

const { Title, Text } = Typography;

const CartPage = () => {
  const { id } = useParams();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const result = await getCart(id);
        setCart(result.message);
        console.log("check cart", result?.message);
      } catch (error) {
        console.log("Failed to call API: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [id]);

  const fetchOrder = async (data) => {
    try {
      const result = await order(id, data);
      return result;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleQuantityChange = async (cartItemId, change) => {
    setCart((prevCart) => {
      const updatedCartItems = prevCart.data.CartItems.map((item) => {
        if (item.id_cartItem === cartItemId) {
          const newQuantity = item.quantity + change;
          if (newQuantity <= 0) {
            // Xóa sản phẩm nếu số lượng = 0
            return null;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean); // Lọc các sản phẩm null

      // Cập nhật lại tổng tiền
      const newTotalAmount = updatedCartItems.reduce(
        (total, item) =>
          total + item.price * item.quantity * (1 - item.discount / 100),
        0
      );

      return {
        ...prevCart,
        data: {
          ...prevCart.data,
          CartItems: updatedCartItems,
        },
        totalAmount: newTotalAmount, // Cập nhật lại tổng tiền
      };
    });
  };

  const handleCheckout = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        const total = cart.totalAmount;
        const productID = cart.data.CartItems.map((item) => {
          return { id_product: item.id_product };
        });
        const input = { ...values, total: total, products: productID };
        const data = await fetchOrder(input);
        if (!data) {
          notification.error({
            message: "Thanh Toán Thất Bại",
            description: "Vui lòng kiểm tra lại",
          });
          setIsModalVisible(false);
        } else {
          await deleteCart();
          setIsModalVisible(false);
          notification.success({
            message: "Thanh Toán Thành công",
            description: "Kiểm tra lịch sử mua hàng",
          });
        }
      })
      .catch((info) => {
        console.log("Xác thực thất bại:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching cart details: {error.message}</div>;
  }

  if (!cart || !cart.data || !Array.isArray(cart.data.CartItems)) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <Empty
          description={
            <span>
              Không tìm thấy giỏ hàng của bạn.
              <br />
              <Text type="secondary">
                Bạn có thể tiếp tục mua sắm để thêm sản phẩm.
              </Text>
            </span>
          }
        >
          <Button
            type="primary"
            onClick={() => {
              navigate("/");
            }}
          >
            Đi đến trang chủ
          </Button>
        </Empty>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <Card bordered={false} style={{ marginBottom: "20px" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          Giỏ hàng của bạn
        </Title>

        {cart.data.CartItems.length === 0 ? (
          <Empty
            description={
              <span>
                Giỏ hàng của bạn đang trống!
                <br />
                <Text type="secondary">
                  Bạn có thể tiếp tục mua sắm để thêm sản phẩm.
                </Text>
              </span>
            }
          >
            <Button
              type="primary"
              onClick={() => {
                navigate("/");
              }}
            >
              Đi đến sản phẩm
            </Button>
          </Empty>
        ) : (
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <List
              itemLayout="vertical"
              dataSource={cart.data.CartItems}
              renderItem={(item) => {
                const currentVariant =
                  item.id_product_Product?.ProductVariants.find(
                    (variant) =>
                      variant.id_productVariant === item.id_productVariant
                  );

                return (
                  <List.Item key={item.id_cartItem}>
                    <Row gutter={16} align="middle">
                      <Col span={6}>
                        <Image
                          src={
                            currentVariant?.id_color_Color?.img ||
                            "default-image.png"
                          }
                          width={100}
                        />
                      </Col>
                      <Col span={12}>
                        <Row justify="center">
                          <Title level={5} style={{ textAlign: "center" }}>
                            Màu sắc:{" "}
                            {currentVariant?.id_color_Color?.name || "N/A"}
                            <br />
                            Dung lượng:{" "}
                            {currentVariant?.id_rom_Rom?.name || "N/A"}
                          </Title>
                        </Row>
                      </Col>
                      <Col span={6}>
                        <Space direction="vertical">
                          <Text>Giá: {item.price.toLocaleString()} VND</Text>
                          <Text>Giảm giá: {item.discount}%</Text>
                          <Space>
                            <Button
                              onClick={() =>
                                handleQuantityChange(item.id_cartItem, -1)
                              }
                            >
                              -
                            </Button>
                            <Text>{item.quantity}</Text>
                            <Button
                              onClick={() =>
                                handleQuantityChange(item.id_cartItem, 1)
                              }
                            >
                              +
                            </Button>
                          </Space>
                        </Space>
                      </Col>
                    </Row>
                  </List.Item>
                );
              }}
            />

            <Divider />
            <Row justify="end" style={{ textAlign: "right" }}>
              <Col>
                <Text strong style={{ marginRight: 10 }}>
                  Tổng số tiền:
                </Text>
                <Text type="danger" style={{ fontSize: "20px" }}>
                  {cart.totalAmount.toLocaleString()} VND
                </Text>
              </Col>
            </Row>
            <Row justify="center">
              <Button type="primary" size="large" onClick={handleCheckout}>
                Tiến hành thanh toán
              </Button>
            </Row>
          </Space>
        )}
      </Card>

      <Modal
        title="Thông tin thanh toán"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Họ tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input placeholder="Nhập họ tên" />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              { pattern: /^[0-9]+$/, message: "Số điện thoại không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CartPage;
