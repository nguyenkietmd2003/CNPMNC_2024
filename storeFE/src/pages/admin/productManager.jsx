import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  notification,
  InputNumber,
} from "antd";
import { getAllProduct, getDetailProduct } from "../../util/api";

const ProductManagerPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddProductModalVisible, setIsAddProductModalVisible] =
    useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getAllProduct();
        setProducts(result.message);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const showModal = async (product) => {
    try {
      const result = await getDetailProduct(product.id_product);
      console.log("Chi tiết sản phẩm:", result.message); // Thêm log kiểm tra
      setSelectedProduct(result.message);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    }
  };

  const showAddProductModal = () => {
    setIsAddProductModalVisible(true);
  };

  const handleOk = async (values) => {
    try {
      console.log(values); // Xử lý cập nhật thông tin sản phẩm ở đây
      notification.success({ message: "Cập nhật sản phẩm thành công!" });
      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
      notification.error({ message: "Cập nhật sản phẩm thất bại!" });
    }
  };

  const handleAddProduct = async (values) => {
    try {
      console.log(values); // Xử lý thêm sản phẩm ở đây
      notification.success({ message: "Thêm sản phẩm thành công!" });
      setIsAddProductModalVisible(false);
      // Gọi lại fetchProducts() nếu cần cập nhật danh sách sản phẩm
    } catch (error) {
      console.log(error);
      notification.error({ message: "Thêm sản phẩm thất bại!" });
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(id); // Xử lý xóa sản phẩm ở đây
      notification.success({ message: "Xóa sản phẩm thành công!" });
    } catch (error) {
      console.log(error);
      notification.error({ message: "Xóa sản phẩm thất bại!" });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsAddProductModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>
      <Button
        type="primary"
        onClick={showAddProductModal}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Thêm sản phẩm
      </Button>
      <Table dataSource={products} rowKey="id_product">
        <Table.Column title="Tên sản phẩm" dataIndex="title" />
        <Table.Column
          title="Giá"
          dataIndex="price"
          render={(price) => `${price} VND`}
        />
        <Table.Column title="Tóm tắt" dataIndex="summary" />
        <Table.Column
          title="Hình ảnh"
          dataIndex="img"
          render={(img) => (
            <img src={img} alt="Product" style={{ width: 50 }} />
          )}
        />
        <Table.Column
          title="Thao tác"
          render={(text, product) => (
            <>
              <Button
                onClick={() => showModal(product)}
                className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
              >
                Xem
              </Button>
              <Button
                onClick={() => handleDelete(product.id_product)}
                danger
                className="bg-red-500 font-bold py-1 px-3 rounded"
              >
                Xóa
              </Button>
            </>
          )}
        />
      </Table>

      {/* Modal chỉnh sửa thông tin sản phẩm */}
      {selectedProduct && (
        <Modal
          title="Chi tiết sản phẩm"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={800} // Để modal rộng hơn
        >
          {/* Thông tin cơ bản của sản phẩm */}
          <Form
            initialValues={selectedProduct}
            onFinish={handleOk}
            layout="vertical"
          >
            <Form.Item label="Tên sản phẩm" name="title">
              <Input />
            </Form.Item>
            <Form.Item label="Giá" name="price">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Tóm tắt" name="summary">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Hình ảnh" name="img">
              <Input />
            </Form.Item>
          </Form>

          {/* Dòng phân cách */}
          <hr style={{ margin: "20px 0" }} />

          {/* Thông tin chi tiết sản phẩm */}
          <h3>Thông tin chi tiết</h3>
          {selectedProduct.ProductInformations && (
            <div>
              {selectedProduct.ProductInformations.map((info) => (
                <div key={info.id_productInformation}>
                  <p>Thương hiệu: {info.brand}</p>
                  <p>Hệ điều hành: {info.operating_System}</p>
                  <p>RAM: {info.ram} GB</p>
                  <p>Màn hình: {info.screen} inch</p>
                  <p>Model: {info.model}</p>
                  <p>ROM: {info.rom} GB</p>
                  <p>CPU: {info.CPU}</p>
                  <p>Pin: {info.battery}</p>
                  <img
                    src={info.img}
                    alt="Thông tin sản phẩm"
                    style={{ width: "100px", marginTop: "10px" }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Dòng phân cách */}
          <hr style={{ margin: "20px 0" }} />

          {/* Các biến thể sản phẩm */}
          <h3>Các biến thể sản phẩm</h3>
          {selectedProduct.ProductVariants && (
            <div>
              {selectedProduct.ProductVariants.map((variant) => (
                <div key={variant.id_productVariant}>
                  <p>Màu sắc: {variant.id_color_Color.name}</p>
                  <img
                    src={variant.id_color_Color.img}
                    alt="Màu sắc sản phẩm"
                    style={{ width: "50px", marginRight: "10px" }}
                  />
                  <p>Bộ nhớ: {variant.id_rom_Rom.name}</p>
                  <p>Giá: {variant.price} VND</p>
                </div>
              ))}
            </div>
          )}

          {/* Dòng phân cách */}
          <hr style={{ margin: "20px 0" }} />

          {/* Đánh giá sản phẩm */}
          <h3>Đánh giá sản phẩm</h3>
          {selectedProduct.ProductReviews && (
            <div>
              {selectedProduct.ProductReviews.map((review) => (
                <div key={review.id_productReview}>
                  <p>Email: {review.id_userReview_UserReview.gmail}</p>
                  <p>Nội dung: {review.id_userReview_UserReview.content}</p>
                  <p>Đánh giá: {review.id_userReview_UserReview.rating} sao</p>
                  <p>
                    Ngày:{" "}
                    {new Date(
                      review.id_userReview_UserReview.createAT
                    ).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 hover:bg-blue-700"
            >
              Lưu
            </Button>
          </Form.Item>
        </Modal>
      )}

      {/* Modal thêm sản phẩm mới */}
      <Modal
        title="Thêm sản phẩm"
        open={isAddProductModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleAddProduct} layout="vertical">
          <Form.Item
            label="Tên sản phẩm"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Tóm tắt" name="summary">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Hình ảnh" name="img">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 hover:bg-blue-700"
            >
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagerPage;
