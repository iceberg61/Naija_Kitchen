import React from "react";
import Stew from "../assets/stew.jpg";
import Team1 from "../assets/team_1.jpg";
import Team3 from "../assets/team_3.jpg";
import Team4 from "../assets/team_4.jpg";
import Tomatoes from "../assets/tomamto.png";
import Pepper from "../assets/pepper.png";
import { CgShoppingCart } from "react-icons/cg";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import "../styles/animations.css";

function Hero() {
  return (
    <section className="mt-20 max-w-7xl md:mx-auto mx-7 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
      {/* Left side */}
      <div className="md:mr-20 anim-fade-up">
        {/* Rating */}
        <div className="flex p-2 bg-red-200/20 rounded-full items-center md:max-w-[90%] anim-fade-up" style={{ animationDelay: "0.05s" }}>
          <img src={Team1} alt="reviewer" className="w-10 h-10 rounded-full border-2 border-white" />
          <img src={Team3} alt="reviewer" className="w-10 h-10 rounded-full -ml-3 border-2 border-white" />
          <img src={Team4} alt="reviewer" className="w-10 h-10 rounded-full -ml-3 border-2 border-white" />
          <p className="text-red-700 text-[15px] px-3">Rated 4.9/5 by food lovers nationwide.</p>
        </div>

        {/* Heading */}
        <h1 className="text-black tracking-wide mt-16 font-bold text-4xl md:text-5xl mb-10 anim-fade-up" style={{ animationDelay: "0.1s" }}>
          Craving <span className="text-red-800">Naija Flavors?</span> Get It Hot, Fast, and Fresh!
        </h1>

        {/* Description */}
        <p className="text-gray-700 md:my-10 my-5 anim-fade-up" style={{ animationDelay: "0.15s" }}>
          Order authentic Nigerian dishes like vegetable soup, jollof rice, and pepper soup,
          delivered hot and fresh to your doorstep in minutes.
        </p>

        {/* Buttons */}
        <div className="md:flex items-center gap-10 my-7 anim-fade-up" style={{ animationDelay: "0.2s" }}>
          <button className="my-7 md:my-0 flex items-center bg-red-700 text-white px-6 py-2.5 rounded-full hover:bg-red-900 text-sm font-medium transition-colors hover:shadow-lg hover:shadow-red-100 active:scale-95">
            <a href="#">Order now</a>
            <CgShoppingCart className="mx-1.5 text-lg" />
          </button>
          <button className="flex items-center bg-white text-red-900 px-6 py-2.5 rounded-full border hover:text-white hover:bg-red-900 text-sm font-medium transition-colors hover:shadow-lg hover:shadow-red-100 active:scale-95">
            <a href="#">View menu</a>
            <MdOutlineKeyboardArrowRight className="mx-1.5 text-lg" />
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="relative anim-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="h-[90%] relative">
          <img src={Pepper} alt="pepper" className="h-25 absolute -top-6 -left-8 z-20 anim-float-a" />
          <img src={Tomatoes} alt="tomatoes" className="h-32 absolute -bottom-8 -right-2 z-20 anim-float-b" />
          <img src={Stew} alt="Nigerian stew" className="h-full w-full object-cover rounded-3xl shadow-xl z-10 relative" />
        </div>
      </div>
    </section>
  );
}

export default Hero;