import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    // TODO: Change login api provided by backend
    const request = await axios.get(`http://localhost/token`, userCredentials);
    const response = await request.data.data;
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userCredentials) => {
    // TODO: Change register api provided by backend
    const request = await axios.post(
      `http://localhost/register`,
      userCredentials
    );
    const response = await request.data.data;
    console.log(response);
    //   localStorage.setItem('user', JSON.stringify(response));
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload;
        }
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        if (action.error.message === "Request failed with status code 401") {
          state.error = "Access Denied! Invalid Credentials";
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default userSlice.reducer;
