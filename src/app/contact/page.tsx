import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MapPin, Phone, Mail, ArrowUpRight, Users, Banknote } from "lucide-react";
import { contact } from "@/data/contact";

export default function ContactPage() {
  return (
    <>
      <Header />

      {/* Banner */}
      <div className="pt-32 pb-20 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')] bg-cover bg-center" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <SectionHeading
            title="Liên hệ với chúng tôi"
            subtitle="Trao đổi với BT DECOM về nhu cầu xây lắp điện, cơ điện và chiếu sáng của bạn."
            alignment="center"
            className="mb-0"
            light={true}
          />
        </div>
      </div>

      <section className="py-20 bg-brand-light relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold font-heading text-brand-dark mb-6">Thông tin giao dịch chính thức</h2>
              <p className="text-gray-600 mb-10 leading-relaxed">
                <strong className="text-brand-dark block text-lg mb-1">CÔNG TY TNHH XÂY LẮP VÀ PHÁT TRIỂN THƯƠNG MẠI BT</strong>
                <span className="italic block mb-1">BT TRADING DEVELOPMENT AND CONSTRUCTION COMPANY LIMITED</span>
                <span className="block mb-3 font-medium">Tên viết tắt: BT DECOM., LTD</span>
              </p>

              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-gold shrink-0 shadow-sm">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-lg mb-1">Trụ sở chính</h3>
                    <p className="text-gray-600">{contact.address}</p>
                    <p className="text-gray-400 text-sm mt-1">(Ghi chú hồ sơ cũ: Xã Vĩnh Quỳnh, Huyện Thanh Trì)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-gold shrink-0 shadow-sm">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-lg mb-1">Điện thoại / Hotline</h3>
                    <p className="text-brand-gold font-bold text-xl mb-1"><a href={contact.phoneHref}>{contact.phone}</a></p>
                    <p className="text-gray-600">Điện thoại bàn: <a href={contact.landlineHref}>{contact.landline}</a></p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-gold shrink-0 shadow-sm">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-lg mb-1">Email</h3>
                    <p className="text-gray-600"><a href={contact.emailHref} className="hover:text-brand-gold transition-colors">{contact.email}</a></p>
                  </div>
                </div>
              </div>

              {/* Department Contacts */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="text-brand-gold" size={20} />
                  <h3 className="font-bold font-heading text-xl text-brand-dark">Liên hệ theo bộ phận</h3>
                </div>
                <div className="space-y-4">
                  <div className="pb-4 border-b border-gray-100">
                    <p className="font-bold text-brand-dark">Người đại diện theo pháp luật</p>
                    <p className="text-gray-600">Bà Đào Thị Hà</p>
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark">Phòng Tài chính Kế toán (Hóa đơn, chứng từ)</p>
                    <p className="text-gray-600 flex items-center gap-2">Ông Mai Thanh Hải - Kế toán trưởng</p>
                  </div>
                </div>
              </div>
            </div>

            <aside className="bg-white p-6 sm:p-8 md:p-10 rounded-xl border border-gray-200 h-fit lg:sticky lg:top-28" aria-labelledby="direct-contact-heading">
              <h2 id="direct-contact-heading" className="text-2xl font-semibold font-heading text-brand-dark mb-4">Trao đổi trực tiếp với BT DECOM</h2>
              <p className="text-gray-600 leading-relaxed mb-6">Bạn có thể gọi điện hoặc gửi email kèm thông tin công trình, hạng mục cần triển khai và yêu cầu kỹ thuật.</p>
              <div className="flex flex-col items-start gap-4">
                <a href={contact.phoneHref} className="primary-link"><Phone size={18} aria-hidden="true" /> Gọi {contact.phone}</a>
                <a href={contact.emailHref} className="text-link"><Mail size={18} aria-hidden="true" /> Gửi email tư vấn</a>
              </div>
              <p className="mt-6 text-sm text-gray-600 leading-relaxed">Liên kết email mở ứng dụng email của bạn. Hãy gửi thư trong ứng dụng để chuyển yêu cầu đến {contact.email}.</p>
              <a href={contact.mapHref} target="_blank" rel="noopener noreferrer" className="text-link mt-4">Xem vị trí trên bản đồ <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (mở trong tab mới)</span></a>
            </aside>

          </div>
        </div>
      </section>

      {/* Map Section & Banking Info */}
      <section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Banking Accounts */}
          <div className="p-10 md:p-16 flex flex-col justify-center bg-brand-dark text-white">
            <div className="flex items-center gap-3 mb-8">
              <Banknote className="text-brand-gold" size={32} />
              <h2 className="text-3xl font-bold font-heading text-white">Thông tin thanh toán</h2>
            </div>
            <p className="text-gray-400 mb-8 max-w-lg">
              Thông tin tài khoản ngân hàng chính thức của CÔNG TY TNHH XÂY LẮP VÀ PHÁT TRIỂN THƯƠNG MẠI BT phục vụ giao dịch cho đối tác và khách hàng:
            </p>

            <div className="space-y-4">
              {[
                {
                  bank: "Vietcombank",
                  branch: "CN Thăng Long",
                  number: "0491000017938"
                },
                {
                  bank: "MB Bank",
                  branch: "CN Ba Đình - PGD Đội Cấn",
                  number: "0341100302006"
                },
                {
                  bank: "SHB",
                  branch: "CN Hàn Thuyên",
                  number: "2227776868"
                }
              ].map((acc, idx) => (
                <div key={idx} className="bg-white/10 p-5 rounded-lg border border-white/10 hover:border-brand-gold/50 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
                    <span className="font-bold text-lg text-brand-gold">{acc.bank}</span>
                    <span className="text-xl font-bold font-mono tracking-wider">{acc.number}</span>
                  </div>
                  <div className="text-sm text-gray-400">Chi nhánh: {acc.branch}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Google Maps */}
          <div className="h-[500px] lg:h-auto min-h-[400px] relative">
            <iframe title="Vị trí trụ sở BT DECOM"
              src="https://maps.google.com/maps?q=A40%20Khu%20Tập%20thể%20810,%20Vĩnh%20Quỳnh,%20Thanh%20Trì,%20Hà%20Nội&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
