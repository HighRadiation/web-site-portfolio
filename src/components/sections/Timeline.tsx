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

  const items = (timelineData as TimelineItem[]) || [];
  const experiences = items.filter((i: TimelineItem) => i.type === 'experience');
  const education = items.filter((i: TimelineItem) => i.type === 'education');

  return <TimelineSectionClient experiences={experiences} education={education} />;
};
