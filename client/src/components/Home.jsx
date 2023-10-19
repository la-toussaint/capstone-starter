import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  fetchAllSneaks_data,
  sneaksPhotoBackground,
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
import "../index.css";

function Home() {
  const [products, productList] = useState([]);
  const [error, setError] = useState(null);

  const [searchParam, setSearchParam] = useState(null);
  const [closetProduct_data, addClosetProduct_data] = useState({});

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

  return (
    <div className="home-background-container">
      <SearchBar />
    </div>
  );
}

export default Home;
