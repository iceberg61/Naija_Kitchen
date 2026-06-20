import React, { useState } from "react";
import { MdCheckCircle, MdAccessTime, MdTableRestaurant, MdPeople, MdPhone, MdPerson, MdCalendarToday } from "react-icons/md";
import { FaChair } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

// ── Available time slots ─────────────────────────────────────────
const timeSlots = [
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM",  "2:30 PM",  "5:00 PM", "5:30 PM",
  "6:00 PM",  "6:30 PM",  "7:00 PM", "7:30 PM",
  "8:00 PM",  "8:30 PM",
];

const EMPTY = {
  name: "", phone: "", date: "", time: "",
  guests: "", seating: "", requests: "",
};

// ── Info cards shown beside the form ────────────────────────────
const infoCards = [
  { icon: MdAccessTime,       title: "Opening Hours",    lines: ["Mon – Fri: 12:00 PM – 9:00 PM", "Saturday: 11:00 AM – 10:00 PM", "Sunday: Closed"] },
  { icon: MdTableRestaurant,  title: "Table Policy",     lines: ["Tables held for 15 minutes", "Walk-ins welcome on availability", "Max 12 guests per reservation"] },
  { icon: MdPhone,            title: "Need Help?",       lines: ["Call us: 0800-NAIJA-1", "WhatsApp: 0900-NAIJA-2", "We reply within the hour"] },
];

// ── Seating options ──────────────────────────────────────────────
const seatingOptions = [
  { value: "indoor",  label: "Indoor",  desc: "Air-conditioned dining room", icon: "🪑" },
  { value: "outdoor", label: "Outdoor", desc: "Open-air patio seating",      icon: "🌿" },
];

