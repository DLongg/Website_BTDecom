import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";
import { notFound } from "next/navigation";
import { ArrowLeft, Building, MapPin, Calendar, Layers, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { CTASection } from "@/components/home/CTASection";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import type { ReactNode } from "react";

export function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }));
}

export const dynamicParams = false;

/* ── helpers ── */

/** Split markdown at every ## heading into sections */
function splitMarkdownSections(md: string): { heading: string; body: string }[] {
  const lines = md.split("\n");
  const sections: { heading: string; body: string }[] = [];
  let current: { heading: string; body: string } | null = null;

  for (const line of lines) {
    const match = line.match(/^##\s+(.+)/);
    if (match) {
      if (current) sections.push(current);
      current = { heading: match[1], body: "" };
    } else if (current) {
      current.body += line + "\n";
    }
  }
  if (current) sections.push(current);
  return sections;
}

const mdComponents: Components = {
  p: (props) => <p className="mb-4 leading-relaxed" {...props} />,
  h1: (props) => <h1 className="text-3xl font-bold mt-8 mb-4 text-brand-dark" {...props} />,
  h2: (props) => <h2 className="text-2xl font-bold mt-8 mb-4 text-brand-dark" {...props} />,
  h3: (props) => <h3 className="text-xl font-bold mt-6 mb-3 text-brand-dark" {...props} />,
  ul: (props) => <ul className="space-y-3 mb-6" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
  li: (props) => (
    <li className="flex gap-3 items-start">
      <CheckCircle2 size={18} className="text-brand-gold mt-1 shrink-0" />
      <span>{props.children}</span>
    </li>
  ),
  a: (props) => <a className="text-brand-gold hover:underline" {...props} />,
  strong: (props) => <strong className="font-semibold text-brand-dark" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-4 border-brand-gold pl-6 italic text-gray-600 bg-brand-light/40 py-4 px-2 rounded-r-xl my-6" {...props} />
  ),
};

export default async function ProjectDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const sections = splitMarkdownSections(project.description);
  const galleryImages = project.gallery ?? [];

  // Decide which images go where
  const heroImage = project.image;
  // Extra images to intersperse
  const extraImages = [...galleryImages];

  const infoItems = [
    { icon: <Building size={20} />, label: "Chủ đầu tư", value: project.client },
    { icon: <MapPin size={20} />, label: "Địa điểm", value: project.location },
    { icon: <Layers size={20} />, label: "Quy mô", value: project.area },
    { icon: <Calendar size={20} />, label: "Năm thực hiện", value: project.year },
  ];

  return (
    <>
      <Header />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
        {/* Background image */}
        <img
          src={heroImage}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-20">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 text-sm font-medium backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full"
            >
              <ArrowLeft size={16} /> Quay lại danh sách dự án
            </Link>

            <div className="max-w-3xl">
              <span className="inline-block bg-brand-gold text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5 shadow-lg">
                {project.categoryLabel}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white leading-tight">
                {project.name}
              </h1>
              <p className="text-white/70 mt-4 text-lg max-w-2xl">
                {project.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ INFO BAR ═══════════ */}
      <section className="bg-brand-dark border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {infoItems.map((item, i) => (
              <div key={i} className="py-6 md:py-8 px-4 md:px-6 group">
                <div className="flex items-center gap-3 mb-2 text-brand-gold">
                  {item.icon}
                  <span className="text-[11px] uppercase tracking-widest text-white/50 font-medium">
                    {item.label}
                  </span>
                </div>
                <div className="text-white font-medium text-sm md:text-base leading-snug">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CONTENT ═══════════ */}
      <article className="bg-white">
        {sections.map((section, idx) => {
          // Determine if we have an image for this section
          const imageForSection = extraImages[idx] ?? null;
          const isEven = idx % 2 === 0;

          return (
            <section key={idx} className={`${idx > 0 ? "border-t border-gray-100" : ""}`}>
              {/* If we have an image for this section, show editorial layout */}
              {imageForSection ? (
                <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isEven ? "" : "direction-rtl"}`}>
                    {/* Text side */}
                    <div className={`${isEven ? "lg:order-1" : "lg:order-2"}`}>
                      {/* Section number + heading */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold text-sm font-heading">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-brand-gold/30 to-transparent" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold font-heading text-brand-dark mb-6">
                        {section.heading}
                      </h2>
                      <div className="text-gray-600 text-[16px] leading-relaxed">
                        <ReactMarkdown components={mdComponents}>
                          {section.body.trim()}
                        </ReactMarkdown>
                      </div>
                    </div>

                    {/* Image side */}
                    <div className={`${isEven ? "lg:order-2" : "lg:order-1"}`}>
                      <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-br from-brand-gold/20 to-brand-green/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                          <img
                            src={imageForSection}
                            alt={section.heading}
                            className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          {/* Subtle corner accent */}
                          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-brand-gold/40 rounded-tl-2xl" />
                          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-brand-gold/40 rounded-br-2xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Text-only section */
                <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
                  <div className="max-w-3xl mx-auto">
                    {/* Section number + heading */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold text-sm font-heading">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-r from-brand-gold/30 to-transparent" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold font-heading text-brand-dark mb-6">
                      {section.heading}
                    </h2>
                    <div className="text-gray-600 text-[16px] leading-relaxed">
                      <ReactMarkdown components={mdComponents}>
                        {section.body.trim()}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              )}
            </section>
          );
        })}

        {/* ── Remaining images that didn't get assigned to sections ── */}
        {extraImages.length > sections.length && (
          <section className="border-t border-gray-100">
            <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {extraImages.slice(sections.length).map((img, i) => (
                  <div key={i} className="relative group rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={img}
                      alt={`${project.name} - Hình ${sections.length + i + 1}`}
                      className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <CTASection />
      <Footer />
    </>
  );
}
