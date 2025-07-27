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
      queryClient.invalidateQueries({
        queryKey: getTranactionsQueryKey({ userId: user.id }),
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

export const useGetTransactions = ({ from, to }) => {
  const { user } = useAuthContext()
  return useQuery({
    queryKey: getTranactionsQueryKey({ userId: user.id, from, to }),
    queryFn: () => Transaction.getAll({ from, to }),
    enabled: Boolean(from) && Boolean(to) && Boolean(user.id),
  })
}

export const editTransactionMutationKey = ['editTransaction']

export const useEditTransaction = () => {
  const { user } = useAuthContext()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: editTransactionMutationKey,
    mutationFn: (input) => Transaction.update(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({ userId: user.id }),
      })
      queryClient.invalidateQueries({
        queryKey: getTranactionsQueryKey({ userId: user.id }),
      })
    },
  })
}
