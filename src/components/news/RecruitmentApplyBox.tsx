import { contact } from "@/data/contact";
import { PhoneCall, Mail, MessageCircle, Clock, MapPin, ShieldCheck } from "lucide-react";

interface RecruitmentApplyBoxProps {
  articleTitle?: string;
}

export function RecruitmentApplyBox({ articleTitle }: RecruitmentApplyBoxProps) {
  return (
    <section
      data-recruitment-apply-box="true"
      aria-label="Thông tin ứng tuyển trực tiếp"
      className="recruitment-apply-box my-12 rounded-2xl bg-gradient-to-br from-emerald-50 via-brand-light to-white border-2 border-brand-primary/20 p-6 md:p-8 shadow-sm"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck size={14} /> Thông tin ứng tuyển trực tiếp
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-heading text-brand-dark">
            Gia nhập Đội ngũ Xây lắp BT DECOM
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {articleTitle ? `Đăng ký ứng tuyển cho: ${articleTitle}` : "Cơ hội làm việc trực tiếp, không qua trung gian môi giới."}
          </p>
        </div>

        {/* Commitment Badge */}
        <div className="bg-white px-4 py-2.5 rounded-xl border border-emerald-100 shadow-xs shrink-0">
          <div className="text-xs font-semibold text-emerald-800">Cam kết người thật – việc thật</div>
          <div className="text-[11px] text-gray-500">100% trả lương đúng hạn, hỗ trợ ứng hàng tuần</div>
        </div>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        {/* Call Hotline */}
        <a
          href={contact.phoneHref}
          className="flex items-center justify-center gap-2.5 px-4 py-3.5 min-h-[48px] rounded-xl bg-brand-primary hover:bg-brand-gold-dark text-white font-semibold text-sm shadow-xs hover:shadow-md transition-all duration-200 text-center"
        >
          <PhoneCall size={18} className="shrink-0" />
          <span>Hotline: {contact.phone}</span>
        </a>

        {/* Zalo Direct Chat */}
        <a
          href="https://zalo.me/0936189292"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nhắn tin Zalo tuyển dụng: 0936 189 292"
          className="flex items-center justify-center gap-2.5 px-4 py-3.5 min-h-[48px] rounded-xl bg-[#0068FF] hover:bg-[#0054cc] text-white font-semibold text-sm shadow-xs hover:shadow-md transition-all duration-200 text-center"
        >
          <MessageCircle size={18} className="shrink-0" />
          <span>Nhắn tin Zalo</span>
        </a>

        {/* Send Email CV */}
        <a
          href={`${contact.emailHref}?subject=${encodeURIComponent("Ứng tuyển vị trí tại BT DECOM")}`}
          className="flex items-center justify-center gap-2.5 px-4 py-3.5 min-h-[48px] rounded-xl bg-white hover:bg-gray-50 text-brand-dark hover:text-brand-primary font-semibold text-sm border border-gray-300 shadow-xs hover:shadow-md transition-all duration-200 text-center"
        >
          <Mail size={18} className="shrink-0 text-brand-primary" />
          <span>Gửi email: {contact.email}</span>
        </a>
      </div>

      {/* Instructions & Workplace notes */}
      <div className="pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-600">
        <div className="flex items-start gap-2">
          <Clock size={15} className="text-brand-primary shrink-0 mt-0.5" />
          <span><strong>Thời gian tiếp nhận:</strong> Thứ 2 – Thứ 7 (8h00 – 17h30). Hỗ trợ tư vấn giải đáp 24/7 qua Zalo/Hotline.</span>
        </div>
        <div className="flex items-start gap-2">
          <MapPin size={15} className="text-brand-primary shrink-0 mt-0.5" />
          <span><strong>Địa điểm nộp hồ sơ trực tiếp:</strong> {contact.address}</span>
        </div>
      </div>
    </section>
  );
}
