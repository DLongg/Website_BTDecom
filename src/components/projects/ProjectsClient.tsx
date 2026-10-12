"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/home/CTASection";
import type { Project } from "@/types";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectsClientProps {
  projects: Project[];
  projectCategories: { value: string; label: string }[];
}

const highlightSectors = [
  {
    badge: "KHU VỰC CÔNG",
    title: "Hệ thống quản lý văn bản điện tử",
    desc: "Triển khai giải pháp quản lý văn bản, điều hành công việc cho cơ quan nhà nước.",
    image: "/images/projects-cat-public.jpg",
    filterCategory: "electrical",
  },
  {
    badge: "DOANH NGHIỆP",
    title: "Nền tảng quản trị doanh nghiệp",
    desc: "Xây dựng nền tảng quản trị tổng thể, tích hợp quy trình và dữ liệu toàn doanh nghiệp.",
    image: "/images/projects-cat-enterprise.jpg",
    filterCategory: "me",
  },
  {
    badge: "SẢN XUẤT",
    title: "Giải pháp quản lý sản xuất thông minh",
    desc: "Tối ưu quy trình sản xuất, giám sát thiết bị và nâng cao hiệu suất vận hành.",
    image: "/images/projects-cat-manufacturing.jpg",
    filterCategory: "substation",
  },
  {
    badge: "Y TẾ",
    title: "Hệ thống quản lý bệnh viện",
    desc: "Số hóa quy trình khám chữa bệnh, quản lý hồ sơ và nâng cao trải nghiệm người bệnh.",
    image: "/images/projects-cat-healthcare.jpg",
    filterCategory: "lighting",
  },
];

