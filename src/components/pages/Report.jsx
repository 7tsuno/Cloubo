import React, { useState, useCallback, useContext } from 'react'
import dayjs from 'dayjs'
import MainTemplate from 'components/templates/MainTemplate'
import { PAGE } from 'constants/page'
import { useEffect } from 'react'
import { useSender } from 'utils/axios'
import { API } from 'constants/api'
import CalenderIcon from 'components/elements/icons/CalenderIcon'
import DipslaySlider from 'components/elements/display/DipslaySlider'
import { CATEGORY } from 'constants/category'
import Tab from 'components/elements/display/Tab'
import DataTable from 'components/elements/display/DataTable'
import { toPrice } from 'utils/format'
import { CashRecordsContext } from 'contexts/CashRecordsContext'

const Report = () => {
  const [date, setDate] = useState(dayjs())
  const [year, setYear] = useState()
  const [month, setMonth] = useState()
  const [items, setItems] = useState()
  const [monthDispRecords, setMonthDispRecords] = React.useState()
  const [yearDispRecords, setYearDispRecords] = React.useState()
  const [getRecords] = useSender(API.GET_RECORDS)
  const [cashRecords, setCashRecords] = useContext(CashRecordsContext)

  const createDispRecoredsMonth = (items) => {
    const categoryBox = {
      合計: 0,
      ...Object.fromEntries(CATEGORY.map((name) => [name, 0]))
    }

    items
      .filter((data) => Number(data.month) === date.month() + 1)
      .forEach((data) => {
        categoryBox[data.category] = categoryBox[data.category] + Number(data.price)
        categoryBox['合計'] = categoryBox['合計'] + Number(data.price)
      })

    const monthDispRecords = CATEGORY.map((category) => [category, toPrice(categoryBox[category])])
    monthDispRecords.push(['合計', Number(categoryBox['合計']).toLocaleString()])

    return monthDispRecords
  }

  const createDispRecoreds = (items) => {
    const categoryBox = {
      合計: 0,
      ...Object.fromEntries(CATEGORY.map((name) => [name, 0]))
    }
    const monthYearMap = new Map()

    items.forEach((data) => {
      if (Number(data.month) === date.month() + 1) {
        categoryBox[data.category] = categoryBox[data.category] + Number(data.price)
        categoryBox['合計'] = categoryBox['合計'] + Number(data.price)
      }

      const monthYear = dayjs()
        .year(data.year)
        .month(data.month - 1)
        .format('YYYY/MM')
      if (monthYearMap.has(monthYear)) {
        monthYearMap.set(monthYear, monthYearMap.get(monthYear) + Number(data.price))
      } else {
        monthYearMap.set(monthYear, Number(data.price))
      }
    })

    const monthDispRecords = CATEGORY.map((category) => [category, toPrice(categoryBox[category])])
    monthDispRecords.push(['合計', toPrice(categoryBox['合計'])])

    const yearDispRecords = Array.from(monthYearMap)
      .sort(([keyA], [keyB]) => {
        return dayjs(keyA).isAfter(dayjs(keyB)) ? 1 : -1
      })
      .map(([date, price]) => [date, toPrice(price)])

    return {
      monthDispRecords,
      yearDispRecords
    }
  }

  useEffect(async () => {
    setYear(date.year())
    setMonth(date.month())
  }, [date])

  useEffect(() => {
    setItems(cashRecords)
  }, [])

  useEffect(async () => {
    if (year) {
      const payload = {
        year: date.year()
      }
      const response = await getRecords(payload)
      const datas = response.result.data
      setItems(datas)
      setCashRecords(datas)
    }
  }, [year])

  useEffect(async () => {
    if (items) {
      const dispRecords = createDispRecoreds(items)

      setMonthDispRecords(dispRecords.monthDispRecords)
      setYearDispRecords(dispRecords.yearDispRecords)
    }
  }, [items])

  useEffect(async () => {
    if ((month, items)) {
      const monthDispRecords = createDispRecoredsMonth(items)
      setMonthDispRecords(monthDispRecords)
    }
  }, [month])

  const changeBackMonth = useCallback(() => {
    setDate(date.subtract(1, 'month'))
  }, [date])

  const changeForwardkMonth = useCallback(() => {
    setDate(date.add(1, 'month'))
  }, [date])

  const changeBackYear = useCallback(() => {
    setDate(date.subtract(1, 'year'))
  }, [date])

  const changeForwardkYear = useCallback(() => {
    setDate(date.add(1, 'year'))
  }, [date])

  return (
    <MainTemplate page={PAGE.report} icon={<CalenderIcon />}>
      <Tab
        items={[
          {
            title: 'Month',
            content: (
              <>
                <DipslaySlider
                  value={date.format('YYYY年M月')}
                  changeBack={changeBackMonth}
                  changeForward={changeForwardkMonth}
                />
                {monthDispRecords && (
                  <DataTable headers={['カテゴリ', '金額']} contents={monthDispRecords} />
                )}
              </>
            )
          },
          {
            title: 'Year',
            content: (
              <>
                <DipslaySlider
                  value={date.format('YYYY年')}
                  changeBack={changeBackYear}
                  changeForward={changeForwardkYear}
                />
                {yearDispRecords && (
                  <DataTable dense headers={['年月', '支出合計']} contents={yearDispRecords} />
                )}
              </>
            )
          }
        ]}
      />
    </MainTemplate>
  )
}

export default Report
