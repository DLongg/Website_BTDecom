const fs = require('fs');
const path = require('path');

const data = `
2013
Thi công xây lắp hạng mục chiếu sáng thuộc dự án xây dựng "Hệ thống chiếu sáng kiến trúc cầu vượt Chùa Bộc - Thái Hà" | Công ty TNHH một thành viên phát triển công nghệ và hạ tầng - Newtatco | Đã hoàn thành
Thi công xây lắp hạng mục chiếu sáng thuộc dự án xây dựng "Hệ thống chiếu sáng kiến trúc cầu vượt Láng Hạ - Thái Hà" | Công ty TNHH một thành viên phát triển công nghệ và hạ tầng - Newtatco | Đã hoàn thành
Thi công xây lắp hạng mục chiếu sáng thuộc dự án xây dựng "Hệ thống chiếu sáng kiến trúc cầu vượt Nam Hồng" | Công ty TNHH một thành viên phát triển công nghệ và hạ tầng - Newtatco | Đã hoàn thành
Thi công và lắp đặt thiết bị điện, chống sét thuộc dự án "Tòa nhà chung cư Newtatco" | Công ty TNHH một thành viên phát triển công nghệ và hạ tầng - Newtatco | Đã hoàn thành
Thi công xây lắp hạng mục chiếu sáng tuộc dự án "Xây dựng cầu vượt tại nút giao đường Đại Cồ Việt - đường Trần Khát Chân" | Công ty TNHH một thành viên phát triển công nghệ và hạ tầng - Newtatco | Đã hoàn thành
Thi công xây lắp trạm biến áp 750 KVA, Máy phát điện dự phòng 100 KVA và tuyến cáp ngầm 24KV thuộc Khu Liên hợp phát triển phụ nữ Hà Nội | Công ty TNHH một thành viên phát triển công nghệ và hạ tầng - Newtatco | Đã hoàn thành
Thi công lắp đặt hệ thống chiếu sáng trên cầu và hệ thống chiếu sáng kiến trúc thuộc dự án "Xây dựng cầu vượt tại nút giao đường Kim Mã - Nguyễn Chí Thanh" ( Nút giao Daewoo) | Công ty TNHH một thành viên phát triển công nghệ và hạ tầng - Newtatco | Đã hoàn thành
2014
Thi công xây dựng tuyến cáp ngầm trung thế 35KV thuộc công trình: "Xây dựng hệ thống cấp nước sạch cho thị trấn Yên Viên và các xã lân cận thuôc khu vực Bắc Đuống" - Hạng mục: Trạm biến áp nhà máy Yên Viên, Trạm biến áp nhà máy Yên Viên 1, Trạm biến áp nhà máy Yên Viên 4 | Công ty TNHH một thành viên phát triển công nghệ và hạ tầng - Newtatco | Đã hoàn thành
2015
Thi công xây lắp "Hệ thống điện trong nhà" thuộc gói thầu 02 "Thi công phâng thô Phần Hoàn thiện và M&E Nhà CT15-CT16" Dự án "Xây dựng nhà ở xã hội cho cán bộ, công chức có thu nhập thấp của bộ tài chính" | Trung tâm xây Lắp Điện HHPD - Chi nhánh HBT Công ty TNHH Một thành viên phát triển khu công nghệ cao Hòa lạc | Đã hoàn thành
Thi công xây dựng tuyến cáp ngầm trung thế 24KV từ trạm biến áp 110KV E1.9 Nghĩa Đô về dự án ( Dự án Khu đô thị "Thành phố giaoo lưu" | Trung tâm xây Lắp Điện HHPD - Chi nhánh HBT Công ty TNHH Một thành viên phát triển khu công nghệ cao Hòa lạc | Đã hoàn thành
Cung cấp và lắp đặt thiết bị hệ thống điện dự án xây dựng Trung tâm quản lý và khai thác hạ tầng Khu công nghệ cao Hòa Lạc | Trung tâm xây Lắp Điện HHPD - Chi nhánh HBT Công ty TNHH Một thành viên phát triển khu công nghệ cao Hòa lạc | Đã hoàn thành
2016
Nâng cấp, cải tạo doanh trại khu vực Bạch Mai-HVKHQS/TCII | Công ty TNHH một thành viên ứng dụng công nghệ mới và du lịch | Đã hoàn thành
2017
Thi công xây dựng hệ thống cấp thoát nước nhà xưởng, cấp nước trạm bơm, cấp nước ngoài nhà, thiết bị, dự án "Trung tâm thương mại, dịch vụ và giới thiệu sản phẩm nội thất HHPD" | Xí nghiệp xây lắp HHPD - CN CT TNHH MTV phát triển khu CNC Hòa Lạc | Đã hoàn thành
Thi công hạng mục "Hệ thống cấp nguồn trung thế và chiếu sáng hạ tầng kỹ thuật", công trình "Đầu tư và kinh doanh hạ tầng kỹ thuật Khu phần mềm - Khu CNC Hòa Lạc" | Xí nghiệp quản lý và xây lắp cơ điện HHPD - CN CT TNHH MTV phát triển khu CNC Hòa Lạc | Đã hoàn thành
Lắp đặt hệ thống ống kết nối máy với máy nén khí, máy sấy và lọc khí, công trình "Trung tâm thương mại, dịch vụ và giới thiệu sản phẩm nội thất HHPD" | Công ty TNHH MTV ứng dụng công nghệ mới và du lịch | Đã hoàn thành
2018
Thi công lắp đặt hệ thống điện, điều hòa cho công trình: "Cải tạo sửa chữa văn phòng trụ sở Công ty TNHH MTV phát triển khu CNC Hòa Lạc" | Ban quản lý các dự án HHPD - CN CT TNHH MTV phát triển khu CNC Hòa Lạc | Đã hoàn thành
Thi công hạng mục "Hệ thống cấp nguồn trung thế và chiếu sáng hạ tầng kỹ thuật", công trình "Đầu tư và kinh doanh hạ tầng kỹ thuật Khu phần mềm - Khu CNC Hòa Lạc" | Xí nghiệp quản lý và xây lắp cơ điện HHPD - CN CT TNHH MTV phát triển khu CNC Hòa Lạc | Đang thực hiện
Cung cấp và thi công xây lắp "Hệ thống điện", gói thầu "Cung cấp và lắp đặt hệ thống M&E", công trình "Nhà CT12", dự án "Xây dựng khu nhà ở thương mại (Giai đoạn 1)" | Xí nghiệp quản lý và xây lắp cơ điện HHPD - CN CT TNHH MTV phát triển khu CNC Hòa Lạc | Đã hoàn thành
Thi công cấp thoát nước dự án "Đầu tư xây dựng Trường mầm non Koala house Phùng Khoang" | Công ty CP đầu tư và thương mại Minh Việt | Đã hoàn thành
Cung cấp Chế phẩm hữu cơ Enchoice tổng hợp - Xử lý môi trường có nguồn gốc tại úc | Sở Tài nguyên và Môi trường Thanh Hóa | Đã hoàn thành
2019
Thi công hệ thống cấp thoát nước chung, cấp thoát nước căn hộ, dự án: “Nhà công vụ Tổng cục II tại Liên Mạc (giai đoạn 2)” | Công ty TNHH MTV phát triển khu CNC Hòa Lạc | Đã hoàn thành
Thi công Hệ thống điện gói thầu XL-02: Xây dựng nhà công vụ 18 tầng, dự án: Nhà công vụ Tổng cục II tại Liên Mạc (giai đoạn 2) | Xí nghiệp quản lý và xây lắp cơ điện HHPD - CN CT TNHH MTV phát triển khu CNC Hòa Lạc | Đã hoàn thành
Hạng mục: Hệ thống điện, nước nhà văn phòng, công trình: Nhà xưởng sản xuất Công ty CP kỹ thuật công nghiệp á Châu | Xí nghiệp quản lý và xây lắp cơ điện HHPD - CN CT TNHH MTV phát triển khu CNC Hòa Lạc | Đã hoàn thành
2020
Cung cấp, lắp đặt hệ thống điện, nước, công trình: Bảo tàng Tổng cục II | Xí nghiệp quản lý và xây lắp cơ điện HHPD - CN CT TNHH MTV phát triển khu CNC Hòa Lạc | Đã hoàn thành
2021
Thi công xây lắp hệ thống điện nước phụ trợ thuộc gói thầu số 16 Dự án T1 | Ban quản lý các dự án HHPD - CN CT TNHH MTV phát triển khu CNC Hòa Lạc | Đã hoàn thành
Thi công xây lắp hệ thống điện thuộc gói thầu số 16 Dự án T1 | Xí nghiệp quản lý và xây lắp cơ điện HHPD - CN CT TNHH MTV phát triển khu CNC Hòa Lạc | Đã hoàn thành
Thi công xây lắp hệ thống cấp thoát nước trong nhà thuộc gói thầu số 16 Dự án T1 tại Thanh Liệt, Thanh Trì, Hà Nội | Công ty TNHH MTV phát triển khu CNC Hòa Lạc | Đã hoàn thành
Thi công hạng mục cấp nước, công trình: Gói thầu XL-04: Cải tạo, chỉnh trang hạ tầng cơ sở toàn khu nhà công vụ Tổng cục tại Liên Mạc; Đấu nối nguồn cấp nước cho dự án và lắp đặt biển tên tầng, nhà cho các căn hộ | Công ty TNHH MTV phát triển khu CNC Hòa Lạc | Đã hoàn thành
2022
Cung cấp vật tư và thi công hạng mục tủ điện, dây cấp nguồn điều hòa, gói thầu: Cung cấp, lắp đặt hệ thống trang thiết bị phòng máy chủ cục T1 | Xí nghiệp quản lý và xây lắp cơ điện HHPD - CN CT TNHH MTV phát triển khu CNC Hòa Lạc | Đã hoàn thành
2023
Tuyến cáp và cấp nguồn thi công trường Trần Quốc Tuấn (Mỹ Đình II), địa điểm: Đường Mỹ Đình II | Ban quản lý các dự án HHPD - CN CT TNHH MTV phát triển khu CNC Hòa Lạc | Đã hoàn thành
Hệ thống điện trong nhà, công trình Trung tâm phát triển phần mềm ITERA - Giai đoạn 1 | Xí nghiệp quản lý và xây lắp cơ điện HHPD - CN CT TNHH MTV phát triển khu CNC Hòa Lạc | Đang thực hiện
Thi công xây lắp hệ thống chống sét, tiếp địa ngoài nhà công trình Trung tâm phát triển phần mềm ITERA - Giai đoạn 1 | Xí nghiệp quản lý và xây lắp cơ điện HHPD - CN CT TNHH MTV phát triển khu CNC Hòa Lạc | Đã hoàn thành
2024
Cung cấp vật tư thiết bị và thi công hạng mục điện trong nhà. Gói thầu HH-01: Công trình A22 | Xí nghiệp quản lý và xây lắp cơ điện HHPD - CN CT TNHH MTV phát triển khu CNC Hòa Lạc | Đã hoàn thành
Cung cấp vật tư và lắp đặt hệ thống cấp thoát nước. Gói thầu HH – 01: Công trình A22 | Công ty TNHH MTV phát triển khu CNC Hòa Lạc | Đã hoàn thành
Cải tạo nhà thể chất thành nhà ăn 3 tầng; Cải tạo khu nhà đa năng; Công trình: A22 | Xí nghiệp quản lý và xây lắp cơ điện HHPD - CN CT TNHH MTV phát triển khu CNC Hòa Lạc | Đã hoàn thành
`;

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes
}

