import React from "react"
import { motion } from "framer-motion"
import { FaStar } from "react-icons/fa"
import Data from "../data"

function ReviewSection() {
  return (
    <section className="max-w-7xl mx-auto my-24 px-6 grid md:grid-cols-2 items-center gap-10">
      {/* Left Side Image (Main Dish + Floating) */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="relative"
      >
        <img
          src={Data[0].img}
          alt={Data[0].food}
          className="w-full h-[500px] object-cover rounded-3xl shadow-lg"
        />

        {/* Floating images */}
        <motion.img
          src={Data[1].img}
          alt={Data[1].food}
          className="absolute top-8 right-8 w-24 h-24 object-cover rounded-full shadow-md"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
        <motion.img
          src={Data[2].img}
          alt={Data[2].food}
          className="absolute bottom-8 left-8 w-24 h-24 object-cover rounded-full shadow-md"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Right Side Reviews */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-red-800">Happy Faces,</span> Full Plates 🍽️
        </h1>
        <p className="text-gray-600 mb-10">
          See what our customers are saying about their favorite meals!
        </p>

        <div className="space-y-8">
          {Data.slice(0, 3).map((item, i) => (
            <motion.div
              key={i}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={item.reviewerIMG}
                  alt={item.food}
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.food}</h3>
                  <p className="text-sm text-gray-500">{item.extra}</p>
                </div>
              </div>

              <div className="flex text-yellow-400 mb-2">
                {[...Array(5)].map((_, j) => (
                  <FaStar key={j} />
                ))}
              </div>

              <p className="text-gray-600 italic mb-2">“{item.review}”</p>
              <p className="text-gray-500 text-sm font-medium">
                — {item.reviewer}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default ReviewSection
