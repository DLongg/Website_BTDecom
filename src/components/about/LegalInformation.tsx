import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { legalProfile } from "@/data/about";
import { AboutSectionHeading } from "./AboutSectionHeading";

export function LegalInformation() {
  return (
    <section id="company-overview" className="home-section scroll-mt-24 bg-white" aria-labelledby="overview-heading">
      <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 lg:aspect-[4/5]">
          <Image src="/images/home/thi-cong-co-dien.jpg" alt="Lắp đặt hệ thống đường ống cơ điện tại công trình" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        </div>
        <div>
          <AboutSectionHeading id="overview-heading" eyebrow="Tổng quan doanh nghiệp" title="Nền tảng cho những công trình bền vững" />
          <p className="text-base leading-relaxed text-gray-600">Thành lập ngày 25/12/2012 tại Hà Nội, BT DECOM hoạt động trong lĩnh vực xây lắp và thương mại kỹ thuật. Các lĩnh vực thi công gồm xây dựng dân dụng và công nghiệp, hệ thống cơ điện (MEP), trạm biến áp và đường dây trung thế.</p>
          <p className="mt-4 text-base leading-relaxed text-gray-600">Đội ngũ chuyên môn, các đội xây lắp trực tiếp và hệ thống thiết bị đồng bộ là nền tảng để chúng tôi triển khai công việc từ khảo sát, tổ chức thi công đến bàn giao.</p>
          <dl className="mt-7 grid gap-x-6 gap-y-5 border-y border-gray-200 py-6 sm:grid-cols-2">
            {legalProfile.map((item) => (
              <div key={item.label}>
                <dt className="text-sm text-gray-500">{item.label}</dt>
                <dd className="mt-1 text-base font-semibold leading-relaxed text-brand-dark">{item.value}</dd>
              </div>
            ))}
          </dl>
          <Link href="/services" className="text-link mt-6">Khám phá lĩnh vực hoạt động <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
