import { Quote } from "lucide-react";

export function LeadershipMessage() {
  return (
    <section className="bg-emerald-50/60 py-10 sm:py-14" aria-labelledby="leadership-heading">
      <div className="site-container grid gap-6 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
        <div>
          <Quote size={32} className="mb-4 text-brand-primary" aria-hidden="true" />
          <h2 id="leadership-heading" className="text-xl font-semibold leading-snug sm:text-2xl">Thông điệp từ ban lãnh đạo</h2>
          <p className="mt-3 text-sm text-gray-500">Ban lãnh đạo BT DECOM</p>
        </div>
        <blockquote className="border-l-2 border-brand-primary pl-6 text-lg leading-relaxed text-brand-dark sm:pl-8 sm:text-2xl">“Với phương châm lấy <span className="font-semibold text-brand-primary">chất lượng, uy tín và sự hài lòng</span> của khách hàng làm nền tảng phát triển, BT DECOM luôn nỗ lực mang đến những công trình bền vững và an toàn.”</blockquote>
      </div>
    </section>
  );
}
