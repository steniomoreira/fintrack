import { useQuery } from '@tanstack/react-query'
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'
import { useSearchParams } from 'react-router'

import { useAuthContext } from '@/context/auth'
import { UserService } from '@/services/user'

import BalanceItem from './balance-item'

const Balance = () => {
  const { user } = useAuthContext()
  const [seachParams] = useSearchParams()

  const { data } = useQuery({
    queryKey: ['balance', user.id],
    queryFn: () => {
      const from = seachParams.get('from')
      const to = seachParams.get('to')

      return UserService.getBalance({ from, to })
    },
  })

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      <BalanceItem
        label="Saldo"
        amount={data?.balance}
        icon={<WalletIcon size={16} />}
      />
      <BalanceItem
        label="Ganhos"
        amount={data?.earnings}
        icon={<TrendingUpIcon size={16} className="text-primary-green" />}
      />
      <BalanceItem
        label="Gastos"
        amount={data?.expenses}
        icon={<TrendingDownIcon size={16} className="text-primary-red" />}
      />
      <BalanceItem
        label="Investimentos"
        amount={data?.investments}
        icon={<PiggyBankIcon size={16} className="text-primary-blue" />}
      />
    </div>
  )
}

export default Balance
