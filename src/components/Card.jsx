import React, { useRef, useState, useEffect, memo } from "react";
import Data from "../data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";

// Memoized CardItem
const CardItem = memo(({ d, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current.classList.add("opacity-100", "translate-y-0");
          cardRef.current.classList.remove("opacity-0", "translate-y-5");
          observer.unobserve(cardRef.current);
        }
      },
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="p-1 sm:p-2 opacity-0 translate-y-5 transition-all duration-600 ease-out"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col justify-between">
        <img
          src={`${d.img}?w=320`}
          alt={d.food}
          className="w-full h-40 sm:h-44 lg:h-48 object-cover rounded-t-lg"
          loading="lazy"
        />
        <div className="p-3 sm:p-4 flex-1">
          <div className="flex flex-wrap gap-2 sm:gap-3 items-center mb-2">
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400 text-sm" />
              <p className="text-gray-600 text-xs sm:text-sm">{d.rating}</p>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <MdAccessTime className="text-sm" />
              <p className="text-xs sm:text-sm">{d.time}</p>
            </div>
          </div>
          <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 line-clamp-1">
            {d.food}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
            {d.extra}
          </p>
          <div className="flex items-center gap-1 sm:gap-2 text-gray-400">
            <FaLocationDot className="text-sm" />
            <p className="text-xs line-clamp-1">{d.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

function Card() {
  const swiperRef = useRef(null);
  const titleRef = useRef(null);
  const buttonsRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const preloadImages = Data.slice(0, 4).map((item) => {
      const img = new Image();
      img.src = `${item.img}?w=320`;
      return img;
    });
    return () => preloadImages.forEach((img) => (img.src = ""));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          titleRef.current.classList.add("opacity-100", "translate-y-0");
          titleRef.current.classList.remove("opacity-0", "-translate-y-2");
          buttonsRef.current.classList.add("opacity-100", "translate-y-0");
          buttonsRef.current.classList.remove("opacity-0", "translate-y-2");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  const [swiperInstance, setSwiperInstance] = useState(null);
  const currentFood = Data[currentIndex % Data.length]?.food || "Delicious Deals";

  return (
    <section className="max-w-7xl mx-auto my-8 px-3 sm:px-4 sm:my-10 lg:my-12">
      <h1
        ref={titleRef}
        className="font-bold text-center text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 opacity-0 -translate-y-2 transition-all duration-500 ease-out"
      >
        <span className="text-red-800">Super </span> Delicious Deals —{" "}
        <span className="text-gray-700">{currentFood}</span>
      </h1>

      <div className="relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          spaceBetween={8}
          speed={500}
          loop
          autoplay={{
            delay: 2500, // 2.5 seconds delay between slides
            disableOnInteraction: false, // continue after user interacts
            pauseOnMouseEnter: true, // pauses when hovered
          }}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 8 },
            768: { slidesPerView: 2, spaceBetween: 12 },
            1280: { slidesPerView: 4, spaceBetween: 12 },
          }}
          className="mySwiper"
        >
          {Data.map((d, index) => (
            <SwiperSlide key={d.id || index}>
              <CardItem d={d} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Single bottom-center navigation buttons */}
        <div
          ref={buttonsRef}
          className="flex justify-center gap-3 mt-5 sm:mt-6 opacity-0 translate-y-2 transition-all duration-500 ease-out"
        >
          <button
            onClick={() => swiperInstance?.slidePrev()}
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-red-100 hover:bg-red-700 hover:text-white text-red-800 rounded-full shadow-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-700 active:scale-95"
            aria-label="Previous slide"
          >
            <FaArrowLeft className="text-sm" />
          </button>
          <button
            onClick={() => swiperInstance?.slideNext()}
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-red-100 hover:bg-red-700 hover:text-white text-red-800 rounded-full shadow-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-700 active:scale-95"
            aria-label="Next slide"
          >
            <FaArrowRight className="text-sm" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default memo(Card);
