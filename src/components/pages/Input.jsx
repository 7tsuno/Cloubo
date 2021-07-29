import React, { useState, useCallback, useContext } from 'react'
import dayjs from 'dayjs'
import FormLine from 'components/elements/layout/FormLine'
import MainTemplate from 'components/templates/MainTemplate'
import InputIcon from 'components/elements/icons/InputIcon'
import Text from 'components/elements/form/Text'
import DatePicker from 'components/elements/form/DatePicker'
import Paper from 'components/elements/layout/Paper'
import { CATEGORY } from 'constants/category'
import SelectItem from 'components/elements/form/SelectItem'
import Dialog from 'components/elements/modals/Dialog'
import Button from 'components/elements/buttons/Button'
import { PAGE } from 'constants/page'
import DataList from 'components/elements/display/DataList'
import { useEffect } from 'react'
import { useSender } from 'utils/axios'
import { API } from 'constants/api'
import Accordion from 'components/elements/display/Accordion'
import { toPrice } from 'utils/format'
import { CashRecordsContext } from 'contexts/CashRecordsContext'

const numberRegex = new RegExp(/^([1-9]\d*)$/)

const categoryItems = CATEGORY.map((category) => ({ value: category, name: category }))

const Input = () => {
  const [date, setDate] = useState(dayjs())
  const [price, setPrice] = useState('')
  const [memo, setMemo] = useState('')
  const [category, setCategory] = useState(CATEGORY[0])
  const [openConfirm, setOpenConfirm] = React.useState(false)
  const [openComplete, setOpenComplete] = React.useState(false)
  const [load, setLoad] = React.useState(false)
  const [dayItems, setDayItems] = React.useState([])
  const [, getRecords] = useSender(API.GET_RECORDS)
  const [, postRecord] = useSender(API.POST_RECORD)
  const [, setCashRecords] = useContext(CashRecordsContext)

  const createCash = async () => {
    const payload = {
      year: dayjs().year()
    }
    const response = await getRecords(payload)
    setLoad(true)
    setCashRecords(response.result.data)
  }

  useEffect(createCash, [])

  useEffect(async () => {
    if (load) {
      const payload = {
        year: date.year(),
        month: date.month() + 1,
        day: date.date()
      }
      const response = await getRecords(payload)
      setDayItems(response.result.data)
    }
  }, [date, load])

  const changeDate = useCallback((date) => {
    setDate(date)
  }, [])

  const changePrice = useCallback((event) => {
    const price = event.target.value
    if ('' === price || !numberRegex.test(price)) {
      setPrice('')
    } else {
      setPrice(price)
    }
  }, [])

  const changeMemo = useCallback((event) => {
    setMemo(event.target.value)
  }, [])

  const changeCategory = useCallback((category) => {
    setCategory(category)
  }, [])

  const handleOpenConfirm = () => {
    setOpenConfirm(true)
  }

  const handleCloseConrifm = () => {
    setOpenConfirm(false)
  }

  const register = async () => {
    const payload = {
      year: date.year(),
      month: date.month() + 1,
      day: date.date(),
      memo: memo,
      price: price,
      category: category
    }
    handleCloseConrifm()
    setOpenComplete(true)
    await postRecord(payload)
    await createCash()
  }

  const handleCloseComplete = () => {
    setDate(dayjs())
    setPrice('')
    setMemo('')
    setCategory(CATEGORY[0])
    setOpenComplete(false)
  }

  return (
    <MainTemplate page={PAGE.input} icon={<InputIcon />}>
      <Paper>
        <FormLine>
          <DatePicker label="日付" onChange={changeDate} value={date} />
        </FormLine>
        <FormLine>
          <SelectItem
            label="カテゴリ"
            onChange={changeCategory}
            items={categoryItems}
            value={category}
          />
        </FormLine>
        <FormLine>
          <Text label="金額" onChange={changePrice} value={price} />
        </FormLine>
        <FormLine>
          <Text label="メモ" onChange={changeMemo} fullWidth value={memo} />
        </FormLine>
        <FormLine>
          <Button variant="contained" fullWidth color="primary" onClick={handleOpenConfirm}>
            登録
          </Button>
        </FormLine>
        <Dialog
          handleClose={handleCloseConrifm}
          open={openConfirm}
          content={
            <>
              <DataList
                variant="body1"
                datas={[
                  [{ type: 'bold', value: '日付' }, date.format('YYYY/MM/DD')],
                  [{ type: 'bold', value: 'メモ' }, memo || 'なし'],
                  [{ type: 'bold', value: 'カテゴリ' }, category],
                  [{ type: 'bold', value: '金額' }, `${toPrice(price)}円`]
                ]}
              />
              {dayItems.length > 0 && (
                <Accordion
                  title="指定日に登録済みの項目があります"
                  titleVariant="caption"
                  content={
                    <DataList
                      titleVariant="overline"
                      variant="caption"
                      dense
                      datas={dayItems.map((item, index) => {
                        return [
                          `${index + 1}.`,
                          item.user,
                          item.category,
                          item.memo,
                          `${toPrice(item.price)}円`
                        ]
                      })}
                    />
                  }
                />
              )}
            </>
          }
          action={
            <Button variant="contained" color="primary" onClick={register}>
              この内容で登録する
            </Button>
          }
        />
        <Dialog
          handleClose={handleCloseComplete}
          open={openComplete}
          title="登録が完了しました。"
          action={
            <Button variant="contained" color="primary" onClick={handleCloseComplete}>
              OK
            </Button>
          }
        />
      </Paper>
    </MainTemplate>
  )
}

export default Input
