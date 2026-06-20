import React, { useState } from "react";
import { MdCheckCircle, MdGroups, MdStar } from "react-icons/md";
import { FaUtensils, FaTruck, FaConciergeBell } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

// ── Data ─────────────────────────────────────────────────────────

const packages = [
  {
    name: "Essential",
    tag: "Small Events",
    guests: "Up to 50 guests",
    price: "₦150,000",
    color: "border-gray-200",
    badge: "",
    highlight: false,
    perks: [
      "3 rice or swallow dishes",
      "2 protein options",
      "1 soup choice",
      "Drinks included",
      "Disposable plates & cutlery",
      "2-hour service window",
    ],
  },
  {
    name: "Classic",
    tag: "Mid-size Events",
    guests: "Up to 150 guests",
    price: "₦380,000",
    color: "border-red-700",
    badge: "Most Popular",
    highlight: true,
    perks: [
      "5 rice or swallow dishes",
      "3 protein options",
      "2 soup choices",
      "Drinks + small chops",
      "Reusable plates & cutlery",
      "Full-day service window",
      "Dedicated event coordinator",
    ],
  },
  {
    name: "Premium",
    tag: "Large Events",
    guests: "200+ guests",
    price: "Custom quote",
    color: "border-gray-200",
    badge: "",
    highlight: false,
    perks: [
      "Unlimited dish selection",
      "All proteins & seafood",
      "Full soup & stew menu",
      "Premium drinks & cocktails",
      "Chafing dishes & full setup",
      "Multi-day service available",
      "Dedicated team + coordinator",
      "Post-event cleanup included",
    ],
  },
];

