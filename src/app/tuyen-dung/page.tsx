import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RecruitmentHero } from "@/components/recruitment/RecruitmentHero";
import { JobPositions } from "@/components/recruitment/JobPositions";
import {
  RecruitmentBenefits,
  RecruitmentGallery,
  RecruitmentPress,
} from "@/components/recruitment/RecruitmentSections";
import { MobileApplyBar, RecruitmentCTA } from "@/components/recruitment/RecruitmentCTA";

export const metadata: Metadata = {
  title: "Tuyển dụng - BT DECOM | Kỹ sư cơ điện & công nhân kỹ thuật tại Hà Nội",
  description:
    "BT DECOM tuyển dụng trực tiếp kỹ sư điện, kỹ sư cấp thoát nước, thợ điện nước và công nhân kỹ thuật tại Hà Nội. Không qua trung gian, trả lương đúng hạn, việc làm ổn định quanh năm.",
  alternates: { canonical: "/tuyen-dung" },
  openGraph: {
    title: "Tuyển dụng - BT DECOM | Tuyển trực tiếp, trả lương đúng hạn",
    description:
      "Các vị trí đang tuyển tại BT DECOM: kỹ sư cơ điện, thợ điện nước, công nhân kỹ thuật. Tuyển dụng trực tiếp, minh bạch.",
    url: "/tuyen-dung",
    siteName: "BT DECOM",
    images: [
      {
        url: "/images/news-web/recruitment/interview.webp",
        alt: "Phiên tuyển dụng BT DECOM",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RecruitmentPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white pb-[76px] text-brand-dark lg:pb-0">
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <RecruitmentHero />
        <JobPositions />
        <RecruitmentBenefits />
        <RecruitmentPress />
        <RecruitmentGallery />
        <RecruitmentCTA />
      </main>

      <Footer />
      <MobileApplyBar />
    </div>
  );
}
