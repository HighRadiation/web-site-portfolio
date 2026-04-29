import { createClient } from '@/lib/supabase/server';
import { TimelineSectionClient } from './TimelineSectionClient';

interface TimelineItem {
  id: string;
  date: string;
  role: string;
  company: string;
  description: string;
  type: string;
}

export const TimelineSection = async (): Promise<React.JSX.Element> => {
  const supabase = await createClient();
  const { data: timelineData } = await supabase
    .from('timeline')
    .select('*')
    .order('created_at', { ascending: true });

  const dbItems = (timelineData as TimelineItem[]) || [];

  // Add items requested by the user
  const extraItems: TimelineItem[] = [
    {
      id: 'high-school-edu',
      date: '2018 – 2022',
      role: 'High School',
      company: 'Harita Tapu ve Kadastro',
      description: 'Focused on mapping, surveying, and land registry systems.',
      type: 'education',
    },
    {
      id: 'internship-exp',
      date: '2021 – 2022',
      role: 'Intern',
      company: 'Tapu Müdürlüğü',
      description: 'Completed a professional internship focusing on title deed and cadastre operations.',
      type: 'experience',
    },
  ];

  // Merge and sort by date (start year)
  const items = [...dbItems, ...extraItems].sort((a, b) => {
    const yearA = parseInt(a.date.split(' – ')[0]) || 0;
    const yearB = parseInt(b.date.split(' – ')[0]) || 0;
    return yearB - yearA; // Newest first
  });

  const experiences = items.filter((i: TimelineItem) => i.type === 'experience');
  const education = items.filter((i: TimelineItem) => i.type === 'education');

  return <TimelineSectionClient experiences={experiences} education={education} />;
};
