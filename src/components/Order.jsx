import React, { useRef } from "react";
import Indian from "../assets/indian.jpg";
import { IoFastFood } from "react-icons/io5";
import { PiCookingPotLight } from "react-icons/pi";
import { FaShippingFast } from "react-icons/fa";
import "../styles/animations.css";

const steps = [
  {
    id: 1,
    icon: <IoFastFood className="fill-white w-10 h-10" />,
    title: "Choose Your Product",
    desc: "Browse through our menu filled with authentic Naija dishes and pick your favorites.",
    step: "Step-01",
  },
  {
    id: 2,
    icon: <PiCookingPotLight className="fill-white w-10 h-10" />,
    title: "Make Your Order",
    desc: "Place your order easily through our platform — quick, simple, and convenient.",
    step: "Step-02",
  },
  {
    id: 3,
    icon: <FaShippingFast className="fill-white w-10 h-10" />,
    title: "Food is on the way",
    desc: "Sit back and relax! Your freshly made meal will arrive hot and delicious in minutes.",
    step: "Step-03",
  },
];

function Order() {
  const sectionRef = useRef(null);

  // Trigger reveal when section scrolls into view
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("revealed"); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${Indian})` }}>
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div ref={sectionRef} className="max-w-7xl md:mx-auto mx-5 my-7 relative z-10 text-white">
        {/* Title */}
        <div className="flex flex-col items-center justify-center text-center w-full md:w-1/2 mx-auto anim-fade-up">
          <h1 className="font-bold text-4xl md:text-5xl mb-10">
            How To <span className="text-red-700">Order?</span>
          </h1>
          <p className="my-5 mb-15 text-gray-200">
            Ordering from us is as easy as 1-2-3. We make sure every step is quick, smooth,
            and satisfying — from picking your meal to enjoying it fresh on your table.
          </p>
        </div>

        {/* Cards */}
        <div className="md:flex justify-center items-stretch mt-10">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className="bg-red-50 text-black p-9 pr-0 rounded-3xl mx-5 my-6 hover:-translate-y-2 transition-transform duration-300 hover:shadow-lg flex-1 anim-fade-up"
              style={{ animationDelay: `${0.1 + i * 0.1}s`, animationFillMode: "both" }}
            >
              <div className="flex items-center justify-between">
                <aside className="rounded-full p-4 bg-red-800 flex items-center justify-center my-5">
                  {step.icon}
                </aside>
                <aside className="p-3 bg-red-200 rounded-l-full">
                  <p className="text-red-900 font-semibold">{step.step}</p>
                </aside>
              </div>
              <div>
                <h2 className="text-xl font-bold py-2">{step.title}</h2>
                <p className="text-gray-500 pr-2">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Order;