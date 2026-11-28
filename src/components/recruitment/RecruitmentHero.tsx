import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { jobPositions, recruitmentCommitments } from "@/data/recruitment";
import { ApplyActions } from "./ApplyActions";

export function RecruitmentHero() {
  const totalQuantity = jobPositions.reduce((sum, job) => sum + job.quantity, 0);

  const facts = [
    { value: String(jobPositions.length), label: "vị trí đang tuyển" },
    { value: String(totalQuantity), label: "chỉ tiêu tại Hà Nội" },
    { value: "0đ", label: "phí trung gian" },
    { value: "Hằng tuần", label: "hỗ trợ ứng lương" },
  ];

  return (
    <>
      <section aria-labelledby="recruitment-heading" className="relative overflow-hidden bg-brand-dark text-white">
        <Image
          src="/images/news-web/recruitment/interview.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/40" aria-hidden="true" />

        <div className="site-container relative pt-32 pb-14 md:pt-40 md:pb-20">
          <nav aria-label="Đường dẫn" className="mb-6 text-sm text-white/70">
            <ol className="flex items-center gap-1.5">
              <li><Link href="/" className="hover:text-white">Trang chủ</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li aria-current="page" className="text-white">Tuyển dụng</li>
            </ol>
          </nav>

          <h1
            id="recruitment-heading"
            className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Tuyển dụng trực tiếp, trả lương đúng hạn
          </h1>
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-white/85">
            BT DECOM cần kỹ sư cơ điện, thợ điện nước và công nhân kỹ thuật cho các công trình tại Hà Nội.
            Ban Nhân sự tuyển trực tiếp, không qua môi giới và không thu bất kỳ khoản phí nào.
          </p>

          <ApplyActions tone="dark" showEmail={false} className="mt-8" />

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/15 pt-8 md:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="sr-only">{fact.label}</dt>
                <dd className="font-heading text-3xl font-bold tabular-nums text-brand-accent">{fact.value}</dd>
                <dd className="mt-1 text-sm text-white/75">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-label="Cam kết với người lao động" className="border-b border-gray-200 bg-brand-light">
        <ul className="site-container grid gap-8 py-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-gray-200">
          {recruitmentCommitments.map((item) => (
            <li key={item.id} className="md:px-8 md:first:pl-0 md:last:pr-0">
              <p className="font-heading text-lg font-semibold text-brand-dark">{item.title}</p>
              <p className="mt-2 text-base leading-relaxed text-gray-600">{item.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
