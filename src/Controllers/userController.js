// import userModel from "../Models/userModel";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "./utils/setAuthToken";
// import qs from "qs";

const url = process.env.REACT_APP_API_URL;

export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const res = await axios.get(`${url}/user`);

  return res;
});

export const signIn = createAsyncThunk("auth/logUser", async (body) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const res = await axios.post(`${url}/auth`, body, config);

  return res;
});

export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const res = await axios.get(`${url}/user/all`);

  return res;
});
