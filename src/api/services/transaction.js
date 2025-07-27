import queryString from 'query-string'

import { protectedApi } from '@/lib/axios'

export const Transaction = {
  createTransaction: async (input) => {
    const { name, type, date, amount } = input

    const response = await protectedApi.post('/transactions/me', {
      name,
      type,
      date,
      amount,
    })

    return response.data
  },
  getAll: async (input) => {
    const query = queryString.stringify({ from: input.from, to: input.to })
    const response = await protectedApi.get(`/transactions/me?${query}`)

    return response.data
  },
  update: async (input) => {
    const { id, name, type, date, amount } = input
    const response = await protectedApi.patch(`/transaction/me?${id}`, {
      name,
      type,
      date,
      amount,
    })
    return response.data
  },
}
