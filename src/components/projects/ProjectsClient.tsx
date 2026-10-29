"use client";

import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/home/CTASection";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project, ProjectCategory, ProjectStats } from "@/types";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export interface ProjectsClientProps {
  projects: Project[];
  projectCategories?: { value: string; label: string }[];
  stats?: ProjectStats;
}

export function ProjectsClient({ projects, stats }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const prefersReduced = useReducedMotion();
  const shouldReduceMotion = Boolean(prefersReduced);

  // Synchronize URL query parameter ?cat= via window.location.search
  // DO NOT use useSearchParams() to ensure static export includes all 26 cards
  useEffect(() => {
    const syncFromLocation = () => {
      try {
        const search = window.location.search;
        if (!search) {
          setActiveCategory("all");
          return;
        }
        const params = new URLSearchParams(search);
        const cat = params.get("cat");
        if (cat && ["lighting", "substation", "electrical", "me"].includes(cat)) {
          setActiveCategory(cat);
        } else {
          setActiveCategory("all");
        }
      } catch {
        setActiveCategory("all");
      }
    };

    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, []);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    try {
      const currentPath = window.location.pathname;
      if (cat === "all") {
        window.history.replaceState(null, "", currentPath);
      } else {
        window.history.replaceState(null, "", `${currentPath}?cat=${encodeURIComponent(cat)}`);
      }
    } catch {
      // fallback if history API is restricted
    }
  };

  // Dynamic stat strip computation (pure client fallback if stats prop not passed)
  const computedStats: ProjectStats = useMemo(() => {
    if (stats) return stats;

    const totalProjects = projects.length;
    const categoriesSet = new Set(projects.map((p) => p.category));
    const counts: Record<ProjectCategory, number> = {
      lighting: 0,
      substation: 0,
      electrical: 0,
      me: 0,
    };
    const years: number[] = [];

    for (const p of projects) {
      if (p.category in counts) {
        counts[p.category]++;
      }
      const raw = p.yearNumber || p.year;
      const match = String(raw).match(/\d{4}/);
      if (match) {
        years.push(parseInt(match[0], 10));
      }
    }

    const earliestYear = years.length > 0 ? Math.min(...years) : 2013;
    const latestYear = years.length > 0 ? Math.max(...years) : 2021;

    return {
      totalProjects,
      totalCategories: categoriesSet.size,
      yearRange: `${earliestYear}\u2013${latestYear}`,
      earliestYear,
      latestYear,
      counts,
    };
  }, [stats, projects]);

  // 5 Canonical filter chips with exact counts
  const categoryChips = useMemo(() => [
    { value: "all", label: "Tất cả", count: computedStats.totalProjects },
    { value: "lighting", label: "Chiếu sáng", count: computedStats.counts?.lighting ?? 5 },
    { value: "substation", label: "Trạm biến áp & lưới điện", count: computedStats.counts?.substation ?? 2 },
    { value: "electrical", label: "Hệ thống điện", count: computedStats.counts?.electrical ?? 5 },
    { value: "me", label: "Cơ điện M&E", count: computedStats.counts?.me ?? 14 },
  ], [computedStats]);

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-white min-h-screen flex flex-col font-body">
      <Header />

      <main className="flex-grow">
        {/* ══════════════════════════════════════════════════════════════════
            HERO SECTION: Compact on brand-light, industry copy, stat strip
        ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-brand-light border-b border-neutral-200/70 pt-24 pb-6 sm:pt-28 sm:pb-8 lg:pt-32 lg:pb-10">
          <div className="site-container">
            <span className="text-brand-primary font-bold text-xs sm:text-sm tracking-wider uppercase block mb-1.5 font-heading">
              HỒ SƠ NĂNG LỰC
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-brand-dark tracking-tight mb-2 sm:mb-2.5">
              Các dự án <span className="text-brand-primary">đã thực hiện</span>
            </h1>

            <p className="text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mb-4 sm:mb-5">
              Tổng hợp các công trình tiêu biểu do BT DECOM trực tiếp xây lắp và thi công trong các lĩnh vực đường dây, trạm biến áp, chiếu sáng đô thị và cơ điện M&E.
            </p>

            {/* Dynamic Stat Strip: 26 hồ sơ công trình · 4 lĩnh vực · 2013–2021 */}
            <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 text-xs sm:text-sm font-medium text-neutral-600">
              <span className="font-semibold text-brand-dark">
                {computedStats.totalProjects} hồ sơ công trình
              </span>
              <span className="text-neutral-300" aria-hidden="true">
                ·
              </span>
              <span className="font-semibold text-brand-dark">
                {computedStats.totalCategories} lĩnh vực
              </span>
              <span className="text-neutral-300" aria-hidden="true">
                ·
              </span>
              <span className="font-semibold text-brand-dark">
                {computedStats.yearRange}
              </span>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            PROJECT LIST & CATEGORY FILTER SECTION
        ══════════════════════════════════════════════════════════════════ */}
        <section className="py-6 sm:py-8 lg:py-10 bg-white" aria-labelledby="projects-list-heading">
          <div className="site-container">
            {/* Heading & Live Status */}
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4 sm:mb-5">
              <h2
                id="projects-list-heading"
                className="text-xl sm:text-2xl font-bold font-heading text-brand-dark"
              >
                Danh sách công trình
              </h2>
              <p aria-live="polite" className="text-xs sm:text-sm text-neutral-500">
                Đang hiển thị {filteredProjects.length} / {projects.length} công trình
              </p>
            </div>

            {/* Category Filter Chip Bar */}
            <div className="mb-6 sm:mb-8 overflow-hidden">
              <div
                role="region"
                aria-label="Bộ lọc lĩnh vực dự án"
                className="flex items-center gap-2 overflow-x-auto py-1 px-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {categoryChips.map((cat) => {
                  const isActive = activeCategory === cat.value;
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => handleCategoryChange(cat.value)}
                      aria-pressed={isActive}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 min-h-[44px] h-11 shrink-0 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 ${
                        isActive
                          ? "bg-brand-primary text-white shadow-sm font-semibold"
                          : "bg-white text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 border border-neutral-200/80 shadow-2xs"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Project Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
            <motion.div
              layout={!shouldReduceMotion}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout={!shouldReduceMotion}
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                    className="h-full"
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-16 px-4">
                <p className="text-neutral-600 mb-4 text-base">
                  Không tìm thấy hồ sơ công trình nào trong lĩnh vực này.
                </p>
                <button
                  type="button"
                  onClick={() => handleCategoryChange("all")}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-primary text-white font-semibold hover:bg-brand-gold-dark transition-colors min-h-[44px] cursor-pointer"
                >
                  Xem tất cả
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <CTASection />
      <Footer />
    </div>
  );
}

export default ProjectsClient;
