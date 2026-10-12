import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { services } from "@/data/services";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export const dynamicParams = false;

export default async function ServiceDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const service = services.find(s => s.slug === params.slug);
  
  if (!service) {
    notFound();
  }

  return (
    <>
      <Header />
      
      {/* Banner */}
      <div className="pt-32 pb-20 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541888081622-1ce4471fbdab?w=1920&q=80')] bg-cover bg-center" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors mb-6 text-sm font-medium">
            <ArrowLeft size={16} /> Quay lại các dịch vụ
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">{service.name}</h1>
          <p className="text-xl text-white/80 max-w-3xl">{service.shortDescription}</p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold font-heading text-brand-dark mb-6">Tổng quan dịch vụ</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-10">
                {service.description}
              </p>
              
              <h3 className="text-2xl font-bold font-heading text-brand-dark mb-6">Các hạng mục thực hiện</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-brand-light p-4 rounded-lg">
                    <CheckCircle2 className="text-brand-gold shrink-0 mt-0.5" size={20} />
                    <span className="text-brand-dark font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold font-heading text-brand-dark mb-8">Quy trình làm việc</h3>
              <div className="space-y-6">
                {service.process.map((step, idx) => (
                  <div key={idx} className="flex gap-6 border-l-2 border-brand-gold/30 ml-3 pl-8 relative pb-2 last:pb-0 last:border-transparent">
                    <div className="absolute top-0 -left-[17px] w-8 h-8 rounded-full bg-white border-2 border-brand-gold flex items-center justify-center font-bold text-sm text-brand-gold">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-brand-dark mb-2">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-brand-light p-8 rounded-2xl sticky top-28">
                <h3 className="text-xl font-bold font-heading text-brand-dark mb-4">Cần tư vấn thêm?</h3>
                <p className="text-gray-600 mb-6">Chuyên gia của BT DECOM sẵn sàng giải đáp mọi thắc mắc của bạn về dịch vụ <strong>{service.name}</strong>.</p>
                <div className="space-y-4">
                  <Button className="w-full" asChild>
                    <Link href={`/contact?service=${service.slug}`}>Yêu cầu báo giá</Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="tel:0936189292">Gọi hotline: 0936 189 292</Link>
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
