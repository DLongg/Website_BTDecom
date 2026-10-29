import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import type { NewsArticle } from "@/types";

interface ArticleNavigationProps {
  currentArticle: NewsArticle;
  allArticles: NewsArticle[];
}

export function ArticleNavigation({ currentArticle, allArticles }: ArticleNavigationProps) {
  // 1. Calculate Prev / Next
  const currentIndex = allArticles.findIndex((a) => a.id === currentArticle.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex >= 0 && currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // 2. Calculate Related Articles (same category first, backfill up to 3)
  const sameCategory = allArticles.filter(
    (a) => a.id !== currentArticle.id && a.category === currentArticle.category
  );
  let relatedArticles: NewsArticle[] = sameCategory.slice(0, 3);
  if (relatedArticles.length < 3) {
    const remainingCount = 3 - relatedArticles.length;
    const existingIds = new Set([currentArticle.id, ...relatedArticles.map((a) => a.id)]);
    const backfill = allArticles.filter((a) => !existingIds.has(a.id)).slice(0, remainingCount);
    relatedArticles = [...relatedArticles, ...backfill];
  }

  return (
    <>
      {/* Prev / Next Article Bar */}
      <nav
        aria-label="Điều hướng bài viết trước sau"
        className="my-12 pt-8 border-t border-gray-200"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle ? (
            <Link
              href={`/news/${prevArticle.slug}`}
              aria-label={`Bài viết trước: ${prevArticle.title}`}
              className="group flex flex-col items-start p-4 rounded-xl border border-gray-200 hover:border-brand-primary/50 bg-white hover:bg-emerald-50/30 transition-all duration-200 min-h-[48px]"
            >
              <span className="text-xs font-semibold text-gray-500 group-hover:text-brand-primary flex items-center gap-1.5 transition-colors">
                <ArrowLeft size={14} /> Bài trước
              </span>
              <span className="text-sm font-bold font-heading text-brand-dark group-hover:text-brand-primary line-clamp-2 mt-1.5 transition-colors">
                {prevArticle.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextArticle ? (
            <Link
              href={`/news/${nextArticle.slug}`}
              aria-label={`Bài viết tiếp theo: ${nextArticle.title}`}
              className="group flex flex-col items-end text-right p-4 rounded-xl border border-gray-200 hover:border-brand-primary/50 bg-white hover:bg-emerald-50/30 transition-all duration-200 min-h-[48px]"
            >
              <span className="text-xs font-semibold text-gray-500 group-hover:text-brand-primary flex items-center gap-1.5 transition-colors">
                Bài tiếp theo <ArrowRight size={14} />
              </span>
              <span className="text-sm font-bold font-heading text-brand-dark group-hover:text-brand-primary line-clamp-2 mt-1.5 transition-colors">
                {nextArticle.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>
      </nav>

      {/* Related Articles Section */}
      <section
        aria-labelledby="related-articles-heading"
        className="py-16 bg-brand-light border-t border-gray-100"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-brand-primary text-xs font-bold uppercase tracking-wider mb-1">
                Khám phá thêm
              </div>
              <h2
                id="related-articles-heading"
                className="text-2xl md:text-3xl font-bold font-heading text-brand-dark"
              >
                Bài viết liên quan
              </h2>
            </div>
            <Link
              href={`/news?category=${encodeURIComponent(currentArticle.category)}`}
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:text-brand-gold-dark transition-colors"
            >
              Xem chuyên mục {currentArticle.category} &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <Link
                  href={`/news/${item.slug}`}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 block"
                  aria-label={item.title}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-brand-primary px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider shadow-xs">
                    {item.category}
                  </div>
                </Link>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-brand-primary" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-brand-primary" />
                      {item.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold font-heading text-brand-dark group-hover:text-brand-primary transition-colors text-base line-clamp-2 leading-snug mb-2 flex-1">
                    <Link href={`/news/${item.slug}`}>{item.title}</Link>
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                    {item.excerpt}
                  </p>

                  <Link
                    href={`/news/${item.slug}`}
                    className="text-xs font-semibold text-brand-primary group-hover:text-brand-gold-dark inline-flex items-center gap-1 mt-auto pt-2 border-t border-gray-100"
                  >
                    Đọc chi tiết <ArrowRight size={12} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
