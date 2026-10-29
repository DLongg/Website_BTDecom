import { contact } from "@/data/contact";

export interface JobPosition {
  id: string;
  title: string;
  badge?: "Hot" | "Cần Gấp" | "Mới" | "Thời vụ" | string;
  quantity: number;
  location: string;
  salary: string;
  description: string[];
  requirements: string[];
  benefits: string[];
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface PressArticle {
  id: string;
  newspaper: string;
  title: string;
  author: string;
  publishedAt: string;
  excerpt: string;
  originalUrl: string;
  imageUrl: string;
}

export interface RecruitmentImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  orientation: "landscape" | "portrait";
}

export interface RecruitmentCommitment {
  id: string;
  title: string;
  description: string;
  tag: string;
}

export const recruitmentContact = {
  phone: contact.phone,
  phoneHref: contact.phoneHref,
  email: contact.email,
  emailHref: contact.emailHref,
  zaloHref: "https://zalo.me/0936189292",
  address: contact.address,
  landline: contact.landline,
  landlineHref: contact.landlineHref,
  companyName: contact.companyName,
  brand: contact.brand,
} as const;

export const recruitmentCommitments: RecruitmentCommitment[] = [
  {
    id: "no-middleman",
    title: "Không qua trung gian",
    description: "Tuyển dụng trực tiếp bởi Ban Nhân sự BT DECOM, tuyệt đối không thu bất kỳ khoản chi phí môi giới hay trung gian nào của người lao động.",
    tag: "Trực tiếp 100%",
  },
  {
    id: "salary-guarantee",
    title: "Cam kết 100% trả lương đúng hạn",
    description: "Minh bạch tài chính, thanh toán lương đầy đủ đúng ngày cam kết hàng tháng, tuyệt đối không nợ lương anh em công nhân kỹ thuật.",
    tag: "Sòng phẳng",
  },
  {
    id: "weekly-advance",
    title: "Hỗ trợ ứng lương hàng tuần",
    description: "Thấu hiểu nhu cầu sinh hoạt thực tế, công ty có chính sách hỗ trợ ứng lương hàng tuần linh hoạt cho anh em thợ và phụ việc.",
    tag: "Tận tâm",
  },
];

