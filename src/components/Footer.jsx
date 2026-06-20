import React from "react";
import { FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";
import FooterBg from "../assets/popular_bg.png";
import { IoMdSend } from "react-icons/io";
import "../styles/animations.css";

function Footer() {
  return (
    <footer className="relative overflow-hidden text-white pt-20 pb-10">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${FooterBg})` }} />
      <div className="absolute inset-0 bg-black/80 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 grid md:grid-cols-4 gap-10 anim-fade-up">
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold mb-3">
            <span className="text-red-700">Naija</span> Kitchen
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Experience the true flavors of Nigeria — spicy, soulful, and served with love.
            Every meal we make brings you closer to home.
          </p>
          <div className="flex gap-4 mt-5">
            {[FaInstagram, FaXTwitter, FaYoutube].map((Icon, i) => (
              <a key={i} href="#" className="p-3 bg-red-700/50 rounded-full hover:bg-red-700 transition-colors">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-red-700">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            {["Home", "Menu", "Order", "About Us", "Contact"].map((item) => (
              <li key={item} className="hover:text-white transition-colors cursor-pointer">{item}</li>
            ))}
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-red-700">Opening Hours</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex justify-between border-b border-gray-700 pb-1"><span>Mon - Fri</span><span>8:00 AM - 9:00 PM</span></li>
            <li className="flex justify-between border-b border-gray-700 pb-1"><span>Saturday</span><span>9:00 AM - 10:00 PM</span></li>
            <li className="flex justify-between"><span>Sunday</span><span>Closed</span></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-red-700">Subscribe to Our Newsletter</h3>
          <p className="text-gray-300 text-sm mb-5">
            Get exclusive offers, updates, and delicious news delivered fresh to your inbox.
          </p>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl shadow-lg w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-md bg-white/80 text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-red-700 focus:bg-white transition-all duration-200"
            />
            <button type="button" className="flex items-center justify-center bg-red-800 text-white p-3 rounded-md hover:bg-red-700 transition-colors">
              <IoMdSend className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center text-gray-400 mt-14 text-sm border-t border-gray-700 pt-6">
        <p>© {new Date().getFullYear()} Naija Kitchen. Crafted with ❤️ for food lovers everywhere.</p>
      </div>
    </footer>
  );
}

export default Footer;