---
trigger: always_on
---

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

## 2. Kod Stili Kuralları

### TypeScript Norm (ESLint + Prettier)

Tüm TypeScript dosyaları aşağıdaki kurallara uymalıdır.

#### Fonksiyon Formatı
```typescript
async findOne(id: string): Promise<User> {
  return this.userService.findById(id);
}
```

#### ESLint Kuralları
- `explicit-function-return-type` → her fonksiyonda return type zorunlu
- `no-explicit-any` → `any` yasak
- `no-unused-vars` → kullanılmayan değişken yasak
- `max-len: 100` → satır uzunluğu max 100 karakter

#### Prettier Kuralları
- `singleQuote: true` → tek tırnak
- `trailingComma: all` → sonda virgül
- `printWidth: 100` → max 100 karakter
- `tabWidth: 2` → 2 boşluk girinti

#### Komutlar
- `npm run lint` → hata kontrol
- `npm run lint:fix` → otomatik düzelt
- `npm run format` → format uygula

#### Return Type Referansı
| Tip | Return Type |
|-----|-------------|
| React bileşeni | `React.JSX.Element` |
| Async React bileşeni | `Promise<React.JSX.Element>` |
| API route | `Promise<NextResponse>` |
| Server action | `Promise<void>` |

---
*Not: Bu kurallar projenin izlenebilirliği ve tutarlılığı için kritiktir.*