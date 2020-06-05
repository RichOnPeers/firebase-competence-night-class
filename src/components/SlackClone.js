import React, { useContext } from "react";
import { AuthContext } from "../App";
import UserAuth from "./UserAuth";
import HistoryList from "./HistoryList";
import WriteArea from "./WriteArea";
import { Layout } from "antd";
const { Content } = Layout;

const SlackClone = () => {
  const { state } = useContext(AuthContext);
  return (
    <>
      <Layout className="layout">
        <Content style={{ padding: "20px" }}>
          <div
            style={{
              background: "#fff",
              padding: 24,
              maxWidth: 1000,
              margin: "auto",
            }}
          >
            <UserAuth />
            {state.user && <SlackCloneContainer />}
          </div>
        </Content>
      </Layout>
    </>
  );
};

const SlackCloneContainer = () => {
  return (
    <>
      <HistoryList />
      <WriteArea />
    </>
  );
};

export default SlackClone;
