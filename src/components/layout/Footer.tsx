import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { contact } from "@/data/contact";

const links = [
  { name: "Giới thiệu và năng lực", href: "/about" },
  { name: "Lĩnh vực hoạt động", href: "/services" },
  { name: "Danh mục dự án", href: "/projects" },
  { name: "Tin tức", href: "/news" },
  { name: "Tuyển dụng", href: "/news?category=Tuyển dụng" },
];

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-12 md:pt-16 pb-6">
      <div className="site-container">
        <div className="grid gap-10 pb-10 md:grid-cols-[1.3fr_0.8fr_1fr] md:gap-12">
          <div>
            <Link href="/" aria-label="BT DECOM — Trang chủ" className="inline-flex items-center gap-3">
              <Image src="/images/bt-logo.png" alt="" width={96} height={48} className="w-20 h-auto" />
              <span className="font-heading font-bold text-xl tracking-tight">BT DECOM</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-300">{contact.companyName}</p>
            <p className="mt-3 text-sm text-slate-300">Chất lượng · Tiến độ · Hiệu quả</p>
          </div>
          <nav aria-label="Điều hướng chân trang">
            <h2 className="font-heading text-base font-semibold mb-4">Khám phá BT DECOM</h2>
            <ul className="space-y-1">
              {links.map(link => <li key={link.href}><Link href={link.href} className="inline-flex min-h-11 items-center text-sm text-slate-300 hover:text-brand-accent transition-colors">{link.name}</Link></li>)}
            </ul>
          </nav>
          <div>
            <h2 className="font-heading text-base font-semibold mb-4">Thông tin liên hệ</h2>
            <address className="not-italic text-sm text-slate-300 leading-relaxed">
              <p>{contact.address}</p>
              <a href={contact.phoneHref} className="mt-3 flex min-h-11 items-center gap-2 hover:text-brand-accent"><Phone size={16} aria-hidden="true" />{contact.phone}</a>
              <a href={contact.landlineHref} className="inline-flex min-h-11 items-center hover:text-brand-accent">{contact.landline}</a>
              <a href={contact.emailHref} className="flex min-h-11 items-center gap-2 break-all hover:text-brand-accent"><Mail size={16} aria-hidden="true" />{contact.email}</a>
              <a href={contact.mapHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-brand-accent">Xem vị trí trên bản đồ <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (mở trong tab mới)</span></a>
            </address>
          </div>
        </div>
        <div className="border-t border-white/15 pt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-300">
          <p>© {new Date().getFullYear()} BT DECOM</p>
          <Link href="/contact" className="inline-flex min-h-11 items-center gap-2 hover:text-brand-accent">Liên hệ với chúng tôi <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    </footer>
  );
}