export const jobPositions: JobPosition[] = [
  {
    id: "ky-su-dien",
    title: "Kỹ sư Điện",
    badge: "Hot",
    quantity: 1,
    location: "Hà Nội",
    salary: "8 - 15 triệu/tháng (thỏa thuận theo năng lực)",
    description: [
      "Thiết kế, bóc tách khối lượng và giám sát thi công hệ thống điện dân dụng, công nghiệp",
      "Lập bản vẽ kỹ thuật thi công (Shopdrawing, As-built) và hồ sơ nghiệm thu chất lượng",
      "Quản lý, điều phối đội thi công tại công trường đảm bảo đúng tiến độ và tiêu chuẩn an toàn",
    ],
    requirements: [
      "Tốt nghiệp Đại học / Cao đẳng chuyên ngành Kỹ thuật Điện, Hệ thống điện hoặc Cơ điện (MEP)",
      "Ưu tiên ứng viên có kinh nghiệm giám sát thi công thực tế tại công trình cơ điện",
      "Thành thạo AutoCAD và đọc hiểu tốt hồ sơ bản vẽ kỹ thuật",
      "Trung thực, nhiệt tình, có trách nhiệm cao và khả năng chịu được áp lực công việc",
    ],
    benefits: [
      "Mức lương cạnh tranh: 8 - 15 triệu/tháng + thưởng hoàn thành tiến độ dự án",
      "Đóng đầy đủ BHXH, BHYT, BHTN theo đúng quy định pháp luật lao động",
      "Lương tháng 13, thưởng các dịp lễ, Tết và xét duyệt tăng lương định kỳ",
      "Cung cấp đầy đủ trang thiết bị bảo hộ lao động đạt chuẩn an toàn",
    ],
  },
  {
    id: "tho-dien-nuoc",
    title: "Thợ Điện Nước",
    badge: "Cần Gấp",
    quantity: 5,
    location: "Hà Nội",
    salary: "10 - 16 triệu/tháng (theo tay nghề, cam kết không nợ lương, hỗ trợ ứng lương hàng tuần)",
    description: [
      "Thi công lắp đặt hệ thống cấp thoát nước, đường ống và thiết bị điện dân dụng / công nghiệp",
      "Đọc hiểu bản vẽ thi công, triển khai công việc độc lập hoặc theo nhóm theo yêu cầu kỹ thuật",
      "Kiểm tra, khắc phục sự cố, bảo trì và hoàn thiện hệ thống cơ điện công trình",
    ],
    requirements: [
      "Có kinh nghiệm thực tế thi công điện nước tại các công trình xây lắp",
      "Biết đọc bản vẽ và có khả năng làm việc độc lập là một lợi thế lớn",
      "Có sức khỏe tốt, chăm chỉ, cẩn thận, có trách nhiệm và tinh thần gắn bó lâu dài",
    ],
    benefits: [
      "Thu nhập hấp dẫn theo tay nghề, cam kết 100% trả lương đúng hạn, không nợ lương",
      "Hỗ trợ chính sách ứng lương hàng tuần linh hoạt cho anh em thợ",
      "Được trang bị đầy đủ đồ bảo hộ lao động, hỗ trợ phụ cấp công trình và tăng ca sòng phẳng",
      "Có việc làm đều đặn, liên tục quanh năm tại nhiều công trình ở Hà Nội",
    ],
  },
  {
    id: "ky-su-cap-thoat-nuoc",
    title: "Kỹ sư Cấp thoát nước",
    badge: "Mới",
    quantity: 1,
    location: "Hà Nội",
    salary: "8 - 15 triệu/tháng",
    description: [
      "Thiết kế, giám sát thi công hệ thống cấp thoát nước công trình và xử lý nước thải",
      "Lập dự toán vật tư, bóc tách khối lượng và lập hồ sơ nghiệm thu công trình",
      "Phối hợp với đội thi công hiện trường và các bộ phận cơ điện liên quan",
    ],
    requirements: [
      "Tốt nghiệp chuyên ngành Cấp thoát nước, Kỹ thuật Hạ tầng Đô thị hoặc Môi trường",
      "Nắm vững các tiêu chuẩn, quy chuẩn ngành cấp thoát nước và quy định an toàn",
      "Nhanh nhẹn, trung thực, có tinh thần trách nhiệm và gắn bó với tập thể",
    ],
    benefits: [
      "Lương 8 - 15 triệu/tháng + thưởng hiệu quả công việc và dự án",
      "Tham gia đầy đủ BHXH, BHYT, phụ cấp công tác và khám sức khỏe định kỳ",
      "Lộ trình thăng tiến rõ ràng lên vị trí Chỉ huy trưởng / Quản lý kỹ thuật",
      "Môi trường làm việc chuyên nghiệp, đồng nghiệp tương trợ cởi mở",
    ],
  },
  {
    id: "cong-nhan-ky-thuat",
    title: "Công nhân Kỹ thuật",
    badge: "Cần Gấp",
    quantity: 5,
    location: "Hà Nội",
    salary: "7 - 12 triệu/tháng",
    description: [
      "Hỗ trợ thi công, lắp đặt hệ thống cơ điện, cấp thoát nước tại các công trình",
      "Tiếp nhận, bảo quản và vận chuyển vật tư, máy móc thiết bị thi công",
      "Học hỏi, thực hành và nâng cao tay nghề dưới sự kèm cặp tận tình của thợ chính và kỹ sư",
    ],
    requirements: [
      "Không yêu cầu bằng cấp hay kinh nghiệm — công ty đào tạo tận tình từ đầu",
      "Nam tuổi từ 18 trở lên, có sức khỏe tốt, chăm chỉ, thật thà và chịu khó học hỏi",
      "Có tinh thần đồng đội và ý chí gắn bó làm việc ổn định lâu dài",
    ],
    benefits: [
      "Mức thu nhập 7 - 12 triệu/tháng, cam kết 100% trả lương đúng hạn, hỗ trợ ứng lương hàng tuần",
      "Được đào tạo nghề cơ điện miễn phí ngay trên công trình thực tế",
      "Cấp phát đồng phục, giày, mũ và trang thiết bị bảo hộ lao động đạt chuẩn an toàn",
      "Được xét tăng lương và thăng cấp lên thợ chính khi vững tay nghề",
    ],
  },
  {
    id: "cong-nhan-thoi-vu",
    title: "Công nhân Thời vụ",
    badge: "Thời vụ",
    quantity: 5,
    location: "Hà Nội",
    salary: "350.000 - 550.000 đ/ngày (tính theo ngày công/công trình, hỗ trợ ứng lương hàng tuần)",
    description: [
      "Hỗ trợ các công việc phụ trợ thi công theo từng giai đoạn công trình xây lắp",
      "Vận chuyển vật liệu, sắp xếp công cụ dụng cụ và dọn dẹp vệ sinh hiện trường thi công",
      "Phụ việc cho đội thợ điện nước theo phân công điều động của phụ trách công trình",
    ],
    requirements: [
      "Không yêu cầu kinh nghiệm, độ tuổi từ 18 trở lên, có sức khỏe tốt",
      "Nhanh nhẹn, siêng năng, trung thực, có mặt đúng giờ theo ca làm việc",
      "Thời gian làm việc linh hoạt theo từng đợt công trình",
    ],
    benefits: [
      "Thanh toán tiền công sòng phẳng, hỗ trợ ứng lương hàng tuần nhanh chóng",
      "Hỗ trợ đầy đủ trang thiết bị bảo hộ lao động an toàn tại hiện trường",
      "Cơm trưa và nước uống tại công trường",
      "Ưu tiên nhận làm nhân viên kỹ thuật chính thức nếu có nguyện vọng gắn bó lâu dài",
    ],
  },
];

