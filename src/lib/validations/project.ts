import { z } from 'zod';

const urlOrEmpty = z.union([z.string().url('Must be a valid URL'), z.literal('')]).optional();

export const projectFormSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(255),
  name_tr: z.string().max(255).optional(),
  description: z.string().min(1, 'Description is required').max(2000),
  description_tr: z.string().max(2000).optional(),
  github_link: urlOrEmpty,
  live_link: urlOrEmpty,
  image_url: urlOrEmpty,
  technologies: z.string().optional(), // comma-separated → split in action
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;
