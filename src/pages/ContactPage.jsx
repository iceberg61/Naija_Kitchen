import React, { useState } from "react";
import { MdCheckCircle, MdPhone, MdEmail, MdLocationOn, MdAccessTime } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

// ── Contact info ─────────────────────────────────────────────────
const contactInfo = [
  {
    icon: MdPhone,
    label: "Call Us",
    lines: ["0800-NAIJA-1 (Main)", "0900-NAIJA-2 (Catering)"],
    action: { text: "Call now", href: "tel:08001234561" },
    color: "bg-blue-50 text-blue-700",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    lines: ["Chat with us instantly", "0900-NAIJA-WA"],
    action: { text: "Open WhatsApp", href: "https://wa.me/2349001234592" },
    color: "bg-green-50 text-green-700",
  },
  {
    icon: MdEmail,
    label: "Email Us",
    lines: ["hello@naijakitchen.ng", "catering@naijakitchen.ng"],
    action: { text: "Send email", href: "mailto:hello@naijakitchen.ng" },
    color: "bg-red-50 text-red-700",
  },
  {
    icon: MdLocationOn,
    label: "Visit Us",
    lines: ["12 Adeola Odeku Street", "Victoria Island, Lagos"],
    action: null,
    color: "bg-orange-50 text-orange-700",
  },
];

const hours = [
  { day: "Monday – Friday", time: "8:00 AM – 9:00 PM" },
  { day: "Saturday",        time: "9:00 AM – 10:00 PM" },
  { day: "Sunday",          time: "Closed" },
];

const EMPTY = { name: "", email: "", phone: "", subject: "", message: "" };

const subjects = [
  "General Enquiry",
  "Order Issue",
  "Catering",
  "Reservation",
  "Feedback",
  "Other",
];

export default function ContactPage() {
  const [form, setForm]         = useState(EMPTY);
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    if (!form.subject)        e.subject = "Please select a subject";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="relative bg-red-800 text-white py-20 px-4 text-center overflow-hidden">
        <div className="absolute -top-10 -right-10 w-52 h-52 bg-red-700/30 rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-red-900/30 rounded-full" />
        <div className="relative z-10 max-w-xl mx-auto">
          <span className="inline-block bg-white/20 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">We'd Love to Hear From You</h1>
          <p className="text-red-100 text-sm md:text-base max-w-md mx-auto">
            Got a question, complaint, or just want to tell us how much you loved the jollof?
            We're all ears.
          </p>
        </div>
      </div>

      {/* ── Contact cards ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {contactInfo.map(({ icon, label, lines, action, color }) => {
          const Icon = icon;
          return (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center ${color}`}>
                <Icon className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">{label}</h3>
                {lines.map((l) => (
                  <p key={l} className="text-gray-500 text-sm">{l}</p>
                ))}
              </div>
              {action && (
                <a
                  href={action.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-red-700 hover:text-red-900 transition-colors"
                >
                  {action.text} <HiArrowRight />
                </a>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Body — form + hours ───────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ── Left — opening hours + quick links ─────────────── */}
        <div className="space-y-6">
          {/* Hours */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
                <MdAccessTime className="text-red-700" />
              </div>
              <h3 className="font-bold text-gray-800">Opening Hours</h3>
            </div>
            <ul className="space-y-3">
              {hours.map(({ day, time }) => (
                <li key={day} className="flex justify-between text-sm border-b border-gray-50 pb-2 last:border-0">
                  <span className="text-gray-600">{day}</span>
                  <span className={`font-semibold ${time === "Closed" ? "text-red-500" : "text-gray-800"}`}>
                    {time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/2349001234592"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl p-5 transition-colors"
          >
            <FaWhatsapp className="text-4xl shrink-0" />
            <div>
              <p className="font-bold text-base">Chat on WhatsApp</p>
              <p className="text-green-100 text-sm">Fastest way to reach us</p>
            </div>
            <HiArrowRight className="ml-auto text-xl shrink-0" />
          </a>

          {/* Address card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
                <MdLocationOn className="text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-800">Our Location</h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              12 Adeola Odeku Street,<br />
              Victoria Island, Lagos.<br />
              <span className="text-xs text-gray-400 mt-1 inline-block">Near the Silverbird Galleria</span>
            </p>
          </div>
        </div>

        {/* ── Right — message form ────────────────────────────── */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16 px-6">
              <MdCheckCircle className="text-green-500 text-6xl mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
              <p className="text-gray-500 text-sm max-w-sm">
                Thanks <strong>{form.name}</strong>! We've received your message and will
                get back to you at <strong>{form.email}</strong> within 24 hours.
              </p>
              <button
                onClick={() => { setForm(EMPTY); setSubmitted(false); }}
                className="mt-8 bg-red-700 hover:bg-red-900 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Send Us a Message</h2>
              <p className="text-gray-400 text-sm mb-7">We reply within 24 hours on weekdays.</p>

              <div className="space-y-5">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      name="name" value={form.name} onChange={handleChange}
                      placeholder="Ngozi Eze"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100"}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                      name="email" value={form.email} onChange={handleChange} type="email"
                      placeholder="ngozi@email.com"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100"}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Phone + Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      name="phone" value={form.phone} onChange={handleChange} type="tel"
                      placeholder="080XXXXXXXX"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                    <select
                      name="subject" value={form.subject} onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all bg-white ${errors.subject ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100"}`}
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} rows={5}
                    placeholder="Tell us what's on your mind..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all resize-none ${errors.message ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100"}`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-red-700 hover:bg-red-900 active:scale-95 text-white font-bold py-4 rounded-full transition-all text-sm shadow-md flex items-center justify-center gap-2"
                >
                  Send Message <HiArrowRight />
                </button>
                <p className="text-center text-gray-400 text-xs">
                  We respond within 24 hours on weekdays. For urgent matters, use WhatsApp.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
