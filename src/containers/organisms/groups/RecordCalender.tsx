import { useAppDispatch, useAppSelector } from 'app/hooks'
import RecordCalender from 'components/organisms/groups/RecordCalender'
import dayjs from 'dayjs'
import React, { useCallback, useMemo } from 'react'
import { selectDate, setDate } from 'stores/date'
import { Record, selectRecords } from 'stores/records'

const RecordCalenderContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const { records } = useAppSelector(selectRecords)
  const { year, month, day } = useAppSelector(selectDate)

  const date = useMemo(
    () =>
      dayjs()
        .year(year)
        .month(month - 1)
        .date(day),
    [year, month, day]
  )

  const checkedDate = useMemo(() => {
    const dateSet = new Set<string>()
    records
      .map((record: Record) =>
        dayjs()
          .year(record.year)
          .month(record.month - 1)
          .date(record.day)
          .format('YYYY/MM/DD')
      )
      .forEach((dateStr) => dateSet.add(dateStr))
    return Array.from(dateSet)
  }, [records])

  const changeDate = useCallback((date: dayjs.Dayjs | null) => {
    if (date) {
      dispatch(
        setDate({
          year: date.year(),
          month: date.month() + 1,
          day: date.date(),
        })
      )
    }
  }, [])

  const changeMonth = useCallback((date: dayjs.Dayjs | null) => {
    if (date) {
      dispatch(
        setDate({
          year: date.year(),
          month: date.month() + 1,
          day: date.date(),
        })
      )
    }
  }, [])

  const props = {
    date,
    changeDate,
    changeMonth,
    checkedDate,
  }

  return <RecordCalender {...props} />
}

export default RecordCalenderContainer
