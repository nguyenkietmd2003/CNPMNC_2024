import React, { useEffect, useState } from "react";
import { List, Card, Image, Typography, Select, Row, Col } from "antd";
import {
  getCategoryByTag,
  getProductByCategory,
  getProductByTag,
} from "../../util/api";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Text } = Typography;
const { Option } = Select;

const ListProduct = ({ id }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // category name updated here
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

    const fetchCategoryByTag = async (id_tag) => {
      try {
        const result = await getCategoryByTag(id_tag);
        setCategories(result.message.message); // Accessing categories from the correct path
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    if (id) {
      fetchData(id);
      fetchCategoryByTag(id);
    }
  }, [id]);

  // Hàm để sắp xếp sản phẩm
  const sortedProducts = [...products].sort((a, b) => {
    return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  });
  const getProductByCategory1 = async (id) => {
    try {
      const data = await getProductByCategory(id);
      console.log(data.message);
      setProducts(data.message);
    } catch (error) {
      console.log(error);
    }
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

      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        {categories.map((category) => (
          <Col
            span={4}
            key={category.id_category}
            style={{ textAlign: "center" }}
          >
            <Card
              hoverable
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                padding: "10px", // Giảm padding để card nhỏ lại
              }}
              onClick={() => {
                getProductByCategory1(category.id_category);
              }} // Lọc sản phẩm theo category
            >
              <Image
                alt={category.title}
                src={category.img}
                style={{
                  width: "25px", // Giảm chiều rộng hình ảnh
                  height: "25px", // Giảm chiều cao hình ảnh
                  objectFit: "contain",
                  borderRadius: "10px",
                }}
                preview={false}
              />
              <Text
                strong
                style={{
                  display: "block",
                  fontSize: "14px", // Giảm kích thước font chữ
                  color: "#333",
                }}
              >
                {category.title}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>

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
