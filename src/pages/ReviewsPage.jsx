import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaQuoteLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import reviewsData from "../data/reviewsData";

const Stars = ({ rating, size = "text-sm" }) => (
  <div className={`flex gap-0.5 ${size}`}>
    {Array.from({ length: 5 }, (_, i) => {
      if (i < Math.floor(rating)) return <FaStar key={i} className="text-yellow-400" />;
      if (i < rating)             return <FaStarHalfAlt key={i} className="text-yellow-400" />;
      return                             <FaRegStar key={i} className="text-gray-300" />;
    })}
  </div>
);

const RatingBar = ({ star, count, total }) => (
  <div className="flex items-center gap-3">
    <span className="text-xs text-gray-500 w-4">{star}</span>
    <FaStar className="text-yellow-400 text-xs shrink-0" />
    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full bg-yellow-400 rounded-full transition-all duration-500" style={{ width: total ? `${(count / total) * 100}%` : "0%" }} />
    </div>
    <span className="text-xs text-gray-400 w-5 text-right">{count}</span>
  </div>
);

const starFilters = [0, 5, 4, 3, 2, 1];

export default function ReviewsPage() {
  const [filterStar, setFilterStar] = useState(0);

  const filtered    = filterStar === 0 ? reviewsData : reviewsData.filter((r) => Math.floor(r.rating) === filterStar);
  const total       = reviewsData.length;
  const avgRating   = (reviewsData.reduce((s, r) => s + r.rating, 0) / total).toFixed(1);
  const starCounts  = [5, 4, 3, 2, 1].map((s) => ({ star: s, count: reviewsData.filter((r) => Math.floor(r.rating) === s).length }));

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="relative bg-red-800 text-white py-20 px-4 text-center overflow-hidden">
        <div className="absolute -top-10 -left-10 w-52 h-52 bg-red-700/30 rounded-full" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-red-900/30 rounded-full" />
        <div className="relative z-10 max-w-xl mx-auto">
          <span className="inline-block bg-white/20 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">Customer Reviews</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">What Our Customers Say</h1>
          <p className="text-red-100 text-sm md:text-base max-w-md mx-auto">Real feedback from real Naija food lovers across the country.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:border-r border-gray-100 md:pr-8">
            <p className="text-7xl font-extrabold text-red-800 leading-none mb-2">{avgRating}</p>
            <Stars rating={parseFloat(avgRating)} size="text-2xl" />
            <p className="text-gray-400 text-sm mt-2">Based on {total} reviews</p>
          </div>
          <div className="space-y-3">
            {starCounts.map(({ star, count }) => <RatingBar key={star} star={star} count={count} total={total} />)}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-6">
        <div className="flex flex-wrap gap-3 justify-center">
          {starFilters.map((s) => (
            <button key={s} onClick={() => setFilterStar(s)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${filterStar === s ? "bg-red-800 text-white border-red-800 shadow-md" : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-700"}`}>
              {s === 0 ? "All Reviews" : <><FaStar className="text-yellow-400" /> {s} Stars</>}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ml-1 ${filterStar === s ? "bg-white/20" : "bg-gray-100"}`}>
                {s === 0 ? total : starCounts.find((sc) => sc.star === s)?.count ?? 0}
              </span>
            </button>
          ))}
        </div>
        <p className="text-center text-gray-400 text-sm mt-4">
          {filtered.length} review{filtered.length !== 1 ? "s" : ""}{filterStar !== 0 ? ` with ${filterStar} star${filterStar !== 1 ? "s" : ""}` : ""}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200 flex flex-col gap-4">
            <FaQuoteLeft className="text-red-100 text-3xl" />
            <p className="text-gray-600 text-sm leading-relaxed flex-1 italic">"{r.review}"</p>
            <span className="self-start bg-red-50 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">{r.dish}</span>
            <div className="flex items-center justify-between border-t border-gray-50 pt-4">
              <div className="flex items-center gap-3">
                <img src={r.img} alt={r.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" loading="lazy" />
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

      <div className="bg-red-800 text-white py-14 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Experience It Yourself?</h2>
        <p className="text-red-200 text-sm mb-7 max-w-md mx-auto">Join thousands of happy customers. Order now and leave your own review.</p>
        <Link to="/menu" className="inline-flex items-center gap-2 bg-white text-red-800 font-semibold px-7 py-3 rounded-full hover:bg-red-50 transition-colors text-sm">
          Order Now <HiArrowRight />
        </Link>
      </div>
    </div>
  );
}