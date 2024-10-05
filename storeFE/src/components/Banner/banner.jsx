import React from "react";
import { Carousel } from "antd";
const contentStyle = {
  height: "100px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const CarouselComponent = () => (
  <Carousel autoplay>
    <div>
      <img
        src="https://tse4.mm.bing.net/th?id=OIP.mV6j9YsE56b-6rRqvqHh9QHaDS&pid=Api&P=0&h=180"
        style={contentStyle}
      />
    </div>
    <div>
      <img
        src="https://tse4.mm.bing.net/th?id=OIP.mV6j9YsE56b-6rRqvqHh9QHaDS&pid=Api&P=0&h=180"
        style={contentStyle}
      />
    </div>
    <div>
      <img
        src="https://tse4.mm.bing.net/th?id=OIP.mV6j9YsE56b-6rRqvqHh9QHaDS&pid=Api&P=0&h=180"
        style={contentStyle}
      />
    </div>
    <div>
      <img
        src="https://tse4.mm.bing.net/th?id=OIP.mV6j9YsE56b-6rRqvqHh9QHaDS&pid=Api&P=0&h=180"
        style={contentStyle}
      />
    </div>
  </Carousel>
);
export default CarouselComponent;
