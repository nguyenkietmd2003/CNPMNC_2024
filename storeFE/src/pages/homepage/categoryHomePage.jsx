import React, { useEffect, useState } from "react";
import { List, Card, Image, Typography } from "antd";
import { getProductByTag } from "../../util/api";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Text } = Typography;

const CategoryHomePage = ({ id }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchDataIpad = async (categoryId) => {
      try {
        const result = await getProductByTag(categoryId);
        setProducts(result.message);
      } catch (error) {
        console.log("error fetching product", error);
      }
    };
    if (id) {
      fetchDataIpad(id);
    }
  }, [id]);

  return (
    <div style={{ backgroundColor: "#f0f2f5", padding: "20px" }}>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={products}
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

export default CategoryHomePage;
