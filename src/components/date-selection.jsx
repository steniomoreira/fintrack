import { addMonths, format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { DatePickerWithRange } from './ui/date-picker-with-range'

const formatDateToQueryParam = (date) => format(date, 'yyy-MM-dd')

const DateSelction = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [date, setDate] = useState({
    from: searchParams.get('from')
      ? new Date(searchParams.get('from') + 'T00:00:00')
      : new Date(),
    to: searchParams.get('to')
      ? new Date(searchParams.get('to') + 'T00:00:00')
      : addMonths(new Date(), 1),
  })

  useEffect(() => {
    if (!date?.from || !date?.to) return

    const queryParams = new URLSearchParams()
    queryParams.set('from', formatDateToQueryParam(date.from))
    queryParams.set('to', formatDateToQueryParam(date.to))

    navigate(`/?${queryParams.toString()}`)
  }, [date, navigate])

  return <DatePickerWithRange value={date} onChange={setDate} />
}

export default DateSelction
