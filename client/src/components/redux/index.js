import { createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isLoggedIn: false,
    users: null,
  },
  reducers: {
    setToken: (state, action) => ({
      ...state,
      token: action.payload,
      isLoggedIn: Boolean(action.payload),
      //   users: action.payload,
    }),
    setProfile: (state, action) => ({
      ...state,
      users: action.payload,
      //   isLoggedIn:
    }),
    deletePostFromProfile: (state, action) => ({
      ...state,
      token: action.payload,
      isLoggedIn: Boolean(action.payload),
    }),
  },
});

export const { setToken, setProfile, deletePostFromProfile } =
  authReducer.actions;