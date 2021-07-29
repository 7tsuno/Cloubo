import React from 'react'
import DateUtils from '@date-io/dayjs'
import ja from 'dayjs/locale/ja'
import dayjs from 'dayjs'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core'
import { TYPE } from 'constants/theme'

const useStyles = makeStyles((theme) => ({
  date: {
    backgroundColor: theme.palette.color[theme.palette.type === TYPE.LIGHT ? '100' : '800']
  }
}))

class ExtendedUtils extends DateUtils {
  getCalendarHeaderText(date) {
    return dayjs(date).format('YYYY年MMM')
  }
  getDatePickerHeaderText(date) {
    return dayjs(date).format('MM/DD')
  }
}

const Calender = ({ onMonthChange, onChange, value, checkedDate }) => {
  const classes = useStyles()

  return (
    <MuiPickersUtilsProvider utils={ExtendedUtils} locale={ja}>
      <DatePicker
        onMonthChange={onMonthChange}
        disableToolbar
        variant="static"
        format="YYYY/MM/DD"
        value={value}
        onChange={onChange}
        renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
          return checkedDate ? (
            checkedDate.includes(day.format('YYYY/MM/DD')) ? (
              <div className={classes.date}>{dayComponent}</div>
            ) : (
              <div>{dayComponent}</div>
            )
          ) : (
            <div>{dayComponent}</div>
          )
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default React.memo(Calender)
