import React from 'react'
import { motion } from 'framer-motion'
import { PiBowlSteamBold } from "react-icons/pi";
import { FaBowlFood } from "react-icons/fa6";
import { LiaPepperHotSolid } from "react-icons/lia";
import { FaShippingFast } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,      // smoother stagger
      duration: 1.2,       // slower fade
      ease: [0.25, 0.1, 0.25, 1] // gentle ease
    }
  })
};

function About() {
  const items = [
    { icon: <PiBowlSteamBold className="fill-white" />, title: "Freshly Made", text: "With the Best ingredients" },
    { icon: <FaBowlFood className="fill-white" />, title: "Always Hot", text: "Delivered sizzling and aromatic" },
    { icon: <LiaPepperHotSolid className="fill-white" />, title: "Bursting with Flavor", text: "It awakens your taste buds" },
    { icon: <FaShippingFast className="fill-white" />, title: "Swift Delivery", text: "Delivered fast and hot" },
  ];

  return (
    <section className="bg-red-800 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-9 justify-items-center text-white px-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="flex flex-col md:flex-row justify-center items-center gap-4 text-center md:text-left"
          >
            <div className="w-16 h-16 rounded-full bg-white/25 flex items-center justify-center">
              {item.icon}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-200">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default About

