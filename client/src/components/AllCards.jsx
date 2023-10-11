import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  fetchAllSneaks_data,
  sneaksPhotoBackground,
  newClosetSneaks_data,
} from "../API/ajax-helpers";
import ReactCardFlip from "react-card-flip";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import RemoveBackground from "remove-bg-node";

function AllCards() {
  const [products, productList] = useState([]);
  const [error, setError] = useState(null);
  const [isFlipped, setFlipped] = useState({});
  const [searchParam, setSearchParam] = useState(null);
  const [newClosetSneaks_data, addNewClosetsSneaks_data] = useState({});

  const renderImages = () => {
    sneaksPhotoBackground()
      .then((crossoriginMeAvailable) => {
        return imageUrls.map((imageUrl, index) => (
          <img
            src={
              crossoriginMeAvailable
                ? `https://crossorigin.me/${imageUrl}`
                : `https://cors-anywhere.herokuapp.com/${imageUrl}`
            }
            alt={`Image ${index}`}
            key={`image-${index}`}
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
        productList(results);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    const filteredProducts = products.filter((p) => {
      return p?.sneaks_data.toLowerCase().includes(searchParam);
    });
    productList(filteredProducts);
  }, [searchParam]);

  const handleClick = (id) => {
    setFlipped({ ...isFlipped, [id]: !isFlipped[id] });
    NewClosetsSneaks_data(...add, [closetSneaks_data_id]);
  };
  return (
    <div className="product-card-container">
      <SearchBar setSearchParam={setSearchParam} />
      {products.map((product, i) => {
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
                  onClick={() => setFlipped(product.sneaks_data_id)}
                >
                  See Details
                </button>
                {isLoggedIn && (
                  <button
                    className="add"
                    onClick={() =>
                      addNewClosetSneaks_data(product.sneaks_data_id)
                    }
                  >
                    Add to Your Closet
                  </button>
                )}
              </div>
              <div className="flip-card-back">
                <img
                  className="flip-back-img"
                  src={product.product_photo}
                  alt={`${i + 1}`}
                />
                <p> {product.asin}</p>
                <p>{product.product_title}</p>
                <p>
                  {product.product_price},{product.currency}
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
                <button
                  className="flip"
                  onClick={() => setFlipped(product.sneaks_data_id)}
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

export default AllCards;
