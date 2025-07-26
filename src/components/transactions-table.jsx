import { useSearchParams } from 'react-router'

import { useGetTransactions } from '@/api/hooks/transaction'

import { DataTable } from './ui/data-table'

const columns = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
  },
  {
    accessorKey: 'date',
    header: 'Data',
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
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
