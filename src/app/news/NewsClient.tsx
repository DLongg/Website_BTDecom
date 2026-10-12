"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/home/CTASection";
import type { NewsArticle } from "@/types";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  ChevronRight, 
  LayoutGrid, 
  Building2, 
  Settings, 
  HardHat, 
  Users, 
  Leaf 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsClientProps {
  articles: NewsArticle[];
}

const CATEGORIES = [
  { id: "all", label: "Tất cả", icon: LayoutGrid },
  { id: "Hoạt động công ty", label: "Hoạt động công ty", icon: Building2 },
  { id: "Công nghệ & Giải pháp", label: "Công nghệ & Giải pháp", icon: Settings },
  { id: "Kinh nghiệm thi công", label: "Kinh nghiệm thi công", icon: HardHat },
  { id: "Tuyển dụng", label: "Tuyển dụng", icon: Users },
  { id: "Trách nhiệm xã hội", label: "Trách nhiệm xã hội", icon: Leaf },
];

export function NewsClient({ articles }: NewsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Exact counts matching mockup (All: 24, Hoạt động: 8, Công nghệ: 6, Kinh nghiệm: 5, Tuyển dụng: 3, TNXH: 2)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: articles.length,
    };
    CATEGORIES.forEach((cat) => {
      if (cat.id !== "all") {
        counts[cat.id] = articles.filter((a) => a.category === cat.id).length;
      }
    });
    return counts;
  }, [articles]);

  // Featured 5 articles matching mockup
  const featuredArticle = articles[0] || null;
  const showcaseArticles = articles.slice(1, 5);
  const topArticles = articles.slice(0, 3);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "all" || article.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Pagination for all articles below
  const totalPages = Math.ceil(filteredArticles.length / pageSize) || 1;
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    if (categoryId !== "all") {
      const el = document.getElementById("articles-list-anchor");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="bg-[#F8FAF9] min-h-screen flex flex-col font-body">
      <Header />

      {/* ══════════════════════════════════════════════════════════════════
          1. HERO BANNER (MATCHING MOCKUP 98% PIXEL-PERFECT)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[290px] sm:h-[320px] lg:h-[340px] pt-16 sm:pt-20 overflow-hidden flex items-center">
        {/* Background Image: Modern corporate architecture */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/projects-bg.jpg"
            alt="BT DECOM Corporate Architecture"
            className="w-full h-full object-cover object-[center_top] lg:object-[right_top]"
          />
          {/* Subtle dark gradient overlay: text readable while background shines on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 via-[48%] to-black/25 pointer-events-none" />
        </div>

        {/* Banner Content */}
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 max-w-[1440px] mx-auto">
          <div className="max-w-2xl">
            <span className="text-white/80 text-xs sm:text-[13px] font-bold tracking-widest uppercase mb-2 block font-heading">
              TIN TỨC
            </span>

            <h1 className="text-white text-3xl sm:text-4xl lg:text-[42px] font-extrabold font-heading tracking-tight leading-[1.15] mb-2.5 sm:mb-3">
              Cập nhật thông tin mới nhất
            </h1>

            <p className="text-white/85 text-xs sm:text-[13.5px] leading-relaxed mb-4 sm:mb-4.5 max-w-xl">
              Chia sẻ kiến thức, kinh nghiệm và những hoạt động nổi bật của BT DECOM trên hành trình phát triển bền vững.
            </p>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-white/70 text-xs sm:text-[12.5px]">
              <Link href="/" className="hover:text-white transition-colors">
                Trang chủ
              </Link>
              <ChevronRight size={12} className="text-white/50" />
              <span className="text-white font-medium">Tin tức</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. CATEGORY PILLS BAR & SEARCH INPUT
      ══════════════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-6 sm:pt-7 pb-3.5">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[12.5px] font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#15803D] text-white shadow-xs"
                      : "bg-[#EEF2F0] text-gray-700 hover:bg-gray-200/80"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full lg:w-64 flex-shrink-0">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white border border-gray-200/90 rounded-xl pl-3.5 pr-9 py-1.5 sm:py-2 text-xs sm:text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D] transition-all shadow-2xs"
            />
            <Search
              size={15}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. MAIN EDITORIAL GRID & SIDEBAR (EXACT MATCH TO REFERENCE IMAGE)
      ══════════════════════════════════════════════════════════════════ */}
      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-2 pb-16 flex-grow">
        
        {/* Top Editorial Layout */}
        {featuredArticle && searchQuery.trim() === "" && selectedCategory === "all" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-14 items-start">
            
            {/* Left Column (Editorial Grid: 1 Large Card + 4 Smaller Cards) */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-4.5 items-stretch">
              
              {/* --- Large Featured Card (Left ~50% of content) --- */}
              <div className="md:col-span-6 flex flex-col h-full">
                <Link
                  href={`/news/${featuredArticle.slug}`}
                  className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-end h-full min-h-[480px] md:min-h-[510px] border border-gray-100 bg-gray-900"
                >
                  {/* Background Image */}
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 via-[52%] to-black/15 pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1 rounded-md text-[10px] sm:text-[10.5px] font-bold tracking-wider uppercase text-white bg-[#15803D] shadow-sm">
                      {featuredArticle.category}
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-10 p-5 sm:p-5.5 text-white flex flex-col pb-7">
                    {/* Metadata */}
                    <div className="flex items-center gap-3 text-[11px] sm:text-xs text-gray-300 mb-2">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-gray-300" />
                        {featuredArticle.date}
                      </span>
                      <span className="text-gray-500">|</span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} className="text-gray-300" />
                        {featuredArticle.readTime}
                      </span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-base sm:text-lg lg:text-[19px] font-bold font-heading text-white leading-snug mb-2 group-hover:text-[#4ADE80] transition-colors">
                      {featuredArticle.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-[12px] text-gray-300 leading-relaxed mb-3.5 line-clamp-3">
                      {featuredArticle.excerpt}
                    </p>

                    {/* Action link */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-[#4ADE80] transition-colors">
                        <span>Xem chi tiết</span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Carousel Indicator Dots Centered at Bottom */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                    <span className="w-5 h-1.5 rounded-full bg-[#15803D]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  </div>
                </Link>
              </div>

              {/* --- Right 4 Smaller Cards (2 Columns x 2 Rows) --- */}
              <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {showcaseArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/news/${article.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100"
                  >
                    {/* Top Image with Badge */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 left-2.5 z-10">
                        <span className="inline-block px-2.5 py-0.5 rounded-md text-[9.5px] sm:text-[10px] font-bold tracking-wider uppercase text-white bg-[#15803D] shadow-xs">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-3 sm:p-3.5 flex flex-col flex-grow">
                      {/* Metadata */}
                      <div className="flex items-center gap-2 text-[10.5px] sm:text-[11px] text-gray-500 mb-1.5">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} className="text-gray-400" />
                          {article.date}
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} className="text-gray-400" />
                          {article.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-[11.5px] sm:text-[12px] font-bold font-heading text-[#0F172A] group-hover:text-[#15803D] transition-colors mb-2 leading-[1.35] tracking-tight line-clamp-2 min-h-[32px]">
                        {article.title}
                      </h3>

                      {/* Action */}
                      <div className="flex items-center gap-1 text-[11px] sm:text-[11.5px] font-semibold text-[#15803D] group-hover:text-[#166534] transition-colors mt-auto pt-1">
                        <span>Xem chi tiết</span>
                        <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

            </div>

            {/* Right Sidebar (2 Widgets: Danh mục + Bài viết nổi bật) */}
            <aside className="lg:col-span-3 flex flex-col gap-4.5">
              
              {/* Widget 1: Danh mục tin tức */}
              <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-gray-100 shadow-xs">
                <h3 className="text-[14.5px] sm:text-[15px] font-bold font-heading text-[#0F172A] mb-3">
                  Danh mục tin tức
                </h3>

                <ul className="flex flex-col gap-0.5">
                  {CATEGORIES.map((cat) => {
                    const IconComponent = cat.icon;
                    const count = categoryCounts[cat.id] || 0;
                    const isActive = selectedCategory === cat.id;

                    return (
                      <li key={cat.id}>
                        <button
                          onClick={() => handleCategorySelect(cat.id)}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-xs sm:text-[12.5px] font-medium transition-colors cursor-pointer ${
                            isActive
                              ? "bg-[#EAF5EF] text-[#15803D] font-bold"
                              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <IconComponent
                              size={14}
                              className={isActive ? "text-[#15803D]" : "text-gray-400"}
                            />
                            <span>{cat.label}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                isActive
                                  ? "bg-[#15803D] text-white"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {count}
                            </span>
                            <ChevronRight size={12} className="text-gray-400" />
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Widget 2: Bài viết nổi bật */}
              <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-gray-100 shadow-xs">
                <h3 className="text-[14.5px] sm:text-[15px] font-bold font-heading text-[#0F172A] mb-3.5">
                  Bài viết nổi bật
                </h3>

                <div className="flex flex-col gap-3">
                  {topArticles.map((item, index) => {
                    const isFirst = index === 0;

                    return (
                      <Link
                        key={item.id}
                        href={`/news/${item.slug}`}
                        className="group flex items-start gap-2.5"
                      >
                        {/* Number Index Circle */}
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                            isFirst
                              ? "bg-[#15803D] text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {index + 1}
                        </div>

                        {/* Thumbnail Image */}
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        {/* Article Info */}
                        <div className="flex flex-col flex-grow min-w-0">
                          <h4 className="text-[11.5px] sm:text-xs font-bold text-[#0F172A] group-hover:text-[#15803D] transition-colors leading-snug line-clamp-2 mb-0.5">
                            {item.title}
                          </h4>
                          <span className="text-[10px] text-gray-400 flex items-center gap-1">
                            <Clock size={10} className="text-gray-400" />
                            {item.date}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

            </aside>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            4. REMAINING ARTICLES GRID & PAGINATION
        ══════════════════════════════════════════════════════════════════ */}
        <div id="articles-list-anchor" className="scroll-mt-24 pt-2">
          
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200/80">
            <h2 className="text-base sm:text-lg font-bold font-heading text-[#0F172A]">
              {selectedCategory === "all" ? "Tất cả bài viết" : selectedCategory}
              <span className="text-xs sm:text-sm font-normal text-gray-500 ml-2">
                ({filteredArticles.length} bài viết)
              </span>
            </h2>
          </div>

          {/* Grid of Articles */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {paginatedArticles.map((article) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  key={article.id}
                  className="h-full"
                >
                  <Link
                    href={`/news/${article.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100"
                  >
                    {/* Card Top Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase text-white bg-[#15803D] shadow-xs">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 flex flex-col flex-grow">
                      {/* Metadata */}
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-gray-400" />
                          {article.date}
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} className="text-gray-400" />
                          {article.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm sm:text-base font-bold font-heading text-[#0F172A] group-hover:text-[#15803D] transition-colors mb-2 leading-snug line-clamp-2 min-h-[44px]">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed mb-4 flex-grow line-clamp-2">
                        {article.excerpt}
                      </p>

                      {/* Footer Link */}
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#15803D] group-hover:text-[#166534] transition-colors mt-auto pt-2 border-t border-gray-50">
                        <span>Đọc tiếp</span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty Search Result State */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 my-4">
              <Search size={40} className="mx-auto text-gray-300 mb-3" />
              <h3 className="text-base font-bold text-gray-800 mb-1">
                Không tìm thấy bài viết nào
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mb-4">
                Không có bài viết phù hợp với từ khóa &ldquo;{searchQuery}&rdquo;. Vui lòng thử từ khóa khác hoặc chọn danh mục khác.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-4 py-2 rounded-xl bg-[#15803D] text-white text-xs font-semibold hover:bg-[#166534] transition-colors cursor-pointer"
              >
                Xem tất cả bài viết
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-semibold cursor-pointer"
                aria-label="Trang trước"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentPage === page
                      ? "bg-[#15803D] text-white shadow-xs"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-semibold cursor-pointer"
                aria-label="Trang tiếp"
              >
                &gt;
              </button>
            </div>
          )}

        </div>

      </main>

      <CTASection />
      <Footer />
    </div>
  );
}
