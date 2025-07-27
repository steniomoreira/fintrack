import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useCreateTransaction } from '@/api/hooks/transaction'

import {
  createTransactionFormSchema,
  editTransactionFormSchema,
} from '../schemas/transaction'

export const useCreateTransactionForm = ({ onSuccess, onError }) => {
  const { mutateAsync: createTransaction } = useCreateTransaction()

  const form = useForm({
    resolver: zodResolver(createTransactionFormSchema),
    defaultValues: {
      name: '',
      amount: 0,
      date: new Date(),
      type: 'EARNING',
    },
    shouldUnregister: true,
  })

  const onSubmit = async (data) => {
    try {
      await createTransaction(data)
      onSuccess()
    } catch (error) {
      console.error(error)
      onError
    }
  }

  return { form, onSubmit }
}

export const useEditTransactionForm = ({ transaction, onSuccess, onError }) => {
  const { mutateAsync: updateTransaction } = useEditTransactionForm()

  const { id, name, amount, date, type } = transaction

  const form = useForm({
    resolver: zodResolver(editTransactionFormSchema),
    defaultValues: {
      id,
      name,
      amount: parseFloat(amount),
      date,
      type,
    },
    shouldUnregister: true,
  })

  const onSubmit = async (data) => {
    try {
      await updateTransaction(data)
      onSuccess()
    } catch (error) {
      console.error(error)
      onError
    }
  }

  return { form, onSubmit }
}
