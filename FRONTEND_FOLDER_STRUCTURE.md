# Flutter/Dart Frontend Klasör Yapısı

Bu yapı, portfolio odaklı bir kişisel web sitesi için sürdürülebilir ve ölçeklenebilir başlangıç şablonudur.

## Önerilen Dizin Ağacı

```text
frontend/
├── pubspec.yaml
├── web/
│   ├── index.html
│   └── icons/
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
└── lib/
    ├── main.dart
    ├── app.dart
    ├── core/
    │   ├── constants/
    │   │   ├── app_constants.dart
    │   │   └── api_endpoints.dart
    │   ├── theme/
    │   │   ├── app_theme.dart
    │   │   ├── app_colors.dart
    │   │   └── app_text_styles.dart
    │   ├── routing/
    │   │   ├── app_router.dart
    │   │   └── route_names.dart
    │   ├── network/
    │   │   ├── api_client.dart
    │   │   └── api_result.dart
    │   ├── utils/
    │   │   ├── validators.dart
    │   │   ├── date_formatter.dart
    │   │   └── launch_url_helper.dart
    │   └── widgets/
    │       ├── app_button.dart
    │       ├── app_card.dart
    │       └── section_title.dart
    ├── features/
    │   ├── home/
    │   │   ├── presentation/
    │   │   │   ├── pages/home_page.dart
    │   │   │   └── widgets/
    │   │   └── domain/
    │   ├── about/
    │   │   ├── presentation/
    │   │   └── domain/
    │   ├── projects/
    │   │   ├── data/
    │   │   │   ├── models/project_model.dart
    │   │   │   ├── datasources/projects_remote_data_source.dart
    │   │   │   └── repositories/projects_repository_impl.dart
    │   │   ├── domain/
    │   │   │   ├── entities/project.dart
    │   │   │   ├── repositories/projects_repository.dart
    │   │   │   └── usecases/get_projects_usecase.dart
    │   │   └── presentation/
    │   │       ├── pages/projects_page.dart
    │   │       ├── widgets/project_card.dart
    │   │       └── state/projects_controller.dart
    │   ├── skills/
    │   │   ├── data/
    │   │   ├── domain/
    │   │   └── presentation/
    │   ├── experience/
    │   │   ├── data/
    │   │   ├── domain/
    │   │   └── presentation/
    │   └── contact/
    │       ├── data/
    │       ├── domain/
    │       └── presentation/
    └── shared/
        ├── models/
        ├── services/
        └── widgets/
```

## Klasörlerin Sorumlulukları

- `core/`: Uygulama genelinde ortak altyapı (theme, routing, network, yardımcı fonksiyonlar)
- `features/`: Modül bazlı geliştirme alanı (home, projects, contact vb.)
- `data/`: API/model/repository implementasyonları
- `domain/`: Entity, repository interface ve use-case katmanı
- `presentation/`: Sayfalar, widget’lar, state yönetimi
- `shared/`: Birden fazla feature tarafından kullanılan ortak yapılar

## Pratik Başlangıç Notları

1. İlk aşamada `home`, `projects`, `skills`, `contact` modüllerini aktif edin.
2. API endpoint adreslerini `core/constants/api_endpoints.dart` içinde merkezi yönetin.
3. Responsive tasarımı önce web breakpoint’leriyle kurun (mobile/tablet/desktop).
4. Tüm sabit metinleri ileride çoklu dil için tek noktada toplama planı yapın.

## Minimum İlk Dosyalar

- `lib/main.dart`
- `lib/app.dart`
- `lib/core/routing/app_router.dart`
- `lib/core/network/api_client.dart`
- `lib/features/projects/presentation/pages/projects_page.dart`
- `lib/features/contact/presentation/pages/contact_page.dart`

Bu yapı ile backend API hazır olduğunda frontend tarafı hızlı şekilde entegre edilebilir.
