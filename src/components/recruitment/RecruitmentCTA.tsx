import { MapPin, MessageSquare, Phone } from "lucide-react";
import { recruitmentContact } from "@/data/recruitment";
import { ApplyActions } from "./ApplyActions";

export function RecruitmentCTA() {
  return (
    <section aria-labelledby="apply-heading" className="home-section bg-brand-dark text-white">
      <div className="site-container grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-end">
        <div>
          <h2 id="apply-heading" className="home-heading text-white">Hẹn phỏng vấn ngay trong tuần</h2>
          <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-white/80">
            Gọi hoặc nhắn Zalo cho Ban Nhân sự, cho biết vị trí bạn muốn ứng tuyển. Chúng tôi sẽ hẹn lịch phỏng vấn trực tiếp tại văn phòng.
          </p>
          <p className="mt-4 flex items-start gap-2 text-base text-white/70">
            <MapPin size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-accent" />
            {recruitmentContact.address}
          </p>
        </div>
        <ApplyActions tone="dark" className="lg:justify-end" />
      </div>
    </section>
  );
}

/** Thanh ứng tuyển cố định dưới đáy màn hình, chỉ hiện trên mobile/tablet. */
export function MobileApplyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a
          href={recruitmentContact.phoneHref}
          aria-label={`Gọi ${recruitmentContact.phone} để ứng tuyển`}
          className="primary-link whitespace-nowrap px-3 text-sm sm:text-base"
        >
          <Phone size={17} aria-hidden="true" className="shrink-0" />
          Gọi ngay
        </a>
        <a
          href={recruitmentContact.zaloHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nhắn Zalo ứng tuyển (mở trong tab mới)"
          className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-brand-primary px-3 py-2.5 text-sm font-semibold text-brand-primary transition-colors active:translate-y-px sm:text-base"
        >
          <MessageSquare size={17} aria-hidden="true" className="shrink-0" />
          Nhắn Zalo
        </a>
      </div>
    </div>
  );
}
