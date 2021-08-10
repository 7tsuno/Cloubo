import { useAppDispatch, useAppSelector } from 'app/hooks'
import CalculationView from 'components/organisms/groups/CalculationView'
import dayjs from 'dayjs'
import React, { ChangeEvent, useCallback, useMemo } from 'react'
import { selectCalculation, setPayPrice } from 'stores/calculation'
import { selectDate, setDate } from 'stores/date'
import { Record, selectRecords } from 'stores/records'
import { priceFormat } from 'utils/format'

const add = (original: number | undefined, addPrice: string): number =>
  original ? original + Number(addPrice) : Number(addPrice)

const CalculationViewContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const { records } = useAppSelector(selectRecords)
  const { year, month, day } = useAppSelector(selectDate)
  const { payPrice } = useAppSelector(selectCalculation)

  const date = useMemo(
    () =>
      dayjs()
        .year(year)
        .month(month - 1)
        .date(day),
    [year, month, day]
  )

  const setDateDispatch = (date: dayjs.Dayjs) => {
    dispatch(
      setDate({
        year: date.year(),
        month: date.month() + 1,
        day: date.date(),
      })
    )
  }

  const createUserRecords = () => {
    const userPriceMap = new Map<string, number>()
    records
      .filter((record) => Number(record.month) === date.month() + 1)
      .forEach((record: Record) => {
        userPriceMap.set(
          record.user,
          add(userPriceMap.get(record.user), record.price)
        )
      })
    return Array.from(userPriceMap).sort(
      ([keyA], [keyB]) => -keyA.localeCompare(keyB, 'ja')
    )
  }

  const dispUserRecords = useMemo(() => {
    return createUserRecords().map(([user, price]) => [
      user,
      priceFormat(price),
    ])
  }, [month, records, payPrice])

  const dispCalclationRecords = useMemo(() => {
    const userRecords = createUserRecords()
    const resultRecords: Array<Array<string>> = []
    const userData = Object.fromEntries(userRecords)

    const payPriceNumber = Number(payPrice)

    // ユーザ同士のやり取り
    Object.keys(userData).forEach((user) => {
      const price = userData[user]
      if (price < payPriceNumber) {
        let diff = payPriceNumber - price
        Object.keys(userData)
          .filter((targetUser) => user !== targetUser)
          .forEach((targetUser) => {
            const targetPrice = userData[targetUser]
            if (targetPrice > payPriceNumber && diff > 0) {
              const targetDiff = targetPrice - payPriceNumber
              if (targetDiff <= diff) {
                resultRecords.push([
                  `${user} → ${targetUser}`,
                  priceFormat(targetDiff),
                ])
                userData[user] = userData[user] + targetDiff
                userData[targetUser] = userData[targetUser] - targetDiff
                diff = diff - targetDiff
              } else {
                resultRecords.push([
                  `${user} → ${targetUser}`,
                  priceFormat(diff),
                ])
                userData[user] = userData[user] + diff
                userData[targetUser] = userData[targetUser] - diff
                diff = 0
              }
            }
          })
      }
    })

    // 貯蓄とのやり取り
    Object.keys(userData).forEach((user) => {
      const price = userData[user]
      if (price < payPriceNumber) {
        resultRecords.push([
          `${user} → 貯蓄`,
          priceFormat(payPriceNumber - price),
        ])
      } else if (price > payPriceNumber) {
        resultRecords.push([
          `貯蓄 → ${user}`,
          priceFormat(price - payPriceNumber),
        ])
      }
    })

    return resultRecords
  }, [month, records, payPrice])

  const changeBackMonth = useCallback(() => {
    setDateDispatch(date.subtract(1, 'month'))
  }, [date])

  const changeForwardkMonth = useCallback(() => {
    setDateDispatch(date.add(1, 'month'))
  }, [date])

  const changePayPrice = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const price = event.target.value
    if ('' === price || !new RegExp(/^([1-9]\d*)$/).test(price)) {
      dispatch(setPayPrice(''))
    } else {
      dispatch(setPayPrice(price))
    }
  }, [])

  const props = {
    date,
    changeBackMonth,
    changeForwardkMonth,
    dispUserRecords,
    dispCalclationRecords,
    payPrice,
    changePayPrice,
  }

  return <CalculationView {...props} />
}

export default CalculationViewContainer
