import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { news } from "@/data/news";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { CTASection } from "@/components/home/CTASection";

export function generateStaticParams() {
  return news.map((item) => ({
    slug: item.slug,
  }));
}

export const dynamicParams = false;

export default async function NewsDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const article = news.find(n => n.slug === params.slug);
  
  if (!article) {
    notFound();
  }

  // Get related articles
  const relatedArticles = news.filter(n => n.id !== article.id).slice(0, 3);

  return (
    <>
      <Header />
      
      {/* Article Header */}
      <div className="pt-32 pb-16 bg-brand-light">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <Link href="/news" className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-dark transition-colors mb-6 text-sm font-medium">
            <ArrowLeft size={16} /> Quay lại tin tức
          </Link>
          
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="bg-brand-gold text-white px-3 py-1 rounded-sm uppercase tracking-wider font-bold text-xs">
              {article.category}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-brand-gold" />
              {article.date}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-brand-gold" />
              {article.readTime}
            </div>
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-brand-gold" />
              {article.author}
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-brand-dark mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-gray-600 font-medium leading-relaxed italic border-l-4 border-brand-gold pl-4">
            {article.excerpt}
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden mb-12 shadow-md">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-auto aspect-[2/1] object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-brand-dark prose-a:text-brand-gold hover:prose-a:text-brand-dark">
            {article.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
            ))}
            <blockquote>
              &quot;Chất lượng - Uy tín - Sự hài lòng của khách hàng là nền tảng phát triển bền vững của BT DECOM.&quot;
            </blockquote>
          </div>
          
          {/* Tags & Share (Static Demo) */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">Xây lắp điện</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">Chiếu sáng</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">BT DECOM</span>
            </div>
            <div className="flex gap-3 items-center text-sm font-medium text-brand-dark">
              Chia sẻ:
              <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:opacity-80 transition-opacity">f</button>
              <button className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center hover:opacity-80 transition-opacity">in</button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-brand-light">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h2 className="text-2xl font-bold font-heading text-brand-dark mb-8">Bài viết liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {relatedArticles.map(item => (
              <Link href={`/news/${item.slug}`} key={item.id} className="group flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full md:w-32 h-32 shrink-0 rounded-lg overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div>
                  <div className="text-brand-gold text-xs font-bold uppercase tracking-wider mb-1">{item.category}</div>
                  <h3 className="font-bold font-heading text-brand-dark mb-2 group-hover:text-brand-gold transition-colors line-clamp-2">{item.title}</h3>
                  <div className="text-gray-500 text-xs flex items-center gap-1.5"><Calendar size={12}/> {item.date}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </>
  );
}