function getCategory(name) {
  name = name.toLowerCase();
  if (name.includes('chiếu sáng')) return { cat: 'lighting', label: 'Chiếu sáng' };
  if (name.includes('trạm biến áp') || name.includes('cáp ngầm')) return { cat: 'substation', label: 'Trạm biến áp' };
  if (name.includes('điện') || name.includes('cơ điện')) return { cat: 'me', label: 'Cơ điện M&E' };
  if (name.includes('nước') || name.includes('thoát nước')) return { cat: 'me', label: 'Cấp thoát nước' };
  return { cat: 'electrical', label: 'Xây lắp' };
}

const destDir = path.join(__dirname, '..', 'src', 'content', 'projects');

// Clean directory
if (fs.existsSync(destDir)) {
  fs.readdirSync(destDir).forEach(f => fs.unlinkSync(path.join(destDir, f)));
} else {
  fs.mkdirSync(destDir, { recursive: true });
}

let currentYear = "";
let counter = 1;

data.split('\n').forEach(line => {
  line = line.trim();
  if (!line) return;
  if (/^20\d\d$/.test(line)) {
    currentYear = line;
    return;
  }

  const parts = line.split(' | ');
  if (parts.length < 3) return;

  const fullName = parts[0].trim();
  const client = parts[1].trim();
  const status = parts[2].trim();

  // Tạo tên ngắn gọn cho project name hiển thị to
  let shortName = fullName.split('thuộc')[0].split('công trình')[0].split('dự án')[0].trim();
  if (shortName.length > 80) shortName = shortName.substring(0, 80) + '...';

  const { cat, label } = getCategory(fullName);
  const slug = slugify(shortName) + '-' + counter;

  // Placeholder ảnh dựa theo category để demo đẹp mắt
  let image = "https://images.unsplash.com/photo-1541888081622-1ce4471fbdab?w=800&q=80";
  if (cat === 'lighting') image = "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=800&q=80";
  if (cat === 'substation') image = "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80";
  if (cat === 'me') image = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80";

  const content = [
    '---',
    'id: "' + counter + '"',
    'name: "' + shortName.replace(/"/g, "'") + '"',
    'location: "Hà Nội"', // Default
    'category: "' + cat + '"',
    'categoryLabel: "' + label + '"',
    'shortDescription: "Dự án thi công ' + label.toLowerCase() + ' (' + status + ')"',
    'image: "' + image + '"',
    'gallery: []',
    'client: "' + client.replace(/"/g, "'") + '"',
    'area: "Đang cập nhật"',
    'year: "' + currentYear + ' - ' + status + '"',
    '---',
    '',
    '## Giới thiệu dự án',
    '',
    '**Nội dung hợp đồng chi tiết:**',
    fullName,
    '',
    '*(Bạn có thể thay đổi và thêm hình ảnh thi công thực tế vào đây)*',
    '',
    '![Ảnh 1](/images/projects/placeholder.jpg)',
    ''
  ].join('\n');

  fs.writeFileSync(path.join(destDir, slug + '.md'), content);
  counter++;
});

console.log('Generated ' + (counter - 1) + ' new projects based on client data.');
