import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { TweenMax, Power2, TimelineLite } from "gsap";
import $ from "jquery";
import carousel from "gsap";
import {
  fetchAllSneaks_data,
  photoBackground,
  addToCloset,
} from "../API/ajax-helpers";
import ReactCardFlip from "react-card-flip";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import RemoveBackground from "remove-bg-node";

export default function MyCloset() {
  const [products, productList] = useState([]);
  const [error, setError] = useState(null);
  const [isFlipped, setFlipped] = useState({});
  const [moveCarouselHorizontally, setMoveCarouselHorizontally] = useState({});

  const [searchParam, setSearchParam] = useState(null);

  const renderImages = () => {
    photoBackground()
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
    fetchProfile
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

  const handleClick = (direction) => {
    setMoveCarouselHorizontally({
      ...moveCarouselHorizontally(prev),
      ...moveCarouselHorizontally(next),
    });
  };

  return (
    <div className="product-card-container">
      <SearchBar setSearchParam={setSearchParam} />
      <CustomCarousel
        images={products.map((product) => product.product_photo)}
      />
    </div>
  );

  function CustomCarousel({ images }) {
    var w, container, carousel, item, radius, itemLength, rY, ticker, fps;
    var addX = 0;

    var fps_counter = {
      tick: function () {
        // ... (your fps_counter code remains the same)
      },
      times: [],
      span: 20,
    };
    var counter = Object.create(fps_counter);

    $(document).ready(init);

    function init() {
      w = $(window);
      container = $("#contentContainer");
      carousel = $("#carouselContainer");
      item = $(".carouselItem");
      itemLength = $(".carouselItem").length;
      fps = $("#fps");
      rY = 360 / itemLength;
      radius = Math.round(250); // Adjust the radius as needed

      // Set container 3d props
      TweenMax.set(container, { perspective: 600 });
      TweenMax.set(carousel, { z: -radius });

      // Create carousel item props
      for (var i = 0; i < itemLength; i++) {
        var $item = item.eq(i);
        var $block = $item.find(".carouselItemInner");

        TweenMax.set($item, {
          rotationY: rY * i,
          z: radius,
          transformOrigin: "50% 50% " + -radius + "px",
        });

        animateIn($item, $block);
      }
    }

    function animateIn($item, $block) {
      // ... (your animateIn function remains the same)
    }

    // Function to move the carousel horizontally
    function moveCarouselHorizontally(direction) {
      if (direction === "next") {
        addX += 360; // Adjust the value as needed to control the horizontal movement
      } else if (direction === "prev") {
        addX -= 360; // Adjust the value as needed to control the horizontal movement
      }

      TweenMax.to(carousel, 1, { rotationY: addX, ease: Quint.easeOut });
    }

    $("#prevButton").click(function () {
      moveCarouselHorizontally("prev");
    });

    $("#nextButton").click(function () {
      moveCarouselHorizontally("next");
    });
    const handleClick = setMoveCarouselHorizontally;
    // Function to calculate the FPS and update the isTemplate
  }

  // Ticker for updating FPS
  // You can use any carousel library or create your custom carousel component.
  // isTemplate only the image prop in the carousel.

  return (
    <div id="contentContainer" className="trans3d">
      <section id="carouselContainer" className="trans3d">
        {images.map((image, index) => (
          <figure
            id={`item${index + 1}`}
            className="carouselItem trans3d"
            key={`carousel-item-${index}`}
          >
            <div className="carouselItemInner trans3d">
              <img src={image} alt={`Image ${index}`} />
            </div>
          </figure>
        ))}
      </section>
    </div>
  );
}
