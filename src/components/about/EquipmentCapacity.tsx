import Image from "next/image";
import { featuredEquipment } from "@/data/about";
import { EquipmentModal } from "@/components/ui/EquipmentModal";
import { Shield, CheckCircle2, Truck } from "lucide-react";

import { AboutSectionHeading } from "./AboutSectionHeading";

export function EquipmentCapacity() {
  return (
    <section aria-labelledby="equipment-heading" className="home-section bg-white">
      <div className="site-container">
        
        <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <AboutSectionHeading id="equipment-heading" eyebrow="Thiết bị thi công và đo kiểm" title="Năng lực máy móc, thiết bị" description="Hơn 50 đầu thiết bị thi công xây lắp và máy đo kiểm cao áp chuyên dụng, tập kết tại Hà Nội và sẵn sàng điều động." />
          </div>
          <div className="shrink-0 lg:pb-10"><EquipmentModal /></div>
        </div>

        {/* 6 Featured Equipment Cards - Grid 3 cols x 2 rows on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredEquipment.map((item) => (
            <div 
              key={item.id}
              className="group bg-white rounded-2xl border border-gray-200/80 hover:border-emerald-300 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image Container with 4:3 Aspect Ratio */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                {item.id === "crane-boom-12t5" ? (
                  <div className="flex h-full flex-col items-center justify-center gap-3 bg-emerald-50 text-brand-primary" aria-label="Minh họa phương tiện vận tải">
                    <Truck size={64} strokeWidth={1.25} aria-hidden="true" />
                    <span className="font-heading text-2xl font-semibold">12,5 tấn</span>
                  </div>
                ) : <Image
                  src={item.image} 
                  alt={item.name}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3 bg-brand-dark/85 backdrop-blur-md text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">
                  {item.category}
                </div>

                {/* Ready Status Badge */}
                <div className="absolute bottom-3 right-3 bg-emerald-600/90 text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-sm">
                  <CheckCircle2 size={12} />
                  <span>Sẵn sàng cơ động</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold font-heading text-brand-dark group-hover:text-brand-gold transition-colors mb-1.5">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {item.specs}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span>Kiểm định định kỳ</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Shield size={13} /> Đạt chuẩn an toàn
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
