import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building,
  MapPin,
  Calendar,
  Layers,
  CheckCircle2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/home/CTASection";
import { ProjectCard } from "@/components/projects/ProjectCard";
import {
  getProjectBySlug,
  getProjectSlugs,
  getAdjacentProjects,
  getRelatedProjects,
  CATEGORY_LABELS,
} from "@/lib/projects";

export function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }));
}

export const dynamicParams = false;

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Dự án không tồn tại | BT DECOM",
    };
  }

  const ogImage = project.gallery?.[0] ?? project.image;

  return {
    title: `${project.name} | BT DECOM`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.name} | BT DECOM`,
      description: project.shortDescription,
      type: "article",
      images: ogImage ? [{ url: ogImage, alt: project.name }] : undefined,
    },
  };
}

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
  p: (props) => <p className="mb-4 leading-relaxed text-neutral-700" {...props} />,
  h1: (props) => <h1 className="text-3xl font-bold mt-8 mb-4 text-brand-dark" {...props} />,
  h2: (props) => <h2 className="text-2xl font-bold mt-8 mb-4 text-brand-dark" {...props} />,
  h3: (props) => <h3 className="text-xl font-bold mt-6 mb-3 text-brand-dark" {...props} />,
  ul: (props) => <ul className="space-y-3 mb-6" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-neutral-700" {...props} />,
  li: (props) => (
    <li className="flex gap-3 items-start">
      <CheckCircle2 size={18} className="text-brand-primary mt-1 shrink-0" />
      <span>{props.children}</span>
    </li>
  ),
  a: (props) => <a className="text-brand-primary hover:underline" {...props} />,
  strong: (props) => <strong className="font-semibold text-brand-dark" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-4 border-brand-primary pl-6 italic text-neutral-600 bg-brand-light/60 py-4 px-2 rounded-r-xl my-6" {...props} />
  ),
};

export default async function ProjectDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const sections = splitMarkdownSections(project.description);
  const galleryImages = project.gallery ?? [];

  // Decide which images go where
  const heroImage = galleryImages[0] ?? project.image;
  // Extra images to intersperse (section 01 never repeats heroImage)
  const extraImages = galleryImages.slice(1);

  const { prev, next } = getAdjacentProjects(project.slug);
  const relatedProjects = getRelatedProjects(project.slug, project.category, 3);

  const infoItems = [
    { icon: <Building size={20} />, label: "Chủ đầu tư", value: project.client },
    { icon: <MapPin size={20} />, label: "Địa điểm", value: project.location },
    { icon: <Layers size={20} />, label: "Quy mô", value: project.area },
    { icon: <Calendar size={20} />, label: "Năm thực hiện", value: project.year },
  ];

  return (
    <>
      <Header />

      <div id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* ═══════════ HERO ═══════════ */}
        <section className="relative h-[min(56svh,440px)] md:h-[min(70vh,560px)] overflow-hidden">
          {/* Background image */}
          <Image
            src={heroImage}
            alt={project.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/40 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end pb-8 md:pb-12">
            <div className="site-container relative z-10">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4 md:mb-6 text-sm font-medium backdrop-blur-sm bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full"
              >
                <ArrowLeft size={16} /> Quay lại danh sách dự án
              </Link>

              <div className="max-w-3xl">
                <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider mb-3 md:mb-4 bg-brand-primary text-white">
                  {CATEGORY_LABELS[project.category] ?? project.categoryLabel}
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white leading-tight">
                  {project.name}
                </h1>
                <p className="text-white/80 mt-3 md:mt-4 text-base md:text-lg max-w-2xl line-clamp-3 md:line-clamp-none">
                  {project.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ INFO BAR ═══════════ */}
        <section className="bg-brand-dark border-t border-white/10">
          <div className="site-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
              {infoItems.map((item, i) => (
                <div key={i} className="bg-brand-dark py-5 md:py-7 px-4 md:px-6 group">
                  <div className="flex items-center gap-2.5 mb-2 text-brand-accent">
                    {item.icon}
                    <span className="text-[13px] uppercase tracking-wider text-white/70 font-medium">
                      {item.label}
                    </span>
                  </div>
                  <div className="text-white font-medium text-sm md:text-base leading-snug">
                    {item.value || "—"}
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
              <section key={idx} className={`${idx > 0 ? "border-t border-neutral-100" : ""}`}>
                {/* If we have an image for this section, show editorial layout */}
                {imageForSection ? (
                  <div className="site-container py-12 md:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                      {/* Text side */}
                      <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                        {/* Section number + heading */}
                        <div className="flex items-center gap-4 mb-5">
                          <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-sm font-heading">
                            {String(idx + 1).padStart(2, "0")}
                          </div>
                          <div className="h-px flex-1 bg-gradient-to-r from-brand-primary/20 to-transparent" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold font-heading text-brand-dark mb-5 leading-tight">
                          {section.heading}
                        </h2>
                        <div className="text-neutral-600 text-[16px] leading-relaxed">
                          <ReactMarkdown components={mdComponents}>
                            {section.body.trim()}
                          </ReactMarkdown>
                        </div>
                      </div>

                      {/* Image side */}
                      <div className={isEven ? "lg:order-2" : "lg:order-1"}>
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-neutral-100">
                          <Image
                            src={imageForSection}
                            alt={`${project.name} – ảnh ${idx + 2}`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Text-only section */
                  <div className="site-container py-12 md:py-16">
                    <div className="max-w-3xl mx-auto">
                      {/* Section number + heading */}
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-sm font-heading">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-brand-primary/20 to-transparent" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold font-heading text-brand-dark mb-5 leading-tight">
                        {section.heading}
                      </h2>
                      <div className="text-neutral-600 text-[16px] leading-relaxed">
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
            <section className="border-t border-neutral-100">
              <div className="site-container py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {extraImages.slice(sections.length).map((img, i) => (
                    <div key={i} className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md bg-neutral-100">
                      <Image
                        src={img}
                        alt={`${project.name} – ảnh ${sections.length + i + 2}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </article>

        {/* ═══════════ ADJACENT NAVIGATION ═══════════ */}
        {(prev || next) && (
          <nav aria-label="Điều hướng dự án" className="border-t border-neutral-200/80 bg-neutral-50/50 py-8 md:py-10">
            <div className="site-container">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prev ? (
                  <Link
                    href={`/projects/${prev.slug}`}
                    prefetch={false}
                    aria-label={`Dự án trước: ${prev.name}`}
                    className="group flex items-center gap-4 p-4 md:p-5 rounded-xl border border-neutral-200/80 hover:border-brand-primary/40 bg-white hover:bg-brand-light transition-all shadow-xs"
                  >
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-600 group-hover:bg-brand-primary group-hover:text-white transition-colors shrink-0">
                      <ArrowLeft size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold block mb-0.5">
                        Dự án trước
                      </span>
                      <span className="text-sm md:text-base font-semibold text-neutral-900 group-hover:text-brand-primary transition-colors line-clamp-1">
                        {prev.name}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {next ? (
                  <Link
                    href={`/projects/${next.slug}`}
                    prefetch={false}
                    aria-label={`Dự án sau: ${next.name}`}
                    className="group flex items-center justify-end text-right gap-4 p-4 md:p-5 rounded-xl border border-neutral-200/80 hover:border-brand-primary/40 bg-white hover:bg-brand-light transition-all shadow-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold block mb-0.5">
                        Dự án sau
                      </span>
                      <span className="text-sm md:text-base font-semibold text-neutral-900 group-hover:text-brand-primary transition-colors line-clamp-1">
                        {next.name}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-600 group-hover:bg-brand-primary group-hover:text-white transition-colors shrink-0">
                      <ArrowRight size={18} />
                    </div>
                  </Link>
                ) : (
                  <div className="hidden sm:block" />
                )}
              </div>
            </div>
          </nav>
        )}

        {/* ═══════════ RELATED PROJECTS ═══════════ */}
        {relatedProjects.length > 0 && (
          <section
            className="home-section bg-brand-light border-t border-neutral-200/80"
            aria-labelledby="related-projects-heading"
          >
            <div className="site-container">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-primary block mb-2">
                    Khám phá thêm
                  </span>
                  <h2
                    id="related-projects-heading"
                    className="text-2xl md:text-3xl font-bold font-heading text-neutral-900"
                  >
                    Dự án cùng lĩnh vực
                  </h2>
                </div>
                <Link
                  href={`/projects?cat=${project.category}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-gold-dark transition-colors"
                >
                  Xem tất cả dự án
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((item) => (
                  <ProjectCard key={item.id} project={item} />
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection />
      </div>

      <Footer />
    </>
  );
}
