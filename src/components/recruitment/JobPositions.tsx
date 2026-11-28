import { ArrowDown, Check, MapPin, Users } from "lucide-react";
import { jobPositions, type JobPosition } from "@/data/recruitment";
import { cn } from "@/lib/utils";
import { ApplyActions } from "./ApplyActions";

/** Tách "8 - 15 triệu/tháng (thỏa thuận...)" thành mức lương chính và ghi chú trong ngoặc. */
function splitSalary(salary: string) {
  const match = salary.match(/^(.*?)\s*\((.+)\)\s*$/);
  return match ? { main: match[1], note: match[2] } : { main: salary, note: undefined };
}

function JobBadge({ badge }: { badge?: JobPosition["badge"] }) {
  if (!badge) return null;
  const urgent = badge === "Cần Gấp";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-[13px] font-semibold",
        urgent ? "bg-brand-primary text-white" : "border border-gray-300 text-gray-700"
      )}
    >
      {urgent ? "Cần gấp" : badge}
    </span>
  );
}

const detailGroups = [
  { key: "description", title: "Công việc" },
  { key: "requirements", title: "Yêu cầu" },
  { key: "benefits", title: "Quyền lợi" },
] as const;

export function JobPositions() {
  const totalQuantity = jobPositions.reduce((sum, job) => sum + job.quantity, 0);

  return (
    <section aria-labelledby="jobs-heading" className="home-section bg-white">
      <div className="site-container">
        <div className="max-w-2xl">
          <h2 id="jobs-heading" className="home-heading text-brand-dark">Vị trí đang tuyển</h2>
          <p className="mt-3 text-lg leading-relaxed text-gray-600">
            {jobPositions.length} vị trí, tổng {totalQuantity} chỉ tiêu. Chọn một vị trí để xem chi tiết, hoặc gọi ngay để hẹn phỏng vấn.
          </p>
        </div>

        {/* Bảng tóm tắt: nắm toàn bộ vị trí, số lượng và mức lương trong một màn hình */}
        <div className="mt-10 overflow-hidden rounded-xl border border-gray-200">
          <div
            className="hidden grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,2fr)_auto] gap-6 bg-brand-light px-6 py-3 text-sm font-semibold text-gray-600 md:grid"
            aria-hidden="true"
          >
            <span>Vị trí</span>
            <span>Số lượng</span>
            <span>Thu nhập</span>
            <span className="w-28" />
          </div>
          <ul className="divide-y divide-gray-200">
            {jobPositions.map((job) => (
              <li key={job.id}>
                <a
                  href={`#${job.id}`}
                  className="group grid gap-x-6 gap-y-2 px-5 py-5 transition-colors hover:bg-brand-light md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,2fr)_auto] md:items-center md:px-6"
                >
                  <span className="flex flex-wrap items-center gap-2.5">
                    <span className="font-heading text-lg font-semibold text-brand-dark group-hover:text-brand-primary">{job.title}</span>
                    <JobBadge badge={job.badge} />
                  </span>
                  <span className="text-base text-gray-700">
                    <span className="md:hidden">Số lượng: </span>
                    <span className="tabular-nums">{job.quantity}</span> người
                  </span>
                  <span className="text-base font-semibold text-brand-primary">{splitSalary(job.salary).main}</span>
                  <span className="inline-flex w-28 items-center gap-1.5 text-sm font-semibold text-brand-primary">
                    Xem chi tiết
                    <ArrowDown size={16} aria-hidden="true" className="transition-transform group-hover:translate-y-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Chi tiết từng vị trí */}
        <div className="mt-16 space-y-6">
          {jobPositions.map((job) => {
            const salary = splitSalary(job.salary);
            return (
              <article
                key={job.id}
                id={job.id}
                data-job-position={job.id}
                aria-labelledby={`${job.id}-title`}
                className="scroll-mt-28 rounded-xl border border-gray-200 p-6 md:p-8"
              >
                <header className="flex flex-col gap-4 border-b border-gray-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 id={`${job.id}-title`} className="text-2xl font-semibold text-brand-dark">{job.title}</h3>
                      <JobBadge badge={job.badge} />
                    </div>
                    <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-base text-gray-600">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={16} aria-hidden="true" className="text-brand-primary" />
                        {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Users size={16} aria-hidden="true" className="text-brand-primary" />
                        {job.quantity} người
                      </span>
                    </p>
                  </div>
                  <div className="lg:text-right">
                    <p className="font-heading text-xl font-semibold text-brand-primary">{salary.main}</p>
                    {salary.note && <p className="mt-1 max-w-sm text-sm text-gray-600">{salary.note}</p>}
                  </div>
                </header>

                <div className="grid gap-8 py-6 md:grid-cols-3">
                  {detailGroups.map((group) => (
                    <div key={group.key}>
                      <h4 className="text-base font-semibold text-brand-dark">{group.title}</h4>
                      <ul className="mt-3 space-y-2.5 text-base leading-relaxed text-gray-700">
                        {job[group.key].map((item) => (
                          <li key={item} className="flex gap-2.5">
                            {group.key === "benefits" ? (
                              <Check size={18} aria-hidden="true" className="mt-1 shrink-0 text-brand-primary" />
                            ) : (
                              <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gray-400" />
                            )}
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <footer className="border-t border-gray-200 pt-6">
                  <ApplyActions jobTitle={job.title} />
                </footer>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
