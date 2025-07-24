import { z } from 'zod'

export const signupFormSchema = z
  .object({
    firstName: z.string().trim().min(1, {
      message: 'O nome é obrigatório.',
    }),
    lastName: z.string().trim().min(1, {
      message: 'O sobrenome é obrigatório.',
    }),
    email: z
      .string()
      .email({ message: 'O e-mail é inválido.' })
      .trim()
      .min(1, { message: 'O e-mail é obrigatório.' }),
    password: z
      .string()
      .trim()
      .min(6, { message: 'A senha deve ter no mínino 6 caracteres.' }),
    passwordConfirmation: z
      .string()
      .trim()
      .min(6, { message: 'A confirmação de senha é obrigatória.' }),
    terms: z.boolean().refine((value) => value === true, {
      message: 'Você precisa aceitar os termos.',
    }),
  })
  .refine((data) => data.passwordConfirmation === data.password, {
    message: 'As senhas devem ser iguais.',
    path: ['passwordConfirmation'],
  })
