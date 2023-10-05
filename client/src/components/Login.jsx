import React, { useState } from "react";
import {
  Grid,
  Paper,
  Link,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../API/ajax-helpers";
import { setToken, setProfile } from "./redux/index";

export default function Login({ message, setMessage }) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fav_brand, setFav_brand] = useState("");
  const [name, setName] = useState("");

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "50px auto",
  };
  const btnstyle = { margin: "8px 0" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    setUsername(username);
    setPassword(password);
    dispatch(setToken(result.token));
    dispatch(setProfile(result.profile));

    setMessage({
      type: "success",
      text: "You have successfully signed in!",
    });
    nav("/profile");
  };

  return (
    <Grid>
      <Paper className="login-paper" elevation={10} style={paperStyle}>
        <Grid className="login-grid" align="center">
          <h2>Sign In</h2>
        </Grid>
        <TextField
          label="Name"
          placeholder="Enter your name"
          fullWidth
          optional="true"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Username"
          placeholder="Enter username"
          fullWidth
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Favorite Brand"
          placeholder="Enter Favorite Apparel/Shoe Brand here"
          fullWidth
          optional="true"
          value={fav_brand}
          onChange={(e) => setFav_brand(e.target.value)}
        />
        <Button
          className="login-click"
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={handleSubmit}
        >
          Sign in
        </Button>
      </Paper>
    </Grid>
  );
}
