import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Data from "../data";
import Slider from "react-slick";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Simplified card animation
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1, // Reduced delay
      duration: 0.6, // Shorter duration
      ease: "easeOut", // Simpler easing
    },
  }),
};

function Card() {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500, // Reduced speed for smoother transitions
    slidesToShow: 3, // Reduced to lighten rendering load
    slidesToScroll: 3,
    arrows: false,
    autoplay: false, // Disabled autoplay to reduce animation conflicts
    pauseOnHover: true,
    cssEase: "ease-out", // Smoother easing
    lazyLoad: "ondemand", // Lazy-load images
    beforeChange: (oldIndex, newIndex) => setCurrentIndex(newIndex),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 900, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  // Preload images to avoid loading delays
  useEffect(() => {
    Data.forEach((item) => {
      const img = new Image();
      img.src = item.img;
    });
  }, []);

  const currentFood = Data[currentIndex % Data.length]?.food || "Delicious Deals";

  return (
    <section className="max-w-7xl mx-auto my-16 px-4 overflow-hidden">
      <motion.h1
        key={currentFood}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-bold text-center text-4xl md:text-5xl mb-10"
      >
        <span className="text-red-800">Super </span> Delicious Deals —{" "}
        <span className="text-gray-700">{currentFood}</span>
      </motion.h1>

      <div className="slider-container relative">
        <Slider ref={sliderRef} {...settings}>
          {Data.map((d, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }} // Adjusted for earlier trigger
              variants={cardVariant}
              className="p-3"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src={d.img}
                  alt={d.food}
                  className="w-full h-52 object-cover"
                  loading="lazy" // Enable lazy loading
                />
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
            </motion.div>
          ))}
        </Slider>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 mt-8"
        >
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className="bg-gray-100 hover:bg-red-700 hover:text-white text-gray-700 p-3 rounded-full shadow-md transition-colors duration-200"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => sliderRef.current.slickNext()}
            className="bg-gray-100 hover:bg-red-700 hover:text-white text-gray-700 p-3 rounded-full shadow-md transition-colors duration-200"
          >
            <FaArrowRight />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default Card;