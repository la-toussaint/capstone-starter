import React from "react";
import { TweenMax, Power2, TimelineLite, Expo, Quint } from "gsap";
import $ from "jquery";
import { useSelector } from "react-redux";
import "../index.css";
import carousel from "gsap";

function CustomCarousel({ images = [] }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [moveCarouselHorizontally, setMoveCarouselHorizontally] =
    React.useState({});

  var w, container, carousel, item, radius, itemLength, rY, ticker, fps;
  console.log("images: ", images);
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
  // set and cache variables
  var w, container, carousel, item, radius, itemLength, rY, ticker, fps;

  var addX = 0;

  // fps counter created by: https://gist.github.com/sharkbrainguy/1156092,
  // no need to create my own :)
  var fps_counter = {
    tick: function () {
      // this has to clone the array every tick so that
      // separate instances won't share state
      this.times = this.times.concat(+new Date());
      var seconds,
        times = this.times;

      if (times.length > this.span + 1) {
        times.shift(); // ditch the oldest time
        seconds = (times[times.length - 1] - times[0]) / 1000;
        return Math.round(this.span / seconds);
      } else return null;
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
    radius = Math.round(250 / Math.tan(Math.PI / itemLength));

    // set container 3d props
    TweenMax.set(container, { perspective: 600 });
    TweenMax.set(carousel, { z: -radius });

    // create carousel item props

    for (var i = 0; i < itemLength; i++) {
      var $item = item.eq(i);
      var $block = $item.find(".carouselItemInner");

      //thanks @chrisgannon!
      TweenMax.set($item, {
        rotationY: rY * i,
        z: radius,
        transformOrigin: "50% 50% " + -radius + "px",
      });

      animateIn($item, $block);
    }

    // set mouse x and y props and looper ticker
    ticker = setInterval(looper, 1000 / 60);
  }

  function animateIn($item, $block) {
    var $nrX = 360 * getRandomInt(2);
    var $nrY = 360 * getRandomInt(2);

    var $nx = -2000 + getRandomInt(4000);
    var $ny = -2000 + getRandomInt(4000);
    var $nz = -4000 + getRandomInt(4000);

    var $s = 1.5 + getRandomInt(10) * 0.1;
    var $d = 1 - getRandomInt(8) * 0.1;

    TweenMax.set($item, { autoAlpha: 1, delay: $d });
    TweenMax.set($block, {
      z: $nz,
      rotationY: $nrY,
      rotationX: $nrX,
      x: $nx,
      y: $ny,
      autoAlpha: 0,
    });
    TweenMax.to($block, $s, {
      delay: $d,
      rotationY: 0,
      rotationX: 0,
      z: 0,
      ease: Expo.easeInOut,
    });
    TweenMax.to($block, $s - 0.5, {
      delay: $d,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: Expo.easeInOut,
    });
  }

  // loops and sets the carousel 3d properties
  function looper() {
    // addX += mouseX;
    TweenMax.to(carousel, 1, {
      rotationY: addX,
      easeOutQuint: function (x) {
        return 1 - Math.pow(1 - x, 5);
      },
    });
    TweenMax.set(carousel, { z: mouseZ });
  }

  function getRandomInt($n) {
    return Math.floor(Math.random() * $n + 1);
  }
  return (
    <div id="contentContainer" className="trans3d">
      <section id="carouselContainer" className="trans3d">
        {images.map((product_photo, index) => (
          <figure
            id={`item${index + 1}`}
            className="carouselItem trans3d"
            key={`carousel-item-${index}`}
          >
            <div className="carouselItemInner trans3d">{product_photo}</div>

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
      <button id="nextButton" onClick={() => handleClick("next")}>
        Next
      </button>

      <button id="prevButton" onClick={() => handleClick("prev")}>
        Prev
      </button>
    </div>
  );
}

export default CustomCarousel;
