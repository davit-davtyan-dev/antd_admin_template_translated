import React, { Component } from "react";
import { Form, Input, DatePicker, Select, Rate, Modal } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
// moment.locale("zh-cn");
class EditForm extends Component {
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
    const { id, author, date, readings, star, status, title } = currentRowData;
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
          {...formItemLayout}
          ref={this.formRef}
          initialValues={{
            id,
            title,
            author,
            readings,
            star: star.length,
            status,
            date: moment(date || "YYYY-MM-DD HH:mm:ss"),
          }}
        >
          <Form.Item name="id" label="Serial number:">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="title"
            label="title:"
            rules={[{ required: true, message: "Please enter the title!" }]}
          >
            <Input placeholder="title" />
          </Form.Item>
          <Form.Item name="author" label="author:">
            <Input disabled />
          </Form.Item>
          <Form.Item name="readings" label="Reading quantity:">
            <Input disabled />
          </Form.Item>
          <Form.Item name="star" label="Recommended:">
            <Rate count={3} />
          </Form.Item>
          <Form.Item name="status" label="condition:">
            <Select style={{ width: 120 }}>
              <Select.Option value="published">published</Select.Option>
              <Select.Option value="draft">draft</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="date"
            label="time:"
            rules={[
              {
                type: "object",
                required: true,
                message: "Please select time!",
              },
            ]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default EditForm;
