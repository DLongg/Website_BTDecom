"use client";

import React from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Wallet,
  Users,
  TrendingUp,
  Briefcase,
  GraduationCap,
  MapPin,
  Clock,
  ExternalLink,
  Award,
  Sparkles,
  Check,
  Building2,
  FileCheck,
} from "lucide-react";
import {
  jobPositions,
  benefitItems,
  pressArticles,
  recruitmentImages,
  recruitmentCommitments,
  recruitmentContact,
  type JobPosition,
  type BenefitItem,
  type PressArticle,
  type RecruitmentImage,
} from "@/data/recruitment";

// Helper for rendering dynamic benefit icons safely
function renderBenefitIcon(iconName: string) {
  const iconProps = { size: 24, className: "text-[#15803D]" };
  switch (iconName) {
    case "Wallet":
      return <Wallet {...iconProps} />;
    case "TrendingUp":
      return <TrendingUp {...iconProps} />;
    case "Briefcase":
      return <Briefcase {...iconProps} />;
    case "ShieldCheck":
      return <ShieldCheck {...iconProps} />;
    case "Users":
      return <Users {...iconProps} />;
    case "GraduationCap":
      return <GraduationCap {...iconProps} />;
    default:
      return <CheckCircle2 {...iconProps} />;
  }
}

// Badge color variants
function getBadgeStyle(badge?: string) {
  switch (badge) {
    case "Hot":
      return "bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20";
    case "Cần Gấp":
      return "bg-amber-50 text-amber-800 border-amber-200 ring-amber-500/20";
    case "Mới":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20";
    case "Thời vụ":
      return "bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 ring-gray-500/20";
  }
}

