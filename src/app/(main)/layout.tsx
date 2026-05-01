import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { FloatingContact } from '@/components/ui/FloatingContact';
import { LanguageProvider } from '@/context/LanguageContext';

export default function MainLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <LanguageProvider>
      <Navbar />
      <FloatingContact />
      <main>{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
