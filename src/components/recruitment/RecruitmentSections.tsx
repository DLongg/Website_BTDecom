import Image from "next/image";
import {
  Briefcase,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { benefitItems, pressArticles, recruitmentImages } from "@/data/recruitment";

const benefitIcons: Record<string, LucideIcon> = {
  Wallet,
  TrendingUp,
  Briefcase,
  ShieldCheck,
  Users,
  GraduationCap,
};

/** Dữ liệu gốc viết Title Case ("Lương Sòng Phẳng"); hiển thị theo sentence case của quy chuẩn. */
function toSentenceCase(text: string) {
  const lower = text.toLocaleLowerCase("vi");
  return lower.charAt(0).toLocaleUpperCase("vi") + lower.slice(1);
}

export function RecruitmentBenefits() {
  return (
    <section aria-labelledby="benefits-heading" className="home-section bg-brand-light">
      <div className="site-container grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <div>
          <h2 id="benefits-heading" className="home-heading text-brand-dark">Quyền lợi khi làm việc tại BT DECOM</h2>
          <p className="mt-3 text-lg leading-relaxed text-gray-600">
            Áp dụng cho mọi vị trí, từ kỹ sư đến công nhân thời vụ.
          </p>
        </div>
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {benefitItems.map((benefit) => {
            const Icon = benefitIcons[benefit.iconName] ?? CheckCircle2;
            return (
              <li key={benefit.id} data-benefit-item={benefit.id} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-white text-brand-primary">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-brand-dark">{toSentenceCase(benefit.title)}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-gray-600">{benefit.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function RecruitmentPress() {
  return (
    <section aria-labelledby="press-heading" className="home-section bg-white">
      <div className="site-container">
        <div className="max-w-2xl">
          <h2 id="press-heading" className="home-heading text-brand-dark">Báo Lao Động đưa tin</h2>
          <p className="mt-3 text-lg leading-relaxed text-gray-600">
            Phóng viên Báo Lao Động ghi nhận các đợt tuyển dụng công khai của BT DECOM tại Hà Nội.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          {pressArticles.map((article) => (
            <article key={article.id} className="flex flex-col">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-5 text-sm text-gray-600">
                {article.newspaper}, {article.publishedAt.replace(/\s*\(GMT\+7\)/, "")}
              </p>
              <h3 className="mt-2 text-xl font-semibold leading-snug text-brand-dark">{article.title}</h3>
              <blockquote className="mt-4 border-l-2 border-brand-primary pl-4 text-base leading-relaxed text-gray-700">
                <p className="line-clamp-4">{article.excerpt}</p>
              </blockquote>
              <a
                href={article.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link mt-4 self-start"
              >
                Đọc bài gốc trên Báo Lao Động
                <ExternalLink size={16} aria-hidden="true" />
                <span className="sr-only"> (mở trong tab mới)</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RecruitmentGallery() {
  return (
    <section aria-labelledby="gallery-heading" className="home-section border-t border-gray-200 bg-white">
      <div className="site-container">
        <div className="max-w-2xl">
          <h2 id="gallery-heading" className="home-heading text-brand-dark">Đội ngũ và công trường</h2>
          <p className="mt-3 text-lg leading-relaxed text-gray-600">
            Ảnh chụp thực tế tại các buổi tuyển dụng và công trình của BT DECOM.
          </p>
        </div>

        {/* Bố cục masonry bằng CSS columns, giữ đúng tỉ lệ ảnh ngang/dọc */}
        <div className="mt-10 gap-6 sm:columns-2 lg:columns-3">
          {recruitmentImages.map((img) => (
            <figure key={img.id} className="mb-6 break-inside-avoid">
              <div
                className={`relative overflow-hidden rounded-xl bg-gray-100 ${
                  img.orientation === "landscape" ? "aspect-[4/3]" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm leading-relaxed text-gray-600">{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
