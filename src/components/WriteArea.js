import React, { useState, useContext } from "react";
import { AuthContext } from "../App";
import { Input } from "antd";
import firebase from "../configs/firebase";
const db = firebase.firestore();

const WriteArea = () => {
  const { state } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const sendMessage = () => {

    /* 
      FIXME: Send an object to Firestore containing "user", "text" and "created" (server timestamp)
    */
   
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
