import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaQuoteLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

// ── Review data ──────────────────────────────────────────────────
const reviews = [
  { id: 1,  name: "Ngozi Eze",         location: "Lagos",   rating: 5,   dish: "Egusi Soup",       img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80", review: "Best egusi I've had outside my mum's kitchen. The meat was soft, the soup was rich and the swallow was perfect. Will definitely order again!" },
  { id: 2,  name: "Emeka Okafor",      location: "Abuja",   rating: 5,   dish: "Jollof Rice",      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80", review: "Party jollof all day! That smoky bottom pot flavour came through perfectly. My whole family couldn't stop eating." },
  { id: 3,  name: "Fatima Bello",      location: "Kano",    rating: 4,   dish: "Pepper Soup",      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80", review: "The catfish pepper soup was incredibly spicy and flavourful. Delivery was fast too. Only wish the portion was a bit bigger." },
  { id: 4,  name: "Chukwudi Nwosu",   location: "Enugu",   rating: 5,   dish: "Ofada Rice",       img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80", review: "Authentic ofada rice with the real ayamase stew. I ordered for my whole office and everyone was impressed. This is the real deal." },
  { id: 5,  name: "Aisha Mustapha",   location: "Kaduna",  rating: 5,   dish: "Suya Skewers",     img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80", review: "The suya arrived still warm and the yaji spice blend was on point. Tasted exactly like northern suya. Highly recommend!" },
  { id: 6,  name: "Tunde Adeyemi",    location: "Ibadan",  rating: 4,   dish: "Banga Soup",       img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80", review: "Banga soup was thick and flavourful, just the way I like it. The dried fish added a great depth. Will order again soon." },
  { id: 7,  name: "Chisom Obi",       location: "Owerri",  rating: 5,   dish: "Puff Puff",        img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80", review: "Soft, fluffy, perfectly sweetened. My kids demolished the whole bag in minutes. This is going to be a weekly order for us." },
  { id: 8,  name: "Biodun Lawal",     location: "Lagos",   rating: 3,   dish: "Fried Rice",       img: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80", review: "Fried rice was good but arrived a bit cold. Flavour was there though — vegetables were fresh and the liver pieces were generous." },
  { id: 9,  name: "Adaeze Nkemdirim", location: "Asaba",   rating: 5,   dish: "Ofe Onugbu",       img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80", review: "This bitter leaf soup took me straight back home to Asaba. The ofe akwu base was perfect and assorted meat was well seasoned." },
  { id: 10, name: "Segun Badmus",     location: "Abeokuta",rating: 4,   dish: "Zobo Drink",       img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", review: "The zobo was beautifully chilled and not overly sweet. You could taste the ginger and pineapple clearly. Refreshing!" },
  { id: 11, name: "Kemi Fashola",     location: "Lagos",   rating: 5,   dish: "Akara",            img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", review: "Crispy on the outside, fluffy inside. These akara balls are a perfect Sunday morning treat. Paired them with the pap and it was heavenly." },
  { id: 12, name: "Uche Nwachukwu",  location: "Port Harcourt", rating: 4, dish: "Fried Plantain", img: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=200&q=80", review: "Sweet and golden, just right. They weren't too ripe or too firm. Great side with the jollof rice. Delivery was on time too." },
];

// ── Star renderer ────────────────────────────────────────────────
const Stars = ({ rating, size = "text-sm" }) => (
  <div className={`flex gap-0.5 ${size}`}>
    {Array.from({ length: 5 }, (_, i) => {
      if (i < Math.floor(rating)) return <FaStar key={i} className="text-yellow-400" />;
      if (i < rating)             return <FaStarHalfAlt key={i} className="text-yellow-400" />;
      return                             <FaRegStar key={i} className="text-gray-300" />;
    })}
  </div>
);

// ── Rating bar ───────────────────────────────────────────────────
const RatingBar = ({ star, count, total }) => (
  <div className="flex items-center gap-3">
    <span className="text-xs text-gray-500 w-4">{star}</span>
    <FaStar className="text-yellow-400 text-xs flex-shrink-0" />
    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-yellow-400 rounded-full transition-all duration-500"
        style={{ width: total ? `${(count / total) * 100}%` : "0%" }}
      />
    </div>
    <span className="text-xs text-gray-400 w-5 text-right">{count}</span>
  </div>
);

const starFilters = [0, 5, 4, 3, 2, 1]; // 0 = All

export default function ReviewsPage() {
  const [filterStar, setFilterStar] = useState(0);

  const filtered = filterStar === 0
    ? reviews
    : reviews.filter((r) => Math.floor(r.rating) === filterStar);

  // Summary stats
  const total     = reviews.length;
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1);
  const starCounts = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: reviews.filter((r) => Math.floor(r.rating) === s).length,
  }));

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="relative bg-red-800 text-white py-20 px-4 text-center overflow-hidden">
        <div className="absolute -top-10 -left-10 w-52 h-52 bg-red-700/30 rounded-full" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-red-900/30 rounded-full" />
        <div className="relative z-10 max-w-xl mx-auto">
          <span className="inline-block bg-white/20 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Customer Reviews
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">What Our Customers Say</h1>
          <p className="text-red-100 text-sm md:text-base max-w-md mx-auto">
            Real feedback from real Naija food lovers across the country.
          </p>
        </div>
      </div>

      {/* ── Rating summary ───────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Overall score */}
          <div className="text-center md:border-r border-gray-100 md:pr-8">
            <p className="text-7xl font-extrabold text-red-800 leading-none mb-2">{avgRating}</p>
            <Stars rating={parseFloat(avgRating)} size="text-2xl" />
            <p className="text-gray-400 text-sm mt-2">Based on {total} reviews</p>
          </div>

          {/* Star breakdown */}
          <div className="space-y-3">
            {starCounts.map(({ star, count }) => (
              <RatingBar key={star} star={star} count={count} total={total} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Filter by stars ──────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pb-6">
        <div className="flex flex-wrap gap-3 justify-center">
          {starFilters.map((s) => (
            <button
              key={s}
              onClick={() => setFilterStar(s)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                filterStar === s
                  ? "bg-red-800 text-white border-red-800 shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-700"
              }`}
            >
              {s === 0 ? "All Reviews" : (
                <><FaStar className="text-yellow-400" /> {s} Stars</>
              )}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ml-1 ${filterStar === s ? "bg-white/20" : "bg-gray-100"}`}>
                {s === 0 ? total : starCounts.find((sc) => sc.star === s)?.count ?? 0}
              </span>
            </button>
          ))}
        </div>
        <p className="text-center text-gray-400 text-sm mt-4">
          {filtered.length} review{filtered.length !== 1 ? "s" : ""}
          {filterStar !== 0 ? ` with ${filterStar} star${filterStar !== 1 ? "s" : ""}` : ""}
        </p>
      </div>

      {/* ── Reviews grid ─────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200 flex flex-col gap-4"
          >
            {/* Quote icon */}
            <FaQuoteLeft className="text-red-100 text-3xl" />

            {/* Review text */}
            <p className="text-gray-600 text-sm leading-relaxed flex-1 italic">"{r.review}"</p>

            {/* Dish tag */}
            <span className="self-start bg-red-50 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
              {r.dish}
            </span>

            {/* Reviewer */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-4">
              <div className="flex items-center gap-3">
                <img
                  src={r.img}
                  alt={r.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-100"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{r.name}</p>
                  <p className="text-gray-400 text-xs">{r.location}</p>
                </div>
              </div>
              <Stars rating={r.rating} />
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <div className="bg-red-800 text-white py-14 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Experience It Yourself?</h2>
        <p className="text-red-200 text-sm mb-7 max-w-md mx-auto">
          Join thousands of happy customers. Order now and leave your own review.
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 bg-white text-red-800 font-semibold px-7 py-3 rounded-full hover:bg-red-50 transition-colors text-sm"
        >
          Order Now <HiArrowRight />
        </Link>
      </div>
    </div>
  );
}
