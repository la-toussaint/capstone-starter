import { useSelector, useDispatch } from "react-redux";
import NavBar from "../../../../Coursework/2306-GHP-ET-WEB-FT-SF/2306-GHP-ET-WEB-FT-SF/Unit-04/PokemonApp-Unit4/PokemonApp-Unit4/client/src/components/Navbar";
import { useState } from "react";
import {
  fetchProfile,
  deletePost,
} from "../../../../Coursework/2306-GHP-ET-WEB-FT-SF/2306-GHP-ET-WEB-FT-SF/Unit-04/PokemonApp-Unit4/PokemonApp-Unit4/client/src/API/ajax-helpers";
import {
  setProfile,
  deletePostFromProfile,
} from "../../../../Coursework/2306-GHP-ET-WEB-FT-SF/2306-GHP-ET-WEB-FT-SF/Unit-04/PokemonApp-Unit4/PokemonApp-Unit4/client/src/components/redux/index";
import React from "react";

export default function ProfileLog() {
  //   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  //   const users = useSelector((state) => state.auth.users);
  //   const token = useSelector((state) => state.auth.token);
  const [isOpen, setIsOpen] = useState(true);
  const [products, productList] = useState([]);
  const [deleteProductFromProfile] = useState("");
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

  const handlePostDelete = (token, pokedata_id) => {
    deletePost(token, sneaks_data_id);
    deletePostFromProfile(id);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-header">Products for Username: {customers?.username}</h2>
      <div>
        <button className="profile-log-button" onClick={handleToggleDropdown}>
          {isOpen ? "Hide Logs" : "Show Logs"}
        </button>
        {isOpen && (
          <ul className="profile-log-list">
            {customers?.products?.map((product) => (
              <li className="profile-log-item" key={product.product_title}>
                Pokémon Image:{" "}
                <img
                  className="post-img"
				  src={product.product_photo}
                  alt={`${i + 1}`}
                />
                <p> {asin}</p>
                <p>{product_title}</p>
                <p>
                  {product_price}
                  {currency}
                </p>
                <p>
                  {product_original_price}
                  {currency}
                </p>
                <p>{product_star_rating}</p>
                <p>{product_num_ratings}</p>
                <p>{product_url}</p>
                <p>{is_best_seller}</p>
                <p> {is_prime}</p>
                <p> {climate_pledge_friendly}</p>
                <img
                  className="post-img-back"
                  src={post.post_g_max_image}
                  alt={post.pokename - "Giga"}
                />
                , Pokémon G-Max Move: {post.g_max_move}, Pokémon G-Max Move
                Type: {post.g_max_move_type}, Pokémon Height: {post.height},
                Pokémon Weight: {post.weight}, Pokémon Post-Gmax Height:{" "}
                {post.post_g_max_height}, REPRODUCTION: Pokémon Gender:{" "}
                {post.gender}, Pokémon Egg Group: {post.egg_group}, Pokémon
                Compatible Parent: {post.comp_parent}
                <button
                  className="delete"
                  onClick={() => handlePostDelete(token, pokedata_id)}
                  disabled={users.pokedata_id !== post.pokedata}
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
