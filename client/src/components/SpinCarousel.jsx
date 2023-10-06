import Carousel from "react-spring-3d-carousel";
import React from "react";
import { results } from "../../store-themes/dummy-data/practice data";

function SpinCarousel() {
  const products = results?.map((product, i) => {
    return {
      content: <img src={product.product_photo} alt={`${i + 1}`} />,
      key: `${product.product_title}`, // Corrected the key
    };
  });

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
        </div>
      )}
    </div>
  );
}

export default SpinCarousel;
