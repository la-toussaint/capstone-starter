import { createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isLoggedIn: false,
    customers: null,
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
      customers: action.payload,
      //   isLoggedIn:
    }),
    deleteClosetProduct_data: (state, action) => ({
      ...state,
      token: action.payload,
      isLoggedIn: Boolean(action.payload),
    }),
	addClosetProduct_data: (state, action) => ({
		...state,
		token: action.payload,
		isLoggedIn: Boolean(action.payload),
	  }),
  },
});

export const { setToken, setProfile, deleteClosetProduct_data, addClosetProduct_data } =
  authReducer.actions;
