import React, { useEffect, useRef } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Data from "../data";
import "../styles/animations.css";

const renderStars = (ratingString) => {
  const rating = parseFloat(ratingString.split(" ")[0]);
  const reviewCount = ratingString.match(/\((\d+)\)/)?.[1] || "0";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => {
          if (i < fullStars) return <FaStar key={i} className="text-yellow-400" />;
          if (i === fullStars && hasHalfStar) return <FaStarHalfAlt key={i} className="text-yellow-400" />;
          return <FaStar key={i} className="text-gray-300" />;
        })}
      </div>
      <span className="text-sm text-gray-500">({reviewCount})</span>
    </div>
  );
};

// Intersection Observer hook — triggers CSS class when element enters view
function useRevealOnScroll(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("revealed"); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

function ReviewSection() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useRevealOnScroll(leftRef);
  useRevealOnScroll(rightRef);

  useEffect(() => {
    const images = [Data[0].img, Data[1].img, Data[2].img, ...Data.slice(0, 3).map((d) => d.reviewerIMG)];
    images.forEach((src) => { const img = new Image(); img.src = src; });
  }, []);

  return (
    <section className="max-w-7xl mx-auto my-12 px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 items-center gap-6 sm:gap-8 lg:gap-12">
      {/* Left image */}
      <div ref={leftRef} className="relative reveal-left">
        <img
          src={Data[0].img}
          alt={`Photo of ${Data[0].food}`}
          className="w-full h-[350px] sm:h-[400px] lg:h-[450px] object-cover rounded-3xl shadow-lg"
          loading="lazy"
        />
        <img
          src={Data[1].img}
          alt={`Photo of ${Data[1].food}`}
          className="absolute top-4 right-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded-full shadow-md border-2 border-white anim-float-a"
        />
        <img
          src={Data[2].img}
          alt={`Photo of ${Data[2].food}`}
          className="absolute bottom-4 left-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded-full shadow-md border-2 border-white anim-float-b"
        />
      </div>

      {/* Right reviews */}
      <div ref={rightRef} className="reveal-right">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-red-800 to-red-600 bg-clip-text text-transparent">Happy Faces,</span>{" "}
          Full Plates 🍽️
        </h1>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-6 max-w-md">
          Hear from our delighted customers about their favorite meals!
        </p>

        <div className="space-y-4">
          {Data.slice(0, 3).map((item, i) => (
            <div
              key={i}
              className="bg-white p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 anim-fade-up"
              style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "both" }}
              role="article"
              aria-label={`Review by ${item.reviewer}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={item.reviewerIMG} alt={`Photo of ${item.reviewer}`} className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full border border-gray-200" loading="lazy" />
                <div>
                  <h3 className="font-semibold text-base sm:text-lg text-gray-800">{item.food}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">{item.extra}</p>
                </div>
              </div>
              {renderStars(item.rating)}
              <p className="text-gray-600 text-sm sm:text-base italic my-2">"{item.review}"</p>
              <p className="text-gray-500 text-xs sm:text-sm font-medium">— {item.reviewer}</p>
            </div>
          ))}
        </div>

        <a href="/reviews" className="mt-6 inline-block px-4 py-2 bg-red-800 text-white rounded-full text-sm font-medium hover:bg-red-700 transition-colors active:scale-95">
          See More Reviews
        </a>
      </div>
    </section>
  );
}

export default ReviewSection;