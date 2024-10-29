import React, { useEffect, useState } from "react";
import { List, Card, Image, Typography, Select, Row, Col } from "antd";
import { getProductByTag } from "../../util/api";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Text } = Typography;
const { Option } = Select;

const ListProduct = ({ id }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // Trạng thái sắp xếp

  useEffect(() => {
    const fetchData = async (categoryId) => {
      try {
        const result = await getProductByTag(categoryId);
        setProducts(result.message);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };

    if (id) {
      fetchData(id);
    }
  }, [id]);

  // Hàm để sắp xếp sản phẩm
  const sortedProducts = [...products].sort((a, b) => {
    return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  });

  // Hàm xử lý sự kiện click cho dòng iPhone
  const handleIphoneClick = (iphoneModel) => {
    console.log(`Clicked on: ${iphoneModel}`);
  };

  return (
    <div style={{ backgroundColor: "#f0f2f5", padding: "20px" }}>
      {/* Dropdown để chọn phương thức sắp xếp */}
      <Select
        defaultValue="asc"
        style={{ width: 200, marginBottom: 20 }}
        onChange={(value) => setSortOrder(value)}
      >
        <Option value="asc">Giá: Thấp đến Cao</Option>
        <Option value="desc">Giá: Cao đến Thấp</Option>
      </Select>

      {/* Dòng thể hiện các dòng iPhone */}
      {/* <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={4}>
          <Card
            title="iPhone 14"
            style={{ width: "100%", height: "80px", textAlign: "center" }}
            onClick={() => handleIphoneClick("iPhone 14")}
          />
        </Col>
        <Col span={4}>
          <Card
            title="iPhone 13"
            style={{ width: "100%", height: "80px", textAlign: "center" }}
            onClick={() => handleIphoneClick("iPhone 13")}
          />
        </Col>
        <Col span={4}>
          <Card
            title="iPhone 12"
            style={{ width: "100%", height: "80px", textAlign: "center" }}
            onClick={() => handleIphoneClick("iPhone 12")}
          />
        </Col>
        <Col span={4}>
          <Card
            title="iPhone 11"
            style={{ width: "100%", height: "80px", textAlign: "center" }}
            onClick={() => handleIphoneClick("iPhone 11")}
          />
        </Col>
        <Col span={4}>
          <Card
            title="iPhone SE"
            style={{ width: "100%", height: "80px", textAlign: "center" }}
            onClick={() => handleIphoneClick("iPhone SE")}
          />
        </Col>
        <Col span={4}>
          <Card
            title="iPhone XR"
            style={{ width: "100%", height: "80px", textAlign: "center" }}
            onClick={() => handleIphoneClick("iPhone XR")}
          />
        </Col>
      </Row> */}

      <List
        grid={{ gutter: 16, column: 4 }} // Điều chỉnh số cột và khoảng cách
        dataSource={sortedProducts}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
              cover={
                <Image
                  alt={item.title}
                  src={item.img}
                  style={{
                    height: "160px",
                    objectFit: "contain",
                    borderRadius: "10px 10px 0 0",
                  }}
                  preview={false}
                />
              }
              onClick={() => navigate(`/detail-product/${item.id_product}`)}
            >
              <Meta
                title={
                  <Text strong style={{ fontSize: "16px", color: "#333" }}>
                    {item.title}
                  </Text>
                }
                description={
                  <Text style={{ fontSize: "14px", color: "#007bff" }}>
                    Giá:{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.price)}
                  </Text>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ListProduct;
