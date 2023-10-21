import React, { useState } from "react";
import { submitForm, authenticateUser } from "../API/ajax-helpers"; // Replace with your actual API functions
import { useDispatch, useSelector } from "react-redux";
import { setToken, setProfile } from "./redux"; // Replace with your Redux actions

export default function ContactForm() {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Access the Redux state to check if the user is authenticated
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      // User is logged in
      // Handle the contact form as needed (e.g., send a message)
    } else {
      // User is not logged in
      if (username && password) {
        // User provided username and password, attempt to authenticate
        const authenticationResult = await authenticateUser(username, password);
        if (authenticationResult.success) {
          // Authentication successful, store the token and handle the contact form
          dispatch(setToken(authenticationResult.token));
          dispatch(setProfile(authenticationResult.profile));
          // Handle the contact form as needed
        } else {
          // Authentication failed, you can display an error message
        }
      } else {
        // User didn't provide username and password, you can display a message
      }
    }

    resetForm();
    setSubmitted(true);
  };

  const resetForm = () => {
    setLastname("");
    setFirstname("");
    setEmail("");
    setQuery("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="contact-us-background-container">
      {submitted && (
        <h1 className="contact-us-submitted-h1">
          Thank you for taking time to contact us! We appreciate it.
        </h1>
      )}

      <form className="contact-us-form" onSubmit={handleSubmit}>
        <h3 className="contact-us-h3">
          We always want to hear from you! Please provide ClosetShoppers staff
          with contact info via this secure form so we may send you tailored
          events and updates, and/or use the form anytime to ask questions/leave
          comments.
        </h3>
        <div>
          <label>
            Last Name:
            <input
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
            />
          </label>
          {/* Add First Name and Email fields here similarly */}
        </div>
        {isLoggedIn ? null : (
          <div>
            <label>
              Username:
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <hr />
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
        )}
        <hr />
        <div>
          <button className="reset" type="reset" onClick={resetForm}>
            Reset form
          </button>
          <button className="submit" type="submit">
            Submit form
          </button>
          <button className="templates-click" path={"/"}>
            Home
          </button>
          <button className="shop-click" path={"/all-cards"}>
            Browse All Items
          </button>
          <button className="profile-click" path={"/profile"}>
            Your Profile Page
          </button>
        </div>
      </form>
    </div>
  );
}
