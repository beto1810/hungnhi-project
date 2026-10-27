# Hùng Nhi — Website demo

Bản demo giao diện website Hùng Nhi, xây dựng bằng React và Vite. Đây là bản để xem và duyệt thiết kế, độc lập với storefront Haravan hiện tại.

**Demo:** https://beto1810.github.io/hungnhi-project/

## Chạy cục bộ

Yêu cầu Node.js 22.12+ hoặc 24+.

```bash
npm ci
npm run dev
```

## GitHub Pages

Mỗi lần push lên `main`, workflow `.github/workflows/deploy.yml` build và phát hành lên GitHub Pages. Repository cần cho phép Actions và chọn Pages → Source → GitHub Actions.

```bash
VITE_GITHUB_PAGES=true npm run build
npm run preview
```

Đường dẫn ảnh có base `/hungnhi-project/`. Bản Pages dùng hash routing để mở/chia sẻ/tải lại các trang con mà không gặp lỗi 404; ví dụ `/#/san-pham/tosli23062`. Bản chạy cục bộ mặc định giữ đường dẫn thông thường.

## Phạm vi demo

- Trang chủ, Giới thiệu, 12 nhóm danh mục, sản phẩm, Thương hiệu, 4 Giải pháp, Liên hệ và yêu cầu báo giá.
- 8 sản phẩm mẫu TOTAL, 32 ảnh gallery gốc, phóng lớn và bảng thông số chính/chi tiết.
- Tìm kiếm/lọc trong dữ liệu mẫu và danh sách báo giá lưu trên trình duyệt.
- Form minh họa: chưa có backend tiếp nhận. Không báo gửi thành công giả và không gửi dữ liệu khách ra ngoài. Zalo chưa cấu hình tài khoản chính thức.
- Ảnh mặt tiền có retouch; ảnh bối cảnh công việc là hình minh họa AI. Một số model trong dữ liệu nguồn còn cần đối chiếu khi báo giá.

Repository chỉ gồm mã nguồn và tài nguyên chạy demo. Không gồm mật khẩu storefront, phiên trình duyệt, bản chụp rà soát hay workbook nội bộ. Không sử dụng demo để xác nhận giá, tồn kho hoặc thông số đã được công ty duyệt.
