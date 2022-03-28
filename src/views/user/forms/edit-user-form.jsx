import React, { Component } from "react";
import { Form, Input, Select, Modal } from "antd";
const { TextArea } = Input;
class EditUserForm extends Component {
  formRef = React.createRef();

  componentDidMount() {
    this.props.wrappedComponentRef(this.formRef);
  }

  render() {
    const {
      visible,
      onCancel,
      onOk,
      confirmLoading,
      currentRowData,
    } = this.props;
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
        <Form
          ref={this.formRef}
          {...formItemLayout}
          initialValues={currentRowData}
        >
          <Form.Item name="id" label="User ID:">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="name"
            label="user name:"
            rules={[{ required: true, message: "Please enter the user name!" }]}
          >
            <Input placeholder="Please enter the user name" />
          </Form.Item>
          <Form.Item name="role" label="User role:">
            <Select style={{ width: 120 }} disabled={currentRowData.id === "admin"}>
              <Select.Option value="admin">admin</Select.Option>
              <Select.Option value="editor">editor</Select.Option>
              <Select.Option value="guest">guest</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="description" label="User description:">
            <TextArea
              rows={4}
              placeholder="Please enter the user description"
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default EditUserForm;
