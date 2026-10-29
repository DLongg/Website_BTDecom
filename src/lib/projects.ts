import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project, ProjectCategory, ProjectStats } from "@/types";

const projectsDirectory = path.join(process.cwd(), "src/content/projects");

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  lighting: "Chiếu sáng",
  substation: "Trạm biến áp & lưới điện",
  electrical: "Hệ thống điện",
  me: "Cơ điện M&E",
};

function sanitizeStem(filename: string): string {
  const name = path.parse(filename).name;
  return name.trim().replace(/\s+/g, "-");
}

export function getProjectSlugs() {
  if (!fs.existsSync(projectsDirectory)) return [];
  return fs.readdirSync(projectsDirectory);
}

export function getProjectBySlug(slug: string): Project | null {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(projectsDirectory, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const category = data.category as ProjectCategory;
  const categoryLabel = CATEGORY_LABELS[category] ?? (data.categoryLabel || "");

  // Parse year and status
  const rawYear = data.year ? String(data.year) : "";
  let yearNumber: string | undefined = undefined;
  let status: string | undefined = undefined;

  const yearMatch = rawYear.match(/^(\d{4}(?:\s*[-–—]\s*\d{4})?)\s*(?:[-–—·]\s*(.+))?$/);
  if (yearMatch) {
    yearNumber = yearMatch[1].trim();
    if (yearMatch[2]) {
      status = yearMatch[2].trim();
    }
  } else {
    const digitsMatch = rawYear.match(/\d{4}/);
    if (digitsMatch) {
      yearNumber = digitsMatch[0];
    }
  }

  // WebP resolution
  const webDir = path.join(process.cwd(), "public/images/projects-web", realSlug);
  const origDir = path.join(process.cwd(), "public/images/projects", realSlug);

  let cardImage: string | undefined = undefined;
  let gallery: string[] = (data.gallery as string[]) || [];
  let image: string = (data.image as string) || "";

  let hasWebP = false;
  if (fs.existsSync(webDir)) {
    let cardFiles: string[] = [];
    let fullFiles: string[] = [];

    if (fs.existsSync(origDir)) {
      const origFiles = fs.readdirSync(origDir)
        .filter((f) => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

      for (const origFile of origFiles) {
        const stem = sanitizeStem(origFile);
        const cardCandidate = `${stem}-card.webp`;
        const fullCandidate = `${stem}-full.webp`;
        if (fs.existsSync(path.join(webDir, cardCandidate))) {
          cardFiles.push(cardCandidate);
        }
        if (fs.existsSync(path.join(webDir, fullCandidate))) {
          fullFiles.push(fullCandidate);
        }
      }
    }

    if (cardFiles.length === 0 || fullFiles.length === 0) {
      const webFiles = fs.readdirSync(webDir);
      cardFiles = webFiles
        .filter((f) => f.endsWith("-card.webp"))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
      fullFiles = webFiles
        .filter((f) => f.endsWith("-full.webp"))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    }

    if (cardFiles.length > 0 && fullFiles.length > 0) {
      hasWebP = true;
      cardImage = `/images/projects-web/${realSlug}/${cardFiles[0]}`;
      gallery = fullFiles.map((f) => `/images/projects-web/${realSlug}/${f}`);
      image = cardImage;
    }
  }

  if (!hasWebP) {
    if (fs.existsSync(origDir)) {
      const origFiles = fs.readdirSync(origDir)
        .filter((f) => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
      if (origFiles.length > 0) {
        gallery = origFiles.map((f) => `/images/projects/${realSlug}/${f}`);
      }
    }

    if (gallery.length > 0 && fs.existsSync(origDir)) {
      image = gallery[0];
    } else if (!image && gallery.length > 0) {
      image = gallery[0];
    }
    cardImage = image;
  }

  return {
    ...data,
    id: String(data.id),
    slug: realSlug,
    category,
    categoryLabel,
    description: content,
    gallery,
    image,
    cardImage,
    year: rawYear,
    yearNumber,
    status,
  } as Project;
}

export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => project !== null);

  // Sort projects by ID
  return projects.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
}

export const projectCategories = [
  { value: "all", label: "Tất cả dự án" },
  { value: "lighting", label: CATEGORY_LABELS.lighting },
  { value: "substation", label: CATEGORY_LABELS.substation },
  { value: "electrical", label: CATEGORY_LABELS.electrical },
  { value: "me", label: CATEGORY_LABELS.me },
];

export function getProjectStats(projects?: Project[]): ProjectStats {
  const allProjects = projects ?? getAllProjects();
  const totalProjects = allProjects.length;

  const categoriesSet = new Set(allProjects.map((p) => p.category));
  const totalCategories = categoriesSet.size;

  const years = allProjects
    .map((p) => {
      if (p.yearNumber) {
        const parsed = parseInt(p.yearNumber, 10);
        if (!isNaN(parsed)) return parsed;
      }
      const match = String(p.year).match(/\d{4}/);
      return match ? parseInt(match[0], 10) : null;
    })
    .filter((y): y is number => y !== null);

  const earliestYear = years.length > 0 ? Math.min(...years) : 2013;
  const latestYear = years.length > 0 ? Math.max(...years) : 2021;
  const yearRange = `${earliestYear}\u2013${latestYear}`;

  const counts: Record<ProjectCategory, number> = {
    lighting: 0,
    substation: 0,
    electrical: 0,
    me: 0,
  };

  for (const p of allProjects) {
    if (p.category in counts) {
      counts[p.category]++;
    }
  }

  return {
    totalProjects,
    totalCategories,
    yearRange,
    earliestYear,
    latestYear,
    counts,
  };
}

export function getRelatedProjects(
  currentSlug: string,
  category: ProjectCategory,
  limit: number = 3
): Project[] {
  const all = getAllProjects();
  const others = all.filter((p) => p.slug !== currentSlug);
  const sameCategory = others.filter((p) => p.category === category);

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const diffCategory = others.filter((p) => p.category !== category);
  const needed = limit - sameCategory.length;
  return [...sameCategory, ...diffCategory.slice(0, needed)];
}

export function getAdjacentProjects(currentSlug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const all = getAllProjects();
  const index = all.findIndex((p) => p.slug === currentSlug);

  if (index === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}
