import { companyStats } from "@/data/about";
import { Clock, Users, Wrench, Layers } from "lucide-react";

const icons = { Clock, Users, Wrench, Layers };

export function CompanyStats() {
  return (
    <section className="site-container relative z-10 -mt-8" aria-label="BT DECOM qua những con số">
      <dl className="grid grid-cols-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg shadow-brand-dark/5 lg:grid-cols-4">
        {companyStats.map((stat) => {
          const Icon = icons[stat.iconName];
          return (
            <div key={stat.label} className="border-r border-b border-gray-100 p-5 sm:p-7 lg:border-b-0">
              <Icon size={22} className="mb-4 text-brand-primary" aria-hidden="true" />
              <dt className="text-sm text-gray-600">{stat.label}</dt>
              <dd className="mt-2 font-heading text-3xl font-semibold tracking-tight text-brand-primary sm:text-4xl">{stat.value}</dd>
              <dd className="mt-2 hidden text-sm leading-relaxed text-gray-500 sm:block">{stat.description}</dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