export const benefitItems: BenefitItem[] = [
  {
    id: "luong-song-phang",
    title: "Lương Sòng Phẳng",
    description: "Thu nhập ổn định, cam kết 100% trả lương đúng hạn, không nợ lương. Hỗ trợ ứng lương hàng tuần giúp anh em an tâm làm việc.",
    iconName: "Wallet",
  },
  {
    id: "tang-luong-dinh-ky",
    title: "Tăng Lương Định Kỳ",
    description: "Xét tăng lương minh bạch cho anh em thợ, phụ làm tốt, chăm chỉ và có tinh thần trách nhiệm sau thời gian gắn bó.",
    iconName: "TrendingUp",
  },
  {
    id: "viec-lam-thuong-xuyen",
    title: "Việc Làm Thường Xuyên",
    description: "Có việc làm liên tục quanh năm, không lo thiếu việc hay ngắt quãng. Dự án đa dạng tại nhiều khu vực trên địa bàn Hà Nội.",
    iconName: "Briefcase",
  },
  {
    id: "day-du-che-do",
    title: "Đầy Đủ Chế Độ & Bảo Hiểm",
    description: "Đóng đầy đủ bảo hiểm (BHXH, BHYT, BHTN), thưởng lễ Tết, lương tháng 13, phụ cấp công trình và tiền tăng ca sòng phẳng.",
    iconName: "ShieldCheck",
  },
  {
    id: "moi-truong-than-thien",
    title: "Môi Trường Thân Thiện",
    description: "Đồng nghiệp hòa đồng, hỗ trợ lẫn nhau hết mình. Ban lãnh đạo gần gũi, lắng nghe và luôn tôn trọng người lao động.",
    iconName: "Users",
  },
  {
    id: "dao-tao-mien-phi",
    title: "Đào Tạo Nghề Miễn Phí",
    description: "Chưa biết nghề được đào tạo tận tình, cầm tay chỉ việc ngay trên công trình thực tế. Bao đồ bảo hộ lao động an toàn đạt chuẩn.",
    iconName: "GraduationCap",
  },
];