export function ProjectsClient({ projects, projectCategories }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter((p) => p.category === activeCategory);

  const handleSectorClick = (category: string) => {
    setActiveCategory(category);
    const el = document.getElementById("projects-list-anchor");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-[#F0F7F4] min-h-screen flex flex-col font-body">
      <Header />

      {/* ══════════════════════════════════════════════════════════════════
          HERO & SHOWCASE SECTION (EXACT REPLICA OF IMAGE 1 WITH IMAGE 2 BGR)
      ══════════════════════════════════════════════════════════════════ */}
      {/* Background Image (Image 2) fixed in top half with soft blur & fade transition */}
      <div className="fixed top-0 left-0 right-0 h-[560px] sm:h-[640px] lg:h-[720px] pointer-events-none z-0 overflow-hidden">
        <img 
          src="/images/projects-bg.jpg" 
          alt="BT DECOM Modern Architecture"
          className="w-full h-full object-cover object-[center_top] lg:object-[right_top]"
          style={{
            maskImage: "linear-gradient(to bottom, black 45%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.3) 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 45%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.3) 85%, transparent 100%)",
          }}
        />

        {/* Soft translucent gradient on left: ensures trees & skyline show through while text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F0F7F4]/80 via-[#F0F7F4]/40 via-[46%] to-transparent pointer-events-none" />

        {/* Multi-stop bottom fade: softly dissolves bottom foot of background into #F0F7F4 */}
        <div className="absolute inset-x-0 bottom-0 h-56 sm:h-72 lg:h-96 bg-gradient-to-b from-transparent via-[#F0F7F4]/40 via-[35%] via-[#F0F7F4]/80 via-[70%] to-[#F0F7F4] pointer-events-none" />

        {/* Bottom blur transition: softly blurs the dissolving edge into the page */}
        <div 
          className="absolute inset-x-0 bottom-0 h-40 sm:h-56 lg:h-72 backdrop-blur-[3px] pointer-events-none"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 60%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 60%, black 100%)",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          HERO TEXT & STATS HEADER (Over background image)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 lg:pb-12">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Top text content & stats */}
          <div className="max-w-2xl">
            <span className="text-[#15803D] font-bold text-xs sm:text-sm tracking-wider uppercase block mb-1.5 sm:mb-2 font-heading">
              DỰ ÁN
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold font-heading leading-[1.12] mb-3 sm:mb-3.5 tracking-tight text-[#0F172A]">
              Các dự án <span className="text-[#15803D]">đã thực hiện</span>
            </h1>

            <p className="text-[#334155] text-xs sm:text-[14px] leading-relaxed mb-5 sm:mb-6 max-w-[540px]">
              Khám phá những dự án tiêu biểu mà BT DECOM đã triển khai, đồng hành cùng doanh nghiệp và tổ chức trên hành trình chuyển đổi số, nâng cao hiệu quả vận hành và tạo ra giá trị bền vững.
            </p>

            {/* 3 Stats horizontally */}
            <div className="flex items-center gap-6 sm:gap-10 md:gap-12">
              <div>
                <div className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold font-heading text-[#15803D] leading-none mb-1">
                  100+
                </div>
                <div className="text-[11px] sm:text-xs text-gray-600 font-medium">
                  Dự án hoàn thành
                </div>
              </div>

              <div className="h-8 w-[1px] bg-gray-300 hidden sm:block" />

              <div>
                <div className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold font-heading text-[#15803D] leading-none mb-1">
                  50+
                </div>
                <div className="text-[11px] sm:text-xs text-gray-600 font-medium">
                  Khách hàng tin tưởng
                </div>
              </div>

              <div className="h-8 w-[1px] bg-gray-300 hidden sm:block" />

              <div>
                <div className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold font-heading text-[#15803D] leading-none mb-1">
                  10+
                </div>
                <div className="text-[11px] sm:text-xs text-gray-600 font-medium">
                  Lĩnh vực triển khai
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SHOWCASE CARDS & PROJECT LIST (Sliding up and covering the background)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 pt-2 sm:pt-3 pb-16">
        {/* Soft background fade: transparent at top so background image softly shows, dissolving smoothly into #F0F7F4 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F0F7F4]/80 via-[140px] to-[#F0F7F4] -z-10 pointer-events-none" />
        
        {/* Soft blur transition edge extending slightly above the cards */}
        <div 
          className="absolute -top-12 sm:-top-16 inset-x-0 h-12 sm:h-16 bg-gradient-to-t from-[#F0F7F4]/60 to-transparent pointer-events-none -z-10"
        />

        <div className="container mx-auto px-4 md:px-6">

          {/* 4 Showcase Cards Grid (Matching Image 1 exact layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5 lg:gap-5 mb-12 sm:mb-16">
            {highlightSectors.map((sector, idx) => (
              <div
                key={idx}
                onClick={() => handleSectorClick(sector.filterCategory)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100/90"
              >
                {/* Card Top Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={sector.image}
                    alt={sector.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Card Body */}
                <div className="p-3.5 sm:p-4 flex flex-col flex-grow">
                  {/* Pill Badge */}
                  <div className="mb-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#15803D] bg-[#E8F5E9]">
                      {sector.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[13px] sm:text-[13.5px] xl:text-[14px] tracking-tight font-bold font-heading text-[#0F172A] group-hover:text-[#15803D] transition-colors mb-1.5 leading-snug line-clamp-1">
                    {sector.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed mb-3.5 flex-grow min-h-[36px] line-clamp-2">
                    {sector.desc}
                  </p>

                  {/* Footer link: Tìm hiểu thêm > */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#15803D] group-hover:text-[#166534] transition-colors mt-auto pt-2 border-t border-gray-50">
                    <span>Tìm hiểu thêm</span>
                    <div className="w-5 h-5 rounded-full border border-gray-400 group-hover:border-[#15803D] flex items-center justify-center transition-colors">
                      <ChevronRight size={11} className="text-gray-500 group-hover:text-[#15803D]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              SEAMLESS CONTINUATION: PROJECT LIST IN THE EXACT SAME CARD STYLE
          ══════════════════════════════════════════════════════════════════ */}
          <div id="projects-list-anchor" className="scroll-mt-24 pt-4 pb-16">
            
            {/* Category Filter Tabs (Pill style matching the theme) */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8 sm:mb-10">
              {projectCategories.map((category) => {
                const isActive = activeCategory === category.value;
                return (
                  <button
                    key={category.value}
                    onClick={() => setActiveCategory(category.value)}
                    className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-[#15803D] text-white shadow-md font-semibold"
                        : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200/90 shadow-2xs"
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            {/* All Projects Grid in the exact same 4-column card format */}
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5 lg:gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={project.id}
                    className="h-full"
                  >
                    <Link href={`/projects/${project.slug}`} className="block h-full group">
                      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100/90">
                        
                        {/* Card Image */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                          <img 
                            src={project.image} 
                            alt={project.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>

                        {/* Card Body */}
                        <div className="p-4 sm:p-4.5 flex flex-col flex-grow">
                          {/* Pill Badge */}
                          <div className="mb-2">
                            <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#15803D] bg-[#E8F5E9]">
                              {project.categoryLabel}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-sm sm:text-[15px] font-bold font-heading text-[#0F172A] group-hover:text-[#15803D] transition-colors mb-1.5 leading-snug line-clamp-2 min-h-[40px]">
                            {project.name}
                          </h3>

                          {/* Description */}
                          <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed mb-3 flex-grow line-clamp-2 min-h-[38px]">
                            {project.shortDescription}
                          </p>

                          {/* Footer link: Tìm hiểu thêm > */}
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#15803D] group-hover:text-[#166534] transition-colors mt-auto pt-2 border-t border-gray-50">
                            <span>Tìm hiểu thêm</span>
                            <div className="w-5 h-5 rounded-full border border-gray-400 group-hover:border-[#15803D] flex items-center justify-center transition-colors">
                              <ChevronRight size={11} className="text-gray-500 group-hover:text-[#15803D]" />
                            </div>
                          </div>
                        </div>

                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
              <div className="text-center text-gray-500 py-16">
                Đang cập nhật thêm dự án trong danh mục này...
              </div>
            )}

          </div>

        </div>
      </section>
      
      <CTASection />
      <Footer />
    </div>
  );
}
