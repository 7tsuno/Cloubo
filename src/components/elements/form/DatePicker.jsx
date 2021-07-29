import React from 'react'
import DateUtils from '@date-io/dayjs'
import ja from 'dayjs/locale/ja'
import dayjs from 'dayjs'
import { MuiPickersUtilsProvider, DatePicker as DatePickerMUI } from '@material-ui/pickers'

class ExtendedUtils extends DateUtils {
  getCalendarHeaderText(date) {
    return dayjs(date).format('YYYY年MMM')
  }
  getDatePickerHeaderText(date) {
    return dayjs(date).format('MM/DD')
  }
}

const DatePicker = ({ label, onChange, value }) => {
  return (
    <MuiPickersUtilsProvider utils={ExtendedUtils} locale={ja}>
      <DatePickerMUI label={label} format="YYYY/MM/DD" value={value} onChange={onChange} />
    </MuiPickersUtilsProvider>
  )
}

export default React.memo(DatePicker)
