import { useAppDispatch, useAppSelector } from 'app/hooks'
import ReportView from 'components/organisms/groups/ReportView'
import { Category, CATEGORY } from 'constants/category'
import dayjs from 'dayjs'
import React, { useCallback, useMemo } from 'react'
import { selectDate, setDate } from 'stores/date'
import { selectRecords } from 'stores/records'
import { priceFormat } from 'utils/format'

const add = (original: number | undefined, addPrice: string): number =>
  original ? original + Number(addPrice) : Number(addPrice)

type ReportCategory = Category | '合計'
const SUM = '合計'

const ReportViewContainer: React.FC = () => {
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

  const monthRecords: Array<Array<string>> = useMemo(() => {
    const categoryMap = new Map<ReportCategory, number>()
    CATEGORY.forEach((categoryName) => categoryMap.set(categoryName, 0))
    categoryMap.set(SUM, 0)
    records
      .filter((record) => Number(record.month) === date.month() + 1)
      .forEach((record) => {
        categoryMap.set(SUM, add(categoryMap.get(SUM), record.price))
        categoryMap.set(
          record.category,
          add(categoryMap.get(record.category), record.price)
        )
      })
    return Array.from(categoryMap).map(([category, price]) => [
      category,
      priceFormat(price),
    ])
  }, [month, records])

  const yearRecords: Array<Array<string>> = useMemo(() => {
    const monthYearMap = new Map<string, number>()
    records.forEach((record) => {
      const monthYear = dayjs()
        .year(record.year)
        .month(record.month - 1)
        .format('YYYY/MM')
      monthYearMap.set(
        monthYear,
        add(monthYearMap.get(monthYear), record.price)
      )
    })
    return Array.from(monthYearMap)
      .sort(([keyA], [keyB]) => {
        return dayjs(keyA).isAfter(dayjs(keyB)) ? 1 : -1
      })
      .map(([category, price]) => [category, priceFormat(price)])
  }, [month, records])

  const setDateDispatch = (date: dayjs.Dayjs) => {
    dispatch(
      setDate({
        year: date.year(),
        month: date.month() + 1,
        day: date.date(),
      })
    )
  }

  const changeBackMonth = useCallback(() => {
    setDateDispatch(date.subtract(1, 'month'))
  }, [date])

  const changeForwardkMonth = useCallback(() => {
    setDateDispatch(date.add(1, 'month'))
  }, [date])

  const changeBackYear = useCallback(() => {
    setDateDispatch(date.subtract(1, 'year'))
  }, [date])

  const changeForwardYear = useCallback(() => {
    setDateDispatch(date.add(1, 'year'))
  }, [date])

  const props = {
    date,
    changeBackMonth,
    changeForwardkMonth,
    monthRecords,
    changeBackYear,
    changeForwardYear,
    yearRecords,
  }

  return <ReportView {...props} />
}

export default ReportViewContainer
