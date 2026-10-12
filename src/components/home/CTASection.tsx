"use client";

import Link from "next/link";
import { contact } from "@/data/contact";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Phone } from "lucide-react";

export function CTASection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section aria-labelledby="contact-heading" className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-brand-dark" ref={ref}>
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Decorative elements */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[100px]" />

      <motion.div
        className="container mx-auto px-4 md:px-6 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-3xl mx-auto text-center">


          <h2 id="contact-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-6 sm:mb-10 leading-tight">
            Bạn cần đơn vị thi công<br className="hidden md:block" /> xây lắp chuyên nghiệp?
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 sm:gap-3 bg-brand-gold hover:bg-brand-gold-light text-white px-6 py-3.5 sm:px-10 sm:py-5 rounded-xl font-semibold text-sm sm:text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-gold/30"
            >
              Liên hệ tư vấn
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={contact.phoneHref}
              aria-label={`Hoặc gọi trực tiếp: ${contact.phone}`}
              className="inline-flex items-center gap-3 text-white/70 hover:text-white px-6 py-4 font-medium transition-colors"
            >
              <Phone size={18} />
              Hoặc gọi trực tiếp
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
