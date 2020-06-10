import React, { useState, useContext } from "react";
import { AuthContext } from "../App";
import { Input } from "antd";
import firebase from "../configs/firebase";
const db = firebase.firestore();

const WriteArea = () => {
  const { state } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    db.collection("messages")
      .add({
        user: state.user,
        text: message,
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        setMessage("");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <>
      <Input
        placeholder="Write a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onPressEnter={sendMessage}
        allowClear={true}
      />
    </>
  );
};

export default WriteArea;
