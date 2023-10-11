import { Link, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

/*
Signed in
 - Profile (nav item)
  - all my posts => create, update, delete
  - messages to/from me
*/
export default function NavBar() {
  const token = useSelector((state) => state.auth.token);
  return (
    <div className="nav">
      <Link to="/my-closet">My Closet</Link>
      <Link to="/all-carousel">Carousel</Link>

      <Link to="/all-cards">Home</Link>

      <Link to="/all-cards">All Posts</Link>
      {!Boolean(token) && <Link to="/register">Register</Link>}
      {!Boolean(token) && <Link to="/login">Log In</Link>}
      <Link to="/customers-profile">Profile</Link>
      
    </div>
  );
}
