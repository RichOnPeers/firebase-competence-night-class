import React from "react";
import firebase from "../../configs/firebase";
import Notification from "../../helpers/notification";
import { Button, Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ForgotPasswordForm = (props) => {
  const handleForgotPassword = (values) => {
    const { email } = values;
    props.setSubmitting(true);

    /* 
      FIXME: Handle password reset, stop loading
      Notification("success", "Password reset", "Check your e-mail")
    */
  };

  return (
    <Form onFinish={handleForgotPassword}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Enter your e-mail" }]}
      >
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="E-mail"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Reset your password
        </Button>
      </Form.Item>
      <Button
        type="link"
        onClick={() => props.setIsForgotPassword(false)}
        style={{ padding: "4px 0px" }}
      >
        Back
      </Button>
    </Form>
  );
};

export default ForgotPasswordForm;
