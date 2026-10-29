import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { news } from "@/data/news";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CTASection } from "@/components/home/CTASection";
import { ShareButtons } from "@/components/news/ShareButtons";
import { RecruitmentApplyBox } from "@/components/news/RecruitmentApplyBox";
import { ArticleNavigation } from "@/components/news/ArticleNavigation";

export function generateStaticParams() {
  return news.map((item) => ({
    slug: item.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const article = news.find((n) => n.slug === params.slug);

  if (!article) {
    return {
      title: "Tin tức | BT DECOM",
    };
  }

  return {
    title: `${article.title} | BT DECOM`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `https://btdecom.vn/news/${article.slug}`,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

function renderArticleContent(content: string) {
  // Normalize and split by double line breaks (paragraphs/blocks)
  const blocks = content.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);

  return blocks.map((block, blockIndex) => {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    const isBulletList =
      lines.length > 0 &&
      lines.every((line) => line.startsWith("- ") || line.startsWith("• ") || line.startsWith("* "));

    if (isBulletList) {
      return (
        <ul
          key={blockIndex}
          className="list-disc pl-6 space-y-2 my-4 text-gray-700 marker:text-brand-primary"
        >
          {lines.map((line, lineIndex) => (
            <li key={lineIndex} className="leading-relaxed">
              {line.replace(/^[-•*]\s*/, "")}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p
        key={blockIndex}
        className="mb-4 leading-relaxed text-gray-700 text-lg"
      >
        {lines.join(" ")}
      </p>
    );
  });
}

export default async function NewsDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const article = news.find((n) => n.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />

      {/* Article Header & Main Skip-Link Anchor */}
      <div
        id="main-content"
        tabIndex={-1}
        className="pt-32 pb-16 bg-brand-light outline-none"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-gold-dark transition-colors mb-6 text-sm font-semibold min-h-[44px]"
          >
            <ArrowLeft size={16} /> Quay lại tin tức
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="bg-brand-primary text-white px-3 py-1 rounded-sm uppercase tracking-wider font-bold text-xs">
              {article.category}
            </span>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-brand-primary" />
              {article.date}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-brand-primary" />
              {article.readTime}
            </div>
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-brand-primary" />
              {article.author}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-brand-dark mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-gray-600 font-medium leading-relaxed italic border-l-4 border-brand-primary pl-4">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Main Article Body Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {/* Featured Hero Image */}
          <div className="relative aspect-[2/1] overflow-hidden rounded-2xl mb-12 shadow-md bg-gray-100">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>

          {/* Formatted Article Content */}
          <article className="space-y-4 text-gray-700 text-lg leading-relaxed">
            {renderArticleContent(article.content)}
          </article>

          {/* Dedicated Recruitment Apply Box for Recruitment Articles */}
          {article.category === "Tuyển dụng" && (
            <RecruitmentApplyBox articleTitle={article.title} />
          )}

          {/* Tags & Functional Social Share Bar */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex flex-wrap gap-2">
              <span className="px-3.5 py-1.5 bg-gray-100 rounded-full text-xs text-gray-700 font-medium">
                {article.category}
              </span>
              <span className="px-3.5 py-1.5 bg-gray-100 rounded-full text-xs text-gray-700 font-medium">
                BT DECOM
              </span>
              <span className="px-3.5 py-1.5 bg-gray-100 rounded-full text-xs text-gray-700 font-medium">
                Cơ điện MEP
              </span>
            </div>

            <ShareButtons
              url={`https://btdecom.vn/news/${article.slug}`}
              title={article.title}
            />
          </div>
        </div>
      </section>

      {/* Article Navigation & Related Articles */}
      <ArticleNavigation currentArticle={article} allArticles={news} />

      <CTASection />
      <Footer />
    </>
  );
}
