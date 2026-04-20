# Portfolio Website Backend Planı

Bu doküman, kişisel portfolio web sitesi backend geliştirmesine hızlı ve net bir başlangıç sağlamak için hazırlanmıştır.

## 1) Hedefler

- Proje, deneyim, yetenek, eğitim ve iletişim bilgilerini API üzerinden sunmak
- Admin paneli/araçları için güvenli içerik yönetimi sağlamak
- Medya (profil fotoğrafı, proje görselleri, CV) dosyalarını yönetmek
- Gelecekte ölçeklenebilir ve sürdürülebilir mimari kurmak

## 2) Önerilen Teknoloji Stack

- Runtime: Node.js (LTS)
- Framework: NestJS veya Express + TypeScript
- Veritabanı: PostgreSQL
- ORM: Prisma (önerilir) veya TypeORM
- Auth: JWT (access + refresh), admin için role-based kontrol
- Dosya depolama: Local (başlangıç), sonra S3 uyumlu depolama
- API standardı: REST (v1 prefix ile)
- Dokümantasyon: OpenAPI/Swagger
- Dağıtım: Docker + reverse proxy (Nginx/Caddy)

## 3) Domain Modeli (Temel Varlıklar)

### User (Admin)
- `id` (uuid)
- `email` (unique)
- `passwordHash`
- `role` (`admin`)
- `createdAt`, `updatedAt`

### Profile
- `id` (uuid)
- `fullName`
- `title` (örn. Flutter Developer)
- `bio`
- `location`
- `email`
- `phone` (opsiyonel)
- `avatarUrl`
- `cvUrl`
- `socialLinks` (json: github, linkedin, x, medium vb.)
- `updatedAt`

### Project
- `id` (uuid)
- `slug` (unique)
- `title`
- `summary`
- `description` (rich text/markdown)
- `techStack` (string[])
- `repoUrl` (opsiyonel)
- `liveUrl` (opsiyonel)
- `coverImageUrl`
- `gallery` (string[])
- `featured` (bool)
- `status` (`draft` | `published`)
- `publishedAt` (opsiyonel)
- `createdAt`, `updatedAt`

### Experience
- `id` (uuid)
- `company`
- `position`
- `startDate`
- `endDate` (null olabilir)
- `description`
- `isCurrent`
- `order`

### Education
- `id` (uuid)
- `school`
- `degree`
- `field`
- `startDate`
- `endDate` (opsiyonel)
- `description`
- `order`

### Skill
- `id` (uuid)
- `name`
- `level` (`beginner` | `intermediate` | `advanced` | `expert`)
- `category` (Frontend, Mobile, Backend, DevOps vb.)
- `order`

### ContactMessage
- `id` (uuid)
- `name`
- `email`
- `subject`
- `message`
- `ip` (opsiyonel, abuse analizi için)
- `status` (`new` | `read` | `replied` | `archived`)
- `createdAt`

## 4) API Tasarımı (REST, `/api/v1`)

### Public Endpoints
- `GET /profile`
- `GET /projects?featured=true&status=published`
- `GET /projects/:slug`
- `GET /experiences`
- `GET /education`
- `GET /skills`
- `POST /contact`

### Admin Auth
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /auth/me`

### Admin CRUD
- `PUT /admin/profile`
- `POST /admin/projects`
- `PUT /admin/projects/:id`
- `DELETE /admin/projects/:id`
- `POST /admin/experiences`
- `PUT /admin/experiences/:id`
- `DELETE /admin/experiences/:id`
- `POST /admin/education`
- `PUT /admin/education/:id`
- `DELETE /admin/education/:id`
- `POST /admin/skills`
- `PUT /admin/skills/:id`
- `DELETE /admin/skills/:id`
- `GET /admin/contact-messages`
- `PATCH /admin/contact-messages/:id/status`

## 5) Güvenlik Gereksinimleri

- Şifre hashleme: `bcrypt` veya `argon2`
- Rate limiting: özellikle `POST /contact` ve login endpointleri
- Input validation: Zod/Joi/class-validator
- CORS: sadece izinli originler
- Helmet ve güvenlik header’ları
- SQL Injection/XSS için ORM + sanitize yaklaşımı
- Dosya upload doğrulama (boyut, mime-type)
- Environment variable yönetimi (`.env`, secret manager)

## 6) Validasyon ve Hata Yönetimi

- Tüm request body/query/params için şema doğrulama
- Standart hata formatı:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request body",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

- Global exception middleware/filter kullanımı

## 7) Başlangıç Veritabanı Şeması Notları

- Tüm tablolar için `uuid` primary key
- `createdAt/updatedAt` standart alanlar
- `projects.slug` unique index
- `contact_messages.createdAt` index
- Sıralanacak alanlarda (`order`) index

## 8) Geliştirme Aşamaları (Milestone)

1. **MVP**
   - Profile + Projects + Skills + Contact endpointleri
   - Admin login + project yönetimi
2. **V1**
   - Experience/Education CRUD
   - Medya upload
   - Contact message yönetimi
3. **V2**
   - Audit log
   - Çoklu dil desteği
   - Cache (Redis)

## 9) Ortam Değişkenleri (Örnek)

- `PORT`
- `DATABASE_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `CORS_ORIGINS`
- `STORAGE_PROVIDER`
- `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`

## 10) Kabul Kriterleri

- Public endpointler frontend’in ihtiyaç duyduğu tüm portfolio verisini dönebilmeli
- Admin dışı kullanıcılar admin endpointlerine erişememeli
- Contact endpointi spam/rate limit korumalı olmalı
- Swagger dokümantasyonu güncel olmalı
- Temel testler (unit + integration) kritik akışları kapsamalı
