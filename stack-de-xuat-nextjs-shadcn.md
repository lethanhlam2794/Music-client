# Stack đề xuất cho Next.js 16

## Công nghệ sử dụng

| Phần | Dùng gì |
| --- | --- |
| Styling | Tailwind CSS (thay CSS Modules) |
| Component base | shadcn/ui — chạy `npx shadcn@latest init`, sau đó thêm các component cần dùng |
| Icon | `lucide-react` (shadcn sử dụng mặc định) |
| Form và validation | `react-hook-form` + `zod` |
| Table nâng cao | `@tanstack/react-table` kết hợp với shadcn Table để hỗ trợ sort, filter và phân trang |
| Component không có sẵn trong shadcn | Tự viết thêm và style bằng Tailwind theo các token có sẵn, ví dụ: chart hoặc date range picker phức tạp |

## Cách setup nhanh

```bash
npx shadcn@latest init
# Chọn: TypeScript, Tailwind, CSS variables = yes

npx shadcn@latest add button input card dialog table badge label textarea select form
```

## Cấu trúc thư mục

Giữ nguyên cấu trúc thư mục cũ, chỉ thay đổi công nghệ sử dụng bên trong:

```text
src/
├── components/
│   ├── ui/         ← thay bằng shadcn components, được generate tự động vào đây
│   ├── layout/     ← Header, Sidebar, Footer... viết bằng Tailwind classes
│   └── shared/     ← DataTable và FormField dùng chung
├── templates/      ← DashboardTemplate, ListPageTemplate, AuthTemplate
└── app/
    └── globals.css ← CSS variables do shadcn generate: màu sắc, radius...
```

Trong đó:

- `DataTable`: ráp từ shadcn Table và `@tanstack/react-table`.
- `FormField`: ráp từ `react-hook-form` và shadcn Form.
- Các template vẫn giữ nguyên ý tưởng cũ, nhưng chuyển từ CSS Modules sang Tailwind CSS.

## Điểm mấu chốt để rebrand nhanh cho từng khách hàng

Sau khi khởi tạo shadcn, chỉnh các CSS variables trong `app/globals.css`:

```css
:root {
  --primary: ...;
  --radius: ...;
}
```

Đây là nơi tập trung các **design token** của hệ thống. Khi cần tạo theme cho khách hàng mới, chỉ cần thay đổi màu sắc, bán kính bo góc và các biến liên quan tại đây. Cách này giữ được ý tưởng của `tokens.ts` ban đầu nhưng gọn hơn vì shadcn đã tạo sẵn cấu trúc biến.

## Hướng triển khai

Chạy hai lệnh `init` và `add` ở trên trong project Next.js 16 hiện tại để tạo bộ khung. Sau đó, ráp lại ba template:

1. `DashboardTemplate`
2. `ListPageTemplate`
3. `AuthTemplate`

Các template sử dụng component shadcn thay cho component tự viết và dùng Tailwind CSS thay cho CSS Modules.