export const pressArticles: PressArticle[] = [
  {
    id: "laodong-tet-2024",
    newspaper: "Báo Lao Động",
    title: "Sôi động thị trường việc làm dịp Tết",
    author: "HẠNH AN - THẾ ĐẠI",
    publishedAt: "30/12/2023 14:00 (GMT+7)",
    excerpt: "Bà Nguyễn Thị Thanh Bình - Trưởng phòng Nhân sự Công ty Xây lắp và Thương mại BT (huyện Thanh Trì, TP Hà Nội) - cho biết, công ty bà đang cần tuyển dụng 3 vị trí việc làm, cụ thể: Kỹ sư điện, kỹ sư cấp thoát nước và công nhân kỹ thuật. Với vị trí kỹ sư, công ty cần tuyển dụng từ 1-2 nhân sự mức lương thấp nhất khoảng 8 triệu đồng/tháng, cao nhất là khoảng 15 triệu đồng/tháng; với vị trí công nhân kỹ thuật, công ty cần tuyển 10 lao động, mức lương thấp nhất là khoảng 7 triệu đồng/tháng, cao nhất là 12 triệu đồng/tháng. Ngoài ra, công ty này cũng đảm bảo chi trả các chế độ khác cho người lao động như: BHXH, thưởng dịp lễ, Tết, phụ cấp công trình…",
    originalUrl: "https://laodong.vn/cong-doan/soi-dong-thi-truong-viec-lam-dip-tet-1286192.ldo",
    imageUrl: "/images/news-web/recruitment/laodong-tet-2024.webp",
  },
  {
    id: "laodong-nhan-su-2024",
    newspaper: "Báo Lao Động",
    title: "Khó tuyển dụng nhân sự dịp cận Tết Nguyên đán 2024",
    author: "THẾ ĐẠI - HẠNH AN",
    publishedAt: "05/01/2024 11:24 (GMT+7)",
    excerpt: "Dù dự báo nhu cầu nhân lực tại Hà Nội lên đến cả chục nghìn người trong tháng 1.2024; song, các doanh nghiệp cũng nhận định việc tuyển đủ nhân sự trong dịp cận Tết Nguyên đán là rất khó... Bà Nguyễn Thị Thanh Bình - Trưởng phòng Nhân sự Công ty BT cho biết nhu cầu tuyển thợ cơ điện, cấp thoát nước phục vụ các công trình xây lắp cuối năm là rất cấp thiết với chế độ đãi ngộ minh bạch và hỗ trợ ứng lương hàng tuần.",
    originalUrl: "https://laodong.vn/ban-tin/kho-tuyen-dung-nhan-su-dip-can-tet-nguyen-dan-2024-1288723.ldo",
    imageUrl: "/images/news-web/recruitment/laodong-nhan-su-2024.webp",
  },
];

export const recruitmentImages: RecruitmentImage[] = [
  {
    id: "interview",
    src: "/images/news-web/recruitment/interview.webp",
    alt: "Bà Nguyễn Thị Thanh Bình - Trưởng phòng Nhân sự BT DECOM trả lời phỏng vấn Báo Lao Động",
    caption: "Phỏng vấn truyền hình và Báo Lao Động tại phiên giao dịch việc làm Hà Nội",
    orientation: "landscape",
  },
  {
    id: "team-photo",
    src: "/images/news-web/recruitment/team-photo.webp",
    alt: "Đội ngũ kỹ sư và công nhân cơ điện BT DECOM tại công trình",
    caption: "Đội ngũ kỹ sư & công nhân kỹ thuật BT DECOM đồng hành trên các công trình trọng điểm",
    orientation: "landscape",
  },
  {
    id: "construction-1",
    src: "/images/news-web/recruitment/construction-1.webp",
    alt: "Kỹ sư và công nhân BT DECOM thi công lắp đặt hệ thống đường ống cấp thoát nước",
    caption: "Thi công lắp đặt chính xác hệ thống ống cấp thoát nước kỹ thuật cao",
    orientation: "portrait",
  },
  {
    id: "construction-2",
    src: "/images/news-web/recruitment/construction-2.webp",
    alt: "Công nhân BT DECOM kết nối và định vị đường ống hạ tầng ngầm",
    caption: "Thi công kết nối mạng lưới ống ngầm tại hiện trường công trường",
    orientation: "portrait",
  },
  {
    id: "construction-3",
    src: "/images/news-web/recruitment/construction-3.webp",
    alt: "Hệ thống đường ống cấp thoát nước kỹ thuật hoàn thiện bởi BT DECOM",
    caption: "Hệ thống đường ống kỹ thuật hoàn thiện theo tiêu chuẩn chất lượng khắt khe",
    orientation: "portrait",
  },
  {
    id: "recruitment-sign",
    src: "/images/news-web/recruitment/recruitment-sign.webp",
    alt: "Biển thông tin tuyển dụng trực tiếp của Công ty BT DECOM",
    caption: "Biển tuyển dụng trực tiếp 'Người thật – Việc thật' tại Trung tâm Dịch vụ Việc làm Hà Nội",
    orientation: "portrait",
  },
];
