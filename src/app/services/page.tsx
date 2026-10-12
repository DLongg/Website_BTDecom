"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/home/CTASection";
import { services } from "@/data/services";
import Link from "next/link";
import { ArrowRight, PenTool, Map, Compass, HardHat, ClipboardCheck, Eye, Zap, Flame, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  PenTool, Map, Compass, HardHat, ClipboardCheck, Eye, Zap, Flame,
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <div className="pt-32 pb-20 bg-brand-light">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading 
            title="Dịch Vụ Của BT DECOM" 
            subtitle="Khám phá các giải pháp xây lắp điện và cơ điện toàn diện của chúng tôi."
            alignment="center"
          />
        </div>
      </div>
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || PenTool;
              return (
                <div key={service.id} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex flex-col hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 rounded-xl bg-brand-green/20 flex items-center justify-center text-brand-gold mb-6">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-brand-dark mb-4">{service.name}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{service.shortDescription}</p>
                  <ul className="mb-8 space-y-2">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href={`/services/${service.slug}`} 
                    className="inline-flex items-center gap-2 text-brand-gold font-bold hover:text-brand-dark transition-colors mt-auto"
                  >
                    Xem chi tiết <ArrowRight size={18} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      <CTASection />
      <Footer />
    </>
  );
}
