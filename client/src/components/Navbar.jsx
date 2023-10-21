import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "../index.css"; // Import your CSS file

function NavBar() {
  const token = useSelector((state) => state.auth.token);
  // Get the current location (route) using react-router's useLocation
  const location = useLocation();

  // Determine which CSS class to apply based on the current route
  const getBackgroundClass = () => {
    if (location.pathname === "/my-closet") {
      return "costumes-closet-background-container";
    } else if (location.pathname === "/all-carousel") {
      return "kicks-closet-background-container";
    } else if (location.pathname === "/contact-us") {
      return "contact-us-background";
    } else if (location.pathname === "/") {
      return "home-background";

      // Add other route-specific checks as needed
    }

    return (
      <div className={`nav ${getBackgroundClass()}`}>
        <Link to="/my-closet">Costumes Closet</Link>
        <Link to="/all-carousel">Kicks Closet</Link>
        <Link to="/all-cards">Browse All Items</Link>
        <Link to="/custom-carousel">Custom Carousel</Link>
        <Link to="/home">Home</Link>
        {!Boolean(token) && <Link to="/register">Register</Link>}
        {!Boolean(token) && <Link to="/login">Log In</Link>}
        <Link to="/profile">Your Profile</Link>
        <Link to="/contact-us">Contact Us</Link>
      </div>
    );
  };
}

export default NavBar;

/*
Signed in
 - Profile (nav item)
  - all my posts => create, update, delete
  - messages to/from me
*/
/*
Not Signed In
Menu with options to:
- Look at all posts (seed data)
	- this means that posts will default to sneakers
	- closet defaults to sneaker closet/shop
- Go to closet/template menu
- Go to register/login menu
	- profile is listed under login and will have explanation
- Go to About Menu without having to go to closets
- Contact Us page
*/
