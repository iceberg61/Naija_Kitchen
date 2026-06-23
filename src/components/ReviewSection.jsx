import React, { useRef, useEffect } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import menuData from "../data/menuData";
import reviewsData from "../data/reviewsData";
import "../styles/animations.css";

// Dish IDs that map to the reviews shown
const FEATURED_REVIEWS = [2, 1, 5]; // reviewsData IDs to show (Jollof, Egusi, Suya)

function useRevealOnScroll(refs) {
  useEffect(() => {
    const elements = refs.map((r) => r.current).filter(Boolean);
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("revealed"); observer.unobserve(e.target); } }); },
      { threshold: 0.15 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [refs]);
}

const Stars = ({ rating }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={i < rating ? "text-yellow-400" : "text-gray-200"} />
    ))}
  </div>
);

// Find dish in menuData by name match from review
function getDishImg(dishName) {
  const match = menuData.find((d) => d.name.toLowerCase().includes(dishName.toLowerCase().split(" ")[0]));
  return match?.img || menuData[0].img;
}

export default function ReviewSection() {
  const leftRef  = useRef(null);
  const rightRef = useRef(null);
  useRevealOnScroll([leftRef, rightRef]);

  const reviews     = FEATURED_REVIEWS.map((id) => reviewsData.find((r) => r.id === id)).filter(Boolean);
  const featureDish = menuData.find((d) => d.name === "Jollof Rice");
  const floatA      = menuData.find((d) => d.name === "Egusi Soup");
  const floatB      = menuData.find((d) => d.name === "Suya Skewers");

  return (
    <section className="max-w-7xl mx-auto my-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          <span className="bg-linear-to-r from-red-800 to-red-500 bg-clip-text text-transparent">Happy Faces,</span>{" "}
          Full Plates 🍽️
        </h2>
        <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">Real words from real Naija food lovers across the country.</p>
      </div>

      <div className="grid md:grid-cols-2 items-center gap-8 lg:gap-14">
        <div ref={leftRef} className="relative reveal-left">
          <div className="relative rounded-3xl overflow-hidden shadow-xl h-85 sm:h-100 lg:h-115">
            <img src={featureDish?.img} alt={featureDish?.name} className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-5">
              <span className="text-white/70 text-xs uppercase tracking-widest">{featureDish?.category}</span>
              <p className="text-white font-bold text-lg">{featureDish?.name}</p>
              <p className="text-white/80 text-xs">₦{featureDish?.price.toLocaleString()}</p>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 md:top-4 md:-right-6 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg anim-float-a">
            <img src={floatA?.img} alt={floatA?.name} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="absolute -bottom-4 -left-4 md:bottom-4 md:-left-6 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg anim-float-b">
            <img src={floatB?.img} alt={floatB?.name} className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        <div ref={rightRef} className="reveal-right flex flex-col gap-4 pt-6 md:pt-0">
          {reviews.map((r, i) => (
            <div key={r.id} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 anim-fade-up"
              style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "both" }}>
              <FaQuoteLeft className="text-red-100 text-2xl mb-2" />
              <p className="text-gray-600 text-sm italic leading-relaxed mb-3">"{r.review}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src={r.img} alt={r.name} className="w-9 h-9 rounded-full object-cover border border-gray-100" loading="lazy" />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{r.name}</p>
                    <p className="text-gray-400 text-xs">{r.location}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1.5">
                    <img src={getDishImg(r.dish)} alt={r.dish} className="w-7 h-7 rounded-lg object-cover" loading="lazy" />
                    <span className="text-xs text-gray-500 font-medium">{r.dish}</span>
                  </div>
                  <Stars rating={r.rating} />
                </div>
              </div>
            </div>
          ))}
          <Link to="/reviews" className="self-start mt-2 inline-flex items-center gap-2 bg-red-800 hover:bg-red-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors active:scale-95">
            See All Reviews →
          </Link>
        </div>
      </div>
    </section>
  );
}