import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { CompanyStats } from "@/components/about/CompanyStats";
import { CompanyTimeline } from "@/components/about/CompanyTimeline";
import { LegalInformation } from "@/components/about/LegalInformation";
import { LeadershipMessage } from "@/components/about/LeadershipMessage";
import { WorkforceCapacity } from "@/components/about/WorkforceCapacity";
import { EquipmentCapacity } from "@/components/about/EquipmentCapacity";
import { OrganizationChart } from "@/components/about/OrganizationChart";
import { BankAccounts } from "@/components/about/BankAccounts";
import { AboutCTA } from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "Giới thiệu - BT DECOM | Hơn 13 Năm Xây Lắp & Phát Triển Thương Mại",
  description: "Tìm hiểu về Công ty TNHH Xây lắp và Phát triển Thương mại BT (BT DECOM) – Hơn 13 năm kinh nghiệm thi công xây dựng, cơ điện MEP, trạm biến áp với 82 nhân sự và hơn 50 đầu máy móc thiết bị hiện đại.",
  openGraph: {
    title: "Về Chúng Tôi - BT DECOM | Năng Lực Xây Lắp & Thương Mại Kỹ Thuật",
    description: "Hồ sơ năng lực công ty BT DECOM: 13+ năm kinh nghiệm, 82 nhân sự chuyên môn, 50+ máy móc cơ giới, 3 đội xây lắp chủ lực.",
    url: "https://btdecom.vn/about",
    siteName: "BT DECOM",
    images: [
      {
        url: "/images/about/about-hero-sunset.jpg",
        width: 1200,
        height: 630,
        alt: "Hồ sơ năng lực BT DECOM",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-brand-gold selection:text-white">
      {/* Global Header */}
      <Header />

      <main className="flex-1">
        {/* Section 01: Hero Banner */}
        <AboutHero />

        {/* Section 02: Company Statistics (Overlapping Hero) */}
        <CompanyStats />

        {/* Section 03: Development Timeline */}
        <CompanyTimeline />

        {/* Section 05: Legal Information & Quick Facts */}
        <LegalInformation />

        {/* Section 06: Leadership Message */}
        <LeadershipMessage />

        {/* Section 07: Workforce Capacity & Accordion */}
        <WorkforceCapacity />

        {/* Section 08: Machinery & Equipment Capacity */}
        <EquipmentCapacity />

        {/* Section 09: Organization Chart (3-tier tree) */}
        <OrganizationChart />

        {/* Section 10: Bank Accounts & Copy Button */}
        <BankAccounts />

        {/* Section 11: Call to Action (CTA) */}
        <AboutCTA />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
