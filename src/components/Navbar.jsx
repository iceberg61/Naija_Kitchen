import React, { useState, useEffect } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/animations.css";

const navLinks = [
  { href: "/menu",        label: "Menu",        isRoute: true  },
  { href: "/reservation", label: "Reservation", isRoute: true  },
  { href: "/catering",    label: "Catering",    isRoute: true  },
  { href: "/about",       label: "Our Story",   isRoute: true  },
  { href: "/contact",     label: "Contact",     isRoute: true  },
];

function Navbar() {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

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

  const isActive = (href) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  const linkClass = (href) =>
    `text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-red-700 after:transition-all ${
      isActive(href) ? "text-red-700 after:w-full" : "text-gray-600 hover:text-red-700"
    }`;

  const mobileLinkClass = (href) =>
    `text-base font-medium ${isActive(href) ? "text-red-700" : "text-gray-700 hover:text-red-700"}`;

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/90 shadow-md backdrop-blur-md" : "bg-white/60 backdrop-blur-sm"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-20">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-900 shrink-0">
          <span className="text-red-800">Naija</span> Kitchen
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Cart icon */}
          <Link to="/checkout" className="relative p-2 text-gray-600 hover:text-red-700 transition-colors" aria-label="View cart">
            <CgShoppingCart className="text-2xl" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-700 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Order now — desktop */}
          <Link
            to="/menu"
            className="hidden lg:flex items-center gap-2 bg-red-700 text-white px-5 py-2.5 rounded-full hover:bg-red-900 text-sm font-medium transition-colors hover:shadow-md"
          >
            Order now <CgShoppingCart className="text-base" />
          </Link>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-3xl text-red-700 focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={`lg:hidden bg-white w-full shadow-md border-t border-gray-100 overflow-hidden transition-all duration-300 ease-out ${
        isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="flex flex-col py-4 space-y-4 px-6">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className={mobileLinkClass(link.href)}>
              {link.label}
            </Link>
          ))}
          <Link
            to="/menu"
            className="bg-red-700 text-white px-6 py-2.5 rounded-full hover:bg-red-900 text-sm font-medium transition-colors flex justify-center items-center gap-2"
          >
            Order now <CgShoppingCart className="text-lg" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;