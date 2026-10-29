"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { news } from "@/data/news";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export function NewsSection() {
  const { ref, isInView } = useScrollAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section aria-labelledby="news-heading" className="py-16 md:py-24 lg:py-32 bg-brand-light" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 md:mb-14">
          <div className="flex items-center justify-between gap-4">
            <h2 id="news-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-brand-dark">
              Tin Tức & Sự Kiện
            </h2>
            <Link
              href="/news"
              aria-label="Xem tất cả bài viết"
              className="group inline-flex items-center justify-center h-10 sm:h-11 rounded-full bg-white border border-gray-200/90 text-brand-dark hover:border-brand-primary hover:bg-brand-primary hover:text-white shadow-xs hover:shadow-md hover:shadow-brand-primary/20 transition-all duration-300 ease-out shrink-0 px-2.5 sm:px-3 hover:px-4 active:scale-95"
            >
              <span className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ease-out group-hover:max-w-28 group-hover:opacity-100 group-hover:mr-2">
                Tất cả bài viết
              </span>
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 shrink-0"
              />
            </Link>
          </div>
          <p className="mt-2.5 sm:mt-4 text-gray-500 text-sm sm:text-lg max-w-xl">
            Cập nhật xu hướng kỹ thuật mới nhất và các hoạt động nổi bật từ BT DECOM.
          </p>
        </div>


        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
        >
          {news.slice(0, 3).map((item) => (
            <motion.div key={item.id} variants={itemVariants} className="group h-full">
              <Link href={`/news/${item.slug}`} className="block h-full">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-row sm:flex-col h-full border border-gray-100">
                  <div className="relative w-[120px] sm:w-full shrink-0 aspect-[3/4] sm:aspect-[16/10] overflow-hidden">
                    <Image
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 120px"
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="hidden sm:block absolute top-4 left-4 bg-brand-gold text-white text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 flex flex-col flex-grow justify-center sm:justify-start">
                    <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-gray-500 mb-1.5 sm:mb-3">
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <Calendar size={12} className="text-brand-gold sm:w-3.5 sm:h-3.5" />
                        <span className="truncate">{item.date}</span>
                      </div>
                    </div>

                    <h3 className="text-sm sm:text-xl font-bold font-heading text-brand-dark mb-1 sm:mb-3 group-hover:text-brand-gold transition-colors line-clamp-3 sm:line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="hidden sm:block text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                      {item.excerpt}
                    </p>

                    <div className="hidden sm:flex items-center gap-2 text-brand-gold text-sm font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300 mt-auto">
                      Đọc tiếp <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
