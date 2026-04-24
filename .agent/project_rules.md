## 1. Dokümantasyon Kuralları

Her bir prompt (komut/istek) sonrasında, yapılan işlemlerin kaydını tutmak amacıyla `documents` klasörü altında yeni bir markdown dosyası oluşturulmalıdır.

### Dosya İsimlendirme Formatı
- **Format**: `YYYY-MM-DD_HH-mm-ss.md`
- **Örnek**: `2024-04-24_18-46-00.md`

### Dosya İçerik Yapısı
Her dokümantasyon dosyası aşağıdaki bölümleri içermelidir:
1.  **Yazılan Prompt**: Kullanıcıdan gelen ham istek.
2.  **Yapılan Plan**: İşlemi gerçekleştirmek için oluşturulan strateji.
3.  **Yapılan İşlem**: Gerçekleştirilen kod değişiklikleri ve terminal komutları.

### Git Kuralları
Her adım için ayrı bir commit yapılmalıdır. İngilizce commit mesajları kullanılmalıdır. Detaylı commit mesajları kullanılmalıdır. Commit mesajları `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:` gibi etiketlerle başlamalıdır. 

---
*Not: Bu kurallar projenin izlenebilirliği ve tutarlılığı için kritiktir.*