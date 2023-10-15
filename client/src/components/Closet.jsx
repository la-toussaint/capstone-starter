import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { TweenMax, Power2, TimelineLite } from "gsap";
import $ from "jquery";
import carousel from "gsap";
import {
  fetchAllCostumes_data,
  costumesPhotoBackground,
  addClosetCostumes_data,
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
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [searchParam, setSearchParam] = useState(null);

  const renderImages = () => {
    costumesPhotoBackground()
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
            crossorigin="require-corp"
          />
        ));
      })
      .catch((error) => {
        console.error("Error checking crossorigin.me availability:", error);
      });
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
      return p?.costumes_data.toLowerCase().includes(searchParam);
    });
    productList(filteredProducts);
  }, [searchParam]);

  const handleClick = (direction) => {
    if (direction === "next") {
      // Increase addX value and set moveCarouselHorizontally
      addX += 360;
      setMoveCarouselHorizontally("next");
    } else if (direction === "prev") {
      // Decrease addX value and set moveCarouselHorizontally
      addX -= 360;
      setMoveCarouselHorizontally("prev");
    }
    if (isLoggedIn) {
      addClosetCostumes_data({ ...[costumes_data_id] });
    }
  };

  return (
    <div className="mycloset-background-container">
      <SearchBar setSearchParam={setSearchParam} />
      <CustomCarousel
        images={products.map((product) => product.product_photo)}
      />
    </div>
  );

  //   function CustomCarousel({ images }) {
  //     var w, container, carousel, item, radius, itemLength, rY, ticker, fps;

  //     var addX = 0;

  //     let fps_counter = {
  //       tick: function () {},
  //       times: [],
  //       span: 20,
  //     };
  //     const counter = Object.create(fps_counter);

  //     $(document).ready(init);

  //     function init() {
  //       w = $(window);
  //       container = $("#contentContainer");
  //       carousel = $("#carouselContainer");
  //       item = $(".carouselItem");
  //       itemLength = $(".carouselItem").length;
  //       rY = 360 / itemLength;
  //       fps = $("#fps");
  //       radius = Math.round(250);

  //       TweenMax.set(container, { perspective: 600 });
  //       TweenMax.set(carousel, { z: -radius });

  //       for (var i = 0; i < itemLength; i++) {
  //         var $item = item.eq(i);
  //         var $block = $item.find(".carouselItemInner");

  //         TweenMax.set($item, {
  //           rotationY: rY * i,
  //           z: radius,
  //           transformOrigin: "50% 50% " + -radius + "px",
  //           ease: Quint.easeOut,
  //         });

  //         animateIn($item, $block);
  //       }
  //     }

  //     function animateIn($item, $block) {
  //       // ... (your animateIn function remains the same)
  //     }

  //     // Function to move the carousel horizontally

  //     TweenMax.to(carousel, 1, {
  //       rotationY: addX,
  //       easeOutQuint: function (x) {
  //         return 1 - pow(1 - x, 5);
  //       },
  //     });
  //   }
  function CustomCarousel({ images }) {
    var w, container, carousel, item, radius, itemLength, rY, ticker, fps;

    var addX = 0;

    let fps_counter = {
      tick: function () {},
      times: [],
      span: 20,
    };
    const counter = Object.create(fps_counter);

    $(document).ready(init);

    function init() {
      w = $(window);
      TweenMax.set((container = $("#contentContainer")), { perspective: 600 });
      TweenMax.set((carousel = $("#carouselContainer")), { z: -radius });
      item = $(".carouselItem");
      itemLength = $(".carouselItem").length;

      for (var i = 0; i < itemLength; i++) {
        var $item = item.eq(i);
        var $block = $item.find(".carouselItemInner");
        rY = 360 / itemLength;
        fps = $("#fps");
        radius = Math.round(250);

        TweenMax.set($item, {
          rotationY: rY * i,
          z: radius,
          transformOrigin: "50% 50% " + -radius + "px",
          easeOutQuint: function (x) {
            return 1 - pow(1 - x, 5);
          },
        });

        animateIn($item, $block);
      }
    }

    function animateIn($item, $block) {
      // ... (your animateIn function remains the same)
    }

    TweenMax.to(carousel, 1, {
      rotationY: addX,
      easeOutQuint: function (x) {
        return 1 - pow(1 - x, 5);
      },
    });
  }

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
              <img src={product_photo} alt={`Image ${product_title}`} />
            </div>
            <button id="nextButton" onClick={() => handleClick("next")}>
              Next
            </button>

            <button id="prevButton" onClick={() => handleClick("prev")}>
              Prev
            </button>

            {isLoggedIn && (
              <div>
                <button
                  className="add-click"
                  onClick={() => addClosetCostumes_data(costumes_data_id)}
                >
                  Add to Your Closet
                </button>
              </div>
            )}
          </figure>
        ))}
      </section>
    </div>
  );
}
