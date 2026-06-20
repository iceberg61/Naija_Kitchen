import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdRestaurant, MdDeliveryDining, MdCheckCircle, MdAccessTime } from "react-icons/md";
import { FaClipboardCheck } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";

// ── Stages ───────────────────────────────────────────────────────
const stages = [
  {
    id: 0,
    label: "Order Received",
    desc: "We've got your order and it's been confirmed.",
    icon: FaClipboardCheck,
    duration: 4000, // ms before auto-advancing to next stage
  },
  {
    id: 1,
    label: "Preparing Your Food",
    desc: "Our chefs are cooking your meal fresh right now.",
    icon: MdRestaurant,
    duration: 6000,
  },
  {
    id: 2,
    label: "Out for Delivery",
    desc: "Your food is on the way — rider is heading to you.",
    icon: MdDeliveryDining,
    duration: 7000,
  },
  {
    id: 3,
    label: "Delivered!",
    desc: "Your order has arrived. Enjoy your Naija meal! 🎉",
    icon: MdCheckCircle,
    duration: null, // final stage — no auto-advance
  },
];

// Dummy order summary (in real app this comes from context/backend)
const dummyOrder = {
  orderId: "NJK-20489",
  items: [
    { name: "Jollof Rice", qty: 2, price: 2500 },
    { name: "Puff Puff",   qty: 1, price: 800  },
    { name: "Zobo Drink",  qty: 2, price: 500  },
  ],
  deliveryFee: 500,
};

const fmt = (n) => `₦${n.toLocaleString()}`;

export default function OrderTrackingPage() {
  const [currentStage, setCurrentStage] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Auto-advance through stages
  useEffect(() => {
    if (currentStage >= stages.length - 1) return;
    const duration = stages[currentStage].duration;
    const timer = setTimeout(() => setCurrentStage((s) => s + 1), duration);
    return () => clearTimeout(timer);
  }, [currentStage]);

  // Live elapsed time counter
  useEffect(() => {
    if (currentStage >= stages.length - 1) return;
    const interval = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [currentStage]);

  const subtotal = dummyOrder.items.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal + dummyOrder.deliveryFee;
  const isDelivered = currentStage === stages.length - 1;

  // Estimated time remaining (rough simulation)
  const totalDuration = stages.slice(0, -1).reduce((s, st) => s + st.duration, 0) / 1000;
  const remaining = Math.max(0, totalDuration - elapsedSeconds);
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Page header ──────────────────────────────────────── */}
      <div className={`text-white py-10 px-4 text-center transition-colors duration-700 ${isDelivered ? "bg-green-700" : "bg-red-800"}`}>
        <p className="text-sm font-medium tracking-widest uppercase mb-1 opacity-80">
          Order #{dummyOrder.orderId}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {isDelivered ? "Order Delivered! 🎉" : "Tracking Your Order"}
        </h1>
        <p className="text-sm opacity-80">
          {isDelivered
            ? "Your food has arrived. Enjoy!"
            : `Estimated delivery in ${mins}m ${String(secs).padStart(2, "0")}s`}
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">

        {/* ── Vertical stepper ─────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-8">
          <h2 className="font-bold text-gray-800 text-lg mb-8">Delivery Status</h2>

          <div className="relative">
            {stages.map((stage, i) => {
              const isCompleted = i < currentStage;
              const isActive    = i === currentStage;
              const isPending   = i > currentStage;
              const Icon        = stage.icon;
              const isLast      = i === stages.length - 1;

              return (
                <div key={stage.id} className="flex gap-5 relative">
                  {/* Left column — icon + connector line */}
                  <div className="flex flex-col items-center">
                    {/* Icon circle */}
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                      isCompleted ? "bg-green-500 text-white"
                      : isActive  ? "bg-red-700 text-white ring-4 ring-red-100"
                      : "bg-gray-100 text-gray-400"
                    }`}>
                      <Icon className="text-xl" />
                    </div>

                    {/* Connector line */}
                    {!isLast && (
                      <div className="w-0.5 flex-1 my-1 min-h-10 relative overflow-hidden bg-gray-200 rounded-full">
                        <div
                          className="absolute top-0 left-0 w-full bg-green-500 rounded-full transition-all duration-700"
                          style={{ height: isCompleted ? "100%" : "0%" }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Right column — text */}
                  <div className={`pb-8 flex-1 ${isLast ? "pb-0" : ""}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold text-base transition-colors duration-300 ${
                        isCompleted ? "text-green-600"
                        : isActive  ? "text-red-700"
                        : "text-gray-400"
                      }`}>
                        {stage.label}
                      </h3>
                      {isActive && (
                        <span className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </span>
                      )}
                      {isCompleted && (
                        <MdCheckCircle className="text-green-500 text-lg" />
                      )}
                    </div>
                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                      isPending ? "text-gray-300" : "text-gray-500"
                    }`}>
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Order summary ────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-800 text-lg">Order Summary</h2>
            <span className="text-xs text-gray-400 font-medium">#{dummyOrder.orderId}</span>
          </div>

          <div className="divide-y divide-gray-50">
            {dummyOrder.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-400">x{item.qty}</p>
                </div>
                <p className="text-sm font-semibold text-gray-700">{fmt(item.price * item.qty)}</p>
              </div>
            ))}
          </div>

          <div className="px-6 py-4 space-y-2 border-t border-gray-100">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span><span>{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Delivery fee</span><span>{fmt(dummyOrder.deliveryFee)}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-800 pt-1 border-t border-gray-100">
              <span>Total</span>
              <span className="text-red-800">{fmt(total)}</span>
            </div>
          </div>
        </div>

        {/* ── Delivery info ────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5 flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isDelivered ? "bg-green-100 text-green-600" : "bg-red-100 text-red-700"}`}>
            <MdDeliveryDining className="text-2xl" />
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-sm">
              {isDelivered ? "Delivered to your address" : "Rider is on the way"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {isDelivered
                ? "We hope you enjoy every bite!"
                : "Your rider will call you when they arrive."}
            </p>
          </div>
          {!isDelivered && (
            <div className="ml-auto flex items-center gap-1 text-xs text-gray-500 shrink-0">
              <MdAccessTime className="text-red-700" />
              <span>{mins}m {String(secs).padStart(2, "0")}s</span>
            </div>
          )}
        </div>

        {/* ── Actions ──────────────────────────────────────── */}
        <div className="space-y-3">
          {isDelivered ? (
            <>
              <Link
                to="/menu"
                className="block w-full bg-red-700 hover:bg-red-900 text-white font-semibold py-3.5 rounded-full transition-colors text-sm text-center"
              >
                Order Again
              </Link>
              <Link
                to="/"
                className="block w-full text-center text-gray-400 hover:text-red-500 text-sm transition-colors"
              >
                Back to Home
              </Link>
            </>
          ) : (
            <Link
              to="/menu"
              className="flex items-center justify-center gap-2 w-full border border-gray-200 hover:border-red-300 text-gray-600 hover:text-red-700 font-medium py-3.5 rounded-full transition-colors text-sm"
            >
              <CgShoppingCart className="text-lg" />
              Add More Items
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
