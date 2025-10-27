import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CgShoppingCart } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#Homepage");
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { href: "#Homepage", label: "Homepage" },
    { href: "#Menu", label: "Menu" },
    { href: "#Reservation", label: "Reservation" },
    { href: "#Story", label: "Our Story" },
    { href: "#Location", label: "Location" },
    { href: "#Contact", label: "Contact Us" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 shadow-md backdrop-blur-md"
          : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-20">
        {/* Logo */}
        <h2 className="text-2xl font-bold text-gray-900">
          <span className="text-red-800">Naija</span> Kitchen
        </h2>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-red-700 after:transition-all ${
                activeLink === link.href
                  ? "text-red-700 after:w-full"
                  : "text-gray-600 hover:text-red-700"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Order Button (Desktop) */}
        <button className="hidden md:flex bg-red-700 text-white px-6 py-2.5 rounded-full hover:bg-red-900 text-sm font-medium transition-all hover:shadow-md">
          <a href="#">Order now</a>
          <CgShoppingCart className="ml-2 text-lg" />
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-3xl text-red-700 focus:outline-none md:hidden"
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white w-full shadow-md border-t border-gray-100"
          >
            <div className="flex flex-col py-4 space-y-4 px-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.href);
                    setIsMenuOpen(false);
                  }}
                  className={`text-base font-medium ${
                    activeLink === link.href
                      ? "text-red-700"
                      : "text-gray-700 hover:text-red-700"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <button className="bg-red-700 text-white px-6 py-2.5 rounded-full hover:bg-red-900 text-sm font-medium transition-all flex justify-center items-center">
                <a href="#">Order now</a>
                <CgShoppingCart className="ml-2 text-lg" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
