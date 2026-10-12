import { getAllProjects } from "@/lib/projects";
import { selectFeaturedProjects, type FeaturedProject } from "@/data/homepage";
import { ProjectsSectionClient } from "./ProjectsSectionClient";

export function ProjectsSection({ projects }: { projects?: FeaturedProject[] }) {
  const featured = projects ?? selectFeaturedProjects(getAllProjects());
  return <ProjectsSectionClient projects={featured} />;
}
