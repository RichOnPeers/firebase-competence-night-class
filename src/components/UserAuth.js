import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../App";
import firebase from "../configs/firebase";
import CreateAccountForm from "./authentication/CreateAccountForm";
import EmailPasswordLoginForm from "./authentication/EmailPasswordLoginForm";
import ForgotPasswordForm from "./authentication/ForgotPasswordForm";
import { Button, Card, Col, Row, Spin, Avatar } from "antd";
import { GoogleOutlined, CheckOutlined, UserOutlined } from "@ant-design/icons";
const storage = firebase.storage();
const db = firebase.firestore();

const UserAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  useEffect(() => {
    if (state.user) {
      const user = db.collection("users").doc(state.user);
      user
        .get()
        .then((doc) => {
          if (doc.exists && doc.data().avatar) {
            const url = doc.data().avatar;
            storage
              .ref()
              .child(url)
              .getDownloadURL()
              .then((avatarUrl) => {
                dispatch({
                  type: "LOAD_AVATAR",
                  payload: {
                    avatarUrl,
                  },
                });
              })
              .catch((error) => {
                console.log("Error", error);
              });
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  }, [dispatch, state.user]);

  const googlePopupLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(
        async (result) => {
          dispatch({
            type: "LOGIN_GOOGLE",
            payload: {
              id: result.additionalUserInfo.profile.id,
              user: result.user.email,
              name: result.additionalUserInfo.profile.name,
              type: "google",
            },
          });
          setSubmitting(false);
        },
        (err) => {
          window.alert("Login issue ", err.message);
        }
      );
  };

  const googleLogin = () => {
    setSubmitting(true);
    googlePopupLogin();
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          dispatch({
            type: "LOGOUT",
          });
        },
        (err) => {
          window.alert("Logout issue ", err.message);
        }
      );
  };

  if (isSubmitting) {
    return (
      <>
        <div
          style={{
            height: "200px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Spin size="large" />
        </div>
      </>
    );
  }

  if (!state.isAuthenticated) {
    return (
      <div style={{ background: "#ECECEC" }}>
        <Row gutter={[40, 40]} style={{ maxWidth: "1000px", margin: "auto" }}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Card title="Google login" bordered={true}>
              <Button type="primary" onClick={googleLogin}>
                <GoogleOutlined /> Log in with Google
              </Button>
              <Row style={{ marginTop: "10px" }}>
                <span>
                  <CheckOutlined style={{ color: "#52c41a" }} /> One Click Login
                </span>
              </Row>
              <Row>
                <span>
                  <CheckOutlined style={{ color: "#52c41a" }} /> Pair with OAUTH
                  to access GAPI
                </span>
              </Row>
            </Card>
          </Col>
          {isForgotPassword && (
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Card title="Forgot password" bordered={true}>
                <ForgotPasswordForm
                  setIsForgotPassword={setIsForgotPassword}
                  setSubmitting={setSubmitting}
                />
              </Card>
            </Col>
          )}
          {!isForgotPassword && isCreatingAccount && (
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Card title="Create account" bordered={true}>
                <CreateAccountForm
                  setIsCreatingAccount={setIsCreatingAccount}
                  setSubmitting={setSubmitting}
                />
              </Card>
            </Col>
          )}
          {!isForgotPassword && !isCreatingAccount && (
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Card title="Log in with e-mail" bordered={true}>
                <EmailPasswordLoginForm
                  setIsCreatingAccount={setIsCreatingAccount}
                  setIsForgotPassword={setIsForgotPassword}
                  setSubmitting={setSubmitting}
                />
              </Card>
            </Col>
          )}
        </Row>
      </div>
    );
  }

  return (
    <div style={{ marginLeft: "auto", marginRight: "20px" }}>
      <span style={{ marginRight: "10px" }}>
        {state.avatar ? (
          <Avatar src={state.avatar} />
        ) : (
          <Avatar icon={<UserOutlined />} />
        )}
      </span>
      {state.name ? <span>{state.name}</span> : <span>{state.user}</span>}
      <Button type="danger" onClick={logout} style={{ marginLeft: "10px" }}>
        Log out
      </Button>
    </div>
  );
};

export default UserAuth;
