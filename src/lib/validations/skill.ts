import { z } from 'zod';

export const skillFormSchema = z.object({
  name: z.string().min(1, 'Skill name is required').max(100),
  category: z.string().min(1, 'Category is required').max(50),
});

export type SkillFormData = z.infer<typeof skillFormSchema>;
