import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { FeaturedProject } from "@/data/homepage";

export function ProjectsSectionClient({ projects }: { projects: FeaturedProject[] }) {
  if (projects.length === 0) return null;
  return (
    <section className="home-section bg-brand-light" aria-labelledby="projects-heading">
      <div className="site-container">
        <div className="flex flex-col gap-5 justify-between md:flex-row md:items-end mb-8 md:mb-10">
          <div>
            <h2 id="projects-heading" className="home-heading">Công trình tiêu biểu</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-gray-600">Một số hạng mục chiếu sáng, cấp nguồn và cơ điện trong hồ sơ công trình của BT DECOM.</p>
          </div>
          <Link href="/projects" className="text-link self-start md:self-auto shrink-0">Xem tất cả dự án <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          {projects.map((project, index) => (
            <article key={project.slug} className={index === 0 ? "lg:row-span-2" : ""}>
              <Link href={`/projects/${project.slug}`} className={`group grid gap-4 ${index === 0 ? "" : "sm:grid-cols-[0.85fr_1fr] sm:items-center"}`}>
                <div className={`relative overflow-hidden rounded-lg ${index === 0 ? "aspect-[4/3] lg:aspect-[5/4]" : "aspect-[16/10] sm:aspect-[4/3]"}`}>
                  <Image src={project.image} alt={project.imageAlt} fill sizes={index === 0 ? "(min-width: 1024px) 52vw, 100vw" : "(min-width: 1024px) 24vw, (min-width: 640px) 40vw, 100vw"} className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                </div>
                <div>
                  <p className="text-sm text-brand-primary font-medium">{project.categoryLabel}</p>
                  <h3 className={`mt-2 font-heading font-semibold tracking-tight text-brand-dark group-hover:text-brand-primary transition-colors ${index === 0 ? "text-xl md:text-2xl" : "text-lg md:text-xl"}`}>{project.displayName}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{project.location}</p>
                  {index === 0 && <p className="mt-3 text-gray-600 leading-relaxed max-w-xl">{project.shortDescription}</p>}
                  <span className="mt-3 inline-flex min-h-11 items-center gap-2 text-brand-primary text-sm font-semibold">Xem công trình <ArrowUpRight size={16} aria-hidden="true" /></span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
