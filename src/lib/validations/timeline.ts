import { z } from 'zod';

export const timelineFormSchema = z.object({
  role: z.string().min(1, 'Role is required').max(255),
  company: z.string().min(1, 'Company is required').max(255),
  date: z.string().min(1, 'Date is required').max(100),
  description: z.string().min(1, 'Description is required').max(2000),
  type: z.enum(['experience', 'education']),
});

export type TimelineFormData = z.infer<typeof timelineFormSchema>;
