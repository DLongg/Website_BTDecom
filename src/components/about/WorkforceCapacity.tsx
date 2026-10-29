"use client";

import { 
  workforceOverview, 
  workforceSpecialists, 
  workforceTechnicalWorkers 
} from "@/data/about";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { 
  GraduationCap, 
  Award, 
  HardHat, 
  CheckCircle2, 
  Briefcase,
} from "lucide-react";

import { AboutSectionHeading } from "./AboutSectionHeading";

export function WorkforceCapacity() {
  const accordionItems: AccordionItem[] = [
    {
      id: "specialists",
      title: "Chi tiết Cán bộ chuyên môn",
      countBadge: "28 người",
      icon: <Briefcase size={18} />,
      content: (
        <div className="space-y-4">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 text-xs sm:text-sm">
            <span className="font-semibold text-emerald-950">
              Đội ngũ quản lý dự án, kỹ sư thiết kế và chuyên viên nghiệp vụ
            </span>
            <span className="font-bold text-brand-gold">Tổng: 28 nhân sự</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {workforceSpecialists.map((role, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50/90 border border-gray-100 hover:border-emerald-200 hover:bg-white transition-all text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-gold shrink-0" />
                  <span className="text-gray-700 font-medium">{role.name}</span>
                </div>
                <span className="font-bold font-heading text-brand-dark bg-white px-2 py-0.5 rounded-md border border-gray-200 shrink-0 ml-2">
                  {role.count}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 italic pt-1">
            * 100% cán bộ tốt nghiệp các trường Đại học/Học viện uy tín (Bách Khoa, Xây Dựng, Kinh Tế Quốc Dân, Luật...).
          </p>
        </div>
      ),
    },
    {
      id: "technicians",
      title: "Chi tiết Công nhân kỹ thuật lành nghề",
      countBadge: "54 người",
      icon: <HardHat size={18} />,
      content: (
        <div className="space-y-4">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 text-xs sm:text-sm">
            <span className="font-semibold text-emerald-950">
              Đội ngũ trực tiếp thi công, thâm niên cao từ bậc 3/7 đến bậc 6/7
            </span>
            <span className="font-bold text-brand-gold">Tổng: 54 công nhân</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {workforceTechnicalWorkers.map((role, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50/90 border border-gray-100 hover:border-emerald-200 hover:bg-white transition-all text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-gray-700 font-medium">{role.name}</span>
                </div>
                <span className="font-bold font-heading text-brand-dark bg-white px-2 py-0.5 rounded-md border border-gray-200 shrink-0 ml-2">
                  {role.count}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center gap-2 text-xs text-gray-600">
            <CheckCircle2 size={16} className="text-brand-gold shrink-0" />
            <span>Toàn bộ công nhân được đào tạo định kỳ về An toàn lao động, Phòng cháy chữa cháy và Kỹ thuật cao áp.</span>
          </div>
        </div>
      ),
    }
  ];

  return (
    <section aria-labelledby="workforce-heading" className="home-section bg-gray-50/60 border-t border-gray-100">
      <div className="site-container">
        
        <AboutSectionHeading id="workforce-heading" eyebrow="Đội ngũ thi công" title="Năng lực nhân sự" description="82 nhân sự gồm 28 cán bộ chuyên môn và 54 công nhân kỹ thuật, phối hợp từ quản lý dự án đến thi công tại công trường." />

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {workforceOverview.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white border border-gray-200/80 hover:border-emerald-300 rounded-2xl p-5 sm:p-6 text-center shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                {idx === 0 && <Briefcase size={22} />}
                {idx === 1 && <HardHat size={22} />}
                {idx === 2 && <GraduationCap size={22} />}
                {idx === 3 && <Award size={22} />}
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-gold tracking-tight mb-1">
                {item.count}
              </div>
              <div className="text-xs sm:text-sm font-bold text-gray-800 font-heading mb-1">
                {item.label}
              </div>
              <div className="text-[11px] sm:text-xs text-gray-500">
                {item.sub}
              </div>
            </div>
          ))}
        </div>

        {/* 2 Detailed Accordions */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-600 px-1">
            <span className="font-semibold text-gray-800">Bảng phân bổ chi tiết chuyên môn:</span>
            <span className="text-gray-500">Nhấn vào từng nhóm để xem chi tiết</span>
          </div>
          <Accordion items={accordionItems} defaultOpenIndex={null} />
        </div>

      </div>
    </section>
  );
}
