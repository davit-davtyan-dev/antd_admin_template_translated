import React, { Component } from "react";
import { Card, Button, Table, message, Divider } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getUsers, deleteUser, editUser, addUser } from "@/api/user";
import TypingCard from '@/components/TypingCard'
import EditUserForm from "./forms/edit-user-form"
import AddUserForm from "./forms/add-user-form"

const { Column } = Table;

class User extends Component {
  state = {
    users: [],
    editUserModalVisible: false,
    editUserModalLoading: false,
    currentRowData: {},
    addUserModalVisible: false,
    addUserModalLoading: false,
  };
  getUsers = async () => {
    const result = await getUsers()
    const { users, status } = result.data
    if (status === 0) {
      this.setState({
        users
      })
    }
  }
  handleEditUser = (row) => {
    this.setState({
      currentRowData:Object.assign({}, row),
      editUserModalVisible: true,
    });
  };

  handleDeleteUser = (row) => {
    const { id } = row
    if (id === "admin") {
      message.error("Can't delete administrator users!")
      return
    }
    deleteUser({id}).then(res => {
      message.success("successfully deleted")
      this.getUsers();
    })
  }

  handleEditUserOk = _ => {
    const { editUserFormRef } = this;
    editUserFormRef.current
      .validateFields()
      .then((values) => {
        this.setState({ editModalLoading: true });
        editUser(values)
          .then((response) => {
            editUserFormRef.current.resetFields();
            this.setState({
              editUserModalVisible: false,
              editUserModalLoading: false,
            });
            message.success("Edited success!");
            this.getUsers();
          })
          .catch((e) => {
            message.success("Editing fails, please try again!");
          });
      })
      .catch(({ errorFields }) => {
        console.log("Test failure!");
        editUserFormRef.current.scrollToField(errorFields?.[0]?.name);
      });
  };

  handleCancel = _ => {
    this.setState({
      editUserModalVisible: false,
      addUserModalVisible: false,
    });
  };

  handleAddUser = (row) => {
    this.setState({
      addUserModalVisible: true,
    });
  };

  handleAddUserOk = _ => {
    const { addUserFormRef } = this;
    addUserFormRef.current
      .validateFields()
      .then((values) => {
        this.setState({ addUserModalLoading: true });
        addUser(values)
          .then((response) => {
            addUserFormRef.current.resetFields();
            this.setState({
              addUserModalVisible: false,
              addUserModalLoading: false,
            });
            message.success("Added successfully!");
            this.getUsers();
          })
          .catch((e) => {
            message.success("Adding a failure, please try again!");
          });
      })
      .catch(({ errorFields }) => {
        addUserFormRef.current.scrollToField(errorFields?.[0]?.name);
      });
  };
  componentDidMount() {
    this.getUsers()
  }
  render() {
    const { users } = this.state
    const title = (
      <span>
        <Button type='primary' onClick={this.handleAddUser}>Add user</Button>
      </span>
    )
    const cardContent = `Here, you can manage users in the system, such as adding a new user, or modifying users already existing in the system.`
    return (
      <div className="app-container">
        <TypingCard title="User Management" source={cardContent} />
        <br/>
        <Card title={title}>
          <Table bordered rowKey="id" dataSource={users} pagination={false}>
            <Column title="User ID" dataIndex="id" key="id" align="center"/>
            <Column title="user name" dataIndex="name" key="name" align="center"/>
            <Column title="User role" dataIndex="role" key="role" align="center"/>
            <Column title="User description" dataIndex="description" key="description" align="center" />
            <Column title="operate" key="action" width={195} align="center"render={(text, row) => (
              <span>
                <Button type="primary" shape="circle" icon={<EditOutlined />} title="edit" onClick={this.handleEditUser.bind(null,row)}/>
                <Divider type="vertical" />
                <Button type="primary" shape="circle" icon={<DeleteOutlined />} title="delete" onClick={this.handleDeleteUser.bind(null,row)}/>
              </span>
            )}/>
          </Table>
        </Card>
        <EditUserForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={formRef => this.editUserFormRef = formRef}
          visible={this.state.editUserModalVisible}
          confirmLoading={this.state.editUserModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditUserOk}
        />
        <AddUserForm
          wrappedComponentRef={formRef => this.addUserFormRef = formRef}
          visible={this.state.addUserModalVisible}
          confirmLoading={this.state.addUserModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddUserOk}
        />
      </div>
    );
  }
}

export default User;
