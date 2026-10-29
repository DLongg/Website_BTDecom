"use client";

import { useState } from "react";
import { Link2, Check, Printer } from "lucide-react";

interface ShareButtonsProps {
  url?: string;
  title?: string;
}

export function ShareButtons({ url = "https://btdecom.vn/news", title = "" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getEffectiveUrl = () => {
    if (typeof window !== "undefined" && window.location.href && !url.startsWith("http")) {
      return window.location.href;
    }
    return url;
  };

  const handleCopy = async () => {
    const targetUrl = getEffectiveUrl();
    try {
      if (typeof window !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(targetUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = targetUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const effectiveUrl = url || "https://btdecom.vn/news";
  const fbShareHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(effectiveUrl)}`;
  const liShareHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(effectiveUrl)}`;

  return (
    <div
      data-share-buttons="true"
      className="share-buttons flex flex-wrap items-center gap-3 relative"
      role="region"
      aria-label="Chia sẻ bài viết"
    >
      <span className="text-sm font-semibold text-brand-dark mr-1 select-none">
        Chia sẻ:
      </span>

      {/* Facebook Share */}
      <a
        href={fbShareHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chia sẻ lên Facebook"
        title={title ? `Chia sẻ "${title}" lên Facebook` : "Chia sẻ lên Facebook"}
        className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-offset-2"
      >
        <svg
          className="w-5 h-5 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>

      {/* LinkedIn Share */}
      <a
        href={liShareHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chia sẻ lên LinkedIn"
        title={title ? `Chia sẻ "${title}" lên LinkedIn` : "Chia sẻ lên LinkedIn"}
        className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:ring-offset-2"
      >
        <svg
          className="w-5 h-5 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      </a>

      {/* Copy Link Button */}
      <div className="relative">
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Sao chép liên kết"
          title="Sao chép liên kết"
          className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-gray-100 hover:bg-brand-primary text-gray-700 hover:text-white transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 cursor-pointer"
        >
          {copied ? (
            <Check size={18} className="text-emerald-500 hover:text-white" />
          ) : (
            <Link2 size={18} />
          )}
        </button>

        {copied && (
          <div
            role="status"
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-brand-dark text-white text-xs font-medium rounded-md shadow-lg whitespace-nowrap pointer-events-none z-10 animate-fade-in"
          >
            Đã sao chép liên kết!
          </div>
        )}
      </div>

      {/* Print Article Button */}
      <button
        type="button"
        onClick={handlePrint}
        aria-label="In bài viết"
        title="In bài viết"
        className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-gray-100 hover:bg-brand-dark text-gray-700 hover:text-white transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2 cursor-pointer"
      >
        <Printer size={18} />
      </button>
    </div>
  );
}
