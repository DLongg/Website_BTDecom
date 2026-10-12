import { companyStats } from "@/data/about";

export function StatsSection({ projectCount }: { projectCount: number }) {
  const workforce = companyStats.find(stat => stat.iconName === "Users");
  const teams = companyStats.find(stat => stat.iconName === "Layers");
  const items = [
    { value: "2012", label: "Năm thành lập" },
    ...(workforce ? [{ value: workforce.value, label: "Nhân sự theo hồ sơ 2025" }] : []),
    ...(teams ? [{ value: teams.value, label: "Đội xây lắp chủ lực" }] : []),
    { value: String(projectCount), label: "Hồ sơ công trình" },
  ];
  return (
    <section className="border-b border-gray-200 bg-white py-8 md:py-10" aria-label="Năng lực BT DECOM theo hồ sơ doanh nghiệp">
      <dl className="site-container grid grid-cols-2 gap-y-7 lg:grid-cols-4">
        {items.map(item => (
          <div key={item.label} className="border-l-2 border-brand-primary/20 pl-5 md:pl-8">
            <dt className="text-sm text-gray-600">{item.label}</dt>
            <dd className="mt-2 font-heading text-3xl md:text-4xl font-semibold tracking-tight tabular-nums text-brand-dark">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
