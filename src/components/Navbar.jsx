import React, { useState, useEffect } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/animations.css";

const navLinks = [
  { href: "/",            label: "Homepage",   isRoute: true  },
  { href: "/menu",        label: "Menu",        isRoute: true  },
  { href: "/catering",    label: "Catering",    isRoute: true  },
  { href: "/about",       label: "Our Story",   isRoute: true  },
  { href: "/reservation",    label: "Reservation",    isRoute: true },
  { href: "#Contact",     label: "Contact Us",  isRoute: false },
];

const linkClass = (isActive) =>
  `text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-red-700 after:transition-all ${
    isActive ? "text-red-700 after:w-full" : "text-gray-600 hover:text-red-700"
  }`;

const mobileLinkClass = (isActive) =>
  `text-base font-medium ${isActive ? "text-red-700" : "text-gray-700 hover:text-red-700"}`;

function Navbar() {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Set active link based on current path on mount
    setActiveLink(window.location.pathname);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href) => {
    setActiveLink(href);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/90 shadow-md backdrop-blur-md" : "bg-white/60 backdrop-blur-sm"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-20">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-900" onClick={() => handleLinkClick("/")}>
          <span className="text-red-800">Naija</span> Kitchen
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={linkClass(activeLink === link.href)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={linkClass(activeLink === link.href)}
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* Right side — cart + order button */}
        <div className="hidden md:flex items-center gap-3">
          {/* Cart icon with live counter */}
          <Link
            to="/checkout"
            className="relative flex items-center gap-2 text-gray-600 hover:text-red-700 transition-colors p-2"
            aria-label="View cart"
          >
            <CgShoppingCart className="text-2xl" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-700 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Order now button */}
          <Link
            to="/menu"
            onClick={() => handleLinkClick("/menu")}
            className="flex items-center gap-2 bg-red-700 text-white px-6 py-2.5 rounded-full hover:bg-red-900 text-sm font-medium transition-colors hover:shadow-md"
          >
            Order now
            <CgShoppingCart className="text-lg" />
          </Link>
        </div>

        {/* Mobile right side */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile cart counter */}
          <Link to="/checkout" className="relative p-1" aria-label="View cart">
            <CgShoppingCart className="text-2xl text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-700 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-3xl text-red-700 focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={`md:hidden bg-white w-full shadow-md border-t border-gray-100 overflow-hidden transition-all duration-300 ease-out ${
        isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="flex flex-col py-4 space-y-4 px-6">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={mobileLinkClass(activeLink === link.href)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={mobileLinkClass(activeLink === link.href)}
              >
                {link.label}
              </a>
            )
          )}

          <Link
            to="/menu"
            onClick={() => handleLinkClick("/menu")}
            className="bg-red-700 text-white px-6 py-2.5 rounded-full hover:bg-red-900 text-sm font-medium transition-colors flex justify-center items-center gap-2"
          >
            Order now
            <CgShoppingCart className="text-lg" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;