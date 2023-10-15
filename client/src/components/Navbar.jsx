import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles.css"; // Import your CSS file

function NavBar() {
  const token = useSelector((state) => state.auth.token);
  // Get the current location (route) using react-router's useLocation
  const location = useLocation();

  // Determine which CSS class to apply based on the current route
  const getBackgroundClass = () => {
    if (location.pathname === "/my-closet") {
      return "my-closet-background";
    } else if (location.pathname === "/all-carousel") {
      return "sneaker-shop-background";
    } else if (location.pathname === "/contact-us") {
      return "contact-us-background";
    } else if (location.pathname === "/nav") {
      return "home-background";

      // Add other route-specific checks as needed
    }

    return (
      <div className={`nav ${getBackgroundClass()}`}>
        <Link to="/my-closet">Halloween Shop</Link>
        <Link to="/all-carousel">Sneaker Shop</Link>
        <Link to="/all-cards">Browse All Items</Link>
        <Link to="/all-carousel">Sneaker Shop</Link>
        <Link to="/nav">Home</Link>
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
