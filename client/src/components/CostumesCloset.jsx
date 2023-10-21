import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  fetchAllCostumes_data,
  costumesPhotoBackground,
  addClosetCostumes_data,
} from "../API/ajax-helpers";
import ReactCardFlip from "react-card-flip";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import RemoveBackground from "remove-bg-node";
import CustomCarousel from "./CustomCarousel";

export default function CostumesCloset() {
  const [products, productList] = useState([]);
  const [error, setError] = useState(null);
  const [isFlipped, setFlipped] = useState({});
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [searchParam, setSearchParam] = useState(null);
  const renderImages = () => {
    // costumesPhotoBackground()
    //   .then((data) => {
    //     console.log("data: ", data);
    return products.map((product, index) => (
      <img
        src={product.product_photo}
        alt={`Image ${index}`}
        key={`image-${product.costumes_data_id}`}
        type="image/png"
        crossorigin="require-corp"
      />
    ));
    // })
    // .catch((error) => {
    //   console.error("Error checking crossorigin.me availability:", error);
    // });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await fetchAllCostumes_data();
        productList(results);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);
  // This useEffect filters products when searchParam changes
  useEffect(() => {
    const filteredProducts = products.filter((p) => {
      return p?.costumes_data?.toLowerCase().includes(searchParam);
    });
    productList(filteredProducts);
  }, [searchParam]);

  const generatedImgTags = renderImages();
  console.log("generatedImgTags: ", generatedImgTags);
  return (
    <div className="costumes-closet-background-container">
      <SearchBar setSearchParam={setSearchParam} />
      {generatedImgTags.length > 0 && (
        <CustomCarousel images={generatedImgTags} />
      )}
    </div>
  );
}
