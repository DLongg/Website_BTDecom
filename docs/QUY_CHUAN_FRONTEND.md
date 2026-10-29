# Quy chuẩn frontend BT DECOM

Cập nhật 12/10/2026 theo bản sửa trang chủ. Hero, phần Tin Tức & Sự Kiện, dải khách hàng/đối tác và CTA được giữ lại giao diện ban đầu theo yêu cầu người dùng.
Cập nhật 29/10/2026: Bổ sung quy chuẩn chuẩn mực cho Trang Dự án (`/projects` và `/projects/[slug]`).

## Màu và font

| Token | Giá trị | Vai trò |
| --- | --- | --- |
| `brand-primary`, alias `brand-gold` | `#2E7D32` | Nút và liên kết trên nền sáng |
| `brand-gold-light`, `brand-gold-dark` | `#1B5E20` | Hover và pressed |
| `brand-accent` | `#4ADE80` | Điểm nhấn trên nền tối |
| `brand-dark` | `#1A2332` | Chữ chính, nền Hero/CTA/Footer |
| `brand-light` | `#F7F8F7` | Nền phụ |
| `gray-600` | `#4B5563` | Nội dung phụ trên nền sáng |

Giữ Montserrat cho tiêu đề, Inter cho nội dung. `next/font` gắn biến font trên `html`, ánh xạ bằng `@theme inline`; tránh khai báo alias tại root nhưng biến nguồn chỉ có trên body.

| Thành phần | Quy chuẩn trang chủ |
| --- | --- |
| H1 Hero cũ | 32 px mobile; tăng qua breakpoint đến 80 px desktop lớn; weight 700 |
| H2 `home-heading` | `clamp(1.625rem, 2.7vw, 2.5rem)`, weight 600, line-height 1.2 |
| Tên dịch vụ/dự án | 18–24 px tùy khối, weight 500–600 |
| Nội dung mới | 16–18 px, line-height khoảng 1.6 |
| Metadata | 13–14 px |

Dùng sentence case; cân bằng dòng tiêu đề. Màu xanh sáng chỉ dùng trên nền tối.

## Bố cục

- Không dùng `zoom` toàn trang hoặc che tràn ngang bằng `overflow-x: hidden` trên body.
- `site-container`: tối đa 1.280 px, lề 20 px trên mobile, 24 px từ 768 px.
- `home-section`: khoảng đệm dọc 48 px mobile, 80 px từ 768 px.
- Header cao 72 px mobile, 88 px desktop. Trang con tiếp tục có padding bù fixed header.
- Hero giữ video nền và slider cũ; `h-svh`, min-height 640 px. Slider ẩn dưới 1.024 px; nút “Xem dự án” thay thế trên mobile.
- Khung nội dung Hero rộng tối đa 1.250 px, căn giữa, padding ngang 16/24 px; video vẫn phủ toàn màn hình. Giới hạn riêng này tránh Hero nở theo breakpoint 1.536 px của `container` trên màn hình laptop lớn.
- Sau Hero: dải số liệu → dịch vụ → 3 dự án → năng lực → tin tức/sự kiện → khách hàng/đối tác → liên hệ → footer.
- Dịch vụ là danh sách hai cột desktop, một cột mobile. Dự án có một mục chính và hai mục bổ sung; không đặt filter ở trang chủ.
- Ảnh các khối mới có tỷ lệ cố định, radius khoảng 8–12 px; không thêm glow, bóng lớn hoặc nền trang trí khi không cần.

## Điều hướng và tương tác

- Header trong suốt ở đầu trang chủ, trắng khi cuộn hơn 50 px hoặc mở menu. Trang khác dùng header trắng.
- Chỉ hiển thị điều khiển có chức năng. Tuyển dụng giữ ở footer; không hiển thị tìm kiếm chưa triển khai.
- `primary-link`: xanh chính, chữ trắng, radius 8 px, cao tối thiểu 44 px; hover xanh đậm, pressed dịch xuống 1 px.
- `text-link`: xanh chính, gạch chân khi hover; cao tối thiểu 44 px.
- Focus-visible viền 3 px, offset 4 px. Skip link “Đến nội dung chính” bỏ qua điều hướng.
- Menu mobile có nhãn và trạng thái ARIA, khóa cuộn nền, giữ focus trong menu, đóng bằng Escape hoặc đổi route và trả focus về nút mở.
- CSS giảm chuyển động tắt smooth scroll và rút ngắn transition/animation. Video và chuyển động Framer Motion của Hero cũ là ngoại lệ được giữ theo yêu cầu.

## Dữ liệu và hành vi

