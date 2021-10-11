import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import bugModel from "../../models/bugModel";
import setAuthToken from "../utils/setAuthToken";

const url = process.env.REACT_APP_API_URL;

// Load bugs from api
export const loadBugs = createAsyncThunk("bug/loadBugs", async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const bugs = await axios.get(`${url}/bugs`);

  let data: BugTypes[] = [];

  bugs.data.forEach((b: any) =>
    data.push(
      new bugModel({
        name: b.name,
        details: b.details,
        steps: b.steps,
        priority: b.priority,
        assigned: b.assigned,
        version: b.version,
        time: b.date,
        id: b._id,
        status: b.status,
      })
    )
  );

  return data;
});

// Create bug
export const createBug = createAsyncThunk(
  "bug/createBug",
  async (body: object) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // Check if bug already exists in db
    const bugExists = await axios.post(`${url}/bugs/name`, body, config);

    // If doesn't, continue
    if (!bugExists.data) {
      await axios.post(`${url}/bugs`, body, config);

      const bugs = await axios.get(`${url}/bugs`);

      let data: BugTypes[] = [];

      bugs.data.forEach((b: any) =>
        data.push(
          new bugModel({
            name: b.name,
            details: b.details,
            steps: b.steps,
            priority: b.priority,
            assigned: b.assigned,
            version: b.version,
            time: b.date,
            id: b._id,
            status: b.status,
          })
        )
      );

      return data;
    } else {
      throw Error("Bug of the same name already exists");
    }
  }
);

// Edit bug
export const editBug = createAsyncThunk("bug/editBug", async (body: object) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  await axios.post(`${url}/bugs`, body, config);

  const bugs = await axios.get(`${url}/bugs`);

  let data: BugTypes[] = [];

  bugs.data.forEach((b: any) =>
    data.push(
      new bugModel({
        name: b.name,
        details: b.details,
        steps: b.steps,
        priority: b.priority,
        assigned: b.assigned,
        version: b.version,
        time: b.date,
        id: b._id,
        status: b.status,
      })
    )
  );

  return data;
});

// Delete bug permanently
export const deleteBug = createAsyncThunk(
  "bug/deleteBug",
  async (id: string) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const res = await axios.delete(`${url}/bugs/${id}`);

    let data: BugTypes[] = [];

    res.data.forEach((b: any) =>
      data.push(
        new bugModel({
          name: b.name,
          details: b.details,
          steps: b.steps,
          priority: b.priority,
          assigned: b.assigned,
          version: b.version,
          time: b.date,
          id: b._id,
          status: b.status,
        })
      )
    );

    return data;
  }
);
