import React from "react";
import { HiArrowRight } from "react-icons/hi";
import { MdFavorite, MdStar, MdPeople, MdEco } from "react-icons/md";
import { Link } from "react-router-dom";
import { stats, timeline, team, founderQuote, founderImg } from "../data/teamData";

const values = [
  { icon: MdFavorite, title: "Cooked with Love",       desc: "Every dish carries the warmth of a Nigerian home kitchen. We never cut corners on flavour or care." },
  { icon: MdStar,     title: "Uncompromising Quality", desc: "From sourcing to serving, we hold every plate to the same standard we'd serve our own family." },
  { icon: MdPeople,   title: "Community First",        desc: "We exist to bring people together — around the table, around culture, around food that means something." },
  { icon: MdEco,      title: "Fresh Every Day",        desc: "No frozen shortcuts. Ingredients are sourced daily from local markets so every meal is at its best." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Hero */}
      <div className="relative bg-red-800 text-white py-24 px-4 text-center overflow-hidden">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-red-700/30 rounded-full" />
        <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-red-900/30 rounded-full" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">Our Story</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">More Than a Restaurant —<br />It's a Piece of Home</h1>
          <p className="text-red-100 text-base md:text-lg max-w-xl mx-auto">Naija Kitchen was born from a mother's love for feeding people well. Today, that same love goes into every plate we serve.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-extrabold text-red-800">{value}</p>
              <p className="text-gray-500 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Founder story */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img src={founderImg} alt="Founder cooking" className="w-full h-105 object-cover rounded-3xl shadow-lg" loading="lazy" />
          <div className="absolute -bottom-6 -right-4 md:right-6 bg-white rounded-2xl shadow-lg p-4 max-w-55 border border-gray-100">
            <p className="text-gray-600 text-xs italic leading-relaxed">"{founderQuote}"</p>
            <p className="text-red-700 text-xs font-bold mt-2">— Mama Titi, Founder</p>
          </div>
        </div>
        <div className="pt-6 lg:pt-0">
          <span className="text-red-700 text-sm font-semibold uppercase tracking-widest">The Founder</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-5">From a Home Kitchen<br />to a Household Name</h2>
          <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
            <p>It all started in 2018, when <strong className="text-gray-800">Titilayo "Mama Titi" Adeyemi</strong> began cooking for her neighbours in Lagos. Her egusi soup, smoky jollof, and pepper soup quickly became the talk of the street — and orders started flooding in through WhatsApp.</p>
            <p>What started as a side passion quickly became something she couldn't ignore. By 2020, she had saved enough to open a small 10-seat spot in Lekki. The tables were full from day one.</p>
            <p>Today, Naija Kitchen serves thousands of customers across multiple locations and delivers across Lagos and Abuja. But the recipe hasn't changed — same ingredients, same care, same love in every bowl.</p>
          </div>
          <Link to="/menu" className="inline-flex items-center gap-2 mt-8 bg-red-700 hover:bg-red-900 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors">
            Try Our Food <HiArrowRight />
          </Link>
        </div>
      </div>

      {/* Mission */}
      <div className="bg-red-800 text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-white/20 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">Our Mission</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">To Make Every Nigerian Feel at Home — One Plate at a Time</h2>
          <p className="text-red-100 text-base leading-relaxed max-w-2xl mx-auto">We believe food is more than fuel — it's memory, identity, and belonging. Our mission is to keep the flavours of Nigeria alive, accessible, and celebrated, whether you're around the corner or far from home.</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="text-red-700 text-sm font-semibold uppercase tracking-widest">How We Got Here</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Our Journey</h2>
        </div>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-red-100" />
          <div className="space-y-10">
            {timeline.map(({ year, title, desc }) => (
              <div key={year} className="flex gap-6 relative">
                <div className="w-12 h-12 rounded-full bg-red-700 text-white flex items-center justify-center shrink-0 z-10 text-xs font-bold shadow-md">
                  {year.slice(2)}'
                </div>
                <div className="pt-2 pb-2">
                  <p className="text-red-700 text-xs font-bold uppercase tracking-widest mb-1">{year}</p>
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-red-700 text-sm font-semibold uppercase tracking-widest">What Drives Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon, title, desc }) => {
              const Icon = icon;
              return (
                <div key={title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <Icon className="text-red-700 text-xl" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="text-red-700 text-sm font-semibold uppercase tracking-widest">The People Behind the Plates</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Meet the Team</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map(({ name, role, img, bio }) => (
            <div key={name} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="h-56 overflow-hidden">
                <img src={img} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-800 text-base">{name}</h3>
                <p className="text-red-700 text-xs font-semibold mb-2">{role}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-900 text-white py-16 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Taste the Story?</h2>
        <p className="text-gray-400 text-sm max-w-md mx-auto mb-8">Every order supports a family business built on passion and authenticity. Come eat with us.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/menu" className="inline-flex items-center justify-center gap-2 bg-red-700 hover:bg-red-900 text-white px-7 py-3 rounded-full text-sm font-semibold transition-colors">
            Order Now <HiArrowRight />
          </Link>
          <Link to="/reservation" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-7 py-3 rounded-full text-sm font-semibold transition-colors border border-white/20">
            Reserve a Table
          </Link>
        </div>
      </div>
    </div>
  );
}