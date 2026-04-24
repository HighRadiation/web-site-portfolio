# Academic Portfolio | Buğra Öksüz

A high-performance, minimalist academic portfolio built with **Next.js 16**, **React 19**, and **Supabase**. Designed for researchers and engineers who value academic rigor and production-grade engineering.

## 🚀 Key Features

- **Next.js 16 & Server Components**: Leveraging the latest Next.js features for optimal performance and SEO.
- **Supabase Integration**: Full-stack capabilities including Database, Auth, and Server-Side Rendering (SSR) support.
- **Academic Minimalism**: A premium, clean design focused on typography (Inter & Source Serif 4) and content clarity.
- **Scalar API Documentation**: Interactive and modern API documentation available at `/docs`, protected via middleware.
- **Smart Contact Form**: Integrated with **Upstash Redis** for robust rate-limiting and anti-spam protection.
- **Admin Suite**: Custom `/api/admin` endpoints for real-time portfolio management, secured with Supabase Auth.
- **Performance Optimized**: Vanilla CSS for styling to ensure maximum control and zero bloat.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL & Auth)
- **Security**: [Upstash Redis](https://upstash.com/) (Rate Limiting)
- **Documentation**: [Scalar](https://scalar.com/) (OpenAPI 3.0)
- **Styling**: Vanilla CSS with Design Tokens
- **Deployment**: [Vercel](https://vercel.com/)

## 📖 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/HighRadiation/web-site-portfolio.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env.local` file with the following variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   UPSTASH_REDIS_REST_URL=your_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_redis_token
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 🛡 Security & Middleware

The project uses a custom `proxy.ts` (Next.js Middleware) to protect sensitive routes:
- `/admin/*`: Restricted to authenticated users.
- `/docs`: Restricted to authorized developers.

---
Built with rigor by [Buğra Öksüz](https://www.bugraoksuz.me/).
