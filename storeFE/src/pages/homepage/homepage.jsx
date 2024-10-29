import React from "react";
import { Row, Col, Tag } from "antd";
import CategoryHomePage from "./categoryHomePage";
import CarouselHomePage from "./CarouselHomePage";
import NewHomePage from "./NewHomePage";

const HomePage = () => {
  const listNews = [
    {
      id: 1,
      title: "Iphone 12 Pro Max",
      description: "Iphone 15 bổ sung tính năng AL",
      src: "https://file.hstatic.net/1000198144/article/af697c4b-8b10-4923-9cc4-6b4e3780f06a-17286191079611816508082_26dd27a67e4e49d7a41a9836c56f5dbc_large.jpg",
    },
    {
      id: 2,
      title: "Iphone 12 Pro Max",
      description:
        "Iphone 16 bổ sung các tùy chọn màu titan, chống dấu tay khi cầm nắm",
      src: "https://file.hstatic.net/1000198144/article/en-17293339299902094692248-0-182-1080-1910-crop-1729333940756693946943_674d1518fff34c43ad7d69e0cbacbbdc_large.jpg",
    },
    {
      id: 3,
      title: "Iphone 12 Pro Max",
      description: "Iphone 16 bổ sung thêm tùy chọn 12GB ROM",
      src: "https://file.hstatic.net/1000198144/article/1-17256667506881578964426_0108faf9eff44ed48f0df291ef661098_large.jpg",
    },
    {
      id: 4, // Đã sửa id cho sản phẩm thứ tư
      title: "Iphone 12 Pro Max",
      description: "Iphone 16 bổ sung thêm tùy chọn 12GB ROM",
      src: "https://file.hstatic.net/1000198144/article/1-17256667506881578964426_0108faf9eff44ed48f0df291ef661098_large.jpg",
    },
  ];

  return (
    <>
      <div>
        <div className="h-3 w-full"></div>
        <CarouselHomePage />

        <Row gutter={[16, 16]} justify="center" style={{ marginTop: "1rem" }}>
          {listNews.map((news) => (
            <Col xs={24} sm={12} md={8} lg={6} key={news.id}>
              <NewHomePage data={news} />
            </Col>
          ))}
        </Row>
      </div>

      {/* Thêm Tag với màu cam chủ đạo trước CategoryHomePage */}
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <Tag
          color="#fa8c16" // Màu cam chủ đạo
          style={{
            fontSize: "20px",
            padding: "10px 20px",
            marginBottom: "10px",
            borderRadius: "20px",
            backgroundColor: "#fff5e6", // Nền vẫn giữ để tương phản
            border: "1px solid #fa8c16", // Biên cũng sử dụng màu cam
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            color: "orange",
            transition: "all 0.3s",
          }}
        >
          Danh sách iPad
        </Tag>
      </div>
      <CategoryHomePage id={2} />

      <div className="h-4 w-full"></div>
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <Tag
          color="#fa8c16" // Màu cam chủ đạo
          style={{
            fontSize: "20px",
            padding: "10px 20px",
            marginBottom: "10px",
            color: "orange",
            borderRadius: "20px",
            backgroundColor: "#fff5e6", // Nền vẫn giữ để tương phản
            border: "1px solid #fa8c16", // Biên cũng sử dụng màu cam
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s",
          }}
        >
          Danh sách iPhone
        </Tag>
      </div>
      <CategoryHomePage id={1} />
    </>
  );
};

export default HomePage;
