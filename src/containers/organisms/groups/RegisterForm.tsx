import { useAuth0 } from '@auth0/auth0-react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import RegisterForm from 'components/organisms/groups/RegisterForm'
import { Category, CATEGORY, isCategory } from 'constants/category'
import dayjs from 'dayjs'
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { resetDate, selectDate, setDate } from 'stores/date'
import { clear, selectForm, setCategory, setMemo, setPrice } from 'stores/form'
import {
  getRecordsAsync,
  postRecordsAsync,
  Record,
  selectRecords,
} from 'stores/records'

const RegisterFormContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const { category, memo, price } = useAppSelector(selectForm)
  const { records } = useAppSelector(selectRecords)
  const { year, month, day } = useAppSelector(selectDate)
  const [open, setOpen] = useState(false)
  const [categoryItems] = useState<Array<Category>>(
    CATEGORY.map((category) => category)
  )
  const { getAccessTokenSilently } = useAuth0()

  const auth0Token = async (callBack: (token: string) => void) => {
    const accessToken = await getAccessTokenSilently()
    callBack(accessToken)
  }

  const date = useMemo(
    () =>
      dayjs()
        .year(year)
        .month(month - 1)
        .date(day),
    [year, month, day]
  )

  const dayItems = useMemo(
    () =>
      records.filter((record: Record) =>
        dayjs()
          .year(year)
          .month(month - 1)
          .date(day)
          .isSame(
            dayjs()
              .year(record.year)
              .month(record.month - 1)
              .date(record.day),
            'day'
          )
      ),
    [year, month, day, records]
  )

  const notToday = useMemo(() => {
    return !dayjs().isSame(
      dayjs()
        .year(year)
        .month(month - 1)
        .date(day),
      'day'
    )
  }, [year, month, day])

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

  const toToday = useCallback(() => {
    dispatch(
      setDate({
        year: dayjs().year(),
        month: dayjs().month() + 1,
        day: dayjs().date(),
      })
    )
  }, [])

  const changeCategory = useCallback((value: string) => {
    if (isCategory(value)) {
      dispatch(setCategory(value))
    }
  }, [])

  const changePrice = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const price = event.target.value
    if ('' === price || !new RegExp(/^([1-9]\d*)$/).test(price)) {
      dispatch(setPrice(''))
    } else {
      dispatch(setPrice(price))
    }
  }, [])

  const changeMemo = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setMemo(event.target.value))
  }, [])

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const register = useCallback(() => {
    const payload = {
      category,
      year,
      month,
      day,
      memo,
      price,
    }
    auth0Token(async (token) => {
      await dispatch(
        postRecordsAsync({
          payload,
          token,
        })
      )
      dispatch(
        getRecordsAsync({
          payload: {
            year,
          },
          token,
        })
      )
    })
    dispatch(clear())
    setOpen(false)
  }, [category, year, month, day, memo, price])

  const clearClick = useCallback(() => {
    dispatch(clear())
    dispatch(resetDate())
  }, [])

  const props = {
    date,
    category,
    price,
    memo,
    dayItems,
    categoryItems,
    open,
    changeDate,
    changeCategory,
    changePrice,
    changeMemo,
    handleOpen,
    handleClose,
    register,
    clearClick,
    notToday,
    toToday,
  }

  return <RegisterForm {...props} />
}

export default RegisterFormContainer
