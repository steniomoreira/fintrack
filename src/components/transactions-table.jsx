import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { ExternalLinkIcon } from 'lucide-react'
import { useSearchParams } from 'react-router'

import { useGetTransactions } from '@/api/hooks/transaction'
import { currencyFormat } from '@/helpers/currency'

import TransactionTypeBadge from './transaction-type-badge'
import { Button } from './ui/button'
import { DataTable } from './ui/data-table'
import { ScrollArea } from './ui/scroll-area'

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
    cell: () => {
      return (
        <Button variant="ghost" size="icon">
          <ExternalLinkIcon className="text-muted-foreground" />
        </Button>
      )
    },
  },
]

const TransactionsTable = () => {
  const [searchPrams] = useSearchParams()

  const from = searchPrams.get('from')
  const to = searchPrams.get('to')

  const { data: transactions } = useGetTransactions({ from, to })
  return (
    <>
      <h2 className="text-2xl font-bold">Transações</h2>

      <ScrollArea className="h-[400px] max-h-[400px] rounded-md border">
        <DataTable columns={columns} data={transactions || []} />
      </ScrollArea>
    </>
  )
}

export default TransactionsTable
