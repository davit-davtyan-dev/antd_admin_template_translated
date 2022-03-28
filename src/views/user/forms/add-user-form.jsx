import React, { Component } from "react";
import { Form, Input, Select, Modal } from "antd";
import { reqValidatUserID } from "@/api/user";
const { TextArea } = Input;
class AddUserForm extends Component {
  formRef = React.createRef();

  componentDidMount() {
    this.props.wrappedComponentRef(this.formRef);
  }

  validatUserID = async (rule, value, callback) => {
    if (value) {
      if (!/^[a-zA-Z0-9]{1,6}$/.test(value)) {
        callback("User ID must be 1-6 digits or letters");
      }
      let res = await reqValidatUserID(value);
      const { status } = res.data;
      if (status) {
        callback("The user ID already exists");
      }
    } else {
      callback("Please enter the user ID");
    }
    callback();
  };
  render() {
    const { visible, onCancel, onOk, confirmLoading } = this.props;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        title="edit"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form ref={this.formRef} {...formItemLayout} initialValues={{ role: "admin" }}>
          <Form.Item name="id" label="User ID:" rules={[{ required: true, validator: this.validatUserID }]}>
            <Input placeholder="Please enter the user ID" />
          </Form.Item>
          <Form.Item name="name" label="user name:" rules={[{ required: true, message: "Please enter the user name!" }]}>
            <Input placeholder="Please enter the user name" />
          </Form.Item>
          <Form.Item name="role" label="User role:">
              <Select style={{ width: 120 }}>
                <Select.Option value="admin">admin</Select.Option>
                <Select.Option value="guest">guest</Select.Option>
              </Select>
          </Form.Item>
          <Form.Item name="description" label="User description:">
            <TextArea rows={4} placeholder="Please enter the user description" />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default AddUserForm;
