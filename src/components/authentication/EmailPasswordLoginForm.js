import React, { useContext } from "react";
import { AuthContext } from "../../App";
import firebase from "../../configs/firebase";
import { Button, Form, Input, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const EmailPasswordLoginForm = (props) => {
  const { dispatch } = useContext(AuthContext);

  const handleEmailPasswordLogin = (values) => {
    const { email, password } = values;
    props.setSubmitting(true);

    /* 
      FIXME: Handle login, dispatch and stop loading
    */
  };

  return (
    <Form onFinish={handleEmailPasswordLogin}>
      <Form.Item
        name="email"
        rules={[
          { required: true, type: "email", message: "Enter your e-mail" },
        ]}
      >
        <Input
          prefix={
            <UserOutlined type="user" style={{ color: "rgba(0,0,0,.25)" }} />
          }
          placeholder="E-mail"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Input your password" }]}
      >
        <Input
          prefix={
            <LockOutlined type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
          }
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
      <div>
        <span>
          <Button
            type="link"
            onClick={() => props.setIsCreatingAccount(true)}
            style={{ padding: "4px 0px" }}
          >
            Create account
          </Button>
          <Divider type="vertical" />
          <Button
            type="link"
            onClick={() => props.setIsForgotPassword(true)}
            style={{ padding: "4px 0px" }}
          >
            Forgot password
          </Button>
        </span>
      </div>
    </Form>
  );
};

export default EmailPasswordLoginForm;
