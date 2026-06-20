import React, { useRef, useState, useEffect } from "react";
import Data from "../data";
import Slider from "react-slick";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/animations.css";

function Card() {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    autoplay: false,
    pauseOnHover: true,
    cssEase: "ease-out",
    lazyLoad: "ondemand",
    beforeChange: (_, next) => setCurrentIndex(next),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 900, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  useEffect(() => {
    Data.forEach((item) => { const img = new Image(); img.src = item.img; });
  }, []);

  const currentFood = Data[currentIndex % Data.length]?.food || "Delicious Deals";

  return (
    <section className="max-w-7xl mx-auto my-16 px-4 overflow-hidden">
      <h1
        key={currentFood}
        className="font-bold text-center text-4xl md:text-5xl mb-10 anim-fade-up"
      >
        <span className="text-red-800">Super </span>
        Delicious Deals —{" "}
        <span className="text-gray-700">{currentFood}</span>
      </h1>

      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {Data.map((d, index) => (
            <div key={index} className="p-3">
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
                <img src={d.img} alt={d.food} className="w-full h-52 object-cover" loading="lazy" />
                <div className="p-5">
                  <div className="flex gap-3 items-center mb-2">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <p className="text-gray-600 text-sm">{d.rating}</p>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <MdAccessTime />
                      <p className="text-sm">{d.time}</p>
                    </div>
                  </div>
                  <h2 className="text-lg font-semibold mb-2">{d.food}</h2>
                  <p className="text-gray-500 text-sm mb-3">{d.extra}</p>
                  <div className="flex items-center gap-2 text-gray-400">
                    <FaLocationDot />
                    <p className="text-xs">{d.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <div className="flex justify-center gap-6 mt-8">
          <button onClick={() => sliderRef.current.slickPrev()} aria-label="Previous" className="bg-gray-100 hover:bg-red-700 hover:text-white text-gray-700 p-3 rounded-full shadow-md transition-colors duration-200">
            <FaArrowLeft />
          </button>
          <button onClick={() => sliderRef.current.slickNext()} aria-label="Next" className="bg-gray-100 hover:bg-red-700 hover:text-white text-gray-700 p-3 rounded-full shadow-md transition-colors duration-200">
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Card;