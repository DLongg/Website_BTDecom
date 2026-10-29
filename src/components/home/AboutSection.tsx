import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const strengths = [
  { title: "Đội ngũ chuyên môn", description: "Kỹ sư hệ thống điện, tự động hóa, cơ khí và công nhân kỹ thuật theo hồ sơ nhân sự." },
  { title: "Tổ chức thi công", description: "Các đội xây lắp cùng thiết bị vận tải, thi công và thí nghiệm điện phục vụ từng hạng mục." },
  { title: "Kinh nghiệm công trình", description: "Hồ sơ thi công chiếu sáng cầu vượt, tuyến cáp trung thế và hệ thống cơ điện tại Hà Nội." },
];

export function AboutSection() {
  return (
    <section className="home-section bg-white" aria-labelledby="about-heading">
      <div className="site-container grid gap-10 items-center lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <figure className="relative overflow-hidden rounded-xl">
          <div className="relative aspect-[4/3] lg:aspect-[4/5]">
            <Image src="/images/home/thi-cong-co-dien.jpg" alt="Lắp đặt đường ống cơ điện bên trong công trình đang thi công" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </figure>
        <div>
          <p className="text-brand-primary font-medium text-sm mb-4">BT DECOM · Thành lập năm 2012</p>
          <h2 id="about-heading" className="home-heading">Năng lực triển khai từng hạng mục</h2>
          <p className="mt-5 text-gray-600 leading-relaxed max-w-xl">Công ty TNHH Xây lắp và Phát triển Thương mại BT hoạt động trong lĩnh vực xây lắp điện, cơ điện và hạ tầng kỹ thuật. Chúng tôi phối hợp đội ngũ chuyên môn, tổ chức thi công và trang thiết bị để triển khai các hạng mục từ khảo sát đến bàn giao. Hồ sơ năng lực giới thiệu thông tin doanh nghiệp, nhân sự, thiết bị và các công trình đã thực hiện.</p>
          <ul className="mt-7 space-y-5">
            {strengths.map(item => (
              <li key={item.title} className="flex items-start gap-3">
                <Check size={20} className="mt-1 shrink-0 text-brand-primary" aria-hidden="true" />
                <div><h3 className="text-base font-semibold">{item.title}</h3><p className="mt-1 text-sm leading-relaxed text-gray-600 max-w-lg">{item.description}</p></div>
              </li>
            ))}
          </ul>
          <Link href="/about" className="text-link mt-7">Xem hồ sơ năng lực <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
