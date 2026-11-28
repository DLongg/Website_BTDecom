import { Mail, MessageSquare, Phone } from "lucide-react";
import { recruitmentContact } from "@/data/recruitment";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

interface ApplyActionsProps {
  /** Nền phía sau cụm nút: sáng (trắng/xám nhạt) hoặc tối (brand-dark). */
  tone?: Tone;
  /** Tên vị trí, dùng cho aria-label để trình đọc màn hình biết đang ứng tuyển vị trí nào. */
  jobTitle?: string;
  showEmail?: boolean;
  className?: string;
}

export function ApplyActions({ tone = "light", jobTitle, showEmail = true, className }: ApplyActionsProps) {
  const suffix = jobTitle ? ` vị trí ${jobTitle}` : "";
  const dark = tone === "dark";

  return (
    <div className={cn("flex flex-wrap items-center gap-x-5 gap-y-3", className)}>
      <a
        href={recruitmentContact.phoneHref}
        aria-label={`Gọi ${recruitmentContact.phone} để ứng tuyển${suffix}`}
        className="primary-link"
      >
        <Phone size={18} aria-hidden="true" />
        Gọi {recruitmentContact.phone}
      </a>
      <a
        href={recruitmentContact.zaloHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Nhắn Zalo ứng tuyển${suffix} (mở trong tab mới)`}
        className={cn(
          "inline-flex min-h-11 items-center justify-center gap-2.5 rounded-lg border px-5 py-3 font-semibold transition-colors active:translate-y-px",
          dark
            ? "border-white/40 text-white hover:border-white hover:bg-white/10"
            : "border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
        )}
      >
        <MessageSquare size={18} aria-hidden="true" />
        Nhắn Zalo
      </a>
      {showEmail && (
        <a
          href={recruitmentContact.emailHref}
          aria-label={`Gửi email ứng tuyển${suffix}`}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 font-semibold hover:underline underline-offset-4",
            dark ? "text-brand-accent" : "text-brand-primary"
          )}
        >
          <Mail size={18} aria-hidden="true" />
          Gửi email
        </a>
      )}
    </div>
  );
}
