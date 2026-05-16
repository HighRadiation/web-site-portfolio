import { z } from 'zod';

export interface TimelineFormData {
  role: string;
  company: string;
  date: string;
  description: string;
  type: 'experience' | 'education';
}

export function getTimelineFormSchema(
  t: (key: string) => string,
): z.ZodType<TimelineFormData> {
  return z.object({
    role: z.string().min(1, t('roleRequired')).max(255),
    company: z.string().min(1, t('companyRequired')).max(255),
    date: z.string().min(1, t('dateRequired')).max(100),
    description: z.string().min(1, t('descriptionRequired')).max(2000),
    type: z.enum(['experience', 'education']),
  });
}