export default function ReservationPage() {
  const [form, setForm]         = useState(EMPTY);
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [booking, setBooking]   = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.phone.trim())   e.phone   = "Phone is required";
    if (!form.date)           e.date    = "Date is required";
    if (!form.time)           e.time    = "Please select a time";
    if (!form.guests)         e.guests  = "Number of guests is required";
    if (!form.seating)        e.seating = "Please choose a seating preference";
    return e;
  };

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const handleSeating = (val) => {
    setForm((p) => ({ ...p, seating: val }));
    setErrors((p) => ({ ...p, seating: "" }));
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setBooking({ ...form, ref: `NJK-R${Math.floor(1000 + Math.random() * 9000)}` });
    setSubmitted(true);
  };

  // ── Confirmation card ────────────────────────────────────────
  if (submitted && booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 max-w-md w-full p-8 text-center">
          <MdCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Reservation Confirmed!</h2>
          <p className="text-gray-500 text-sm mb-8">
            We look forward to having you. See the details of your booking below.
          </p>

          {/* Booking summary */}
          <div className="bg-gray-50 rounded-2xl p-5 text-left space-y-4 mb-8 border border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-400 pb-2 border-b border-gray-200">
              <span className="font-semibold uppercase tracking-widest">Booking Reference</span>
              <span className="font-bold text-red-700 text-sm">{booking.ref}</span>
            </div>

            {[
              { icon: MdPerson,        label: "Name",     value: booking.name },
              { icon: MdPhone,         label: "Phone",    value: booking.phone },
              { icon: MdCalendarToday, label: "Date",     value: new Date(booking.date).toDateString() },
              { icon: MdAccessTime,    label: "Time",     value: booking.time },
              { icon: MdPeople,        label: "Guests",   value: `${booking.guests} guest${booking.guests > 1 ? "s" : ""}` },
              { icon: FaChair,         label: "Seating",  value: booking.seating === "indoor" ? "🪑 Indoor" : "🌿 Outdoor" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  {React.createElement(icon, { className: "text-red-700 text-sm" })}
                </div>
                <div>
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="text-sm font-semibold text-gray-800">{value}</p>
                </div>
              </div>
            ))}

            {booking.requests && (
              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-400 mb-1">Special Requests</p>
                <p className="text-sm text-gray-600 leading-relaxed">{booking.requests}</p>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400 mb-6">
            We'll call you at <strong className="text-gray-700">{booking.phone}</strong> to confirm your table.
            Remember, tables are held for <strong className="text-gray-700">15 minutes</strong> after your booking time.
          </p>

          <div className="space-y-3">
            <a
              href="/"
              className="block w-full bg-red-700 hover:bg-red-900 text-white font-semibold py-3 rounded-full text-sm transition-colors"
            >
              Back to Home
            </a>
            <button
              onClick={() => { setForm(EMPTY); setSubmitted(false); setBooking(null); }}
              className="block w-full text-gray-400 hover:text-red-500 text-xs transition-colors"
            >
              Make another reservation
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main form ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="relative bg-red-800 text-white py-20 px-4 text-center overflow-hidden">
        <div className="absolute -top-10 -right-10 w-56 h-56 bg-red-700/40 rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-red-900/40 rounded-full" />
        <div className="relative z-10 max-w-xl mx-auto">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Reserve a Table
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Book Your Seat<br />at Naija Kitchen
          </h1>
          <p className="text-red-100 text-base md:text-lg max-w-md mx-auto">
            Reserve your table in seconds and arrive to a warm meal waiting for you.
          </p>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ── Left — info cards ──────────────────────────────── */}
        <div className="space-y-5">
          {infoCards.map(({ icon, title, lines }) => (
            <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  {React.createElement(icon, { className: "text-red-700 text-base" })}
                </div>
                <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
              </div>
              <ul className="space-y-1">
                {lines.map((l) => (
                  <li key={l} className="text-gray-500 text-xs">{l}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Ambience image */}
          <div className="overflow-hidden rounded-2xl h-48">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
              alt="Restaurant ambience"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </div>

        {/* ── Right — form ───────────────────────────────────── */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Your Details</h2>
          <p className="text-gray-400 text-sm mb-7">All fields marked * are required.</p>

          <div className="space-y-5">

            {/* Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  name="name" value={form.name} onChange={handleChange}
                  placeholder="Adaeze Okonkwo"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100"}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  name="phone" value={form.phone} onChange={handleChange} type="tel"
                  placeholder="080XXXXXXXX"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100"}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Date + Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input
                  name="date" value={form.date} onChange={handleChange} type="date"
                  min={new Date().toISOString().split("T")[0]}
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${errors.date ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100"}`}
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests *</label>
                <input
                  name="guests" value={form.guests} onChange={handleChange} type="number" min="1" max="12"
                  placeholder="e.g. 4"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${errors.guests ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100"}`}
                />
                {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
              </div>
            </div>

            {/* Time slots */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time *</label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => { setForm((p) => ({ ...p, time: slot })); setErrors((p) => ({ ...p, time: "" })); }}
                    className={`py-2 rounded-xl text-xs font-medium border transition-all ${
                      form.time === slot
                        ? "bg-red-700 text-white border-red-700"
                        : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-700"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
            </div>

            {/* Seating preference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Seating Preference *</label>
              <div className="grid grid-cols-2 gap-4">
                {seatingOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSeating(opt.value)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                      form.seating === opt.value
                        ? "border-red-700 bg-red-50"
                        : "border-gray-200 hover:border-red-200 bg-white"
                    }`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <div>
                      <p className={`font-semibold text-sm ${form.seating === opt.value ? "text-red-700" : "text-gray-800"}`}>
                        {opt.label}
                      </p>
                      <p className="text-xs text-gray-400">{opt.desc}</p>
                    </div>
                    {form.seating === opt.value && (
                      <MdCheckCircle className="text-red-700 text-lg ml-auto shrink-0" />
                    )}
                  </button>
                ))}
              </div>
              {errors.seating && <p className="text-red-500 text-xs mt-1">{errors.seating}</p>}
            </div>

            {/* Special requests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Requests <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                name="requests" value={form.requests} onChange={handleChange} rows={3}
                placeholder="Dietary needs, birthday decoration, high chair, accessibility needs, etc."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all resize-none"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full bg-red-700 hover:bg-red-900 active:scale-95 text-white font-bold py-4 rounded-full transition-all text-sm shadow-md flex items-center justify-center gap-2"
            >
              Confirm Reservation <HiArrowRight />
            </button>

            <p className="text-center text-gray-400 text-xs">
              We'll call to confirm your table. Tables held for 15 minutes after booking time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
