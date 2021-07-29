import React, { useState, useCallback } from 'react'
import dayjs from 'dayjs'
import MainTemplate from 'components/templates/MainTemplate'
import { PAGE } from 'constants/page'
import { useEffect } from 'react'
import { useSender } from 'utils/axios'
import { API } from 'constants/api'
import CalenderIcon from 'components/elements/icons/CalenderIcon'
import Calender from 'components/elements/display/Calender'
import DataList from 'components/elements/display/DataList'
import { makeStyles } from '@material-ui/core'
import Button from 'components/elements/buttons/Button'
import { TYPE } from 'constants/theme'
import Dialog from 'components/elements/modals/Dialog'
import { toPrice } from 'utils/format'

const useStyles = makeStyles((theme) => ({
  listArea: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  deleteButton: {
    color: theme.palette.color[theme.palette.type === TYPE.LIGHT ? 600 : 200]
  }
}))

const toDateStr = (year, month, day) =>
  dayjs()
    .year(year)
    .month(month - 1)
    .date(day)
    .format('YYYY/MM/DD')

const Calendar = () => {
  const classes = useStyles()
  const [date, setDate] = useState(dayjs())
  const [year, setYear] = useState(dayjs().year())
  const [month, setMonth] = useState(dayjs().month() + 1)
  const [items, setItems] = React.useState([])
  const [checkedDate, setCheckedDate] = React.useState([])
  const [openConfirm, setOpenConfirm] = React.useState(false)
  const [openComplete, setOpenComplete] = React.useState(false)
  const [target, setTarget] = React.useState()
  const [, getRecords] = useSender(API.GET_RECORDS)
  const [, deleteRecord] = useSender(API.DELETE_RECORD)

  const update = async () => {
    const payload = {
      year: year,
      month: month
    }
    const response = await getRecords(payload)
    const items = response.result.data
    setItems(items)

    const dateSet = new Set()
    items
      .map((item) => toDateStr(item.year, item.month, item.day))
      .forEach((date) => dateSet.add(date))
    setCheckedDate(Array.from(dateSet))
  }

  useEffect(update, [year, month])

  const changeDate = useCallback((date) => {
    setDate(date)
  }, [])

  const changeMonth = useCallback((date) => {
    setMonth(dayjs(date).month() + 1)
    setYear(dayjs(date).year())
  }, [])

  const handleOpenConfirm = (target) => {
    setTarget(target)
    setOpenConfirm(true)
  }

  const handleCloseConfirm = () => {
    setOpenConfirm(false)
  }

  const deleteTarget = async () => {
    await deleteRecord(target.number)
    setOpenConfirm(false)
    setOpenComplete(true)
    await update()
  }

  const handleCloseComplete = () => {
    setOpenComplete(false)
  }

  return (
    <MainTemplate page={PAGE.calender} icon={<CalenderIcon />}>
      <Calender
        value={date}
        onChange={changeDate}
        onMonthChange={changeMonth}
        checkedDate={checkedDate}
      />
      <div className={classes.listArea}>
        <DataList
          title={dayjs(date).format('YYYY/MM/DD')}
          titleVariant="body1"
          variant="caption"
          datas={items
            .filter(
              (item) =>
                toDateStr(item.year, item.month, item.day) === dayjs(date).format('YYYY/MM/DD')
            )
            .map((item, index) => {
              return [
                `${index + 1}.`,
                item.user,
                item.category,
                item.memo,
                `${toPrice(item.price)}円`,
                {
                  type: 'obj',
                  value: (
                    <Button
                      className={classes.deleteButton}
                      onClick={() => handleOpenConfirm({ ...item })}
                    >
                      削除
                    </Button>
                  )
                }
              ]
            })}
        />
      </div>
      <Dialog
        handleClose={handleCloseConfirm}
        open={openConfirm}
        content={
          <>
            {target && (
              <DataList
                variant="body1"
                datas={[
                  [
                    { type: 'bold', value: '日付' },
                    toDateStr(target.year, target.month, target.day)
                  ],
                  [{ type: 'bold', value: 'メモ' }, target.memo],
                  [{ type: 'bold', value: 'カテゴリ' }, target.category],
                  [{ type: 'bold', value: '金額' }, `${toPrice(target.price)}円`]
                ]}
              />
            )}
          </>
        }
        action={
          <Button variant="contained" color="primary" onClick={deleteTarget}>
            この内容を削除する
          </Button>
        }
      />
      <Dialog
        handleClose={handleCloseComplete}
        open={openComplete}
        title="削除が完了しました。"
        action={
          <Button variant="contained" color="primary" onClick={handleCloseComplete}>
            OK
          </Button>
        }
      />
    </MainTemplate>
  )
}

export default Calendar
