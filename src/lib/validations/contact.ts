import { z } from 'zod';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function getContactSchema(
  t: (key: string) => string,
): z.ZodType<ContactFormData> {
  return z.object({
    name: z
      .string()
      .min(2, t('nameMin'))
      .max(100, t('nameMax')),
    email: z.string().email(t('email')),
    message: z
      .string()
      .min(10, t('messageMin'))
      .max(2000, t('messageMax')),
  });
}
