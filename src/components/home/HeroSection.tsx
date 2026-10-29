"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  projects?: Project[];
}

export function HeroSection({ projects = [] }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const duration = 7000;

  // Provide exactly 5 slides for the slider
  const slides = projects.slice(0, 5);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, duration);
    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section aria-labelledby="hero-heading" className="relative min-h-[640px] h-svh w-full flex items-center overflow-clip">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/70 to-brand-dark/30 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full w-auto h-auto max-w-none object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <source src="/videos/hero_bgr.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto w-full max-w-[1350px] px-4 md:px-6 pt-32 sm:pt-32 pb-12 sm:pb-20 h-full flex flex-col justify-end sm:justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center lg:items-end pb-32 sm:pb-0 mt-16 sm:mt-0">
          {/* Left - Main Content */}
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 id="hero-heading" className="font-heading text-[32px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[80px] text-white font-bold leading-[1.2] mb-4">
                Chúng tôi sống <br />
                vì <span className="text-[#4ade80]">thử thách</span>
              </h1>
              <div className="w-12 h-1 bg-[#4ade80] rounded-full mb-6 mt-2" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-[14px] sm:text-base md:text-xl text-white/80 mb-8 md:mb-10 max-w-2xl leading-relaxed"
            >
              Tại BT DECOM, chúng tôi hợp tác với khách hàng để hiện thực hóa tham vọng của họ, thực hiện các dự án tạo ra sự khác biệt lâu dài và có ý nghĩa đối với con người và cộng đồng.
            </motion.p>

            {/* CTA Button - visible on mobile only */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="lg:hidden flex justify-start"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[#4ade80] text-[#0a2610] font-semibold rounded-full hover:bg-[#22c55e] transition-all duration-300 text-sm sm:text-base"
              >
                Xem dự án
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>

          {/* Right - Hero Slider Widget */}
          <div className="lg:col-span-5 relative z-30 hidden lg:flex justify-end overflow-visible lg:self-end lg:translate-y-12">
            {slides.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full max-w-[320px] xl:max-w-[330px] relative mt-10 lg:mt-0 lg:mr-6 xl:mr-0"
              >
                {/* External Nav Controls */}
                <button
                  className="absolute -left-10 lg:-left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  aria-label="Trang trước"
                >
                  <ChevronLeft size={38} strokeWidth={1.5} />
                </button>
                <button
                  className="absolute -right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  aria-label="Trang sau"
                >
                  <ChevronRight size={38} strokeWidth={1.5} />
                </button>

                {/* The Slider Container */}
                <div className="relative isolate block p-4 rounded-xl bg-[#1c1c1c] shadow-2xl w-full transition-all duration-300 group/slider">
                  {/* The dark left tab */}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 w-2.5 bg-[#2a2a2a] rounded-l-lg h-[85%] transition-all duration-300" />

                  {/* Slides */}
                  <div className="relative overflow-hidden w-full min-h-[225px]">
                    <AnimatePresence mode="wait">
                      <motion.article
                        key={slides[currentSlide].id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 cursor-pointer flex flex-col group/slide"
                        onClick={() => window.location.href = `/projects/${slides[currentSlide].slug}`}
                      >
                        <figure className="relative flex items-center justify-center w-full overflow-hidden rounded-lg aspect-[16/9] mb-3.5">
                          <img
                            className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover/slide:scale-105"
                            src={slides[currentSlide].image}
                            alt={slides[currentSlide].name}
                          />
                        </figure>

                        <div className="relative flex-1 flex flex-col">
                          <h3 className="text-white font-medium text-[15px] sm:text-base leading-snug line-clamp-2">
                            {slides[currentSlide].name}
                          </h3>
                        </div>
                      </motion.article>
                    </AnimatePresence>
                  </div>

                  {/* Pager & Circular Link Button Container */}
                  <div className="mt-3 flex items-center justify-between relative z-10">
                    {/* Pager */}
                    <div className="flex items-center gap-1.5 pl-0.5">
                      {slides.map((_, index) => (
                        <button
                          type="button"
                          aria-label={`Xem dự án ${index + 1}`}
                          aria-pressed={index === currentSlide}
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={cn(
                            "relative block overflow-hidden rounded-full h-1.5 cursor-pointer transition-all duration-500",
                            index === currentSlide ? "w-12 bg-[#333333]" : "w-1.5 bg-[#333333] hover:bg-[#444444]"
                          )}
                        >
                          {index === currentSlide && (
                            <motion.div
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: duration / 1000, ease: "linear" }}
                              className="absolute top-0 bottom-0 left-0 bg-[#4ade80] rounded-full"
                            />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Circular Link Button */}
                    <Link
                      href={`/projects/${slides[currentSlide].slug}`}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0a2610] text-[#4ade80] transition-all duration-300 hover:bg-[#4ade80] hover:text-[#0a2610] shrink-0"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Đọc thêm"
                    >
                      <ArrowRight size={18} className="-rotate-45" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white/10 backdrop-blur text-white p-8 rounded-lg border border-white/20">
                Thông tin dự án đang được cập nhật.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