const galleryImgs = [
  { url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80", alt: "Catering spread" },
  { url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80", alt: "Jollof rice buffet" },
  { url: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80", alt: "Suya station" },
  { url: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80", alt: "Egusi spread" },
  { url: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80", alt: "Puff puff station" },
  { url: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80", alt: "Soup station" },
];

const whyUs = [
  { icon: FaUtensils, title: "Authentic Naija Taste", desc: "Every dish made from scratch with traditional recipes and fresh ingredients." },
  { icon: FaTruck,    title: "We Come to You",        desc: "Full setup and breakdown at your venue — you just show up and enjoy." },
  { icon: MdGroups,  title: "Any Size Event",         desc: "From intimate family gatherings to large-scale public events, we handle it all." },
  { icon: FaConciergeBell, title: "Professional Service", desc: "Uniformed staff, punctual delivery, and a coordinator on-site throughout." },
];

const EMPTY = { name: "", email: "", phone: "", date: "", guests: "", details: "" };

// ── Component ────────────────────────────────────────────────────

export default function CateringPage() {
  const [form, setForm]       = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]   = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    if (!form.phone.trim())   e.phone   = "Phone is required";
    if (!form.date.trim())    e.date    = "Event date is required";
    if (!form.guests.trim())  e.guests  = "Guest count is required";
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
    // Backend call goes here later
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="relative bg-red-800 text-white py-20 px-4 text-center overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-red-700/40 rounded-full" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-red-900/40 rounded-full" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Naija Kitchen Catering
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Bring the Flavour<br />to Your Event
          </h1>
          <p className="text-red-100 text-base md:text-lg mb-8 max-w-xl mx-auto">
            From small family dinners to large celebrations — we deliver authentic Nigerian cuisine,
            fully set up and served with style.
          </p>
          <a
            href="#inquiry"
            className="inline-flex items-center gap-2 bg-white text-red-800 font-semibold px-7 py-3 rounded-full hover:bg-red-50 transition-colors text-sm"
          >
            Book Your Event <HiArrowRight />
          </a>
        </div>
      </div>

      {/* ── Why us ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {whyUs.map(({ icon, title, desc }, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {React.createElement(icon, { className: "text-red-700 text-xl" })}
            </div>
            <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* ── Packages ─────────────────────────────────────────── */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Catering <span className="text-red-800">Packages</span>
            </h2>
            <p className="text-gray-500 max-w-md mx-auto text-sm">
              Choose a package that fits your event — or reach out and we'll build a custom one for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl border-2 ${pkg.color} p-7 flex flex-col ${
                  pkg.highlight ? "bg-red-800 text-white shadow-xl scale-[1.02]" : "bg-white text-gray-800"
                }`}
              >
                {pkg.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                    <MdStar /> {pkg.badge}
                  </span>
                )}

                <div className="mb-6">
                  <p className={`text-xs font-semibold tracking-widest uppercase mb-1 ${pkg.highlight ? "text-red-200" : "text-red-700"}`}>
                    {pkg.tag}
                  </p>
                  <h3 className="text-2xl font-bold mb-1">{pkg.name}</h3>
                  <p className={`text-sm ${pkg.highlight ? "text-red-200" : "text-gray-500"}`}>{pkg.guests}</p>
                  <p className={`text-3xl font-extrabold mt-4 ${pkg.highlight ? "text-white" : "text-red-800"}`}>
                    {pkg.price}
                  </p>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {pkg.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm">
                      <MdCheckCircle className={`shrink-0 mt-0.5 text-lg ${pkg.highlight ? "text-red-200" : "text-green-500"}`} />
                      <span className={pkg.highlight ? "text-red-100" : "text-gray-600"}>{perk}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#inquiry"
                  className={`block text-center py-3 rounded-full font-semibold text-sm transition-colors ${
                    pkg.highlight
                      ? "bg-white text-red-800 hover:bg-red-50"
                      : "bg-red-700 text-white hover:bg-red-900"
                  }`}
                >
                  Book This Package
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Gallery strip ────────────────────────────────────── */}
      <div className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Events We've <span className="text-red-800">Served</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            A glimpse of the spreads we've brought to life across events big and small.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryImgs.map((img, i) => (
            <div key={i} className={`overflow-hidden rounded-2xl ${i === 0 ? "md:col-span-2 row-span-2" : ""}`}>
              <img
                src={img.url}
                alt={img.alt}
                className={`w-full object-cover hover:scale-105 transition-transform duration-500 ${i === 0 ? "h-64 md:h-full" : "h-40 md:h-48"}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Inquiry form ─────────────────────────────────────── */}
      <div id="inquiry" className="bg-white py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Make an <span className="text-red-800">Enquiry</span>
            </h2>
            <p className="text-gray-500 text-sm">
              Fill in the details below and our team will get back to you within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-16 px-6 bg-green-50 rounded-2xl border border-green-100">
              <MdCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Enquiry Received!</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                Thanks <strong>{form.name}</strong>! We'll reach out to you at <strong>{form.email}</strong> within 24 hours to discuss your event.
              </p>
              <button
                onClick={() => { setForm(EMPTY); setSubmitted(false); }}
                className="mt-6 bg-red-700 hover:bg-red-900 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 space-y-5">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    name="name" value={form.name} onChange={handleChange}
                    placeholder="Chukwuemeka Obi"
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100"}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    name="email" value={form.email} onChange={handleChange} type="email"
                    placeholder="chukwu@email.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100"}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    name="phone" value={form.phone} onChange={handleChange} type="tel"
                    placeholder="080XXXXXXXX"
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100"}`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Date *</label>
                  <input
                    name="date" value={form.date} onChange={handleChange} type="date"
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${errors.date ? "border-red-400 bg-red-50" : "border-gray-200 bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100"}`}
                  />
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                </div>
              </div>

              {/* Row 3 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Guest Count *</label>
                <input
                  name="guests" value={form.guests} onChange={handleChange} type="number" min="1"
                  placeholder="e.g. 120"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${errors.guests ? "border-red-400 bg-red-50" : "border-gray-200 bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100"}`}
                />
                {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
              </div>

              {/* Row 4 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
                <textarea
                  name="details" value={form.details} onChange={handleChange} rows={4}
                  placeholder="Tell us about your event — theme, dietary needs, preferred dishes, venue, etc."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-red-700 hover:bg-red-900 active:scale-95 text-white font-bold py-4 rounded-full transition-all text-sm shadow-md"
              >
                Send Enquiry
              </button>
              <p className="text-center text-gray-400 text-xs">
                We respond within 24 hours. No spam, ever.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
