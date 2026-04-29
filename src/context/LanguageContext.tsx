'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    home: 'Home',
    about: 'About',
    experience: 'Experience & Education',
    projects: 'Projects',
    contact: 'Contact',
    // Hero
    hero_subtitle: 'I craft mobile-web apps from first principles.',
    hero_view_projects: 'VIEW_PROJECTS',
    hero_contact_me: 'CONTACT_ME',
    // About
    about_title: 'About',
    about_p1:
      "I’ve never liked sticking to just one niche. My curiosity takes me everywhere—from game engines and AI to embedded systems and mobile-web. For me, software isn’t about picking a 'side'; it’s about having the drive to explore how it all works under the hood.",
    about_p2:
      "If there’s something I don’t know, I’ll sit down and grind for a week or a month until I can actually build something with it. I don't believe I've truly learned a technology until I’ve made it work in a real-world project.",
    // Timeline
    experience_education_title: 'Experience & Education',
    experience_title: 'Experience',
    education_title: 'Education',
    timeline_no_data: 'No data available.',
    // Projects
    projects_title: 'Projects',
    projects_view_code: 'View Code',
    // Contact
    contact_title: 'Get in Touch',
    contact_desc: 'Have a question or want to work together? Feel free to reach out!',
    contact_button: 'CONTACT_ME',
    contact_or: 'OR',
    contact_email_copied: 'Email copied!',
    contact_send_message: 'Send a Message',
    // Categories (Skills)
    frontend: 'Frontend',
    backend: 'Backend',
    mobile: 'Mobile',
    other: 'Other',
    languages: 'Languages',
    tools: 'Tools',
    // Project Specific fallbacks
    'get_next_line_desc': 'A function that returns a line read from a file descriptor.',
    'Bugraoksuz.me_desc': 'My personal portfolio website built with Next.js and Supabase.',
    'minitalk_desc': 'Built a communication system operating via Unix signals.',
    'push_swap_desc': 'Developed an algorithm to sort data with a minimum number of operations.',
    'libft_desc': 'Recoded standard C library functions from the ground up.',
    // Timeline fallbacks
    'Student': 'Student',
    'Software Developer': 'Software Developer',
    'Freelance': 'Freelance',
    '42 Istanbul': '42 Istanbul',
    'Kocaeli University': 'Kocaeli University',
  },
  tr: {
    // Navbar
    home: 'Ana Sayfa',
    about: 'Hakkımda',
    experience: 'Deneyim & Eğitim',
    projects: 'Projeler',
    contact: 'İletişim',
    // Hero
    hero_subtitle: 'Mobil-web uygulamalarını temel prensiplerden inşa ediyorum.',
    hero_view_projects: 'PROJELERİ_GÖR',
    hero_contact_me: 'İLETİŞİME_GEÇ',
    // About
    about_title: 'Hakkımda',
    about_p1:
      'Tek bir alana takılıp kalmayı hiç sevmedim. Merakım beni her yere götürüyor; oyun motorlarından yapay zekaya, gömülü sistemlerden mobil-web\'e kadar. Benim için yazılım bir \'taraf\' seçmek değil, her şeyin arka planda nasıl çalıştığını keşfetme tutkusudur.',
    about_p2:
      'Bilmediğim bir şey varsa, oturur bir hafta veya bir ay boyunca onunla bir şeyler inşa edebilene kadar çalışırım. Bir teknolojiyi gerçek bir projede çalışır hale getirene kadar onu gerçekten öğrendiğime inanmam.',
    // Timeline
    experience_education_title: 'Deneyim & Eğitim',
    experience_title: 'Deneyim',
    education_title: 'Eğitim',
    timeline_no_data: 'Veri bulunamadı.',
    // Projects
    projects_title: 'Projeler',
    projects_view_code: 'Kodu Gör',
    // Contact
    contact_title: 'İletişime Geçin',
    contact_desc: 'Bir sorunuz mu var veya birlikte mi çalışmak istiyorsunuz? Çekinmeden ulaşın!',
    contact_button: 'İLETİŞİME_GEÇ',
    contact_or: 'VEYA',
    contact_email_copied: 'E-posta kopyalandı!',
    contact_send_message: 'Mesaj Gönder',
    // Categories (Skills)
    frontend: 'Ön Yüz',
    backend: 'Arka Yüz',
    mobile: 'Mobil',
    other: 'Diğer',
    languages: 'Diller',
    tools: 'Araçlar',
    // Project Specific fallbacks
    'get_next_line_desc': 'Bir dosya tanımlayıcısından okunan bir satırı döndüren fonksiyon.',
    'Bugraoksuz.me_desc': 'Next.js ve Supabase ile oluşturulmuş kişisel portföy web sitem.',
    'minitalk_desc': 'Unix sinyalleri üzerinden çalışan bir iletişim sistemi.',
    'push_swap_desc': 'Minimum sayıda işlemle verileri sıralamak için geliştirilmiş bir algoritma.',
    'libft_desc': 'Standart C kütüphanesi fonksiyonlarının yeniden kodlanması.',
    // Timeline fallbacks
    'Student': 'Öğrenci',
    'Software Developer': 'Yazılım Geliştirici',
    'Freelance': 'Freelance (Serbest Çalışan)',
    '42 Istanbul': '42 İstanbul',
    'Kocaeli University': 'Kocaeli Üniversitesi',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return (translations[language] as any)[key] || (translations['en'] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
