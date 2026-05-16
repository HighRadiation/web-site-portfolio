import { z } from 'zod';

export type ProjectCategory = 'web' | 'client' | 'systems';

export interface ProjectFormData {
  name: string;
  name_tr?: string;
  description: string;
  description_tr?: string;
  github_link?: string;
  live_link?: string;
  image_url?: string;
  technologies?: string;
  category?: ProjectCategory;
  featured?: boolean;
}

function getUrlOrEmpty(t: (key: string) => string): z.ZodType<string | undefined> {
  return z.union([z.string().url(t('url')), z.literal('')]).optional();
}

export function getProjectFormSchema(
  t: (key: string) => string,
): z.ZodType<ProjectFormData> {
  return z.object({
    name: z.string().min(1, t('projectNameRequired')).max(255),
    name_tr: z.string().max(255).optional(),
    description: z.string().min(1, t('descriptionRequired')).max(2000),
    description_tr: z.string().max(2000).optional(),
    github_link: getUrlOrEmpty(t),
    live_link: getUrlOrEmpty(t),
    image_url: getUrlOrEmpty(t),
    technologies: z.string().optional(),
    category: z.enum(['web', 'client', 'systems']).optional(),
    featured: z.boolean().optional(),
  });
}
