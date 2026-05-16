import { z } from 'zod';

export interface LoginFormData {
  email: string;
  password: string;
}

export function getLoginSchema(
  t: (key: string) => string,
): z.ZodType<LoginFormData> {
  return z.object({
    email: z.string().email(t('email')),
    password: z.string().min(6, t('passwordMin')),
  });
}
