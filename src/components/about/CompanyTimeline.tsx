import { timelineEvents } from "@/data/about";
import { AboutSectionHeading } from "./AboutSectionHeading";

export function CompanyTimeline() {
  return (
    <section id="timeline-anchor" className="home-section scroll-mt-24 border-y border-gray-100 bg-brand-light" aria-labelledby="timeline-heading">
      <div className="site-container">
        <AboutSectionHeading id="timeline-heading" eyebrow="Lịch sử hình thành" title="Hành trình phát triển" description="Những dấu mốc trong quá trình mở rộng lĩnh vực hoạt động và hoàn thiện năng lực thi công của BT DECOM." />
        <ol className="grid gap-0 lg:grid-cols-5">
          {timelineEvents.map((item) => (
            <li key={item.year} className="relative border-l-2 border-emerald-200 pb-8 pl-6 last:pb-0 lg:border-t-2 lg:border-l-0 lg:pt-7 lg:pr-6 lg:pb-0 lg:pl-0">
              <span className="absolute top-1 -left-[7px] h-3 w-3 rounded-full border-2 border-brand-primary bg-white lg:-top-[7px] lg:left-0" aria-hidden="true" />
              <p className="text-lg font-semibold text-brand-primary">{item.year}</p>
              <h3 className="mt-3 text-base font-semibold leading-relaxed">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
