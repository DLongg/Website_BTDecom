"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/home/CTASection";
import { RecruitmentHub } from "@/components/news/RecruitmentHub";
import { RecruitmentBanner } from "@/components/news/RecruitmentBanner";
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
  Leaf,
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
  const searchParams = useSearchParams();
  const rawCategoryParam = searchParams.get("category");

  const [userSelectedCategory, setUserSelectedCategory] = useState<string | null>(null);
  const [prevParam, setPrevParam] = useState<string | null>(rawCategoryParam);

  // Sync state during render when URL search param changes
  if (rawCategoryParam !== prevParam) {
    setPrevParam(rawCategoryParam);
    setUserSelectedCategory(null);
  }

  // Derive active category from user interaction or URL query
  const selectedCategory = useMemo(() => {
    if (userSelectedCategory !== null) {
      return userSelectedCategory;
    }
    if (!rawCategoryParam) return "all";
    const matched = CATEGORIES.find(
      (c) =>
        c.id.toLowerCase() === rawCategoryParam.toLowerCase() ||
        c.label.toLowerCase() === rawCategoryParam.toLowerCase()
    );
    return matched ? matched.id : rawCategoryParam;
  }, [userSelectedCategory, rawCategoryParam]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setUserSelectedCategory(null);
      setCurrentPage(1);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Category counts matching database
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

  // Two-way category selection & URL query synchronization
  const handleCategoryChange = (categoryId: string) => {
    setUserSelectedCategory(categoryId);
    setCurrentPage(1);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (categoryId === "all") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", categoryId);
      }
      window.history.replaceState(null, "", url.pathname + (url.search ? url.search : ""));
    }

    if (categoryId !== "all") {
      const el = document.getElementById("articles-list-anchor");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Filtered articles based on category and search query
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

  // Zero Duplicate & Consistent Cross-Page Pagination Logic:
  // When category is "all" and search is empty, the first article is reserved as
  // the featured hero at the top of page 1. The grid across ALL pages always
  // slices from index 1 so that article index 6 is never repeated between page 1 and page 2.
  const hasFeaturedArticle =
    selectedCategory === "all" && searchQuery.trim() === "";

  const featuredArticle =
    hasFeaturedArticle && currentPage === 1 ? filteredArticles[0] || null : null;

  const gridArticles = useMemo(() => {
    if (hasFeaturedArticle) {
      return filteredArticles.slice(1);
    }
    return filteredArticles;
  }, [filteredArticles, hasFeaturedArticle]);

  const totalPages = Math.ceil(gridArticles.length / pageSize) || 1;
  const paginatedArticles = gridArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-[#F8FAF9] min-h-screen flex flex-col font-body">
      <Header />

      {/* ══════════════════════════════════════════════════════════════════
          1. HERO BANNER
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[260px] sm:h-[290px] lg:h-[320px] pt-16 sm:pt-20 overflow-hidden flex items-center">
        {/* Background Image: Optimized next/image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/projects-bg.jpg"
            alt="BT DECOM Corporate Architecture"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_top] lg:object-[right_top]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 via-[48%] to-black/25 pointer-events-none" />
        </div>

        {/* Banner Content */}
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 max-w-[1440px] mx-auto">
          <div className="max-w-2xl">
            <span className="text-white/80 text-xs sm:text-[13px] font-bold tracking-widest uppercase mb-2 block font-heading">
              TIN TỨC & SỰ KIỆN
            </span>

            <h1 className="text-white text-3xl sm:text-4xl lg:text-[42px] font-extrabold font-heading tracking-tight leading-[1.15] mb-2.5 sm:mb-3">
              Cập nhật thông tin mới nhất
            </h1>

            <p className="text-white/85 text-xs sm:text-[13.5px] leading-relaxed mb-4 max-w-xl">
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
          2. UNIFIED TOOLBAR: CATEGORY CHIPS & SEARCH (WCAG >= 44PX)
      ══════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Thanh công cụ lọc chuyên mục và tìm kiếm"
        className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-6 sm:pt-8 pb-4"
      >
        <div className="bg-white rounded-2xl border border-gray-200/90 p-3 sm:p-4 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
          {/* Category Filter Chips with Count Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const IconComponent = cat.icon;
              const count = categoryCounts[cat.id] || 0;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={isActive ? "true" : "false"}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] h-11 rounded-xl text-xs sm:text-[13px] font-semibold transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#15803D]/30 ${
                    isActive
                      ? "bg-[#15803D] text-white shadow-xs"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-gray-200/70"
                  }`}
                >
                  <IconComponent
                    size={15}
                    className={isActive ? "text-white" : "text-gray-500"}
                  />
                  <span>{cat.label}</span>
                  <span
                    className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      isActive
                        ? "bg-white/25 text-white"
                        : "bg-gray-200/80 text-gray-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input Box (WCAG >= 44px) */}
          <div className="relative w-full lg:w-72 flex-shrink-0">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-11 min-h-[44px] bg-gray-50/80 border border-gray-200 rounded-xl pl-4 pr-10 text-xs sm:text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D] focus:bg-white transition-all"
            />
            <Search
              size={16}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. MAIN SECTION (SEMANTIC SECTION WITH ID FOR SKIP-LINKS)
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="main-content"
        tabIndex={-1}
        className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-2 pb-16 flex-grow outline-none"
      >
        {/* Dedicated Recruitment Hub (When category === "Tuyển dụng" and no active search) */}
        {selectedCategory === "Tuyển dụng" && searchQuery.trim() === "" ? (
          <RecruitmentHub />
        ) : (
          <>
            {/* Recruitment Banner (When category === "all" and no active search) */}
            {selectedCategory === "all" && searchQuery.trim() === "" && (
              <RecruitmentBanner
                onSelectRecruitment={() => handleCategoryChange("Tuyển dụng")}
                className="mb-8 sm:mb-10"
              />
            )}

            {/* Featured Article Hero Card (Top of page 1 when All category & no search) */}
            {featuredArticle && (
              <div className="mb-10">
                <Link
                  href={`/news/${featuredArticle.slug}`}
                  className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-end min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] border border-gray-100 bg-gray-900"
                >
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    priority
                    sizes="(max-width: 1440px) 100vw, 1440px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 via-[52%] to-black/15 pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase text-white bg-[#15803D] shadow-sm">
                      Tiêu điểm • {featuredArticle.category}
                    </span>
                  </div>

                  {/* Card Content (Zero fake dots) */}
                  <div className="relative z-10 p-5 sm:p-7 lg:p-8 text-white flex flex-col max-w-3xl">
                    <div className="flex items-center gap-3 text-xs sm:text-[13px] text-gray-300 mb-2">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-gray-300" />
                        {featuredArticle.date}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} className="text-gray-300" />
                        {featuredArticle.readTime}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold font-heading text-white leading-snug mb-2.5 group-hover:text-[#4ADE80] transition-colors">
                      {featuredArticle.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed mb-4 line-clamp-2 sm:line-clamp-3 max-w-2xl">
                      {featuredArticle.excerpt}
                    </p>

                    <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white group-hover:text-[#4ADE80] transition-colors">
                      <span>Xem chi tiết</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Articles Grid & Pagination */}
            <div id="articles-list-anchor" className="scroll-mt-24 pt-2">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200/80">
                <h2 className="text-base sm:text-lg font-bold font-heading text-[#0F172A]">
                  {selectedCategory === "all" ? "Danh sách bài viết" : selectedCategory}
                  <span className="text-xs sm:text-sm font-normal text-gray-500 ml-2">
                    ({filteredArticles.length} bài viết)
                  </span>
                </h2>
              </div>

              {/* Grid of Articles (Zero Duplicates) */}
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
                      transition={{ duration: 0.2 }}
                      key={article.id}
                      className="h-full"
                    >
                      <Link
                        href={`/news/${article.slug}`}
                        className="group bg-white rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100"
                      >
                        {/* Card Top Image (next/image) */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute top-3 left-3 z-10">
                            <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase text-white bg-[#15803D] shadow-xs">
                              {article.category}
                            </span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 sm:p-5 flex flex-col flex-grow">
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

                          <h3 className="text-sm sm:text-base font-bold font-heading text-[#0F172A] group-hover:text-[#15803D] transition-colors mb-2 leading-snug line-clamp-2 min-h-[44px]">
                            {article.title}
                          </h3>

                          <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed mb-4 flex-grow line-clamp-2">
                            {article.excerpt}
                          </p>

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

              {/* Polite Empty State (Safely handles special characters without reflection) */}
              {filteredArticles.length === 0 && (
                <div className="text-center py-16 sm:py-20 bg-white rounded-2xl border border-gray-200/80 my-4 px-4 shadow-2xs">
                  <Search size={44} className="mx-auto text-gray-300 mb-3" />
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                    Không tìm thấy bài viết nào
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mb-6">
                    Không có bài viết phù hợp với tiêu chí tìm kiếm hoặc chuyên mục đã chọn. Vui lòng thử từ khóa khác hoặc quay lại danh sách tất cả bài viết.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      handleCategoryChange("all");
                    }}
                    className="inline-flex items-center justify-center px-5 py-2.5 min-h-[44px] rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-[#15803D]/40"
                  >
                    Xem tất cả bài viết
                  </button>
                </div>
              )}

              {/* Pagination Controls (WCAG min-h-[44px] min-w-[44px]) */}
              {totalPages > 1 && (
                <nav
                  aria-label="Điều hướng phân trang bài viết"
                  className="flex items-center justify-center gap-2 mt-12"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage((p) => Math.max(1, p - 1));
                      const el = document.getElementById("articles-list-anchor");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    disabled={currentPage === 1}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-semibold cursor-pointer shadow-2xs"
                    aria-label="Trang trước"
                  >
                    &lt;
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => {
                        setCurrentPage(page);
                        const el = document.getElementById("articles-list-anchor");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      aria-current={currentPage === page ? "page" : undefined}
                      className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl text-sm font-bold transition-all cursor-pointer ${
                        currentPage === page
                          ? "bg-[#15803D] text-white shadow-xs"
                          : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 shadow-2xs"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                      const el = document.getElementById("articles-list-anchor");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    disabled={currentPage === totalPages}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-semibold cursor-pointer shadow-2xs"
                    aria-label="Trang tiếp"
                  >
                    &gt;
                  </button>
                </nav>
              )}
            </div>
          </>
        )}
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}
