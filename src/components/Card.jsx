import React, { useRef } from "react";
import Slider from "react-slick";
import { FaStar, FaArrowLeft, FaArrowRight, FaPlus, FaMinus } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import menuData from "../data/menuData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/animations.css";

const fmt = (n) => `₦${n.toLocaleString()}`;

function Card() {
  const sliderRef = useRef(null);
  const { cart, addToCart, removeFromCart } = useCart();

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2800,
    pauseOnHover: true,
    cssEase: "ease-out",
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640,  settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section className="max-w-7xl mx-auto my-16 px-4 overflow-hidden">

      {/* Header */}
      <div className="text-center mb-10 anim-fade-up">
        <h1 className="font-bold text-4xl md:text-5xl">
          <span className="text-red-800">Super </span>
          Delicious <span className="text-gray-700">Deals</span>
        </h1>
        <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
          Fresh, hot and authentic Nigerian dishes — order your favourite today.
        </p>
      </div>

      {/* Slider */}
      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {menuData.map((dish) => {
            const qty = cart[dish.id] || 0;
            return (
              <div key={dish.id} className="p-2 sm:p-3">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col group">

                  {/* Image */}
                  <div className="relative overflow-hidden h-44">
                    <img
                      src={dish.img}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Category badge */}
                    <span className="absolute top-3 left-3 bg-white/90 text-red-800 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {dish.category}
                    </span>
                    {/* Rating badge */}
                    <span className="absolute top-3 right-3 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                      <FaStar className="text-yellow-400 text-[10px]" /> {dish.rating}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="p-4 flex flex-col flex-1 gap-2">
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <MdAccessTime className="text-sm" />
                      <span>{dish.time}</span>
                    </div>

                    <h2 className="font-bold text-gray-800 text-base leading-snug">{dish.name}</h2>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 flex-1">{dish.desc}</p>

                    {/* Price + cart */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-50 mt-1">
                      <span className="text-red-800 font-extrabold text-base">{fmt(dish.price)}</span>

                      {qty === 0 ? (
                        <button
                          onClick={() => addToCart(dish.id)}
                          className="flex items-center gap-1.5 bg-red-700 hover:bg-red-900 text-white text-xs font-semibold px-3 py-2 rounded-full transition-colors active:scale-95"
                        >
                          <FaPlus className="text-[9px]" /> Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFromCart(dish.id)}
                            className="w-7 h-7 rounded-full bg-red-100 hover:bg-red-200 text-red-800 flex items-center justify-center transition-colors"
                          >
                            <FaMinus className="text-[9px]" />
                          </button>
                          <span className="text-sm font-bold text-gray-800 w-4 text-center">{qty}</span>
                          <button
                            onClick={() => addToCart(dish.id)}
                            className="w-7 h-7 rounded-full bg-red-700 hover:bg-red-900 text-white flex items-center justify-center transition-colors"
                          >
                            <FaPlus className="text-[9px]" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>

        {/* Arrows */}
        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={() => sliderRef.current.slickPrev()}
            aria-label="Previous"
            className="bg-gray-100 hover:bg-red-700 hover:text-white text-gray-700 p-3 rounded-full shadow-md transition-colors duration-200"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => sliderRef.current.slickNext()}
            aria-label="Next"
            className="bg-gray-100 hover:bg-red-700 hover:text-white text-gray-700 p-3 rounded-full shadow-md transition-colors duration-200"
          >
            <FaArrowRight />
          </button>
        </div>

        {/* View full menu */}
        <div className="text-center mt-6">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-red-700 hover:text-red-900 text-sm font-semibold transition-colors"
          >
            View Full Menu →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Card;