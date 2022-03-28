import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, message, Spin, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import { login, getUserInfo } from "@/store/actions";
import BackgroundImage from "@/assets/images/farm-bg.jpg";
import "./index.less";

const Login = (props) => {
  const { token, login, getUserInfo } = props;
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const handleLogin = (username, password) => {
    // After the login is completed, send the request call interface to get user information
    setLoading(true);
    login(username, password)
      .then((data) => {
        message.success("login successful");
        handleUserInfo(data.token);
      })
      .catch((error) => {
        setLoading(false);
        message.error(error);
      });
  };

  // Get user information
  const handleUserInfo = (token) => {
    getUserInfo(token)
      .then((data) => {})
      .catch((error) => {
        message.error(error);
      });
  };

  const handleSubmit = () => {
    // Test all form fields
    const values = form.getFieldsValue();
    form
      .validateFields()
      .then(async (values) => {
        const { username, password } = values;
        handleLogin(username, password);
      })
      .catch(({ errorFields }) => {
        form.scrollToField(errorFields?.[0]?.name);
      });
  };

  if (token) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <DocumentTitle title="Login">
      <Row className="container">
        <Col xxl={6} xl={8} md={10} className="login-form-container">
          <Form
            form={form}
            onFinish={handleSubmit}
            className="content"
            initialValues={{
              username: "admin",
            }}
          >
            <Form.Item>
              <span>Account: admin Password: Just fill in</span>
              <br />
              <span>Account: Editor Password: Just fill in</span>
              <br />
              <span>Account: Guest Password: Just fill in</span>
            </Form.Item>
            <div className="title">
              <h2>Login</h2>
            </div>
            <Spin spinning={loading} tip="logging in...">
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please enter user name",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please enter your password",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>
            </Spin>
          </Form>
        </Col>
        <Col xxl={18} xl={16} md={14} className="image-container">
          <img src={BackgroundImage} />
        </Col>
      </Row>
    </DocumentTitle>
  );
};

export default connect((state) => state.user, { login, getUserInfo })(Login);
