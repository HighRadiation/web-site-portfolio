import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { LanguageProvider } from '@/context/LanguageContext';

export default function MainLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <LanguageProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
