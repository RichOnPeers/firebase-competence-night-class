import React, { useContext } from "react";
import { AuthContext } from "../../App";
import firebase from "../../configs/firebase";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const CreateAccountForm = (props) => {
  const { dispatch } = useContext(AuthContext);

  const handleCreateAccount = async (values) => {
    const { email, password } = values;
    props.setSubmitting(true);

    /* 
      FIXME: Create user, dispatch and stop loading
    */
   
  };

  return (
    <Form onFinish={handleCreateAccount}>
      <Form.Item
        name="email"
        rules={[
          { required: true, type: "email", message: "Enter your e-mail" },
        ]}
      >
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="E-mail"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Pick a password" }]}
      >
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Create account
        </Button>
      </Form.Item>
      <div>
        <span>
          <Button
            type="link"
            onClick={() => props.setIsCreatingAccount(false)}
            style={{ padding: "4px 0px" }}
          >
            Log in with existing account
          </Button>
        </span>
      </div>
    </Form>
  );
};

export default CreateAccountForm;
