import React from "react";
import { PiBowlSteamBold } from "react-icons/pi";
import { FaBowlFood } from "react-icons/fa6";
import { LiaPepperHotSolid } from "react-icons/lia";
import { FaShippingFast } from "react-icons/fa";
import "../styles/animations.css";

const items = [
  { icon: <PiBowlSteamBold className="fill-white text-2xl" />, title: "Freshly Made", text: "With the best ingredients" },
  { icon: <FaBowlFood className="fill-white text-2xl" />, title: "Always Hot", text: "Delivered sizzling and aromatic" },
  { icon: <LiaPepperHotSolid className="fill-white text-2xl" />, title: "Bursting with Flavor", text: "It awakens your taste buds" },
  { icon: <FaShippingFast className="fill-white text-2xl" />, title: "Swift Delivery", text: "Delivered fast and hot" },
];

function About() {
  return (
    <section className="bg-red-800 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-9 justify-items-center text-white px-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row justify-center items-center gap-4 text-center md:text-left anim-fade-up"
            style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "both" }}
          >
            <div className="w-16 h-16 rounded-full bg-white/25 flex items-center justify-center">
              {item.icon}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-200">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;