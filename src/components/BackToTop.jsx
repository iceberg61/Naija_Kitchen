import React, { useState, useEffect } from "react";
import { HiArrowUp } from "react-icons/hi";

// Floating back-to-top button — appears after scrolling 400px
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollUp}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 bg-red-700 hover:bg-red-900 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <HiArrowUp className="text-lg" />
    </button>
  );
}