- CTA cuối trang giữ nền tối, ảnh nền cũ với class `absolute inset-0 opacity-20`, bố cục căn giữa và hiệu ứng xuất hiện. Link tư vấn và gọi vẫn dùng đích thật.
- Liên hệ dùng nguồn chung `src/data/contact.ts`; điện thoại `0936 189 292`, email `btdecom@gmail.com`.
- Không dùng form mô phỏng hoặc báo đã gửi khi chưa gửi thật. Hiện gọi và mở ứng dụng email; người dùng tự gửi email.
- Dự án tiêu biểu chọn bằng slug trong `src/data/homepage.ts`; chỉ rút gọn nhãn trang chủ, giữ tên và route ở trang chi tiết. Hero vẫn lấy 5 dự án đầu như trước.
- Năm thành lập 2012; nhân sự theo hồ sơ 2025; 3 đội xây lắp; số hồ sơ được đếm từ Markdown. Không coi số file là tổng công trình đã thực hiện.
- Dải khách hàng/đối tác giữ nguyên bản cũ theo yêu cầu: tiêu đề “Khách hàng & Đối tác chiến lược tiêu biểu”, 5 tên đơn vị chạy ngang và dừng khi hover, class `py-16 md:py-20 bg-white border-y border-gray-100 overflow-hidden`. Không hiển thị thêm logo hoặc lời chứng thực mới.
- Theo yêu cầu ngày 12/10, giữ phần “Tin Tức & Sự Kiện” của bản cũ với 3 bài đầu trong `src/data/news.ts`, bố cục thẻ desktop/mobile và liên kết xem tất cả. Không lọc `status`/`publishedAt`; giữ nguyên dữ liệu và route hiện có.
- Ảnh công trình dùng tài nguyên sẵn có trong repo; WebP tối ưu ở `public/images/home/`. Giữ ảnh gốc và nguồn Markdown.

## Trang Dự án (`/projects` và `/projects/[slug]`)

### 1. Chuẩn hóa danh mục và dữ liệu
- **Nguồn nhãn danh mục duy nhất**: Sử dụng `CATEGORY_LABELS` khai báo trong `src/lib/projects.ts` gồm 4 nhóm chính:
  - `lighting`: "Chiếu sáng"
  - `substation`: "Trạm biến áp & lưới điện"
  - `electrical`: "Hệ thống điện"
  - `me`: "Cơ điện M&E"
- Đồng bộ hiển thị thống nhất trên toàn bộ trang danh sách, thẻ dự án, badge trên trang chi tiết và bộ lọc.
- Thống kê số lượng dự án (`ProjectStats`) được tính toán động từ Markdown thông qua `getProjectStats()`.

### 2. Tối ưu ảnh tĩnh WebP và ngân sách hiệu năng
- **Quy trình tối ưu ảnh tĩnh WebP**: Sử dụng script `scripts/optimize-project-images.mjs` để xử lý và đồng bộ toàn bộ ảnh từ thư mục gốc `public/images/projects/<slug>/` sang `public/images/projects-web/<slug>/`.
- Định dạng hai kích thước chuẩn:
  - `-card.webp` (chiều rộng tối đa 800px, chất lượng 80): phục vụ danh sách `/projects` và các thẻ liên quan.
  - `-full.webp` (chiều rộng tối đa 1600px, chất lượng 85): phục vụ Hero và các khối chi tiết trong bài viết `/projects/[slug]`.
- **Ngân sách ảnh**: Tổng dung lượng tải ảnh trên trang danh sách `/projects` nghiêm ngặt dưới 4 MB (thực tế tối ưu đạt ~2.8 MB cho 26 dự án, giảm >95% so với baseline 57.9 MB ban đầu).

### 3. Quy chuẩn thành phần thẻ `ProjectCard` và bộ lọc danh mục
- **Tỷ lệ khung ảnh**: Khung cố định `aspect-[4/3]`, `overflow-hidden`, bo góc `rounded-xl`.
- **Phân cấp thông tin trên thẻ**:
  - Badge danh mục: kích thước 12px, nền `brand-light`, viền mảnh.
  - Tiêu đề dự án: 18px (`text-lg font-semibold`), giới hạn hiển thị tối đa 2 dòng (`line-clamp-2`).
  - Dòng thông tin phụ: 14px (`text-sm text-neutral-500`), hiển thị Địa điểm và chỉ hiển thị Năm thực hiện (bỏ phần trạng thái tiến độ để đảm bảo ngắn gọn; trạng thái tiến độ chỉ hiển thị trên trang chi tiết).
