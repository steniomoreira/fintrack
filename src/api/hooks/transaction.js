import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useAuthContext } from '@/context/auth'

import { Transaction } from '../services/transaction'
import { getUserBalanceQueryKey } from './user'

export const createTransactionMutationKey = ['createTransaction']

export const useCreateTransaction = () => {
  const { user } = useAuthContext()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: createTransactionMutationKey,
    mutationFn: (input) => Transaction.createTransaction(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({ userId: user.id }),
      })
    },
  })
}

export const getTranactionsQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ['getTransactions', userId]
  }

  return ['getTransactions', userId, from, to]
}

export const useGetTransaction = ({ from, to }) => {
  const { user } = useAuthContext()
  return useQuery({
    queryKey: getTranactionsQueryKey({ userId: user.id, from, to }),
    queryFn: () => Transaction.getAll({ from, to }),
  })
}
