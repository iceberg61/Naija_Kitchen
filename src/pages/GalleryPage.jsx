import React, { useState } from "react";
import { HiX } from "react-icons/hi";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

// ── Gallery data ─────────────────────────────────────────────────
const images = [
  { id: 1,  src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80", alt: "Jollof Rice",         category: "Rice",   tall: true  },
  { id: 2,  src: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&q=80", alt: "Egusi Soup",         category: "Soups",  tall: false },
  { id: 3,  src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80", alt: "Akara",               category: "Snacks", tall: false },
  { id: 4,  src: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80", alt: "Suya Skewers",       category: "Snacks", tall: true  },
  { id: 5,  src: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80", alt: "Banga Soup",         category: "Soups",  tall: false },
  { id: 6,  src: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80", alt: "Fried Rice",         category: "Rice",   tall: true  },
  { id: 7,  src: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80", alt: "Puff Puff",          category: "Snacks", tall: false },
  { id: 8,  src: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&q=80", alt: "Zobo Drink",         category: "Drinks", tall: false },
  { id: 9,  src: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80", alt: "Ofada Rice",         category: "Rice",   tall: true  },
  { id: 10, src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80", alt: "Ofe Onugbu",         category: "Soups",  tall: false },
  { id: 11, src: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80", alt: "Pepper Soup",        category: "Soups",  tall: true  },
  { id: 12, src: "https://images.unsplash.com/photo-1587334207407-99e44e5f5e72?w=800&q=80", alt: "Fried Plantain",     category: "Snacks", tall: false },
  { id: 13, src: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80", alt: "Kunu Aya",           category: "Drinks", tall: false },
  { id: 14, src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80", alt: "White Rice & Stew",  category: "Rice",   tall: true  },
  { id: 15, src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80", alt: "Kitchen Prep",       category: "Behind the Scenes", tall: false },
  { id: 16, src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", alt: "Dining Experience",  category: "Behind the Scenes", tall: true  },
];

const categories = ["All", "Rice", "Soups", "Snacks", "Drinks", "Behind the Scenes"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox]             = useState(null); // index in filtered array

  const filtered = activeCategory === "All"
    ? images
    : images.filter((img) => img.category === activeCategory);

  const openLightbox  = (i) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prevImg = () => setLightbox((i) => (i - 1 + filtered.length) % filtered.length);
  const nextImg = () => setLightbox((i) => (i + 1) % filtered.length);

  // Keyboard navigation
  React.useEffect(() => {
    const onKey = (e) => {
      if (lightbox === null) return;
      if (e.key === "ArrowLeft")  prevImg();
      if (e.key === "ArrowRight") nextImg();
      if (e.key === "Escape")     closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, filtered.length]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="relative bg-red-800 text-white py-20 px-4 text-center overflow-hidden">
        <div className="absolute -top-10 -left-10 w-52 h-52 bg-red-700/30 rounded-full" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-red-900/30 rounded-full" />
        <div className="relative z-10 max-w-xl mx-auto">
          <span className="inline-block bg-white/20 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Gallery
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Food Worth Looking At</h1>
          <p className="text-red-100 text-sm md:text-base max-w-md mx-auto">
            A visual feast of our dishes, drinks, and the kitchen that makes it all happen.
          </p>
        </div>
      </div>

      {/* ── Filters ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-6">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setLightbox(null); }}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-red-800 text-white border-red-800 shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="text-center text-gray-400 text-sm mt-4">
          {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
        </p>
      </div>

      {/* ── Masonry grid ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((img, i) => (
            <div
              key={img.id}
              onClick={() => openLightbox(i)}
              className="break-inside-avoid overflow-hidden rounded-2xl cursor-pointer group relative shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                  img.tall ? "h-72 md:h-80" : "h-44 md:h-52"
                }`}
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-2xl flex items-end p-4 opacity-0 group-hover:opacity-100">
                <div>
                  <p className="text-white font-semibold text-sm">{img.alt}</p>
                  <p className="text-white/70 text-xs">{img.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-4"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white text-3xl hover:text-red-400 transition-colors z-10"
          >
            <HiX />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImg(); }}
            className="absolute left-4 text-white text-4xl hover:text-red-400 transition-colors z-10 p-2"
          >
            <MdArrowBackIos />
          </button>

          {/* Image */}
          <div onClick={(e) => e.stopPropagation()} className="max-w-4xl max-h-[85vh] w-full">
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />
            <div className="text-center mt-3">
              <p className="text-white font-semibold">{filtered[lightbox].alt}</p>
              <p className="text-white/60 text-sm">{filtered[lightbox].category}</p>
              <p className="text-white/40 text-xs mt-1">{lightbox + 1} / {filtered.length}</p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImg(); }}
            className="absolute right-4 text-white text-4xl hover:text-red-400 transition-colors z-10 p-2"
          >
            <MdArrowForwardIos />
          </button>
        </div>
      )}
    </div>
  );
}
