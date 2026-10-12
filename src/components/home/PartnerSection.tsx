"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

export function PartnerSection() {
  const { ref, isInView } = useScrollAnimation();

  // Specifically highlighted partners
  const mainPartners = [
    { name: "Công ty TNHH MTV phát triển công nghệ và hạ tầng - Newtatco", logo: "/images/partners/newtatco.png", short: "Newtatco" },
    { name: "Ban quản lý Khu Công nghệ cao Hòa Lạc (HHPD)", logo: "/images/partners/hoalac.png", short: "Khu CNC Hòa Lạc" },
    { name: "Sở GTVT Hà Nội", logo: "/images/partners/sogtvt.png", short: "Sở GTVT Hà Nội" },
    { name: "Tổng cục II", logo: "/images/partners/tongcucii.png", short: "Tổng cục II" },
    { name: "Công ty Nước sạch Hà Nội", logo: "/images/partners/nuocsachhn.png", short: "Nước sạch HN" }
  ];

  const duplicatedPartners = [...mainPartners, ...mainPartners, ...mainPartners];

  return (
    <section className="py-16 md:py-20 bg-white border-y border-gray-100 overflow-hidden" ref={ref}>
      <motion.div 
        className="container mx-auto px-4 md:px-6 mb-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-brand-dark/50 text-sm font-bold uppercase tracking-widest">
          Khách hàng & Đối tác chiến lược tiêu biểu
        </h2>
      </motion.div>
      
      <motion.div 
        className="w-full relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="absolute top-0 left-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute top-0 right-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10" />
        
        <div className="flex w-fit animate-marquee hover:pause whitespace-nowrap">
          {duplicatedPartners.map((partner, index) => (
            <div 
              key={`${partner.short}-${index}`} 
              className="w-48 md:w-64 mx-6 md:mx-10 flex flex-col items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
              title={partner.name}
            >
              <div className="font-heading font-bold text-xl text-brand-dark text-center whitespace-normal break-words leading-tight">
                {partner.short}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      <style dangerouslySetInnerHTML={{__html: `
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
