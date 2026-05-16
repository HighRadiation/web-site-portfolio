import { z } from 'zod';

export interface SkillFormData {
  name: string;
  category: string;
}

export function getSkillFormSchema(
  t: (key: string) => string,
): z.ZodType<SkillFormData> {
  return z.object({
    name: z.string().min(1, t('skillNameRequired')).max(100),
    category: z.string().min(1, t('categoryRequired')).max(50),
  });
}
