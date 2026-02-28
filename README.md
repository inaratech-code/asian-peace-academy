# Asian Peace & Leadership Academy

A premium academy website built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Content is managed via local JSON files and an admin panel with JWT authentication.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment variables**

   Copy `.env.example` to `.env.local` and set:

   - `ADMIN_USERNAME` – admin login username (default: admin)
   - `ADMIN_PASSWORD` – admin login password (default: admin123)
   - `JWT_SECRET` – secret for JWT signing (use a long random string in production)

3. **Run development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin) (login with credentials from `.env.local`).

## Structure

- **`/app`** – App Router pages and API routes
- **`/app/(site)`** – Public pages (Home, About, Programs, Apply, Blog, Contact) with shared layout
- **`/app/admin`** – Protected admin dashboard (content, programs, blog CRUD)
- **`/components`** – Reusable UI (Navbar, Footer, Hero, ProgramCard, BlogCard, etc.)
- **`/data`** – JSON CMS: `content.json`, `programs.json`, `blog.json`
- **`/lib`** – `auth.ts` (JWT), `fileHandler.ts` (read/write JSON)

## Features

- **Public site**: Hero, about preview, programs grid, testimonials, blog, CTA, apply form, contact form
- **Admin**: Login (JWT cookie), edit homepage content, add/edit/delete programs and blog posts
- **Design**: White + soft blue palette, Framer Motion animations, responsive, Inter font
- **SEO**: Metadata API, semantic HTML

## Deploy (Vercel)

1. Push to GitHub and import in Vercel.
2. Set env vars: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET`.
3. Note: JSON files in `/data` are read/written at build and runtime; for persistent edits on Vercel you’d typically switch to a database or Vercel KV.

## Scripts

- `npm run dev` – Development server
- `npm run build` – Production build
- `npm run start` – Start production server
- `npm run lint` – Run ESLint
