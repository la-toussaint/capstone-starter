import Carousel from "react-spring-3d-carousel";
import React from "react";
import { SearchInput } from "./components/Login Menu/Customer Search/SearchBar";
import "./index.css";

function App() {
  const [results, setResults] = React.useState({});
  const products = results?.data
    ? results.data.products.map((product, i) => {
        return {
          content: <img src={product.product_photo} alt={`${i + 1}`} />,
          key: product.product_title,
        };
      })
    : [];

  return (
    <div>
      <SearchInput className="kick-search" setResults={setResults} />
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

export default App;
