# Music Client

A Next.js music client (trang chủ, thể loại, đăng nhập/đăng ký, upload, thích, phát nhạc)
được refactor để dùng design-system nội bộ dựa trên **shadcn/ui + Tailwind CSS v4**.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (base-nova) — design tokens qua biến CSS
- **Redux Toolkit** — auth/music state
- **axios** — HTTP client tập trung (`src/lib/api/http-client.ts`)
- **react-hook-form** + **zod** — form & validation
- **@tanstack/react-table** — bảng nâng cao
- **Vitest** + **React Testing Library** + **jsdom** — unit/component tests

## Yêu cầu

- Node >= 22
- Yarn

## Scripts

```bash
yarn dev          # dev server
yarn build        # production build
yarn start        # chạy build
yarn lint         # eslint (yêu cầu 0 warning: yarn lint --max-warnings=0)
yarn test         # chạy unit/component tests (vitest run)
yarn test:unit    # alias của yarn test
yarn test:watch   # vitest watch mode
```

## Cấu hình môi trường

Copy file mẫu và cập nhật giá trị:

```bash
cp .env.example .env.local
```

| Biến | Mặc định | Mục đích |
|------|----------|----------|
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:3002` | Base URL của backend API |

API base URL được đọc tập trung qua `src/lib/config/env.ts` (`apiBaseUrl`) —
không hardcode URL trong component/route.

## Cấu trúc thư mục

```
src/
├── app/                 # Route App Router (page.tsx mỏng, delegate vào feature client)
│   ├── page.tsx         # Trang chủ → HomePageClient
│   ├── tag/             # Thể loại + [genre] → GenreIndex/DetailPageClient
│   ├── login/ register/ music/   # Auth + upload
├── components/
│   ├── ui/              # shadcn/ui (button, input, card, dialog, table, ...)
│   ├── shared/          # FormField primitive dùng chung
│   ├── layout/          # Header, Sidebar, Footer, PageContainer
│   ├── music/           # MusicCard, MusicGrid, MusicHero, GenreTileGrid, MusicPlayer, ...
│   ├── navigation/      # AppNavigation, UserMenu (thay NavHome/NavHomeTop cũ)
│   ├── login/ register/ # Form auth
├── features/
│   ├── auth/            # auth-api, auth-types, auth-validation, use-auth-session
│   ├── music/           # music-api, music-types, use-music-list, use-like-toggle, upload/
│   ├── player/          # use-audio-player, format-time, player-types
│   ├── genres/          # GENRES, GenreIndex/DetailPageClient
│   ├── home/            # HomePageClient
├── lib/
│   ├── config/          # env.ts (apiBaseUrl)
│   ├── auth/            # token-storage (SSR-safe)
│   ├── api/             # http-client (axios + interceptor)
│   └── utils.ts         # cn() helper
├── redux/               # LoginSlice, RegisterSlice, MusicSlice
└── api/music/music.api.ts  # re-export tương thích cho API nhạc
```

## Design-system shadcn

- Component sinh ra bởi shadcn được đặt tại `src/components/ui`.
- Token (màu, radius, border) định nghĩa trong `src/app/globals.css` qua biến CSS shadcn.
- Styling dùng Tailwind utility + token (`bg-primary`, `text-muted-foreground`, ...).
- Thư mục `design-system/` gốc (CSS Modules cũ) được giữ lại làm **tham khảo lịch sử**,
  không còn được import bởi runtime app.

## Testing

- Test chạy với **Vitest** + **jsdom**; file nằm trong `tests/unit/*`.
- `tests/setup.tsx` mock `next/navigation`, `next/image`, và reset mocks giữa các test.
- Thư mục `tests/` được loại trừ khỏi type-check của `next build`.
- E2E Playwright chưa được thêm (route smoke được phủ bằng unit/component + manual QA).

## Lưu ý refactor

- `/streammusic` route cũ là placeholder chết và đã được xóa; player chạy inline
  qua `NowPlayingBar` + `MusicPlayer` (hook `useAudioPlayer`).
- `react-bootstrap` và `react-icons` đã gỡ bỏ (không còn import).
