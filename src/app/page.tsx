import { HeroSection } from '@/components/sections/Hero';
import { AboutSection } from '@/components/sections/About';
import { TimelineSection } from '@/components/sections/Timeline';
import { ProjectsSection } from '@/components/sections/Projects';
import { ContactSection } from '@/components/sections/Contact';

export default function Home(): React.JSX.Element {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
