import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export function AboutCTA() {
  return (
    <section className="home-section bg-brand-dark text-white" aria-labelledby="about-contact-heading">
      <div className="site-container flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-medium text-emerald-300">Hợp tác cùng BT DECOM</p>
          <h2 id="about-contact-heading" className="home-heading">Cùng trao đổi về công trình của bạn</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-300">Liên hệ với chúng tôi để trao đổi yêu cầu thi công, giải pháp kỹ thuật và kế hoạch triển khai phù hợp.</p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-3">
          <Link href="/contact" className="primary-link">Liên hệ tư vấn <ArrowRight size={18} aria-hidden="true" /></Link>
          <a href="tel:0936189292" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white hover:text-emerald-300"><Phone size={17} aria-hidden="true" />0936 189 292</a>
        </div>
      </div>
    </section>
  );
}
