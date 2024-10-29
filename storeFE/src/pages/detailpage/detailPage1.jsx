import React from "react";
import { Card, Row, Col, Image, Typography, List, Tag, Divider } from "antd";

const { Title, Text, Paragraph } = Typography;

const productData = {
  id_product: 100,
  title: "Iphone 15 Pro Max",
  summary:
    "iPhone 15 Pro Max là mẫu smartphone cao cấp của Apple, ra mắt với thiết kế sang trọng và hiện đại. Máy sở hữu màn hình Super Retina XDR 6.7 inch, mang lại hình ảnh sắc nét và màu sắc sống động. Về hiệu suất, iPhone 15 Pro Max được trang bị chip A17 Pro, cho khả năng xử lý mạnh mẽ và tiết kiệm năng lượng.",
  discount: 0,
  price: 100000,
  img: "https://product.hstatic.net/1000198144/product/ip1_5bb54d6aeea84b38ba93d002b0982dd3_master.jpg",
  ProductInformations: [
    {
      id_productInformation: 1,
      brand: "Iphone",
      operating_System: "IOS 15 version 15.2",
      ram: 16,
      screen: 6.1,
      model: "Iphone 15 ProMax",
      rom: 512,
      CPU: "Chip A17 Pro - tốc độ GPU 4.75hz",
      battery: "4000mAh",
      img: "https://m.media-amazon.com/images/I/51UtM-A3fdL._AC_SX679_.jpg",
      is_delete: false,
    },
  ],
  ProductVariants: [
    {
      id_productVariant: 1,
      id_color: 2,
      id_rom: 1,
      price: 2400000,
      is_delete: false,
      id_color_Color: {
        id_color: 2,
        name: "Xanh Dương Nhạt",
        img: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/281570/iphone-15-blue-2-638629450171966290-750x500.jpg",
        is_delete: false,
      },
      id_rom_Rom: {
        id_rom: 1,
        name: "64GB",
        is_delete: false,
      },
    },
    {
      id_productVariant: 2,
      id_color: 1,
      id_rom: 1,
      price: 2400000,
      is_delete: false,
      id_color_Color: {
        id_color: 1,
        name: "Hồng Nhạt",
        img: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/281570/iphone-15-pink-2-638629454255353553-750x500.jpg",
        is_delete: false,
      },
      id_rom_Rom: {
        id_rom: 1,
        name: "64GB",
        is_delete: false,
      },
    },
  ],
  ProductReviews: [
    {
      id_productReview: 1,
      public: true,
      id_product: 100,
      id_userReview: 10,
      is_delete: false,
    },
    {
      id_productReview: 2,
      public: true,
      id_product: 100,
      id_userReview: 11,
      is_delete: false,
    },
  ],
};

const PhoneDetailPage = () => {
  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
      <Row gutter={[16, 16]}>
        {/* Ảnh và tên sản phẩm */}
        <Col span={10}>
          <Image
            src={productData.img}
            alt={productData.title}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </Col>
        <Col span={14}>
          <Card>
            <Title level={2}>{productData.title}</Title>
            <Title level={4} type="danger">
              Price: {productData.price.toLocaleString()} VND
            </Title>

            {/* Variants - Các biến thể màu sắc */}
            <div style={{ marginBottom: 16 }}>
              <Text strong>Variants: </Text>
              {productData.ProductVariants.map((variant) => (
                <Tag
                  color={
                    variant.id_color_Color.name === "Hồng Nhạt"
                      ? "magenta"
                      : "blue"
                  }
                  key={variant.id_productVariant}
                >
                  {variant.id_color_Color.name} - {variant.id_rom_Rom.name}
                </Tag>
              ))}
            </div>

            <Paragraph>{productData.summary}</Paragraph>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Thông số kỹ thuật */}
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

      {/* Đánh giá sản phẩm */}
      <Card title="Đánh giá sản phẩm" style={{ marginTop: 20 }}>
        <List
          dataSource={productData.ProductReviews}
          renderItem={(review) => (
            <List.Item>
              <Tag color="blue">Người dùng {review.id_userReview}</Tag> Đánh giá
              công khai
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default PhoneDetailPage;
