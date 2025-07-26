import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { useSearchParams } from 'react-router'

import { useGetTransactions } from '@/api/hooks/transaction'
import { currencyFormat } from '@/helpers/currency'

import TransactionTypeBadge from './transaction-type-badge'
import { DataTable } from './ui/data-table'

const columns = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row: { original: transaction } }) => {
      return <TransactionTypeBadge variant={transaction.type.toLowerCase()} />
    },
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row: { original: transaction } }) => {
      return format(new Date(transaction.date), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      })
    },
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row: { original: transaction } }) => {
      return currencyFormat(transaction.amount)
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
  },
]

const TransactionsTable = () => {
  const [searchPrams] = useSearchParams()

  const from = searchPrams.get('from')
  const to = searchPrams.get('to')

  const { data: transactions } = useGetTransactions({ from, to })
  return <DataTable columns={columns} data={transactions || []} />
}

export default TransactionsTable
