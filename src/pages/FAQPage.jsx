import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

// ── FAQ data ─────────────────────────────────────────────────────
const faqs = [
  // Orders
  {
    id: 1,
    category: "Orders",
    q: "How do I place an order?",
    a: "Simply browse our Menu page, add your favourite dishes to the cart, and proceed to checkout. You can review your order before confirming. Once placed, you'll be taken to the Order Tracking page to follow your delivery in real time.",
  },
  {
    id: 2,
    category: "Orders",
    q: "Can I modify or cancel my order after placing it?",
    a: "Orders can be modified or cancelled within 5 minutes of placement. After that, our kitchen would have already started preparing your food. For urgent changes, contact us immediately via WhatsApp for the fastest response.",
  },
  {
    id: 3,
    category: "Orders",
    q: "Is there a minimum order amount?",
    a: "Yes, the minimum order for delivery is ₦2,000. There is no minimum for pickup orders.",
  },
  {
    id: 4,
    category: "Orders",
    q: "Can I schedule an order in advance?",
    a: "Advance ordering is coming soon! For now, all orders are for same-day delivery. If you need food for a specific event or date, please use our Catering page to make an enquiry.",
  },

  // Delivery
  {
    id: 5,
    category: "Delivery",
    q: "How long does delivery take?",
    a: "Standard delivery takes 25–45 minutes depending on your location and order size. During peak hours (lunch and dinner), it may take slightly longer. You can track your order in real time on the Order Tracking page.",
  },
  {
    id: 6,
    category: "Delivery",
    q: "What areas do you deliver to?",
    a: "We currently deliver across Lagos Island, Lekki, Victoria Island, Ikoyi, Ajah, and Surulere. We're expanding to Abuja soon. If your area isn't listed, contact us — we may still be able to help for larger orders.",
  },
  {
    id: 7,
    category: "Delivery",
    q: "How much is the delivery fee?",
    a: "The flat delivery fee is ₦500 for standard delivery. Free delivery is available on orders above ₦10,000. Catering orders have a separate delivery arrangement that is discussed during the booking process.",
  },
  {
    id: 8,
    category: "Delivery",
    q: "What happens if my order arrives cold or incorrect?",
    a: "We take food quality very seriously. If your order arrives cold or incorrect, please take a photo and contact us within 30 minutes via WhatsApp. We will either replace the order or issue a full refund — no questions asked.",
  },

  // Payment
  {
    id: 9,
    category: "Payment",
    q: "What payment methods do you accept?",
    a: "We currently accept payment on delivery (cash). Online payment via card and bank transfer is coming soon. For catering bookings, we require a 50% deposit via bank transfer to confirm your date.",
  },
  {
    id: 10,
    category: "Payment",
    q: "Is it safe to pay online?",
    a: "Online payment is not yet live but is coming soon. When it launches, all transactions will be secured with SSL encryption and processed through a trusted Nigerian payment gateway.",
  },
  {
    id: 11,
    category: "Payment",
    q: "Can I get a refund?",
    a: "Yes. If your order was incorrect, damaged, or not delivered, you are entitled to a full refund. Refunds are processed within 3–5 business days back to your original payment method once online payment is active.",
  },

  // Catering & Reservations
  {
    id: 12,
    category: "Catering & Reservations",
    q: "How far in advance should I book for catering?",
    a: "We recommend booking at least 7 days in advance for small events and 2–3 weeks for large events (100+ guests). This ensures we can source ingredients and staff appropriately for your event.",
  },
  {
    id: 13,
    category: "Catering & Reservations",
    q: "Do you cater outside Lagos?",
    a: "Yes, we cater outside Lagos for large events with enough notice. Additional transport and logistics fees apply. Contact us via the Catering page and we'll provide a custom quote for your location.",
  },
  {
    id: 14,
    category: "Catering & Reservations",
    q: "How do I make a table reservation?",
    a: "Visit our Reservation page and fill in your details — name, date, time, number of guests, and seating preference. We'll call you to confirm. Tables are held for 15 minutes after your booking time.",
  },
  {
    id: 15,
    category: "Catering & Reservations",
    q: "Can I request specific dishes for my event?",
    a: "Absolutely. When filling out the catering enquiry form, use the Additional Details field to list your preferred dishes. Our team will confirm availability and suggest alternatives if needed.",
  },

  // Food & Allergens
  {
    id: 16,
    category: "Food & Allergens",
    q: "Do you have vegetarian or vegan options?",
    a: "Yes. Several of our dishes can be made vegetarian — including our egusi soup (without meat), fried rice, jollof rice, puff puff, akara, and all our drinks. Let us know your preference in the order notes when the feature launches.",
  },
  {
    id: 17,
    category: "Food & Allergens",
    q: "Do your dishes contain nuts or common allergens?",
    a: "Some dishes may contain groundnuts (peanuts), fish, shellfish, or gluten. If you have a specific allergy, please contact us before ordering so we can advise on safe options or prepare your meal separately.",
  },
  {
    id: 18,
    category: "Food & Allergens",
    q: "Is your food halal?",
    a: "Yes. All our meat is sourced from halal-certified suppliers. We do not use pork or alcohol in any of our cooking. If you have specific halal requirements, feel free to confirm with us before ordering.",
  },
];

const categories = ["All", "Orders", "Delivery", "Payment", "Catering & Reservations", "Food & Allergens"];

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
        <HiChevronDown className={`flex-shrink-0 text-xl transition-transform duration-300 ${isOpen ? "rotate-180 text-red-700" : "text-gray-400"}`} />
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
