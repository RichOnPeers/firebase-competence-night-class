import React, { useReducer, createContext } from "react";
import SlackClone from "./components/SlackClone";
import "antd/dist/antd.css";
export const AuthContext = createContext();

const initialState = {
  user: localStorage.getItem("user"),
  name: localStorage.getItem("name"),
  isAuthenticated: localStorage.getItem("user") ? true : false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_EMAIL":
      localStorage.setItem("user", action.payload.user);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "LOGIN_GOOGLE":
      localStorage.setItem("user", action.payload.user);
      localStorage.setItem("name", action.payload.name);
      return {
        ...state,
        user: action.payload.user,
        name: action.payload.name,
        isAuthenticated: true,
      };
    case "LOAD_AVATAR":
      return {
        ...state,
        avatar: action.payload.avatarUrl,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        user: null,
        name: null,
        avatar: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <SlackClone />
    </AuthContext.Provider>
  );
};

export default App;