export function RecruitmentHub() {
  return (
    <div className="w-full space-y-12 sm:space-y-16 pb-12">
      {/* ══════════════════════════════════════════════════════════════════
          1. HEADER COMMITMENT BANNER ("NGƯỜI THẬT – VIỆC THẬT")
      ══════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Cam kết Tuyển dụng BT DECOM"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A2332] via-[#1E293B] to-[#0F172A] text-white p-6 sm:p-10 lg:p-12 border border-gray-800 shadow-xl"
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden">
          <Image
            src="/images/news-web/recruitment/interview.webp"
            alt="Phiên tuyển dụng BT DECOM"
            fill
            sizes="100vw"
            className="object-cover object-center filter blur-xs"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A2332] via-[#1A2332]/95 to-[#0F172A]/80" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-5">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15803D]/30 border border-[#4ADE80]/40 text-[#4ADE80] text-xs sm:text-[13px] font-semibold tracking-wide uppercase">
            <Sparkles size={14} className="text-[#4ADE80]" />
            <span>Chuyên trang Tuyển dụng Chính thức</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-extrabold font-heading text-white leading-tight tracking-tight">
            Người thật – Việc thật: Tuyển dụng trực tiếp & Sòng phẳng tại BT DECOM
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            BT DECOM tuyển dụng trực tiếp đội ngũ kỹ sư cơ điện và công nhân kỹ thuật làm việc tại Hà Nội. Tuyển dụng minh bạch, không qua trung gian môi giới, cam kết 100% trả lương đúng hạn và hỗ trợ ứng lương hàng tuần giúp anh em an tâm gắn bó lâu dài.
          </p>

          {/* 3 Core Commitments Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 pt-3">
            {recruitmentCommitments.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#4ADE80]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#4ADE80] bg-[#15803D]/30 px-2 py-0.5 rounded-md">
                      {item.tag}
                    </span>
                    <ShieldCheck size={18} className="text-[#4ADE80]" />
                  </div>
                  <h3 className="text-base sm:text-[17px] font-bold text-white font-heading mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Key Stats Strip */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-white/10 text-center sm:text-left">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#4ADE80] font-heading">05</div>
              <div className="text-xs text-gray-400 font-medium">Vị trí đang mở tuyển</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#4ADE80] font-heading">17</div>
              <div className="text-xs text-gray-400 font-medium">Chỉ tiêu tại Hà Nội</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#4ADE80] font-heading">100%</div>
              <div className="text-xs text-gray-400 font-medium">Đúng hạn lương & Ứng tuần</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#4ADE80] font-heading">0đ</div>
              <div className="text-xs text-gray-400 font-medium">Chi phí trung gian</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. 5 JOB POSITIONS (WITH 3 DIRECT CONTACT BUTTONS EACH)
      ══════════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="job-positions-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-gray-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#15803D] mb-1 font-heading">
              <Building2 size={14} />
              <span>Nhu cầu nhân lực hiện tại</span>
            </div>
            <h2
              id="job-positions-heading"
              className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 tracking-tight"
            >
              Vị trí tuyển dụng đang mở
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md">
            Tổng cộng 17 chỉ tiêu việc làm xây lắp cơ điện tại Hà Nội. Ứng tuyển nhanh qua Hotline, Zalo hoặc Email trực tiếp.
          </p>
        </div>

        {/* List of 5 Job Cards */}
        <div className="space-y-6">
          {jobPositions.map((job: JobPosition) => (
            <article
              key={job.id}
              data-job-position={job.id}
              data-position={job.id}
              className="job-card recruitment-card rounded-2xl bg-white border border-gray-200/90 shadow-xs hover:shadow-md transition-all duration-300 p-5 sm:p-7 overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-gray-100">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-gray-900">
                      {job.title}
                    </h3>
                    {job.badge && (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ring-1 ${getBadgeStyle(
                          job.badge
                        )}`}
                      >
                        {job.badge}
                      </span>
                    )}
                  </div>

                  {/* Meta pills */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-[13px] text-gray-600">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#15803D]" />
                      <span>{job.location}</span>
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users size={14} className="text-[#15803D]" />
                      <span>Chỉ tiêu: <strong className="text-gray-900 font-semibold">{job.quantity} người</strong></span>
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Wallet size={14} className="text-[#15803D]" />
                      <span>Mức thu nhập: <strong className="text-[#15803D] font-bold">{job.salary}</strong></span>
                    </span>
                  </div>
                </div>

                {/* Direct Action Buttons (Desktop Header / Quick Contact) */}
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={recruitmentContact.phoneHref}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-semibold transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#15803D]/40"
                  >
                    <Phone size={15} />
                    <span>Gọi điện thoại</span>
                  </a>

                  <a
                    href={recruitmentContact.zaloHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Nhắn Zalo ứng tuyển vị trí ${job.title}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  >
                    <MessageSquare size={15} />
                    <span>Nhắn Zalo</span>
                  </a>

                  <a
                    href={recruitmentContact.emailHref}
                    aria-label={`Gửi email ứng tuyển vị trí ${job.title}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    <Mail size={15} />
                    <span>Gửi Email</span>
                  </a>
                </div>
              </div>

              {/* Card Body: 3 Columns (Description, Requirements, Benefits) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5">
                {/* 1. Description */}
                <div className="space-y-2.5">
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900 font-heading flex items-center gap-1.5">
                    <FileCheck size={15} className="text-[#15803D]" />
                    <span>Mô tả công việc</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-[13px] text-gray-700 leading-relaxed">
                    {job.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#15803D] font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Requirements */}
                <div className="space-y-2.5">
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900 font-heading flex items-center gap-1.5">
                    <Award size={15} className="text-[#15803D]" />
                    <span>Yêu cầu ứng viên</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-[13px] text-gray-700 leading-relaxed">
                    {job.requirements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#15803D] font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Benefits */}
                <div className="space-y-2.5">
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900 font-heading flex items-center gap-1.5">
                    <ShieldCheck size={15} className="text-[#15803D]" />
                    <span>Quyền lợi & Đãi ngộ</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-[13px] text-gray-700 leading-relaxed">
                    {job.benefits.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={14} className="text-[#15803D] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. 6 COMPANY BENEFITS & WELFARE COMMITMENTS
      ══════════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="benefits-heading" className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#15803D] font-heading">
            <Award size={14} />
            <span>Chính sách đãi ngộ toàn diện</span>
          </div>
          <h2
            id="benefits-heading"
            className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 tracking-tight"
          >
            Quyền lợi đãi ngộ & Chế độ phúc lợi tại BT DECOM
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Chúng tôi hiểu rằng con người là tài sản quý giá nhất. BT DECOM cam kết mang lại môi trường làm việc sòng phẳng, đãi ngộ thỏa đáng và an toàn tuyệt đối.
          </p>
        </div>

        {/* 6 Benefit Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {benefitItems.map((benefit: BenefitItem) => (
            <div
              key={benefit.id}
              data-benefit-item={benefit.id}
              className="benefit-card welfare-item rounded-2xl bg-white border border-gray-200/80 p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4 text-[#15803D]">
                  {renderBenefitIcon(benefit.iconName)}
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          4. PRESS COVERAGE SECTION (2 LAO DONG NEWSPAPER ARTICLES)
      ══════════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="press-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-gray-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#15803D] mb-1 font-heading">
              <FileCheck size={14} />
              <span>Được cơ quan ngôn luận chính thống ghi nhận</span>
            </div>
            <h2
              id="press-heading"
              className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 tracking-tight"
            >
              Báo Lao Động đưa tin chính thống về BT DECOM
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md">
            Các phóng viên và kênh truyền hình Báo Lao Động trực tiếp ghi nhận thực tế quy trình phỏng vấn, tuyển dụng công khai tại Hà Nội.
          </p>
        </div>

        {/* 2 Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pressArticles.map((article: PressArticle) => (
            <article
              key={article.id}
              className="rounded-2xl bg-white border border-gray-200/90 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Article Image Container */}
                <div className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold bg-[#15803D] text-white shadow-sm">
                      {article.newspaper}
                    </span>
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>Tác giả: <strong className="text-gray-700 font-medium">{article.author}</strong></span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={13} className="text-gray-400" />
                      <span>{article.publishedAt}</span>
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-heading text-gray-900 leading-snug">
                    {article.title}
                  </h3>

                  {/* Verbatim Quote */}
                  <blockquote className="p-3.5 rounded-xl bg-gray-50 border-l-4 border-[#15803D] text-xs sm:text-[13px] text-gray-700 leading-relaxed italic">
                    &ldquo;{article.excerpt}&rdquo;
                  </blockquote>
                </div>
              </div>

              {/* Action Link to Canonical Lao Dong URL */}
              <div className="p-5 sm:p-6 pt-0">
                <a
                  href={article.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-xs sm:text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-700"
                >
                  <span>Đọc bài viết gốc trên Báo Lao Động</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          5. GALLERY SECTION (6 REAL PHOTOS, RESPECTING ASPECT RATIOS)
      ══════════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="gallery-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-gray-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#15803D] mb-1 font-heading">
              <Users size={14} />
              <span>Con người & Công trình</span>
            </div>
            <h2
              id="gallery-heading"
              className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 tracking-tight"
            >
              Thư viện hình ảnh thực tế đội ngũ & thi công
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md">
            Những khoảnh khắc chân thực của kỹ sư, công nhân và hạ tầng cơ điện nước thi công tại công trường BT DECOM.
          </p>
        </div>

        {/* Gallery Grid: Natural aspect ratios (4:3 landscape, 3:4 portrait) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {recruitmentImages.map((img: RecruitmentImage) => {
            const isLandscape = img.orientation === "landscape";
            const aspectClass = isLandscape ? "aspect-[4/3]" : "aspect-[3/4]";

            return (
              <figure
                key={img.id}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Photo container */}
                <div className={`relative w-full overflow-hidden bg-gray-100 ${aspectClass}`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${aspectClass}`}
                  />
                  {/* Subtle Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-black/60 backdrop-blur-xs text-white">
                      {isLandscape ? "Ảnh ngang (4:3)" : "Ảnh dọc (3:4)"}
                    </span>
                  </div>
                </div>

                {/* Caption */}
                <figcaption className="p-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-[13px] font-medium text-gray-800 leading-snug">
                    {img.caption}
                  </p>
                  <span className="text-[11px] text-gray-400 mt-2 block">
                    Ảnh thực tế công trình BT DECOM
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          6. QUICK APPLY & CONTACT SUMMARY BOX (HOTLINE, ZALO, EMAIL)
      ══════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Thông tin liên hệ ứng tuyển trực tiếp"
        className="rounded-3xl bg-gradient-to-br from-[#15803D] to-[#166534] text-white p-6 sm:p-10 shadow-lg text-center sm:text-left flex flex-col lg:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-2 max-w-xl">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
            Phỏng vấn & Đi làm ngay
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Sẵn sàng gia nhập đại gia đình BT DECOM?
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            Liên hệ trực tiếp với Ban Nhân sự ngay hôm nay để nhận việc trong tuần. Tuyệt đối không qua trung gian, cam kết 100% trả lương đúng hạn và hỗ trợ ứng lương hàng tuần.
          </p>
          <div className="text-xs text-emerald-200 pt-1">
            <span>Địa chỉ: {recruitmentContact.address}</span>
          </div>
        </div>

        {/* 3 Large CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
          <a
            href={recruitmentContact.phoneHref}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[44px] rounded-xl bg-white text-[#15803D] hover:bg-gray-100 active:translate-y-px text-sm font-bold shadow-md transition-all cursor-pointer"
          >
            <Phone size={17} />
            <span>Gọi {recruitmentContact.phone}</span>
          </a>

          <a
            href={recruitmentContact.zaloHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nhắn Zalo tuyển dụng BT DECOM"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[44px] rounded-xl bg-[#1A2332] text-white hover:bg-[#0F172A] active:translate-y-px text-sm font-bold shadow-md transition-all cursor-pointer"
          >
            <MessageSquare size={17} />
            <span>Nhắn tin Zalo</span>
          </a>

          <a
            href={recruitmentContact.emailHref}
            aria-label="Gửi email ứng tuyển BT DECOM"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[44px] rounded-xl bg-emerald-800/80 hover:bg-emerald-900 border border-emerald-400/40 text-white text-sm font-bold shadow-md transition-all cursor-pointer"
          >
            <Mail size={17} />
            <span>Gửi Email ứng tuyển</span>
          </a>
        </div>
      </section>
    </div>
  );
}

export default RecruitmentHub;
