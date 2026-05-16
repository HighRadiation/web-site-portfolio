import { setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/sections/Hero';
import { AboutSection } from '@/components/sections/About';
import { TimelineSection } from '@/components/sections/Timeline';
import { ProjectsSection } from '@/components/sections/Projects';
import { ContactSection } from '@/components/sections/Contact';
import { Reveal } from '@/components/ui/Reveal';

export const revalidate = 3600;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <Reveal>
        <AboutSection />
      </Reveal>
      <Reveal>
        <TimelineSection />
      </Reveal>
      <Reveal>
        <ProjectsSection />
      </Reveal>
      <Reveal>
        <ContactSection />
      </Reveal>
    </>
  );
}
