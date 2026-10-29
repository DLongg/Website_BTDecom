import { Suspense } from "react";
import type { Metadata } from "next";
import { news } from "@/data/news";
import { NewsClient } from "./NewsClient";

export const metadata: Metadata = {
  title: "Tin Tức & Sự Kiện | BT DECOM",
  description: "Cập nhật thông tin mới nhất, chia sẻ kiến thức, kinh nghiệm và những hoạt động nổi bật của BT DECOM trên hành trình phát triển bền vững.",
};

export default function NewsPage() {
  return (
    <Suspense
      fallback={
        <div id="main-content" tabIndex={-1} className="min-h-screen bg-[#F8FAF9] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#15803D] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <NewsClient articles={news} />
    </Suspense>
  );
}
