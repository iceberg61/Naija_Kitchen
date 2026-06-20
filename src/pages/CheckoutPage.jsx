import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdLocationOn, MdAccessTime } from "react-icons/md";
import { useCart } from "../context/CartContext";
import menuData from "../data/menuData";

const fmt = (n) => `₦${n.toLocaleString()}`;
const DELIVERY_FEE = 500;

export default function CheckoutPage() {
  const { cart, addToCart, removeFromCart, clearCart, totalItems } = useCart();
  const navigate = useNavigate();

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({ dish: menuData.find((d) => d.id === Number(id)), qty }))
    .filter((i) => i.dish);

  const subtotal = cartItems.reduce((s, { dish, qty }) => s + dish.price * qty, 0);
  const total = subtotal + DELIVERY_FEE;

  const handlePlaceOrder = () => {
    clearCart();
    navigate("/order-tracking");
  };

  // ── Empty cart ───────────────────────────────────────────
  if (totalItems === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
        <CgShoppingCart className="text-7xl text-gray-200 mb-4" />
        <h2 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-400 text-sm mb-6">Add some Naija goodness before checking out.</p>
        <Link to="/menu" className="bg-red-700 hover:bg-red-900 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Page title ───────────────────────────────────────── */}
      <div className="bg-red-800 text-white py-10 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Checkout</h1>
        <p className="text-red-200 text-sm mt-1">Review your order and place it below</p>
      </div>

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">

        {/* Order summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800 text-lg">Order Summary</h2>
            <p className="text-gray-400 text-sm">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
          </div>

          <div className="divide-y divide-gray-50">
            {cartItems.map(({ dish, qty }) => (
              <div key={dish.id} className="flex items-center gap-4 px-6 py-4">
                <img src={dish.img} alt={dish.name} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm">{dish.name}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{dish.category}</p>
                  <p className="text-red-700 font-bold text-sm mt-1">{fmt(dish.price)} × {qty}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => removeFromCart(dish.id)} className="w-7 h-7 rounded-full bg-red-100 hover:bg-red-200 text-red-800 flex items-center justify-center transition-colors">
                    <FaMinus className="text-[10px]" />
                  </button>
                  <span className="text-sm font-bold text-gray-800 w-4 text-center">{qty}</span>
                  <button onClick={() => addToCart(dish.id)} className="w-7 h-7 rounded-full bg-red-700 hover:bg-red-900 text-white flex items-center justify-center transition-colors">
                    <FaPlus className="text-[10px]" />
                  </button>
                </div>
                <p className="text-gray-700 font-semibold text-sm w-20 text-right shrink-0">
                  {fmt(dish.price * qty)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5">
          <h2 className="font-bold text-gray-800 text-lg mb-4">Delivery Info</h2>
          <div className="flex items-start gap-3 text-sm text-gray-500">
            <MdLocationOn className="text-red-700 text-xl shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-700">Delivering to your saved address</p>
              <p className="text-xs mt-0.5 text-gray-400">You'll be able to update this when the backend is connected.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500 mt-4">
            <MdAccessTime className="text-red-700 text-xl shrink-0" />
            <p>Estimated delivery: <strong className="text-gray-700">25 – 35 mins</strong></p>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5 space-y-3">
          <h2 className="font-bold text-gray-800 text-lg mb-2">Price Breakdown</h2>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
            <span>{fmt(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Delivery fee</span>
            <span>{fmt(DELIVERY_FEE)}</span>
          </div>
          <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-800 text-base">
            <span>Total</span>
            <span className="text-red-800 text-lg">{fmt(total)}</span>
          </div>
        </div>

        {/* Place order */}
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-red-700 hover:bg-red-900 active:scale-95 text-white font-bold py-4 rounded-full transition-all text-base shadow-md hover:shadow-lg"
        >
          Place Order — {fmt(total)}
        </button>

        <p className="text-center text-gray-400 text-xs">
          Payment on delivery. You can update payment methods once the backend is connected.
        </p>

        <button
          onClick={() => { clearCart(); navigate("/menu"); }}
          className="w-full text-gray-400 hover:text-red-500 text-xs text-center transition-colors"
        >
          Cancel order & go back
        </button>
      </div>
    </div>
  );
}