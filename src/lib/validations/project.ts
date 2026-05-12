import { z } from 'zod';

export const projectFormSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(255),
  description: z.string().min(1, 'Description is required').max(2000),
  link: z.union([z.string().url('Must be a valid URL'), z.literal('')]).optional(),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;
