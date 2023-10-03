import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchAllSneaks_data, deletePost } from "../API/ajax-helpers";
import ReactCardFlip from "react-card-flip";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

export default function AllCards() {
  const [posts, postList] = useState([]);
  const [error, setError] = useState(null);
  const [isFlipped, setFlipped] = useState({});
  const [searchParam, setSearchParam] = useState(null);
  const navigate = useNavigate();
  const renderImages = () => {
    checkIfCrossoriginMeAvailable()
      .then((crossoriginMeAvailable) => {
        return imageUrls.map((imageUrl, index) => (
          <img
            src={
              crossoriginMeAvailable
                ? `https://crossorigin.me/${imageUrl}`
                : `https://cors-anywhere.herokuapp.com/${imageUrl}`
            }
            alt
            id="image-alt"
            type="image/png"
          />
        ));
      })
      .catch((error) => {
        console.error("Error checking crossorigin.me availability:", error);
      });
  };
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    fetchAllSneaks_data()
      .then((results) => {
        return;

        postList(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    const filteredProduct = product.filter((p) => {
      return p?.sneaks_data.toLowerCase().includes(searchParam);
    });
    postList(filteredPosts);
  }, [searchParam]);

  const handleClick = (id) => {
    setFlipped({ ...isFlipped, [id]: !isFlipped[id] });
  };
  return (
    <div className="product-card-container">
      <SearchBar setSearchParam={setSearchParam} />
      {results.data.product.map((product, i) => {
        return (
          <div className="product-card" key={product.product_title}>
            <ReactCardFlip
              flipDirection="horizontal"
              isFlipped={isFlipped[product.product_title]}
            >
              <div className="flip-card-front">
                <img
                  className="flip-front-img"
                  src={product.product_photo}
                  alt={`${i + 1}`}
                />

                <div> {product.product_title}</div>

                <button
                  className="details"
                  onClick={() => handleClick(product.product_title_id)}
                >
                  See Details
                </button>
                {isLoggedIn && (
                  <button
                    className="delete"
                    onClick={() => deleteProduct(product.product_title_id)}
                  >
                    Delete post
                  </button>
                )}
              </div>
              <div className="flip-card-back">
                <img
                  className="flip-back-img"
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
                <button
                  className="flip"
                  onClick={() => handleClick(product.product_title_id)}
                >
                  Flip over
                </button>
              </div>
            </ReactCardFlip>
          </div>
        );
      })}
    </div>
  );
}
