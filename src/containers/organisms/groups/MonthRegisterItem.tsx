import { useAppDispatch, useAppSelector } from 'app/hooks'
import MonthRegisterItem from 'components/organisms/groups/MonthRegisterItem'
import React, { useCallback, useMemo, useState } from 'react'
import { selectDate } from 'stores/date'
import { selectRecords } from 'stores/records'
import { changeNotificated, selectRegularItems } from 'stores/regularItems'

const MonthRegisterItemContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const { regularItems } = useAppSelector(selectRegularItems)
  const { year, month } = useAppSelector(selectDate)
  const { records } = useAppSelector(selectRecords)
  const [open, setOpen] = useState(false)

  const registerItemsLine = useMemo(() => {
    return regularItems.map((regularItem) => ({
      title: regularItem.title,
      targetDate: regularItem.targetDay ? ` (${regularItem.targetDay}日)` : '',
      confirmed: regularItem.confirmedMonths.some(
        (confirmedMonth) =>
          confirmedMonth.year === year && confirmedMonth.month === month
      ),
      registerd: records
        .filter((record) => record.month === month)
        .some(
          (record) =>
            (record.memo === regularItem.title ||
              record.category === regularItem.title) &&
            record.mine
        ),
      handleChange: () => {
        dispatch(
          changeNotificated({
            index: regularItem.index,
            notificatedDate: {
              year,
              month,
            },
          })
        )
      },
    }))
  }, [regularItems, records, year, month])

  const repeatRegisterd = useMemo(() => {
    return registerItemsLine.every(
      (registerItem) => registerItem.confirmed || registerItem.registerd
    )
  }, [registerItemsLine])

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const props = {
    repeatRegisterd,
    open,
    handleOpen,
    handleClose,
    registerItems: registerItemsLine,
  }

  return <MonthRegisterItem {...props} />
}

export default MonthRegisterItemContainer
