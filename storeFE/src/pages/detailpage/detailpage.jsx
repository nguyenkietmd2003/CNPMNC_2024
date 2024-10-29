import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Image,
  Typography,
  List,
  Tag,
  Divider,
  Rate,
  Button,
  Modal,
  Input,
  notification,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { addCart, getDetailProduct } from "../../util/api";

const { Title, Text, Paragraph } = Typography;

const PhoneDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(0);

  // State for review modal
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  // State for login modal
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  useEffect(() => {
    const fetchDetailProduct = async () => {
      try {
        const result = await getDetailProduct(id);
        setProductData(result.message);
        setSelectedVariant(result.message.ProductVariants[0]);
        setCurrentPrice(result.message.price);
      } catch (error) {
        console.log("error from product detail", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetailProduct();
  }, [id]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setCurrentPrice(variant.price);
  };

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem("info"));
    const idUSer = user?.data?.id;

    if (!user) {
      setIsLoginModalVisible(true);
      return;
    }

    const data = {
      id_user: idUSer,
      id_product: productData.id_product,
      quantity,
      discount: productData.discount || 0,
      price: currentPrice || 0,
      id_productVariant: selectedVariant.id_productVariant,
    };
    try {
      const countCart = localStorage.getItem("cart");
      const result = await addCart(data);
      if (result) localStorage.setItem("cart", parseInt(countCart) + 1);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = () => {
    setIsReviewModalVisible(true);
  };

  const handleCancelReview = () => {
    setIsReviewModalVisible(false);
  };

  const handleSubmitReview = () => {
    console.log("Review:", {
      productId: productData.id,
      content: reviewContent,
      rating: reviewRating,
    });
    setIsReviewModalVisible(false);
    setReviewContent("");
    setReviewRating(0);
  };

  const handleCancelLogin = () => {
    setIsLoginModalVisible(false);
  };

  const handleRedirectToLogin = () => {
    navigate("/login");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching product details: {error.message}</div>;
  if (!productData) return null;

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
      <Row gutter={[16, 16]}>
        <Col span={10}>
          <Image
            src={
              selectedVariant
                ? selectedVariant.id_color_Color.img
                : productData.img
            }
            alt={
              selectedVariant
                ? selectedVariant.id_color_Color.name
                : productData.title
            }
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
          {selectedVariant && (
            <div style={{ marginTop: 10 }}>
              {selectedVariant.id_color_Color.name} -{" "}
              {selectedVariant.id_rom_Rom.name}
            </div>
          )}
        </Col>
        <Col span={14}>
          <Card>
            <Title level={2}>{productData.title}</Title>
            <Title level={4} type="danger">
              Price: {currentPrice.toLocaleString()} VND
            </Title>

            <div style={{ marginBottom: 16 }}>
              <Text strong>Variants: </Text>
              {productData.ProductVariants.map((variant) => (
                <Tag
                  color={"blue"}
                  key={variant.id_productVariant}
                  onClick={() => handleVariantChange(variant)}
                  style={{
                    cursor: "pointer",
                    border:
                      selectedVariant.id_productVariant ===
                      variant.id_productVariant
                        ? "2px solid black"
                        : "1px solid blue",
                  }}
                >
                  {variant.id_color_Color.name} - {variant.id_rom_Rom.name}
                </Tag>
              ))}
            </div>

            <Paragraph>{productData.summary}</Paragraph>

            <div style={{ marginTop: 16 }}>
              <Button
                type="primary"
                style={{ marginLeft: "10px" }}
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      <Divider />

      <Card title="Mô tả sản phẩm" style={{ marginTop: 20 }}>
        <Paragraph>{productData.summary}</Paragraph>
      </Card>

      <Divider />

      <Card title="Thông số kỹ thuật" style={{ marginTop: 20 }}>
        <List>
          <List.Item>
            <Text strong>Hãng:</Text> {productData.ProductInformations[0].brand}
          </List.Item>
          <List.Item>
            <Text strong>Hệ điều hành:</Text>{" "}
            {productData.ProductInformations[0].operating_System}
          </List.Item>
          <List.Item>
            <Text strong>RAM:</Text> {productData.ProductInformations[0].ram} GB
          </List.Item>
          <List.Item>
            <Text strong>Màn hình:</Text>{" "}
            {productData.ProductInformations[0].screen} inch
          </List.Item>
          <List.Item>
            <Text strong>Model:</Text>{" "}
            {productData.ProductInformations[0].model}
          </List.Item>
          <List.Item>
            <Text strong>ROM:</Text> {productData.ProductInformations[0].rom} GB
          </List.Item>
          <List.Item>
            <Text strong>CPU:</Text> {productData.ProductInformations[0].CPU}
          </List.Item>
          <List.Item>
            <Text strong>Pin:</Text>{" "}
            {productData.ProductInformations[0].battery}
          </List.Item>
        </List>
      </Card>

      <Divider />

      <List
        dataSource={productData.ProductReviews}
        renderItem={(review) => (
          <List.Item
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Tag color="blue">Người dùng {review.id_userReview}</Tag>
            <div style={{ textAlign: "left", margin: "8px 0", width: "100%" }}>
              {review.id_userReview_UserReview.content}
            </div>
            <div style={{ marginTop: 5 }}>
              <Text strong>Đánh giá: </Text>
              <Rate value={review.id_userReview_UserReview.rating} disabled />
            </div>
          </List.Item>
        )}
      />

      <Button type="primary" onClick={showModal} style={{ marginTop: 16 }}>
        Đánh giá sản phẩm
      </Button>

      <Modal
        title="Đánh giá sản phẩm"
        open={isReviewModalVisible}
        onCancel={handleCancelReview}
        onOk={handleSubmitReview}
      >
        <div>
          <Text strong>Nội dung đánh giá:</Text>
          <Input.TextArea
            rows={4}
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
          />
          <Text strong style={{ marginTop: 10 }}>
            Đánh giá:
          </Text>
          <Rate
            value={reviewRating}
            onChange={(value) => setReviewRating(value)}
          />
        </div>
      </Modal>

      <Modal
        title="Bạn chưa đăng nhập"
        open={isLoginModalVisible}
        onCancel={handleCancelLogin}
        footer={[
          <Button key="back" onClick={handleCancelLogin}>
            Đóng
          </Button>,
          <Button key="login" type="primary" onClick={handleRedirectToLogin}>
            Đăng nhập
          </Button>,
        ]}
      >
        <Text>Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.</Text>
      </Modal>
    </div>
  );
};

export default PhoneDetailPage;
