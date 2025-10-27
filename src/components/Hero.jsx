import React from "react";
import { motion } from "framer-motion";
import Stew from "../assets/stew.jpg";
import Team1 from "../assets/team_1.jpg";
import Team3 from "../assets/team_3.jpg";
import Team4 from "../assets/team_4.jpg";
import Tomatoes from "../assets/tomamto.png";
import Pepper from "../assets/pepper.png";
import Leaf from "../assets/leaf.jpg";
import { CgShoppingCart } from "react-icons/cg";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function Hero() {
  return (
    <section className="mt-20 max-w-7xl md:mx-auto mx-7  grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
      {/* Left side (text) */}
      <motion.div
        className="md:mr-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Rating */}
        <motion.div
          className="flex p-2 bg-red-200/20 rounded-full items-center md:max-w-[90%]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <img src={Team1} alt="" className="w-10 h-10 rounded-full border-2 border-white" />
          <img src={Team3} alt="" className="w-10 h-10 rounded-full -ml-3 border-2 border-white" />
          <img src={Team4} alt="" className="w-10 h-10 rounded-full -ml-3 border-2 border-white" />
          <p className="text-red-700 text-[15px] px-3">
            Rated 4.9/5 by food lovers nationwide.
          </p>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-black tracking-wide mt-16 font-bold text-4xl md:text-5xl mb-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
        >
          Craving <span className="text-red-800">Naija Flavors?</span> Get It
          Hot, Fast, and Fresh!
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-gray-700 md:my-10 my-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          Order authentic Nigerian dishes like vegetable soup, jollof rice, and
          pepper soup, delivered hot and fresh to your doorstep in minutes.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="md:flex items-center gap-10 my-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8, type: "spring" }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="my-7 md:my-0 flex bg-red-700 text-white px-6 py-2.5 rounded-full hover:bg-red-900 text-sm font-medium transition-all hover:shadow-lg hover:shadow-red-100"
          >
            <div className="flex items-center">
              <a href="#">Order now</a>
              <CgShoppingCart className="mx-1.5 text-lg" />
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex bg-white text-red-900 px-6 py-2.5 rounded-full border hover:text-white hover:bg-red-900 text-sm font-medium transition-all hover:shadow-lg hover:shadow-red-100"
          >
            <div className="flex items-center">
              <a href="#">View menu</a>
              <MdOutlineKeyboardArrowRight className="mx-1.5 text-lg" />
            </div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Right side (images) */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
      >
        <div className="h-[90%] relative">
          {/* Floating Ingredients */}
          <motion.img
            src={Pepper}
            alt=""
            className="h-25 absolute -top-6 -left-8 z-20"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 3, -3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.img
            src={Tomatoes}
            alt=""
            className="h-32 absolute -bottom-8 -right-2 z-20"
            animate={{
              y: [0, 8, 0],
              rotate: [0, -2, 2, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main Food Image */}
          <motion.img
            src={Stew}
            alt=""
            className="h-full w-full object-cover rounded-3xl shadow-xl z-10 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          />
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
