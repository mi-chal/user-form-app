import {z} from 'zod';

export const userFormSchema = z.object({
  accountType: z.string(),
  userName: z.string().min(1).email('This is not valid email'),
  password: z.string().min(1),
  serverAddress: z.string().ip(),
  serverPath: z.string().refine(value => /^[a-zA-Z0-9/]*$/.test(value)),
  port: z.coerce.number().min(0).max(65535).or(z.undefined()),
  useSSL: z.boolean(),
});

export type UserFormDataType = z.infer<typeof userFormSchema>;
