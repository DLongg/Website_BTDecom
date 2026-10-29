import type { Project } from "@/types";

export type FeaturedProject = Project & { displayName: string; imageAlt: string };

const featured = [
  {
    slug: "thi-cong-xay-lap-hang-muc-chieu-sang-1",
    displayName: "Cầu vượt Chùa Bộc – Thái Hà",
    image: "/images/home/chua-boc-thai-ha.webp",
    imageAlt: "Cầu vượt Chùa Bộc – Thái Hà với hệ thống đèn và lan can dọc mặt cầu",
  },
  {
    slug: "cap-ngam-24kv-thanh-pho-giao-luu",
    displayName: "Cấp nguồn khu đô thị Thành phố Giao Lưu",
    image: "/images/home/thanh-pho-giao-luu.webp",
    imageAlt: "Toàn cảnh khu đô thị Thành phố Giao Lưu bên hồ nước",
  },
  {
    slug: "cap-thoat-nuoc-truong-koala-house",
    displayName: "Cấp thoát nước trường Koala House",
    image: "/images/home/koala-house.webp",
    imageAlt: "Khuôn viên trường mầm non Koala House với sân chơi ngoài trời",
  },
  {
    slug: "thi-cong-xay-lap-tram-bien-ap-750-kva-may-phat-dien-du-phong-100-kva-va-tuyen-c-6",
    displayName: "Trạm biến áp 750 KVA & cáp ngầm 24KV",
    image: "/images/projects/thi-cong-xay-lap-tram-bien-ap-750-kva-may-phat-dien-du-phong-100-kva-va-tuyen-c-6/1.png",
    imageAlt: "Trạm biến áp 750 KVA và tuyến cáp ngầm 24KV Khu Liên hợp Phụ nữ",
  },
] as const;

// Keep full project records and routes; only the homepage presentation is curated.
export function selectFeaturedProjects(projects: Project[]): FeaturedProject[] {
  return featured.flatMap(item => {
    const project = projects.find(project => project.slug === item.slug);
    return project ? [{ ...project, ...item }] : [];
  });
}

export const homepageServices: Record<string, { name: string; description: string }> = {
  "thi-cong-xay-lap-dien": { name: "Xây lắp điện", description: "Đường dây cao – hạ thế, tuyến cáp ngầm và trạm biến áp." },
  "co-dien-va-tien-ich": { name: "Cơ điện và tiện ích", description: "Hệ thống điện, chiếu sáng, cấp thoát nước, điều hòa và PCCC." },
  "xay-dung-va-ha-tang": { name: "Xây dựng và hạ tầng", description: "Thi công, cải tạo công trình dân dụng, công nghiệp và hạ tầng kỹ thuật." },
  "tu-van-thiet-ke-giam-sat": { name: "Tư vấn, thiết kế và giám sát", description: "Khảo sát hiện trạng, lập phương án kỹ thuật và giám sát thi công." },
};
