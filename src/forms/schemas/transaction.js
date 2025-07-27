import { z } from 'zod'

export const createTransactionFormSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'O nome é obrigatório',
  }),
  amount: z.number({
    required_error: 'O valor é obrigatório.',
  }),
  date: z.date({
    required_error: 'A data é obrigatório.',
  }),
  type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT']),
})

export const editTransactionFormSchema = createTransactionFormSchema.extend({
  id: z.string().uuid(),
})
