import { createSlice } from "@reduxjs/toolkit";

export const authplusReducer = createSlice({
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

    name: "todo",
    initialTodos: [
      {
        id: "a",
        task: "User has account - Validate User: (i) if not logged in, reveal username and password fields in form, (ii) process login function on submit (iii) add details to customer profile, (iv) success message upon successful login; if user logged in, only complete (iii)",
        complete: false,
      },
      {
        id: "b",
        task: "Checked box - Register user: (i) reveal username and password fields in form, (ii) process RegisterCustomers function on submit (iii) success message upon successful registration",
        complete: false,
      },
      {
        id: "c",
        task: "Checked box - Does not want CS acct: (i) store details under guest user, move on to contact form",
        complete: false,
      },
    ],

    undoTodo: null,
    setTodoComplete: false,
    setUndoTodoComplete: true,
  },
  reducers: {
    todo: (state, action) => ({
      ...state,
      id: action.payload,
      setTodoComplete: Boolean(action.payload),
    }),
    undoTodo: (state, action) => ({
      ...state,
      id: action.payload,
      setUndoTodoComplete: Boolean(action.payload),
    }),
  },
});

export const {
  setToken,
  setProfile,
  deleteClosetProduct_data,
  addClosetProduct_data,
  setTodoComplete,
  setUndoTodoComplete,
} = authplusReducer.actions;
