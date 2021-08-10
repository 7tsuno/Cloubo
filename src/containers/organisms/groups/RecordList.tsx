import { useAuth0 } from '@auth0/auth0-react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import RecordList from 'components/organisms/groups/RecordList'
import dayjs from 'dayjs'
import React, { useCallback, useMemo, useState } from 'react'
import { selectDate } from 'stores/date'
import {
  deleteRecordsAsync,
  getRecordsAsync,
  Record,
  selectRecords,
} from 'stores/records'

const RecordListContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const { records } = useAppSelector(selectRecords)
  const { year, month, day } = useAppSelector(selectDate)
  const [open, setOpen] = useState(false)
  const [target, setTarget] = useState<Record>()
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

  const dayItems: Array<Record> = useMemo(
    () =>
      records.filter(
        (record: Record) =>
          dayjs()
            .year(year)
            .month(month - 1)
            .date(day)
            .format('YYYY/MM/DD') ===
          dayjs()
            .year(record.year)
            .month(record.month - 1)
            .date(record.day)
            .format('YYYY/MM/DD')
      ),
    [year, month, day, records]
  )

  const handleOpen = useCallback((target: Record) => {
    setTarget(target)
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const deleteTarget = useCallback(() => {
    const payload = target?.number
    if (payload) {
      auth0Token(async (token) => {
        await dispatch(
          deleteRecordsAsync({
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
    }
    setOpen(false)
  }, [target])

  const props = {
    date,
    dayItems,
    open,
    handleOpen,
    handleClose,
    target,
    deleteTarget,
  }

  return <RecordList {...props} />
}

export default RecordListContainer
