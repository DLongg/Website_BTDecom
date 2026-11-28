import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { jobPositions } from "@/data/recruitment";
import { cn } from "@/lib/utils";

interface RecruitmentBannerProps {
  className?: string;
}

/** Khối giới thiệu ngắn trong trang Tin tức, dẫn sang trang Tuyển dụng riêng (/tuyen-dung). */
export function RecruitmentBanner({ className }: RecruitmentBannerProps) {
  const totalQuantity = jobPositions.reduce((sum, job) => sum + job.quantity, 0);

  return (
    <section
      data-recruitment-banner="true"
      aria-labelledby="recruitment-banner-heading"
      className={cn("recruitment-banner relative w-full overflow-hidden rounded-xl bg-brand-dark text-white", className)}
    >
      <Image
        src="/images/news-web/recruitment/team-photo.webp"
        alt=""
        fill
        sizes="(max-width: 1440px) 100vw, 1440px"
        className="object-cover object-center opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/30" aria-hidden="true" />

      <div className="relative flex flex-col items-start justify-between gap-6 px-6 py-8 sm:px-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 id="recruitment-banner-heading" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            BT DECOM đang tuyển {totalQuantity} người
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/80">
            Kỹ sư điện, kỹ sư cấp thoát nước, thợ điện nước và công nhân kỹ thuật tại Hà Nội. Tuyển trực tiếp, không thu phí, trả lương đúng hạn.
          </p>
        </div>

        <Link href="/tuyen-dung" className="primary-link w-full shrink-0 sm:w-auto">
          Xem các vị trí đang tuyển
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export default RecruitmentBanner;
