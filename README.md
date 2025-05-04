# Aplikasi Batika

Aplikasi pembelajaran interaktif berbasis Next.js.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Konfigurasi Penyimpanan Supabase

Aplikasi ini menggunakan Supabase untuk mengelola penyimpanan file (gambar, thumbnail, dll). Untuk mengatur Supabase, lakukan langkah-langkah berikut:

1. Buat akun di [Supabase](https://supabase.io)
2. Buat project baru
3. Dapatkan URL dan Anon Key dari Settings > API
4. Buat bucket bernama `batik-assets` di Storage
5. Atur kebijakan akses bucket agar bisa publik (atau sesuai kebutuhan)
6. Salin file `.env.local.example` ke `.env.local` dan isi dengan kredensial Supabase Anda:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Menggunakan Komponen Upload Gambar

Aplikasi ini menyediakan komponen `ImageUpload` yang memudahkan upload gambar:

```jsx
import ImageUpload from '@/components/ui/image-upload';

// Di dalam komponen React
const [imageUrl, setImageUrl] = useState(null);
const [isUploading, setIsUploading] = useState(false);

<ImageUpload
  value={imageUrl}
  onChange={setImageUrl}
  onUploading={setIsUploading}
  folder="my-custom-folder"
  maxSizeMB={2}
  className="h-64"
/>
```

## Struktur Project

- `components/` - UI components
- `lib/` - Library utilities & API
  - `supabase.ts` - Utilitas Supabase untuk upload file
- `app/` - Router & halaman aplikasi
- `public/` - Static assets

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
