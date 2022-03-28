import React, { useEffect, useState } from "react";
import { Card, Button, Table, message, Divider, Modal, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import TypingCard from "@/components/TypingCard";
import UserForm from "./UserForm";
import { getUsers, deleteUser, editUser, addUser } from "@/api/user";

const { Column } = Table;

const defaultInitialValues = { role: "admin" };

function User() {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(defaultInitialValues);
  const [form, setForm] = useState();

  const refreshUsers = async () => {
    const result = await getUsers();
    const { users, status } = result.data;
    if (status === 0) {
      setUsers(users);
    }
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  const handleEditUser = (row) => {
    setInitialValues({ ...row });
    setModalVisible(true);
  };

  const handleDeleteUser = (row) => {
    const { id } = row;
    if (id === "admin") {
      message.error("Can't delete administrator users!");
      return;
    }
    deleteUser({ id }).then((res) => {
      message.success("successfully deleted");
      refreshUsers();
    });
  };

  const handleEditUserOk = (_) => {
    form
      .validateFields()
      .then((values) => {
        setModalLoading(true);
        editUser(values)
          .then((response) => {
            form.resetFields();
            setModalLoading(false);
            setModalVisible(false);
            message.success("Edited success!");
            refreshUsers();
          })
          .catch((e) => {
            message.success("Editing fails, please try again!");
          });
      })
      .catch(({ errorFields }) => {
        console.log("Test failure!");
        form.scrollToField(errorFields?.[0]?.name);
      });
  };

  const handleCancel = (_) => {
    setModalVisible(false);
  };

  const handleAddUser = () => {
    setInitialValues(defaultInitialValues);
    setModalVisible(true);
  };

  const handleAddUserOk = (_) => {
    form
      .validateFields()
      .then((values) => {
        setModalLoading(true);
        addUser(values)
          .then((_response) => {
            form.resetFields();
            setModalLoading(false);
            setModalVisible(false);
            message.success("Added successfully!");
            refreshUsers();
          })
          .catch((e) => {
            message.success("Adding a failure, please try again!");
          });
      })
      .catch(({ errorFields }) => {
        form.scrollToField(errorFields?.[0]?.name);
      });
  };

  return (
    <div className="app-container">
      <TypingCard
        title="User Management"
        source="Here, you can manage users in the system, such as adding a new user, or modifying users already existing in the system."
      />
      <br />
      <Card
        title={
          <span>
            <Button type="primary" onClick={handleAddUser}>
              Add user
            </Button>
          </span>
        }
      >
        <Table bordered rowKey="id" dataSource={users} pagination={false}>
          <Column title="User ID" dataIndex="id" key="id" align="center" />
          <Column title="user name" dataIndex="name" key="name" align="center" />
          <Column title="User role" dataIndex="role" key="role" align="center" />
          <Column title="User description" dataIndex="description" key="description" align="center" />
          <Column
            title="operate"
            key="action"
            width={195}
            align="center"
            render={(_text, row) => (
              <span>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  title="edit"
                  onClick={() => handleEditUser(row)}
                />
                <Divider type="vertical" />
                <Popconfirm title="Are you sure?" disabled={row.id === "admin"} onConfirm={() => handleDeleteUser(row)}>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<DeleteOutlined />}
                    title="delete"
                    disabled={row.id === "admin"}
                  />
                </Popconfirm>
              </span>
            )}
          />
        </Table>
      </Card>
      <Modal
        title={initialValues.id ? "Edit" : "Add"}
        visible={modalVisible}
        onCancel={handleCancel}
        onOk={initialValues.id ? handleEditUserOk : handleAddUserOk}
        confirmLoading={modalLoading}
        destroyOnClose
      >
        <UserForm init={setForm} initialValues={initialValues} />
      </Modal>
    </div>
  );
}

export default User;
