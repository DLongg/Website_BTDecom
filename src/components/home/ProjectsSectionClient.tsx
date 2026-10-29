import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { FeaturedProject } from "@/data/homepage";

export function ProjectsSectionClient({ projects }: { projects: FeaturedProject[] }) {
  if (projects.length === 0) return null;
  return (
    <section className="home-section bg-brand-light" aria-labelledby="projects-heading">
      <div className="site-container">
        <div className="mb-8 md:mb-10 flex items-center justify-between gap-4">
          <h2 id="projects-heading" className="home-heading">
            Công trình tiêu biểu
          </h2>
          <Link
            href="/projects"
            aria-label="Xem tất cả dự án"
            className="group inline-flex items-center justify-center h-10 sm:h-11 rounded-full bg-white border border-gray-200/90 text-brand-dark hover:border-brand-primary hover:bg-brand-primary hover:text-white shadow-xs hover:shadow-md hover:shadow-brand-primary/20 transition-all duration-300 ease-out shrink-0 px-2.5 sm:px-3 hover:px-4 active:scale-95"
          >
            <span className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ease-out group-hover:max-w-28 group-hover:opacity-100 group-hover:mr-2">
              Tất cả dự án
            </span>
            <ArrowRight
              size={18}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5 shrink-0"
            />
          </Link>
        </div>
        {(() => {
          const [leadProject, ...supportingProjects] = projects;
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-stretch">
              {/* Lead Project - Left Column (7 cols) */}
              <article className="lg:col-span-7 flex flex-col">
                <Link
                  href={`/projects/${leadProject.slug}`}
                  className="group flex flex-col h-full bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 hover:border-brand-primary/40 hover:shadow-lg hover:shadow-brand-dark/5 transition-all duration-300"
                >
                  <div className="relative overflow-hidden rounded-xl aspect-[16/9] bg-gray-100">
                    <Image
                      src={leadProject.image}
                      alt={leadProject.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      priority
                    />
                  </div>
                  <div className="pt-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-brand-primary">
                        {leadProject.categoryLabel}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs text-gray-500">{leadProject.location}</span>
                    </div>
                    <h3 className="mt-2 font-heading text-xl sm:text-2xl font-bold tracking-tight text-brand-dark group-hover:text-brand-primary transition-colors leading-snug">
                      {leadProject.displayName}
                    </h3>
                    {leadProject.shortDescription && (
                      <p className="mt-2.5 text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl line-clamp-2">
                        {leadProject.shortDescription}
                      </p>
                    )}
                    <div className="mt-auto pt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary group-hover:text-brand-gold-dark transition-colors">
                      <span>Xem công trình</span>
                      <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              </article>

              {/* Supporting Projects - Right Column (5 cols) */}
              {supportingProjects.length > 0 && (
                <div className="lg:col-span-5 flex flex-col justify-between gap-3 sm:gap-3.5 lg:gap-3 xl:gap-3.5">
                  {supportingProjects.map((project) => (
                    <article key={project.slug} className="flex-1 flex flex-col">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="group relative flex flex-row gap-3.5 sm:gap-4 h-full bg-white rounded-2xl p-3 sm:p-3.5 lg:p-3 xl:p-3.5 border border-gray-200/80 hover:border-brand-primary/40 hover:shadow-lg hover:shadow-brand-dark/5 transition-all duration-300 items-center"
                      >
                        <div className="relative shrink-0 overflow-hidden rounded-xl w-24 h-24 sm:w-28 sm:h-24 md:w-32 md:h-24 lg:w-24 lg:h-20 xl:w-28 xl:h-24 bg-gray-100">
                          <Image
                            src={project.image}
                            alt={project.imageAlt}
                            fill
                            sizes="(min-width: 1024px) 15vw, (min-width: 640px) 25vw, 100px"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                          />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0 pr-6">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-semibold text-brand-primary">
                              {project.categoryLabel}
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="text-xs text-gray-500 line-clamp-1">{project.location}</span>
                          </div>
                          <h3 className="mt-1 font-heading text-sm sm:text-base font-bold tracking-tight text-brand-dark group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                            {project.displayName}
                          </h3>
                        </div>
                        <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 text-gray-400 group-hover:text-brand-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
                          <ArrowUpRight size={17} aria-hidden="true" />
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </div>
          );
        })()}
      </div>
    </section>
  );
}
