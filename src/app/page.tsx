import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { PartnerSection } from "@/components/home/PartnerSection";
import { NewsSection } from "@/components/home/NewsSection";
import { CTASection } from "@/components/home/CTASection";
import { getAllProjects } from "@/lib/projects";
import { selectFeaturedProjects } from "@/data/homepage";

export default function Home() {
  const projects = getAllProjects();
  const featured = selectFeaturedProjects(projects);
  return (
    <>
      <Header />
      <HeroSection projects={projects.slice(0, 5)} />
      <StatsSection projectCount={projects.length} />
      <ServicesSection />
      <ProjectsSection projects={featured} />
      <AboutSection />
      <NewsSection />
      <PartnerSection />
      <CTASection />
      <Footer />
    </>
  );
}
