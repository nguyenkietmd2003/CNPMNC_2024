import React from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
const { Search } = Input;
import "./search.css";

const onSearch = (value, _e, info) => console.log(info?.source, value);
const SearchComponent = ({ style }) => (
  <Search
    placeholder="tìm kiếm sản phẩm"
    allowClear
    enterButton="Search"
    size="large"
    onSearch={onSearch}
    style={{ ...style }}
  />
);
export default SearchComponent;
