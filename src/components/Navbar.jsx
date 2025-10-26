import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
// import Vegatablepot from "../assets/vegetables-pot.png";
import { CgShoppingCart } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#Homepage");
  const [isScrolled, setIsScrolled] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  const navLinks = [
    { href: "#Homepage", label: "Homepage" },
    { href: "#Menu", label: "Menu" },
    { href: "#Reservation", label: "Reservation" },
    { href: "#Story", label: "Our Story" },
    { href: "#Location", label: "Location" },
    { href: "#Contact", label: "Contact Us" },
  ];

  // Detect scroll for shadow and border radius
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation Variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Faster stagger
        delayChildren: 0.3,
      },
    },
  };

  const linkVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 120 },
    },
  };

  const mobileLinkVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.nav
      ref={ref}
      initial={{ y: -100, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className={`max-w-7xl mx-auto sticky top-0 right-0 left-0 backdrop-blur-sm z-50 bg-red-200/20 transition-all duration-300 ${
        isScrolled ? "md:top-0 rounded-none shadow-md" : "md:top-5 md:rounded-full"
      }`}
    >
      {/* Main Nav Container */}
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20 h-16">
        {/* Logo */}
        <div className="flex items-center justify-start w-full md:w-auto">
          <h2 className="text-2xl font-bold mb-3">
            <span className="text-red-800">Naija</span> Kitchen
          </h2>
        </div>

        {/* Desktop Nav Links */}
        <motion.div
          className="hidden md:flex items-center gap-10"
          variants={containerVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {navLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              variants={linkVariants}
              onClick={() => setActiveLink(link.href)}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-red-700 after:transition-all ${
                activeLink === link.href
                  ? "text-red-700 after:w-full"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        {/* Desktop Order Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:flex bg-red-700 text-white px-6 py-2.5 rounded-full hover:bg-red-900 text-sm font-medium transition-all hover:shadow-lg hover:shadow-red-100"
        >
          <div className="flex items-center">
            <a href="#">Order now</a>
            <CgShoppingCart className="mx-1.5 text-lg" />
          </div>
        </motion.button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute right-5 text-3xl text-red-700 focus:outline-none md:hidden"
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-red-100 w-full left-0 top-full absolute overflow-hidden"
          >
            <motion.div
              className="flex flex-col items-start py-4 space-y-4 px-6"
              variants={containerVariants}
              initial="initial"
              animate="animate"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  variants={mobileLinkVariants}
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
                </motion.a>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-700 text-white px-6 py-2.5 rounded-full hover:bg-red-900 text-sm font-medium transition-all w-full flex justify-center items-center"
              >
                <a href="#">Order now</a>
                <CgShoppingCart className="ml-2 text-lg" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;