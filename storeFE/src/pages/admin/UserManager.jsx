import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, notification, Select } from "antd";
import { getAllUser, updateUser } from "../../util/api";

const UserManagerPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getAllUser();
        setUsers(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const showAddUserModal = () => {
    setIsAddUserModalVisible(true);
  };

  const handleOk = async (values) => {
    try {
      const id = selectedUser.id_user;
      const result = await updateUser(id, values);
      if (result) {
        notification.success({ message: "Cập nhật thành công!" });
        setIsModalVisible(false);
        console.log(result);
        return;
      }
      notification.error({ message: "Cập nhật thất bại" });
      return;
    } catch (error) {
      console.log(error);
      notification.error({ message: "Cập nhật thất bại!" });
    }
  };

  const handleAddUser = async (values) => {
    try {
      console.log(values); // Xử lý thêm người dùng ở đây
      notification.success({ message: "Thêm người dùng thành công!" });
      setIsAddUserModalVisible(false);
      // Gọi lại fetchUsers() nếu cần cập nhật danh sách người dùng
    } catch (error) {
      console.log(error);
      notification.error({ message: "Thêm người dùng thất bại!" });
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(id); // Xử lý xóa người dùng ở đây
      notification.success({ message: "Xóa người dùng thành công!" });
    } catch (error) {
      console.log(error);
      notification.error({ message: "Xóa người dùng thất bại!" });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsAddUserModalVisible(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>
      <Button
        type="primary"
        onClick={showAddUserModal}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Thêm người dùng
      </Button>
      <Table dataSource={users} rowKey="id_user">
        <Table.Column title="Tên" dataIndex="name" />
        <Table.Column title="Email" dataIndex="email" />
        <Table.Column title="Điện thoại" dataIndex="phone" />
        <Table.Column
          title="Thao tác"
          render={(text, user) => (
            <>
              <Button
                onClick={() => showModal(user)}
                className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
              >
                Xem
              </Button>
              <Button
                onClick={() => handleDelete(user.id_user)}
                danger
                className="bg-red-500font-bold py-1 px-3 rounded"
              >
                Xóa
              </Button>
            </>
          )}
        />
      </Table>

      {/* Modal chỉnh sửa thông tin người dùng */}
      {selectedUser && (
        <Modal
          title="Chi tiết người dùng"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            initialValues={selectedUser}
            onFinish={handleOk}
            layout="vertical"
          >
            <Form.Item label="Tên" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Điện thoại" name="phone">
              <Input />
            </Form.Item>
            <Form.Item label="Địa chỉ" name="address">
              <Input />
            </Form.Item>
            <Form.Item label="Vai trò" name="role">
              <Select>
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="user">User</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-blue-500 hover:bg-blue-700"
              >
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}

      {/* Modal thêm người dùng mới */}
      <Modal
        title="Thêm người dùng"
        open={isAddUserModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleAddUser} layout="vertical">
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Điện thoại" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address">
            <Input />
          </Form.Item>
          <Form.Item label="Vai trò" name="role">
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

export default UserManagerPage;
