import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { faqs, categories } from "../data/faqs"

// ── FAQ data ─────────────────────────────────────────────────────


// ── Accordion item ───────────────────────────────────────────────
function AccordionItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-200 ${isOpen ? "border-red-200 shadow-sm" : "border-gray-100"}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className={`font-semibold text-sm pr-4 ${isOpen ? "text-red-800" : "text-gray-800"}`}>
          {faq.q}
        </span>
        <HiChevronDown className={`shrink-0 text-xl transition-transform duration-300 ${isOpen ? "rotate-180 text-red-700" : "text-gray-400"}`} />
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <p className="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openId, setOpenId]               = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? faqs
    : faqs.filter((f) => f.category === activeCategory);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="relative bg-red-800 text-white py-20 px-4 text-center overflow-hidden">
        <div className="absolute -top-10 -left-10 w-52 h-52 bg-red-700/30 rounded-full" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-red-900/30 rounded-full" />
        <div className="relative z-10 max-w-xl mx-auto">
          <span className="inline-block bg-white/20 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            FAQ
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Frequently Asked Questions</h1>
          <p className="text-red-100 text-sm md:text-base max-w-md mx-auto">
            Got questions? We've got answers. If you can't find what you're looking for, just reach out.
          </p>
        </div>
      </div>

      {/* ── Category tabs ────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 pt-10 pb-6">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenId(null); }}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-red-800 text-white border-red-800 shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Accordion ────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 pb-16 space-y-3">
        {filtered.map((faq) => (
          <AccordionItem
            key={faq.id}
            faq={faq}
            isOpen={openId === faq.id}
            onToggle={() => toggle(faq.id)}
          />
        ))}
      </div>

      {/* ── Still have questions ─────────────────────────────── */}
      <div className="bg-white border-t border-gray-100 py-14 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Still Have Questions?</h2>
        <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
          Can't find the answer you're looking for? Reach out to us directly and we'll get back to you fast.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/2349001234592"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-7 py-3 rounded-full text-sm font-semibold transition-colors"
          >
            <FaWhatsapp className="text-lg" /> Chat on WhatsApp
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-red-700 hover:bg-red-900 text-white px-7 py-3 rounded-full text-sm font-semibold transition-colors"
          >
            Send a Message
          </Link>
        </div>
      </div>
    </div>
  );
}
