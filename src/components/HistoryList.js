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
    const unsubscribe = db
      .collection("messages")
      .orderBy("created", "asc")
      .onSnapshot((querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
          messages.push({ ...doc.data(), ...{ docId: doc.id } });
        });
        setMessages(messages);
      });
    return () => {
      unsubscribe();
    };
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
    storage
      .ref(url)
      .put(image)
      .catch(() => console.error)
      .then(() => {
        console.log("Avatar uploaded!");
        setUserAvatar(url);
      });
  };

  const setUserAvatar = async (url) => {
    await db
      .collection("users")
      .doc(state.user)
      .set({
        avatar: url,
      })
      .catch(() => console.error)
      .then(() => console.log(`${state.user} has avatar in bucket ${url}`));
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
