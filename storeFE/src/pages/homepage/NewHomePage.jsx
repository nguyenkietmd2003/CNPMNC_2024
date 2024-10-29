import React from "react";
import { Card, Typography } from "antd";

const { Meta } = Card;
const { Text } = Typography;

const NewHomePage = ({ data }) => {
  return (
    <Card
      hoverable
      style={{
        width: "100%",
        height: "auto",
        borderRadius: "10px",
        overflow: "hidden",
      }}
      cover={
        <img
          alt={data?.title}
          src={data?.src}
          style={{ height: "150px", objectFit: "cover" }}
        />
      }
    >
      <Meta
        title={<Text strong>{data?.title}</Text>}
        description={<Text style={{ color: "blue" }}>{data?.description}</Text>}
      />
    </Card>
  );
};

export default NewHomePage;
