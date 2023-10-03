import { react, useState } from "react";
import { setToken } from "client/src/components/redux/index";
import { registerUser } from "../../../../../Coursework/Unit03/2306-GHP-ET-WEB-FT-SF/2306-GHP-ET-WEB-FT-SF/Unit-04/PokemonApp-Unit4/Pokemon-app/client/src/API/ajax-helpers";
import { useNavigate } from "react-router-dom";

const BASE_URL = `http://localhost:8080`;
export const BASE_URL_USER_REG = `${BASE_URL}/api/auth/register`;

export default function Register({ setToken }) {
  const [name, setName] = useState("");
  const [fav_pokemon, setFav_pokemon] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    const register = await registerUser(username, password);
    setToken(register.token);
    console.log(register);
    setUsername("");
    setPassword("");
    setMessage({
      type: "success",
      text: successMessage(
        "Success! You have been registered. Thank you for signing up."
      ),
    });
    nav("/posts");
  };

  return (
    <>
      <h2 className="sign-up">New User Sign-Up</h2>
      {error && <p className="sign-up-error">{error}</p>}
      {successMessage && <p className="sign-up-success">{successMessage}</p>}
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <label>
          Name: <br />
          <input
            placeholder="name - optional"
            optional="true"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
        </label>
        <label>
          Username: <br />
          <input
            placeholder="username - REQUIRED"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
        </label>
        <label>
          Password:
          <br />
          <input
            placeholder="password - REQUIRED"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
        </label>
        <label>
          Favorite Pokémon:
          <br />
          <input
            placeholder="favorite pokémon - optional"
            optional="true"
            value={fav_pokemon}
            onChange={(e) => setFav_pokemon(e.target.value)}
          />
          <br />
        </label>
        <br />
        <button className="signup-click" type="submit">
          Submit
        </button>
      </form>
      {!(username.length >= 8) && (
        <p style={{ color: "linen", backgroundColor: "#0072b5" }}>
          No more than an 8-character password please.
        </p>
      )}
    </>
  );
}
