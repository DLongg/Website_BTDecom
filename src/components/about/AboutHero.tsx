import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-brand-dark pt-28 pb-20 text-white sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-28" aria-labelledby="about-heading">
      <Image src="/images/about/about-hero-construction.jpg" alt="Công trường xây dựng với hệ thống cần cẩu" fill preload sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand-dark/30" />
      <div className="site-container relative">
        <div className="max-w-2xl">
          <h1 id="about-heading" className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">Về chúng tôi</h1>
          <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-white sm:text-lg">Công ty TNHH Xây lắp và Phát triển Thương mại BT</p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-200">Đồng hành cùng khách hàng trong thi công xây dựng, hệ thống cơ điện (MEP), trạm biến áp và hạ tầng kỹ thuật.</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#company-overview" className="primary-link">Tìm hiểu về BT DECOM <ArrowRight size={18} aria-hidden="true" /></a>
            <Link href="/projects" className="inline-flex min-h-11 items-center gap-2 font-medium hover:text-emerald-300">Xem dự án tiêu biểu <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
