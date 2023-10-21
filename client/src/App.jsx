import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Register from "./components/Register";
import Login from "./components/Login";
import { Messages } from "./components/Messages";

import SingleProfile from "./components/SingleProfile";
import SpinCarousel from "./components/KicksCloset";
import Closet from "./components/CostumesCloset";
import NavBar from "./components/Navbar";
import AllCards from "./components/AllClosets";
import Home from "./components/Home";
import "./index.css";

import { fetchProfile, testAuth } from "./API/ajax-helpers";
import { setToken, setProfile } from "./components/redux/index";
import { Routes, Route } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  console.log("isLoggedIn:", isLoggedIn);

  if (!isLoggedIn) {
    return (
      <div style={{ marginTop: "10em", backgroundColor: "red" }}>
        You Are Not Authorized To View This Route
      </div>
    );
  }

  return <>{children}</>;
};

export default function App(customers, username, password, result, isLoggedIn) {
  console.log("customers: ", customers, username, password);
  const [message, setMessage] = useState(null);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (isLoggedIn) {
      testAuth(token).then((result) =>
        console.log("customer is authorized", result)
      );
      //   fetchProfile(token)(dispatch).then((data) => {
      //    (setProfile(data));
    }
  }, [isLoggedIn, token]);

  return (
    <>
      <NavBar />
      <Routes>
       
		 <Route path="/" element={<Home />} />
		<Route path="/my-closet" element={<CostumesCloset />} />
		<Route path="/all-carousel" element={<KicksCloset />} />
		<Route path="/all-cards" element={<AllClosets />} />
        <Route
          path="/custom-carousel"
          element={
            <AuthRoute token={token}>
              <CustomCarousel />
            </AuthRoute>
          }
        />
        <Route
          path="/login/login"
          element={
            <Login
              setMessage={setMessage}
              setToken={setToken}
              setProfile={setProfile}
            />
          }
        />
        <Route
          path="/login/register"
          element={
            <Register
              customers={customers}
              setToken={setToken}
              setMessage={setMessage}
              setProfile={setProfile}
            />
          }
        />
        {
          <Route
            path="/profile"
            element={<SingleProfile customers={customers} token={token} />}
          />
        }
		<Route path="/contact-us" element={<Contact />} />
      </Routes>
      {message && <Messages message={message} onClose={setMessage} />}
    </>
  );
}
