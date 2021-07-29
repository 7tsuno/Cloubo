import React, { useState, useCallback } from 'react'
import dayjs from 'dayjs'
import MainTemplate from 'components/templates/MainTemplate'
import { PAGE } from 'constants/page'
import { useEffect } from 'react'
import { useSender } from 'utils/axios'
import { API } from 'constants/api'
import CalenderIcon from 'components/elements/icons/CalenderIcon'
import DipslaySlider from 'components/elements/display/DipslaySlider'
import DataTable from 'components/elements/display/DataTable'
import Text from 'components/elements/form/Text'
import FormLine from 'components/elements/layout/FormLine'
import { toPrice } from 'utils/format'

const numberRegex = new RegExp(/^([1-9]\d*)$/)

const Calculation = () => {
  const [date, setDate] = useState(dayjs())
  const [payPrice, setPayPrice] = useState(localStorage.getItem('PayPrice') || '')
  const [dispRecords, setDispRecords] = React.useState()
  const [dispCalclationRecords, setDispCalcutionRecords] = React.useState()
  const [, getRecords] = useSender(API.GET_RECORDS)

  const calculate = (records) => {
    const moveData = []
    const userData = Object.fromEntries(records)

    // ユーザ同士のやり取り
    Object.keys(userData).forEach((user) => {
      const price = userData[user]
      if (price < payPrice) {
        let diff = payPrice - price
        Object.keys(userData)
          .filter((targetUser) => user !== targetUser)
          .forEach((targetUser) => {
            const targetPrice = userData[targetUser]
            if (targetPrice > payPrice && diff > 0) {
              const targetDiff = targetPrice - payPrice
              if (targetDiff <= diff) {
                moveData.push([`${user}→${targetUser}`, toPrice(targetDiff)])
                userData[user] = userData[user] + targetDiff
                userData[targetUser] = userData[targetUser] - targetDiff
                diff = diff - targetDiff
              } else {
                moveData.push([`${user}→${targetUser}`, toPrice(diff)])
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
      if (price < payPrice) {
        moveData.push([`${user}→貯蓄`, toPrice(payPrice - price)])
      } else if (price > payPrice) {
        moveData.push([`貯蓄→${user}`, toPrice(price - payPrice)])
      }
    })

    return {
      dispRecords: records.map(([user, record]) => [user, toPrice(record)]),
      dispCalcutionRecords: moveData
    }
  }

  const createDispRecoreds = (datas) => {
    const userPriceMap = new Map()
    datas.forEach((data) => {
      if (userPriceMap.has(data.user)) {
        userPriceMap.set(data.user, userPriceMap.get(data.user) + Number(data.price))
      } else {
        userPriceMap.set(data.user, Number(data.price))
      }
    })
    const userRecords = Array.from(userPriceMap)
      .sort(([keyA], [keyB]) => keyA - keyB)
      .map(([user, price]) => [user, price])
    return calculate(userRecords)
  }

  useEffect(async () => {
    const payload = {
      year: date.year(),
      month: date.month() + 1
    }
    const response = await getRecords(payload)
    const datas = response.result.data
    const disps = createDispRecoreds(datas)
    setDispRecords(disps.dispRecords)
    setDispCalcutionRecords(disps.dispCalcutionRecords)
  }, [date, payPrice])

  const changeBackMonth = useCallback(() => {
    setDate(date.subtract(1, 'month'))
  }, [date])

  const changeForwardkMonth = useCallback(() => {
    setDate(date.add(1, 'month'))
  }, [date])

  const changePayPrice = useCallback((event) => {
    const price = event.target.value
    if ('' === price || !numberRegex.test(price)) {
      setPayPrice('')
    } else {
      localStorage.setItem('PayPrice', price)
      setPayPrice(price)
    }
  }, [])

  return (
    <MainTemplate page={PAGE.calculation} icon={<CalenderIcon />}>
      <DipslaySlider
        value={date.format('YYYY年M月')}
        changeBack={changeBackMonth}
        changeForward={changeForwardkMonth}
      />
      {dispRecords && <DataTable title="支払額" contents={dispRecords} />}
      {dispCalclationRecords && <DataTable title="精算" contents={dispCalclationRecords} />}
      <FormLine>
        <Text label="支払額" value={payPrice} onChange={changePayPrice} />
      </FormLine>
    </MainTemplate>
  )
}

export default Calculation
