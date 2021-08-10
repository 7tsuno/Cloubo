import React from 'react'
import DateUtils from '@date-io/dayjs'
import ja from 'dayjs/locale/ja'
import dayjs from 'dayjs'
import {
  MuiPickersUtilsProvider,
  DatePicker as DatePickerMUI,
} from '@material-ui/pickers'

class ExtendedUtils extends DateUtils {
  getCalendarHeaderText(date: dayjs.Dayjs) {
    return dayjs(date).format('YYYY年MMM')
  }
  getDatePickerHeaderText(date: dayjs.Dayjs) {
    return dayjs(date).format('MM/DD')
  }
}

const DatePicker: React.FC<DatePickerProps> = ({ label, onChange, value }) => {
  return (
    <MuiPickersUtilsProvider utils={ExtendedUtils} locale={ja}>
      <DatePickerMUI
        label={label}
        format="YYYY/MM/DD"
        value={value}
        onChange={onChange}
      />
    </MuiPickersUtilsProvider>
  )
}

export interface DatePickerProps {
  label: string
  onChange: (date: dayjs.Dayjs | null) => void
  value: dayjs.Dayjs
}

export default React.memo(DatePicker)
