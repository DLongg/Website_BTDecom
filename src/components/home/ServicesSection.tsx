import Link from "next/link";
import { ArrowRight, ClipboardCheck, HardHat, Map, Zap, type LucideIcon } from "lucide-react";
import { services } from "@/data/services";
import { homepageServices } from "@/data/homepage";

const icons: Record<string, LucideIcon> = { Zap, HardHat, Map, ClipboardCheck };

export function ServicesSection() {
  return (
    <section className="home-section bg-white" aria-labelledby="services-heading">
      <div className="site-container">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h2 id="services-heading" className="home-heading">Lĩnh vực hoạt động</h2>
            <p className="mt-4 max-w-xl text-gray-600 leading-relaxed">Từ nguồn điện đến hệ thống cơ điện, BT DECOM triển khai các hạng mục kỹ thuật cho công trình dân dụng và hạ tầng.</p>
          </div>
          <Link href="/services" className="text-link self-start md:self-auto shrink-0">Tất cả dịch vụ <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
        <div className="mt-8 grid gap-x-12 md:mt-10 md:grid-cols-2">
          {services.slice(0, 4).map(service => {
            const Icon = icons[service.icon] || Zap;
            const summary = homepageServices[service.slug];
            return (
              <Link href={`/services/${service.slug}`} key={service.id} className="group flex gap-4 border-t border-gray-200 py-6 sm:py-8">
                <Icon size={25} strokeWidth={1.7} className="shrink-0 text-brand-primary mt-1" aria-hidden="true" />
                <div>
                  <h3 className="text-lg md:text-xl font-semibold font-heading tracking-tight group-hover:text-brand-primary transition-colors">{summary?.name || service.name}</h3>
                  <p className="mt-3 max-w-lg text-gray-600 leading-relaxed">{summary?.description || service.shortDescription}</p>
                  <span className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-sm text-brand-primary">Xem chi tiết <ArrowRight size={16} aria-hidden="true" /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
