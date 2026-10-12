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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-14 gap-4 md:gap-6">
          <div>

            <h2 id="news-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-brand-dark mb-3 sm:mb-4">
              Tin Tức & Sự Kiện
            </h2>
            <p className="text-gray-500 text-sm sm:text-lg max-w-xl">
              Cập nhật xu hướng kỹ thuật mới nhất và các hoạt động nổi bật từ BT DECOM.
            </p>
          </div>
          <Link
            href="/news"
            className="hidden md:inline-flex items-center gap-2 text-brand-gold font-semibold hover:text-brand-dark transition-colors shrink-0 group"
          >
            Xem tất cả bài viết
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
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

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-brand-gold font-medium"
          >
            Xem tất cả bài viết
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
