import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { HeroCanvas } from '@/components/sections/HeroCanvas';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <>
      <HeroCanvas />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
