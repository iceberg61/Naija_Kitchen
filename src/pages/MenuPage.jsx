import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { HiX } from "react-icons/hi";
import { useCart } from "../context/CartContext";
import menuData from "../data/menuData";

const categories = ["All", "Soups", "Rice", "Snacks", "Drinks"];
const fmt = (n) => `₦${n.toLocaleString()}`;

export default function MenuPage() {
  const { cart, addToCart, removeFromCart, clearCart, totalItems } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    menuData.forEach((item) => { const img = new Image(); img.src = item.img; });
  }, []);

  const filtered = activeCategory === "All"
    ? menuData
    : menuData.filter((d) => d.category === activeCategory);

  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menuData.find((d) => d.id === Number(id));
    return sum + (item?.price ?? 0) * qty;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Hero Banner ──────────────────────────────────────── */}
      <div className="bg-red-800 text-white py-14 px-4 text-center">
        <p className="text-red-300 text-sm font-medium tracking-widest uppercase mb-2">Fresh • Hot • Authentic</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Our Menu</h1>
        <p className="text-red-100 max-w-lg mx-auto text-sm sm:text-base">
          From smoky jollof to hearty egusi — every dish crafted with love and real Naija flavour.
        </p>
      </div>

      {/* ── Filters ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 pt-10">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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
          {filtered.length} dish{filtered.length !== 1 ? "es" : ""}{activeCategory !== "All" ? ` in ${activeCategory}` : " available"}
        </p>
      </div>

      {/* ── Grid ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((dish) => {
          const qty = cart[dish.id] || 0;
          return (
            <div key={dish.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 flex flex-col">
              <div className="relative overflow-hidden h-48">
                <img src={dish.img} alt={dish.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                <span className="absolute top-3 left-3 bg-white/90 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
                  {dish.category}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1"><FaStar className="text-yellow-400" />{dish.rating}</span>
                  <span className="flex items-center gap-1"><MdAccessTime />{dish.time}</span>
                </div>
                <h3 className="font-semibold text-gray-800 text-base mb-1">{dish.name}</h3>
                <p className="text-gray-500 text-xs mb-4 flex-1 leading-relaxed">{dish.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-red-800 font-bold text-base">{fmt(dish.price)}</span>
                  {qty === 0 ? (
                    <button
                      onClick={() => addToCart(dish.id)}
                      className="flex items-center gap-1.5 bg-red-700 hover:bg-red-900 text-white text-xs font-medium px-3 py-2 rounded-full transition-colors active:scale-95"
                    >
                      <FaPlus className="text-[10px]" /> Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button onClick={() => removeFromCart(dish.id)} className="w-7 h-7 rounded-full bg-red-100 hover:bg-red-200 text-red-800 flex items-center justify-center transition-colors">
                        <FaMinus className="text-[10px]" />
                      </button>
                      <span className="text-sm font-bold text-gray-800 w-4 text-center">{qty}</span>
                      <button onClick={() => addToCart(dish.id)} className="w-7 h-7 rounded-full bg-red-700 hover:bg-red-900 text-white flex items-center justify-center transition-colors">
                        <FaPlus className="text-[10px]" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Floating cart button (mobile) ────────────────────── */}
      {totalItems > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 md:hidden bg-red-700 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-semibold z-30"
        >
          <CgShoppingCart className="text-lg" />
          View Cart ({totalItems})
        </button>
      )}

      {/* ── Cart Sidebar ─────────────────────────────────────── */}
      <div
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      <aside className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${cartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <CgShoppingCart className="text-red-700 text-xl" /> Your Cart
            {totalItems > 0 && <span className="bg-red-700 text-white text-xs font-bold px-2 py-0.5 rounded-full">{totalItems}</span>}
          </h2>
          <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-gray-700 text-2xl transition-colors"><HiX /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {totalItems === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 gap-3">
              <CgShoppingCart className="text-5xl text-gray-200" />
              <p className="font-medium">Your cart is empty</p>
              <p className="text-sm">Add some Naija goodness!</p>
            </div>
          ) : (
            Object.entries(cart).map(([id, qty]) => {
              const dish = menuData.find((d) => d.id === Number(id));
              if (!dish) return null;
              return (
                <div key={id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                  <img src={dish.img} alt={dish.name} className="w-14 h-14 object-cover rounded-lg shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-800 truncate">{dish.name}</p>
                    <p className="text-red-700 text-sm font-bold">{fmt(dish.price)}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => removeFromCart(dish.id)} className="w-6 h-6 rounded-full bg-red-100 text-red-800 flex items-center justify-center hover:bg-red-200 transition-colors">
                      <FaMinus className="text-[9px]" />
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{qty}</span>
                    <button onClick={() => addToCart(dish.id)} className="w-6 h-6 rounded-full bg-red-700 text-white flex items-center justify-center hover:bg-red-900 transition-colors">
                      <FaPlus className="text-[9px]" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {totalItems > 0 && (
          <div className="border-t border-gray-100 px-5 py-4 space-y-3">
            <div className="flex justify-between text-sm text-gray-500"><span>Subtotal</span><span>{fmt(totalPrice)}</span></div>
            <div className="flex justify-between text-sm text-gray-500"><span>Delivery fee</span><span>₦500</span></div>
            <div className="flex justify-between font-bold text-gray-800"><span>Total</span><span className="text-red-800">{fmt(totalPrice + 500)}</span></div>
            <Link
              to="/checkout"
              onClick={() => setCartOpen(false)}
              className="block w-full bg-red-700 hover:bg-red-900 text-white font-semibold py-3 rounded-full transition-colors text-sm text-center"
            >
              Proceed to Checkout →
            </Link>
            <button onClick={clearCart} className="w-full text-gray-400 hover:text-red-500 text-xs text-center transition-colors">
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}