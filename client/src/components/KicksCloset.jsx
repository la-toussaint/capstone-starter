import Carousel from "react-spring-3d-carousel";
import React, { useState, useEffect } from "react";
import {
  fetchAllSneaks_data,
  sneaksPhotoBackground,
  costumesPhotoBackground,
  addClosetSneaks_data,
  deleteClosetSneaks_data,
  addClosetCostumes_data,
  deleteClosetCostumes_data,
  addClosetProduct_data,
  deleteClosetProduct_data,
} from "../API/ajax-helpers";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import RemoveBackground from "remove-bg-node";

function KicksCloset() {
  const [products, productList] = useState([]);
  const [error, setError] = useState(null);

  const [searchParam, setSearchParam] = useState(null);
  const [closetSneaks_data, addClosetSneaks_data] = useState({});

  const renderImages = () => {
    sneaksPhotoBackground()
      .then((crossoriginMeAvailable) => {
        return imageUrls.map((imageUrl, id) => (
          <img
            src={
              crossoriginMeAvailable
                ? `https://crossorigin.me/${imageUrl}`
                : `https://cors-anywhere.herokuapp.com/${imageUrl}`
            }
            alt={`Image-${index}`}
            key={`image-${id}`}
            type="image/png"
            crossOrigin="anonymous"
          />
        ));
      })
      .catch((error) => {
        console.error("Error checking crossorigin.me availability:", error);
      });
  };

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
    addClosetSneaks_data({ ...[sneaks_data_id] });
  };
  return (
    <div className="kicks-closet-background-container">
      <SearchBar setSearchParam={setSearchParam} />
      {products.map((product, i) => {
        return (
          <div className="no-root-background">
            {Boolean(products.length > 0) && (
              <div className="kick-div" style={{ height: "400px" }}>
                <Carousel
                  className="kick-carousel"
                  slides={products}
                  showNavigation
                  animationConfig={{ tension: 400, friction: 300 }}
                  goToSlideDelay={100}
                  offsetRadius={3}
                  offsetFromRadius={(index) => index * 50} // Corrected offsetFromRadius
                  opacity={() => 1} // Corrected opacity
                />
                <button
                  className="add"
                  onClick={() => addClosetSneaks_data(product.sneaks_data_id)}
                >
                  Add to Your Closet
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default KicksCloset;
