import { useSelector, useDispatch } from "react-redux";
import NavBar from "./Navbar";
import { useState } from "react";
import { fetchProfile, deleteClosetSneaks_Data, deleteClosetCostumes_Data } from "../API/ajax-helpers";
import { setProfile, setToken } from "./redux/index";
import React from "react";

export default function ProfileLog() {
  //   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  //   const users = useSelector((state) => state.auth.users);
  //   const token = useSelector((state) => state.auth.token);
  const [isOpen, setIsOpen] = useState(true);
  const [products, productList] = useState([]);
  const [removeProductFromProfile] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customers, setProfile] = useState(null);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isLoggedIn) {
      fetch(token).then((result) => {
        console.log("foo", result);
        dispatch(setProfile(result));
      });
    }
  }, [isLoggedIn]);

  const renderImages = () => {
    const product_title = { product_title };
    checkIfCrossoriginMeAvailable()
      .then((crossoriginMeAvailable) => {
        return imageUrls.map((imageUrl, index) => (
          <img
            src={
              crossoriginMeAvailable
                ? `https://crossorigin.me/${imageUrl}`
                : `https://cors-anywhere.herokuapp.com/${imageUrl}`
            }
            crossorigin="anonymous"
            alt={product_title}
            type="image/png"
          />
        ));
      })
      .catch((error) => {
        console.error("Error checking crossorigin.me availability:", error);
      });
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePostDelete = (token, sneaks_data_id) => {
    deleteClosetSneaks_data(token, sneaks_data_id);
    deletePostFromProfile(id);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-header">
        Products for Username: {customers?.username}
      </h2>
      <div>
        <button className="profile-log-button" onClick={handleToggleDropdown}>
          {isOpen ? "Hide Logs" : "Show Logs"}
        </button>
        {isOpen && (
          <ul className="profile-log-list">
            {customers?.products?.map((product) => (
              <li className="profile-log-item" key={product.sneaks_data_id}>
                Pokémon Image:{" "}
                <img
                  className="post-img"
                  src={product.product_photo}
                  alt={`${i + 1}`}
                />
                <p> {product.asin}</p>
                <p>{product.product_title}</p>
                <p>
                  {product.product_price}
                  {product.currency}
                </p>
                <p>
                  {product.product_original_price}
                  {product.currency}
                </p>
                <p>{product.product_star_rating}</p>
                <p>{product.product_num_ratings}</p>
                <p>{product.product_url}</p>
                <p>{product.is_best_seller}</p>
                <p> {product.is_prime}</p>
                <p> {product.climate_pledge_friendly}</p>
                <img
                  className="post-img-back"
                  src={post.post_g_max_image}
                  alt={post.pokename - "Giga"}
                />
                <p> {product.asin}</p>
                <p>{product.product_title}</p>
                <p>
                  {product.product_price}
                  {product.currency}
                </p>
                <p>
                  {product.product_original_price}
                  {product.currency}
                </p>
                <p>{product.product_star_rating}</p>
                <p>{product.product_num_ratings}</p>
                <p>{product.product_url}</p>
                <p>{product.is_best_seller}</p>
                <p> {product.is_prime}</p>
                <p> {product.climate_pledge_friendly}</p>{" "}
                <button
                  className="delete"
                  onClick={() => handlePostDelete(token, { sneaks_data_id })}
                  disabled={customers.sneaks_data_id !== product.sneaks_data_id}
                >
                  Delete post
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
