"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { contact } from "@/data/contact";
import { cn } from "@/lib/utils";

const links = [
  { name: "Trang chủ", href: "/" },
  { name: "Giới thiệu", href: "/about" },
  { name: "Dịch vụ", href: "/services" },
  { name: "Dự án", href: "/projects" },
  { name: "Tin tức", href: "/news" },
  { name: "Liên hệ", href: "/contact" },
];

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
const getScrolled = () => window.scrollY > 50;
const getServerScrolled = () => false;

export function Header() {
  const pathname = usePathname();
  return <HeaderNavigation key={pathname} pathname={pathname} />;
}

function HeaderNavigation({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrolled, getServerScrolled);
  const transparent = pathname === "/" && !scrolled && !open;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
      if (event.key === "Tab") {
        const targets = [toggleRef.current, ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [])].filter((element): element is HTMLElement => element !== null);
        const first = targets[0];
        const last = targets[targets.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    const toggle = toggleRef.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      toggle?.focus();
    };
  }, [open]);

  const active = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200", transparent ? "border-transparent bg-transparent text-white" : "border-gray-200 bg-white text-brand-dark")}>
      <div className="site-container flex h-18 items-center justify-between gap-4 lg:h-22">
        <Link href="/" onClick={() => setOpen(false)} aria-label="BT DECOM — Trang chủ" className="flex min-h-11 shrink-0 items-center gap-2.5 sm:gap-3">
          <Image src="/images/bt-logo.png" alt="" width={96} height={48} loading="eager" className="h-auto w-16 sm:w-20" />
          <span className="flex flex-col">
            <span className={cn("font-heading font-bold text-base sm:text-xl tracking-tight", transparent ? "text-white" : "text-brand-primary")}>BT DECOM</span>
            <span className={cn("hidden sm:block text-[10px] mt-1", transparent ? "text-white/80" : "text-gray-600")}>Chất lượng · Tiến độ · Hiệu quả</span>
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8" aria-label="Điều hướng chính">
          <ul className="flex items-center gap-4 xl:gap-6">
            {links.map(link => (
              <li key={link.href}><Link href={link.href} aria-current={active(link.href) ? "page" : undefined} className={cn("inline-flex min-h-11 items-center text-sm font-medium transition-colors", transparent ? "hover:text-brand-accent" : "hover:text-brand-primary", active(link.href) && "underline underline-offset-8 decoration-2", active(link.href) && (transparent ? "text-brand-accent" : "text-brand-primary"))}>{link.name}</Link></li>
            ))}
          </ul>
          <Link href="/contact" className="primary-link text-sm">Liên hệ tư vấn <ArrowRight size={16} aria-hidden="true" /></Link>
        </nav>
        <button ref={toggleRef} type="button" aria-label={open ? "Đóng menu" : "Mở menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)} className={cn("flex size-11 shrink-0 items-center justify-center rounded-lg lg:hidden", transparent ? "hover:bg-white/10" : "hover:bg-brand-light")}>
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <div ref={menuRef} id="mobile-navigation" className="fixed inset-x-0 bottom-0 top-18 z-40 overflow-y-auto overscroll-contain bg-white lg:hidden">
          <nav aria-label="Điều hướng trên điện thoại" className="site-container py-5">
            <ul>
              {links.map(link => (
                <li key={link.href}><Link href={link.href} onClick={() => setOpen(false)} aria-current={active(link.href) ? "page" : undefined} className={cn("flex min-h-14 items-center border-b border-gray-100 text-lg font-medium", active(link.href) && "text-brand-primary")}>{link.name}</Link></li>
              ))}
            </ul>
            <Link href="/contact" onClick={() => setOpen(false)} className="primary-link mt-6 w-full">Liên hệ tư vấn <ArrowRight size={18} aria-hidden="true" /></Link>
            <a href={contact.phoneHref} className="text-link mt-4 w-full"><Phone size={18} aria-hidden="true" />{contact.phone}</a>
          </nav>
        </div>
      )}
    </header>
  );
}
