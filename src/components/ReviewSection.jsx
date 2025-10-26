import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Data from "../data";

function ReviewSection() {
  // Preload images to avoid loading delays
  useEffect(() => {
    const images = [
      Data[0].img,
      Data[1].img,
      Data[2].img,
      ...Data.slice(0, 3).map((item) => item.reviewerIMG),
    ];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Animation variants for main content
  const contentVariant = {
    hidden: { opacity: 0, x: (dir) => (dir === "left" ? -30 : 30) },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  // Floating image animation with scale effect
  const floatVariant = {
    animate: (i) => ({
      y: [0, i % 2 === 0 ? -10 : 10, 0],
      scale: [1, 1.05, 1],
      rotate: [0, i % 2 === 0 ? 3 : -3, 0],
      transition: {
        repeat: Infinity,
        duration: 2.8 + i * 0.4,
        ease: "easeInOut",
      },
    }),
  };

  // Review card animation
  const reviewVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
  };

  // Render dynamic star ratings
  const renderStars = (ratingString) => {
    // Extract numerical rating (e.g., '4.8 (32)' -> 4.8)
    const rating = parseFloat(ratingString.split(" ")[0]);
    const reviewCount = ratingString.match(/\((\d+)\)/)?.[1] || "0"; // Extract review count
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    }

    return (
      <div className="flex items-center gap-2">
        <div className="flex gap-1">{stars}</div>
        <span className="text-sm text-gray-500">({reviewCount})</span>
      </div>
    );
  };

  return (
    <section className="max-w-7xl mx-auto my-12 px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 items-center gap-6 sm:gap-8 lg:gap-12">
      {/* Left Side Image (Main Dish + Floating) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={contentVariant}
        custom="left"
        viewport={{ once: true }}
        className="relative"
      >
        <img
          src={Data[0].img}
          alt={`Photo of ${Data[0].food}`}
          className="w-full h-[350px] sm:h-[400px] lg:h-[450px] object-cover rounded-3xl shadow-lg"
          loading="lazy"
        />
        {/* Floating images */}
        <motion.img
          src={Data[1].img}
          alt={`Photo of ${Data[1].food}`}
          className="absolute top-4 right-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded-full shadow-md border-2 border-white"
          variants={floatVariant}
          custom={1}
          animate="animate"
        />
        <motion.img
          src={Data[2].img}
          alt={`Photo of ${Data[2].food}`}
          className="absolute bottom-4 left-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded-full shadow-md border-2 border-white"
          variants={floatVariant}
          custom={2}
          animate="animate"
        />
      </motion.div>

      {/* Right Side Reviews */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={contentVariant}
        custom="right"
        viewport={{ once: true }}
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 tracking-tight">
          <span className="bg-linear-to-r from-red-800 to-red-600 bg-clip-text text-transparent">
            Happy Faces,
          </span>{" "}
          Full Plates 🍽️
        </h1>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-6 max-w-md">
          Hear from our delighted customers about their favorite meals!
        </p>

        <div className="space-y-4">
          {Data.slice(0, 3).map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              variants={reviewVariant}
              custom={i}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
              role="article"
              aria-label={`Review by ${item.reviewer}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={item.reviewerIMG}
                  alt={`Photo of ${item.reviewer}`}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full border border-gray-200"
                  loading="lazy"
                />
                <div>
                  <h3 className="font-semibold text-base sm:text-lg text-gray-800">{item.food}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">{item.extra}</p>
                </div>
              </div>
              {renderStars(item.rating)}
              <p className="text-gray-600 text-sm sm:text-base italic my-2">“{item.review}”</p>
              <p className="text-gray-500 text-xs sm:text-sm font-medium">
                — {item.reviewer}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.a
          href="/reviews"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 inline-block px-4 py-2 bg-red-800 text-white rounded-full text-sm font-medium"
        >
          See More Reviews
        </motion.a>
      </motion.div>
    </section>
  );
}

export default ReviewSection;