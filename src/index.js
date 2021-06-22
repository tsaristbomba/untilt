import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

// Reducers
import authReducer from "./Controllers/Redux/authSlice";
import bugReducer from "./Controllers/Redux/bugSlice";
import userReducer from "./Controllers/Redux/userSlice";
import alertReducer from "./Controllers/Redux/alertSlice";

// Redux Config
const reducer = combineReducers({
  auth: authReducer,
  bugs: bugReducer,
  user: userReducer,
  alert: alertReducer,
});

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

// Redux store
const store = configureStore({
  reducer,
  middleware: customizedMiddleware,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
