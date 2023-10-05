import Carousel from "react-spring-3d-carousel";
import React from "react";
// import SearchInput from "./components/cust-search/SearchBar";
import { results } from "../../store-themes/dummy-data/practice data";
function SpinCarousel() {
  const products = results?.map((product, i) => {
    return {
      content: <img src={product.image} alt={`${i + 1}`} />,
      key: `${product.name}-${i}`,
    };
  });
  console.log("products: ", products);
  return (
    <div>
      {/* <SearchInput className="kick-search" setResults={setResults} /> */}
      {Boolean(products.length > 0) && (
        <div className="kick-div" style={{ height: "400px" }}>
          <Carousel
            className="kick-carousel"
            slides={products}
            showNavigation
          />
        </div>
      )}
    </div>
  );
}

export default SpinCarousel;
