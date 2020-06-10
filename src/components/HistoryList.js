import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../App";
import { Layout, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import firebase from "../configs/firebase";
const db = firebase.firestore();
const storage = firebase.storage();
const { Content } = Layout;

const HistoryList = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [messages, setMessages] = useState(null);

  useEffect(() => {

    /* 
      FIXME: 
      Get and listen to collection "messages"
      Order messages by "created"
    */

  }, []);

  const removeEntry = ({ docId }) => {
    db.collection("messages")
      .doc(docId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadAvatar(e.dataTransfer.files[0]);
  };

  const uploadAvatar = async (image) => {
    const url = `/avatar/${state.user}/${image.name}`;

    /* 
      FIXME: 
      Upload image (avatar) to "storage" with "url" constant
      Call "setUserAvatar" passing the url
    */
  };

  const setUserAvatar = async (url) => {
    
    /* 
      FIXME: 
      Set "avatar" in collection "users" for the logged in user "state.user"
      Fetch the storage bucket URL from the "url"
      Dispatch "LOAD_AVATAR" passing it "payload => avatarUrl"
    */
   
  };

  return (
    <Content style={{ padding: "24px 0 8px" }}>
      <div
        style={{ background: "#f3f3f3", padding: 12, minHeight: 300 }}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDragEnter={(e) => handleDragEnter(e)}
      >
        {messages &&
          messages.map((message) => (
            <div
              key={message.docId}
              style={{
                marginBottom: "18px",
                textAlign: state.user === message.user ? "left" : "right",
              }}
            >
              <span>{message.text}</span>
              {state.user === message.user ? (
                <Button
                  type="danger"
                  shape="circle"
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={() => removeEntry(message)}
                  style={{ marginLeft: "8px" }}
                />
              ) : (
                <div>
                  <span style={{ fontSize: "11px", fontStyle: "italic" }}>
                    {message.user}
                  </span>
                </div>
              )}
            </div>
          ))}
      </div>
    </Content>
  );
};

export default HistoryList;
