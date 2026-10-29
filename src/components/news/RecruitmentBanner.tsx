"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

interface RecruitmentBannerProps {
  onSelectRecruitment?: () => void;
  className?: string;
}

export function RecruitmentBanner({
  onSelectRecruitment,
  className = "",
}: RecruitmentBannerProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onSelectRecruitment) {
      e.preventDefault();
      onSelectRecruitment();
    }
  };

  return (
    <section
      data-recruitment-banner="true"
      aria-label="Chuyên mục Tuyển dụng BT DECOM"
      className={`recruitment-banner relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A2332] via-[#1E293B] to-[#0F172A] text-white border border-gray-800 shadow-lg ${className}`}
    >
      {/* Background decoration & overlay image */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <Image
          src="/images/news-web/recruitment/team-photo.webp"
          alt="Đội ngũ kỹ sư và công nhân BT DECOM"
          fill
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="object-cover object-center filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2332] via-[#1A2332]/90 to-transparent" />
      </div>

      <div className="relative z-10 px-5 sm:px-8 py-7 sm:py-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left Information */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15803D]/25 border border-[#4ADE80]/30 text-[#4ADE80] text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={13} className="text-[#4ADE80]" />
            <span>Cơ hội nghề nghiệp hấp dẫn</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading text-white tracking-tight leading-snug">
            Gia nhập đội ngũ BT DECOM — Người thật – Việc thật
          </h2>

          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            Tuyển dụng trực tiếp 17 chỉ tiêu (Kỹ sư Điện, Thợ Điện Nước, KS Cấp thoát nước, CN Kỹ thuật & Thời vụ). Cam kết 100% trả lương đúng hạn, không qua trung gian, việc làm ổn định quanh năm tại Hà Nội.
          </p>

          {/* Key tags */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs text-gray-200">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#4ADE80]" />
              <span>Không qua trung gian</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#4ADE80]" />
              <span>Cam kết 100% trả lương đúng hạn</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users size={14} className="text-[#4ADE80]" />
              <span>Hỗ trợ ứng lương hàng tuần</span>
            </span>
          </div>
        </div>

        {/* Right CTA Button (WCAG min-h-[44px]) */}
        <div className="flex-shrink-0 w-full sm:w-auto">
          <Link
            href="/news?category=Tuyển dụng"
            onClick={handleClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 min-h-[44px] rounded-xl bg-[#15803D] hover:bg-[#166534] active:translate-y-px text-white text-sm sm:text-base font-semibold shadow-md transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:ring-offset-2 focus:ring-offset-[#1A2332]"
          >
            <span>Khám phá Chuyên mục Tuyển dụng</span>
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default RecruitmentBanner;
