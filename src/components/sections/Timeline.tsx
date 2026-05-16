import { getLocale } from 'next-intl/server';
import { createAnonClient } from '@/lib/supabase/server';
import { TimelineSectionClient, type DisplayTimelineItem } from './TimelineSectionClient';

export const TimelineSection = async (): Promise<React.JSX.Element> => {
  const supabase = createAnonClient();
  const locale = await getLocale();

  const { data: timelineData } = await supabase
    .from('timeline')
    .select('*')
    .order('created_at', { ascending: true });

  const items: DisplayTimelineItem[] = (timelineData ?? []).map((item) => ({
    id: item.id,
    date: item.date,
    role: (locale === 'tr' && item.role_tr) || item.role,
    company: (locale === 'tr' && item.company_tr) || item.company,
    description: (locale === 'tr' && item.description_tr) || item.description,
    type: item.type,
  }));

  const experiences = items.filter((i) => i.type === 'experience');
  const education = items.filter((i) => i.type === 'education');

  return <TimelineSectionClient experiences={experiences} education={education} />;
};
