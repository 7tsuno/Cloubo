import React from 'react'
import DateUtils from '@date-io/dayjs'
import ja from 'dayjs/locale/ja'
import dayjs from 'dayjs'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  date: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },
}))

class ExtendedUtils extends DateUtils {
  getCalendarHeaderText(date: dayjs.Dayjs) {
    return dayjs(date).format('YYYY年MMM')
  }
  getDatePickerHeaderText(date: dayjs.Dayjs) {
    return dayjs(date).format('MM/DD')
  }
}

const Calender: React.FC<CalenderProps> = ({
  date,
  changeDate,
  changeMonth,
  checkedDate,
}) => {
  const classes = useStyles()

  return (
    <MuiPickersUtilsProvider utils={ExtendedUtils} locale={ja}>
      <DatePicker
        onMonthChange={changeMonth}
        disableToolbar
        variant="static"
        format="YYYY/MM/DD"
        value={date}
        onChange={changeDate}
        renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
          return checkedDate &&
            day &&
            day.month() === date.month() &&
            checkedDate.includes(day.format('YYYY/MM/DD')) ? (
            <div className={classes.date}>{dayComponent}</div>
          ) : (
            <div>{dayComponent}</div>
          )
        }}
      />
    </MuiPickersUtilsProvider>
  )
}
export interface CalenderProps {
  date: dayjs.Dayjs
  changeDate: (date: dayjs.Dayjs | null) => void
  changeMonth: (date: dayjs.Dayjs | null) => void
  checkedDate: Array<string>
}

export default React.memo(Calender)
