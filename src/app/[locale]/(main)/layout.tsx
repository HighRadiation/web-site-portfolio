import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { FloatingContact } from '@/components/ui/FloatingContact';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <>
      <Navbar />
      <FloatingContact />
      <main>{children}</main>
      <Footer />
    </>
  );
}
