import Image from "next/image";
import { bankAccounts } from "@/data/about";
import { CopyButton } from "@/components/ui/CopyButton";
import { Landmark, CreditCard, ShieldCheck } from "lucide-react";

export function BankAccounts() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-100">
            <Landmark size={14} className="text-brand-gold" />
            THANH TOÁN & GIAO DỊCH
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-brand-dark mb-4">
            Thông Tin Tài Khoản Ngân Hàng
          </h2>
          <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full mb-3" />
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            Tài khoản chính thức của BT DECOM phục vụ giao dịch hợp đồng kinh tế và thanh toán dự án.
          </p>
        </div>

        {/* 3 Bank Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {bankAccounts.map((acc, idx) => (
            <div 
              key={idx}
              className="bg-white border border-gray-200/90 hover:border-emerald-300 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Stripe */}
              <div 
                className="absolute top-0 left-0 right-0 h-1.5 opacity-80 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: acc.color }}
              />

              {/* Bank Logo & Name */}
              <div>
                <div className="h-12 mb-5 flex items-center justify-start">
                  <Image 
                    src={acc.logo} 
                    alt={`Logo ${acc.bank}`} 
                    width={170}
                    height={36}
                    className="h-9 w-auto max-w-[170px] object-contain"
                  />
                </div>

                <div className="space-y-1.5 mb-6">
                  <div className="text-xs uppercase font-bold tracking-wider text-gray-400">
                    Chi nhánh giao dịch
                  </div>
                  <div className="text-sm font-semibold text-gray-800">
                    {acc.branch}
                  </div>
                  <div className="text-xs text-gray-500 font-medium pt-0.5">
                    Chủ TK: <span className="font-semibold text-gray-700">CTY TNHH XL & PTTM BT</span>
                  </div>
                </div>
              </div>

              {/* Account Number Box with CopyButton */}
              <div className="bg-gray-50/90 group-hover:bg-emerald-50/40 p-4 rounded-xl border border-gray-200/70 group-hover:border-emerald-200 transition-all flex items-center justify-between gap-3">
                <div className="overflow-hidden">
                  <div className="text-[11px] font-semibold uppercase text-gray-400 mb-0.5 flex items-center gap-1">
                    <CreditCard size={12} />
                    <span>Số tài khoản</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono tracking-wider text-brand-dark group-hover:text-emerald-900 transition-colors">
                    {acc.accountNumber}
                  </div>
                </div>

                {/* Copy Button */}
                <div className="shrink-0">
                  <CopyButton textToCopy={acc.accountNumber} label={`Sao chép số tài khoản ${acc.bank}`} />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Note at bottom */}
        <div className="mt-8 bg-emerald-50/60 border border-emerald-100 rounded-xl p-4 text-center text-xs sm:text-sm text-gray-600 flex items-center justify-center gap-2">
          <ShieldCheck size={16} className="text-brand-gold shrink-0" />
          <span>Vui lòng kiểm tra chính xác thông tin đơn vị thụ hưởng <strong>CÔNG TY TNHH XÂY LẮP VÀ PHÁT TRIỂN THƯƠNG MẠI BT</strong> trước khi chuyển khoản.</span>
        </div>

      </div>
    </section>
  );
}
