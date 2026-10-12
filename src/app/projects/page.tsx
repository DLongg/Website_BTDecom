import { getAllProjects, projectCategories } from "@/lib/projects";
import { ProjectsClient } from "@/components/projects/ProjectsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dự Án Đã Thực Hiện | BT DECOM",
  description: "Khám phá các dự án tiêu biểu mà BT DECOM đã thực hiện trong lĩnh vực xây lắp, cơ điện, và trạm biến áp.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return <ProjectsClient projects={projects} projectCategories={projectCategories} />;
}
