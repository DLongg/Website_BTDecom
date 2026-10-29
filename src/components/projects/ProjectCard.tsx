import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";

export interface ProjectCardProps {
  project: Project;
  className?: string;
  priority?: boolean;
}

export function ProjectCard({ project, className = "", priority = false }: ProjectCardProps) {
  const displayYear = project.yearNumber || project.year;
  const imageSrc = project.cardImage || project.image;

  return (
    <article
      data-project-card
      className={`project-card group bg-white rounded-xl overflow-hidden border border-neutral-200/80 hover:border-brand-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col h-full ${className}`}
    >
      <Link
        href={`/projects/${project.slug}`}
        prefetch={false}
        className="flex flex-col h-full focus:outline-hidden"
      >
        {/* Card Image: 4:3 aspect ratio with lazy loading */}
        <div className="aspect-[4/3] relative overflow-hidden bg-neutral-100">
          <Image
            src={imageSrc}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          {/* Canonical Category Badge */}
          <div className="mb-2.5">
            <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold text-brand-primary bg-brand-light border border-brand-primary/10">
              {project.categoryLabel}
            </span>
          </div>

          {/* Title & Subtle Arrow Icon */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-heading text-lg font-semibold text-brand-dark group-hover:text-brand-primary line-clamp-2 transition-colors leading-snug">
              {project.name}
            </h3>
            <ArrowUpRight
              aria-hidden="true"
              className="w-5 h-5 text-neutral-400 group-hover:text-brand-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-0.5"
            />
          </div>

          {/* Location and Year: 14px, displaying ONLY the year */}
          <div className="text-sm text-neutral-500 flex items-center gap-2 mt-auto pt-3 border-t border-neutral-100">
            {project.location && (
              <span className="truncate">{project.location}</span>
            )}
            {project.location && displayYear && (
              <span className="text-neutral-300" aria-hidden="true">
                ·
              </span>
            )}
            {displayYear && (
              <span className="flex-shrink-0 font-medium">{displayYear}</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ProjectCard;
