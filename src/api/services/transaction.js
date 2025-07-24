import { protectedApi } from '@/lib/axios'

export const Transaction = {
  createTransaction: async (input) => {
    const response = await protectedApi.post('/transactions/me', input)

    return response.data
  },
}
