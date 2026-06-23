import React, { useRef, useState, useEffect, useCallback } from "react";
import { FaStar, FaArrowLeft, FaArrowRight, FaPlus, FaMinus } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import menuData from "../data/menuData";
import "../styles/animations.css";

const fmt = (n) => `₦${n.toLocaleString()}`;

// How many cards to show per breakpoint
function getSlidesPerView() {
  const w = window.innerWidth;
  if (w >= 1280) return 4;
  if (w >= 1024) return 3;
  if (w >= 640)  return 2;
  return 1;
}

function Card() {
  const { cart, addToCart, removeFromCart } = useCart();
  const trackRef   = useRef(null);
  const autoRef    = useRef(null);
  const [current, setCurrent]       = useState(0);
  const [perView, setPerView]       = useState(getSlidesPerView);
  const total = menuData.length;
  const maxIndex = total - perView;

  // Update perView on resize
  useEffect(() => {
    const onResize = () => setPerView(getSlidesPerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Clamp current when perView changes
  useEffect(() => {
    setCurrent((c) => Math.min(c, Math.max(0, total - perView)));
  }, [perView, total]);

  const goTo = useCallback((index) => {
    const clamped = Math.max(0, Math.min(index, total - perView));
    setCurrent(clamped);
  }, [total, perView]);

  const next = useCallback(() => goTo(current + 1 > maxIndex ? 0 : current + 1), [current, maxIndex, goTo]);
  const prev = useCallback(() => goTo(current - 1 < 0 ? maxIndex : current - 1), [current, maxIndex, goTo]);

  // Autoplay
  useEffect(() => {
    autoRef.current = setInterval(next, 2800);
    return () => clearInterval(autoRef.current);
  }, [next]);

  const pauseAuto = () => clearInterval(autoRef.current);
  const resumeAuto = () => { autoRef.current = setInterval(next, 2800); };

  // Card width as percentage of track
  const cardWidthPct = 100 / perView;
  const translateX   = -(current * cardWidthPct);

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
      <div
        className="relative overflow-hidden"
        onMouseEnter={pauseAuto}
        onMouseLeave={resumeAuto}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(${translateX}%)` }}
        >
          {menuData.map((dish) => {
            const qty = cart[dish.id] || 0;
            return (
              <div
                key={dish.id}
                className="shrink-0 px-2"
                style={{ width: `${cardWidthPct}%` }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full">

                  {/* Image */}
                  <div className="relative overflow-hidden h-48 shrink-0">
                    <img
                      src={dish.img}
                      alt={dish.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 text-red-800 text-xs font-bold px-2.5 py-1 rounded-full">
                      {dish.category}
                    </span>
                    <span className="absolute top-3 right-3 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                      <FaStar className="text-yellow-400 text-[10px]" /> {dish.rating}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <MdAccessTime className="shrink-0" />
                      <span>{dish.time}</span>
                    </div>
                    <h2 className="font-bold text-gray-800 text-base leading-snug line-clamp-1">
                      {dish.name}
                    </h2>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 flex-1">
                      {dish.desc}
                    </p>

                    {/* Price + cart */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
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
                          <button onClick={() => removeFromCart(dish.id)} className="w-7 h-7 rounded-full bg-red-100 hover:bg-red-200 text-red-800 flex items-center justify-center transition-colors">
                            <FaMinus className="text-[9px]" />
                          </button>
                          <span className="text-sm font-bold text-gray-800 w-4 text-center">{qty}</span>
                          <button onClick={() => addToCart(dish.id)} className="w-7 h-7 rounded-full bg-red-700 hover:bg-red-900 text-white flex items-center justify-center transition-colors">
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
        </div>
      </div>

      {/* Arrows + dots */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button onClick={prev} aria-label="Previous" className="bg-gray-100 hover:bg-red-700 hover:text-white text-gray-700 p-3 rounded-full shadow-md transition-colors duration-200">
          <FaArrowLeft />
        </button>

        {/* Dot indicators */}
        {/* <div className="flex gap-2">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${current === i ? "w-5 h-2.5 bg-red-700" : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div> */}

        <button onClick={next} aria-label="Next" className="bg-gray-100 hover:bg-red-700 hover:text-white text-gray-700 p-3 rounded-full shadow-md transition-colors duration-200">
          <FaArrowRight />
        </button>
      </div>

      {/* View full menu */}
      <div className="text-center mt-6">
        <Link to="/menu" className="inline-flex items-center gap-2 text-red-700 hover:text-red-900 text-sm font-semibold transition-colors">
          View Full Menu →
        </Link>
      </div>
    </section>
  );
}

export default Card;