import { login } from  "../../../../Coursework/Unit03/2306-GHP-ET-WEB-FT-SF/2306-GHP-ET-WEB-FT-SF/Unit-04/PokemonApp-Unit4/Pokemon-app/client/src/API/ajax-helpers";
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
import { setToken } from "../../../../Coursework/Unit03/2306-GHP-ET-WEB-FT-SF/2306-GHP-ET-WEB-FT-SF/Unit-04/PokemonApp-Unit4/Pokemon-app/client/src/components/redux/index";

export default function Login({ setToken, message, setMessage }) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fav_pokemon, setFav_pokemon] = useState("");
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
    console.log(username, password);
    const register = await login(username, password);
    setToken(register.data.token);
    console.log(register);
    setUsername("");
    setPassword("");
	setMessage({ text: message, type: "success" });
    nav("/posts");
 

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
            label="Favorite Pokémon"
            placeholder="Enter Pokémon name"
            fullWidth
            optional="true"
            value={fav_pokemon}
            onChange={(e) => setFav_pokemon(e.target.value)}
          />
          <Button
            className="login-click"
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={loginUser}
          >
            Sign in
          </Button>
        </Paper>
      </Grid>
    );
  };
}
