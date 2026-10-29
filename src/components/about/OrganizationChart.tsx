import { Building2, UserCheck, Calculator, PenTool, ClipboardList, ShieldCheck, HardHat } from "lucide-react";
import { AboutSectionHeading } from "./AboutSectionHeading";
import styles from "./OrganizationChart.module.css";

const units = [
  { name: "Phòng Kế toán tổng hợp", description: "Theo dõi tài chính, kế toán và thanh quyết toán.", icon: Calculator },
  { name: "Phòng Thiết kế", description: "Triển khai thiết kế và giải pháp kỹ thuật công trình.", icon: PenTool },
  { name: "Phòng Kế hoạch kỹ thuật", description: "Lập kế hoạch, tổ chức và theo dõi tiến độ thi công.", icon: ClipboardList },
  { name: "Ban Quản lý Vận hành", description: "Điều phối, giám sát và quản lý vận hành.", icon: ShieldCheck },
  { name: "Đội Thi công", description: "Trực tiếp triển khai các hạng mục tại công trường.", icon: HardHat },
];

export function OrganizationChart() {
  return (
    <section aria-labelledby="organization-heading" className="home-section border-t border-gray-100 bg-brand-light">
      <div className="site-container">
        <AboutSectionHeading id="organization-heading" eyebrow="Cơ cấu vận hành" title="Sơ đồ cơ cấu tổ chức" description="Cơ cấu quản lý và phối hợp giữa ban lãnh đạo, các phòng ban chuyên môn và đội ngũ thi công của BT DECOM." />
        <div className={styles.chart}>
          <div className={styles.leadership}>
            <div className={styles.board}>
              <Building2 size={24} className="text-brand-primary" aria-hidden="true" />
              <h3>Hội Đồng Quản Trị</h3>
              <p>Định hướng chiến lược phát triển</p>
            </div>
            <div className={styles.stem} aria-hidden="true" />
            <div className={styles.director}>
              <UserCheck size={24} aria-hidden="true" />
              <h3>Ban Giám Đốc</h3>
              <p>Điều hành và quản lý toàn diện</p>
            </div>
          </div>
          <ul className={styles.units} aria-label="Các đơn vị trực thuộc ban giám đốc">
            {units.map(({ name, description, icon: Icon }, index) => (
              <li key={name} className={styles.branch}>
                <div className={`${styles.card} ${index === units.length - 1 ? styles.fieldTeam : ""}`}>
                  <span className={styles.icon}><Icon size={22} aria-hidden="true" /></span>
                  <h3>{name}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className={styles.note}><span aria-hidden="true" />Đường nối thể hiện quan hệ quản lý trực thuộc.</p>
        </div>
      </div>
    </section>
  );
}
