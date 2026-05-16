-- i18n columns for user-facing strings stored in the DB.
-- All `*_tr` columns are optional; fallback to the English column when null.

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS bio_tr TEXT;

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS title_tr TEXT,
  ADD COLUMN IF NOT EXISTS description_tr TEXT;

ALTER TABLE timeline
  ADD COLUMN IF NOT EXISTS role_tr TEXT,
  ADD COLUMN IF NOT EXISTS company_tr TEXT,
  ADD COLUMN IF NOT EXISTS description_tr TEXT;

-- Backfill Turkish translations that previously lived in the client-side
-- LanguageContext map. Safe to re-run: WHERE clauses guard against overwrite.

UPDATE projects SET description_tr = 'Bir dosya tanımlayıcısından okunan bir satırı döndüren fonksiyon.'
  WHERE title = 'get_next_line' AND description_tr IS NULL;
UPDATE projects SET description_tr = 'Next.js ve Supabase ile oluşturulmuş kişisel portföy web sitem.'
  WHERE title = 'Bugraoksuz.me' AND description_tr IS NULL;
UPDATE projects SET description_tr = 'Unix sinyalleri üzerinden çalışan bir iletişim sistemi.'
  WHERE title = 'minitalk' AND description_tr IS NULL;
UPDATE projects SET description_tr = 'Minimum sayıda işlemle verileri sıralamak için geliştirilmiş bir algoritma.'
  WHERE title = 'push_swap' AND description_tr IS NULL;
UPDATE projects SET description_tr = 'Standart C kütüphanesi fonksiyonlarının yeniden kodlanması.'
  WHERE title = 'libft' AND description_tr IS NULL;
UPDATE projects SET description_tr = 'C standart printf fonksiyonunu sıfırdan yeniden yazdım.'
  WHERE title = 'ft_printf' AND description_tr IS NULL;
UPDATE projects SET description_tr = 'Sanallaştırma ve sunucu kurulumuyla ilgili sistem yönetimi projesi.'
  WHERE title = 'Born2beroot' AND description_tr IS NULL;

-- Timeline role/company/description translations
UPDATE timeline SET
  role_tr = 'Gizli Proje (Stealth Project)',
  company_tr = 'Sistem & Arka Yüz Mimarisi',
  description_tr = 'Arka yüz sistemleri ve ölçeklenebilir altyapı geliştirme.'
  WHERE role = 'Confidential Stealth Project' AND role_tr IS NULL;

UPDATE timeline SET
  role_tr = 'Görsel & Arayüz Tasarımı',
  company_tr = 'Bağımsız Ürün Tasarımı',
  description_tr = 'Kendi projelerim için Figma''da UI/UX sistemleri ve prototipler tasarladım.'
  WHERE role = 'Visual & Interface Design' AND role_tr IS NULL;

UPDATE timeline SET
  role_tr = 'Bağımsız Geliştirici',
  company_tr = 'Mobil-Web Araştırması',
  description_tr = 'Mobil-web geliştirme ve yapay zeka yönetimine odaklanıyorum.'
  WHERE role = 'Independent Developer' AND role_tr IS NULL;

UPDATE timeline SET
  role_tr = 'Endüstriyel Tasarım (Lisans)',
  company_tr = '1. Sınıf Öğrencisi',
  description_tr = 'Tasarım odaklı düşünme ve fonksiyonel estetik üzerine çalışıyorum.'
  WHERE role = 'Industrial Design (BSc)' AND role_tr IS NULL;

UPDATE timeline SET
  role_tr = '42 İstanbul',
  company_tr = '1 Yıllık Yoğun Eğitim',
  description_tr = 'C, Unix sistemleri ve düşük seviyeli algoritmalar üzerine yoğunlaştım.'
  WHERE role = '42 Istanbul' AND role_tr IS NULL;

UPDATE timeline SET
  role_tr = 'Stajyer',
  company_tr = 'Tapu Müdürlüğü',
  description_tr = 'Tapu ve kadastro işlemleri üzerine profesyonel staj tamamladım.'
  WHERE role = 'Intern' AND company = 'Tapu Müdürlüğü' AND role_tr IS NULL;

UPDATE timeline SET
  role_tr = 'Lise',
  company_tr = 'Harita, Tapu ve Kadastro',
  description_tr = 'Haritacılık, ölçme ve tapu sicil sistemleri üzerine eğitim aldım.'
  WHERE role = 'High School' AND role_tr IS NULL;