- **Tối ưu tải trang**: Thẻ `<Link>` sử dụng `prefetch={false}` để tránh kích hoạt tải sớm toàn bộ trang chi tiết và tài nguyên ảnh khi người dùng cuộn qua danh sách.
- **Bộ lọc chip danh mục**:
  - Chiều cao vùng chạm tối thiểu `min-h >= 44px` (đạt chuẩn tiếp cận WCAG cho thiết bị di động).
  - Trạng thái lựa chọn thể hiện rõ bằng `aria-pressed="true|false"` kết hợp màu sắc nhận diện thương hiệu.
  - Cơ chế đồng bộ URL: Đồng bộ query param `?cat=<key>` qua `window.location.search` và `window.history.replaceState` hoàn toàn ở phía client (không dùng `useSearchParams` từ Server Component để bảo toàn khả năng Static HTML Export đầy đủ 26 dự án).

### 4. Quy chuẩn trang chi tiết `/projects/[slug]`
- **SEO & Metadata**: Khai báo hàm động `generateMetadata` trả về `<title>` chuẩn cấu trúc `${project.name} | BT DECOM`, thẻ mô tả `description`, và OpenGraph hình ảnh `article` riêng biệt cho từng dự án.
- **Bố cục Hero**:
  - Chiều cao giới hạn hợp lý: `h-[min(56svh,440px)] md:h-[min(70vh,560px)]` (bỏ chiều cao tĩnh `h-[70vh] min-h-[520px]`).
  - Sử dụng `next/image` với `fill`, `priority`, `sizes="100vw"`.
  - Badge lĩnh vực lấy nhãn canonical từ `CATEGORY_LABELS`, dùng màu thương hiệu chuẩn (`brand-primary`), bỏ bóng đổ nặng và hiệu ứng glow.
  - Bổ sung `id="main-content" tabIndex={-1}` ngay sau `<Header />` để skip-link hỗ trợ bàn phím điều hướng trực tiếp đến nội dung chính.
- **Thanh thông tin (Info Bar)**:
  - Lưới 2 cột trên mobile và 4 cột trên desktop phân cách bằng `gap-px bg-white/10` kết hợp nền `bg-brand-dark` cho từng ô để tránh lỗi đứt viền của `divide-x`.
  - Nhãn thông số tăng lên 13px (`text-[13px] uppercase tracking-wider text-white/70`), icon dùng `brand-accent`, giá trị hiển thị giữ nguyên trạng thái thi công (`project.year`).
- **Khối nội dung bài viết (`<article>`)**:
  - Khử trùng lặp ảnh Hero: Section 01 tuyệt đối không lặp lại ảnh bìa Hero. Ảnh bìa lấy từ `gallery[0]`, các ảnh đưa vào nội dung bắt đầu từ `gallery.slice(1)`. Các dự án chỉ có 1 ảnh duy nhất sẽ hiển thị Section 01 dạng văn bản thuần kỹ thuật.
  - Bỏ toàn bộ hiệu ứng glow mờ trang trí (`blur-2xl`), viền góc không tiêu chuẩn (`border-t-4 border-l-4...`) và class sai quy cách (`direction-rtl`).
  - Toàn bộ ảnh nội dung chuyển sang `next/image` tỉ lệ chuẩn (`aspect-[4/3]` cho editorial, `aspect-[16/10]` cho lưới ảnh bổ sung) với thuộc tính `alt` mô tả rõ ràng theo tên dự án: Section `idx` dùng `${project.name} – ảnh ${idx + 2}`, ảnh dư dùng `${project.name} – ảnh ${sections.length + i + 2}`.
- **Điều hướng và dự án liên quan**:
  - Điều hướng trước/sau: Hiển thị liên kết đến dự án liền kề trước (`Dự án trước: ${prev.name}`) và sau (`Dự án sau: ${next.name}`), có `aria-label` và xử lý biên sạch khi ở dự án đầu hoặc cuối.
  - Khối "Dự án cùng lĩnh vực": Đặt ngay trước `<CTASection />`, gọi `getRelatedProjects(slug, category, 3)` để luôn hiển thị đúng 3 thẻ dự án đại diện trong cùng phân loại (hoặc bổ sung từ phân loại khác nếu thiếu), kèm liên kết "Xem tất cả dự án" dẫn tới bộ lọc tương ứng `/projects?cat=${project.category}`.

## Kiểm tra trước khi bàn giao

Kiểm tra 360, 390, 768, 1.024 và 1.440 px; menu, bàn phím, slider, tăng cỡ chữ, đường dẫn liên hệ và trang con đại diện. Chạy lint và build; phục vụ bản static export để kiểm tra hành vi production. Số đo local chỉ dùng so sánh trong cùng điều kiện, không thay đánh giá hosting thực.

Xem [kết quả sửa trang chủ](KET_QUA_SUA_TRANG_CHU.md) và [kế hoạch đã cập nhật](sửa%20trang%20chủ.md).
