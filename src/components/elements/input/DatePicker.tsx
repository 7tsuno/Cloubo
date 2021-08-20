import React from 'react'
import DateUtils from '@date-io/dayjs'
import ja from 'dayjs/locale/ja'
import dayjs from 'dayjs'
import {
  MuiPickersUtilsProvider,
  DatePicker as DatePickerMUI,
} from '@material-ui/pickers'
import { TextFieldProps, TextField, withStyles, Theme } from '@material-ui/core'

class ExtendedUtils extends DateUtils {
  getCalendarHeaderText(date: dayjs.Dayjs) {
    return dayjs(date).format('YYYY年MMM')
  }
  getDatePickerHeaderText(date: dayjs.Dayjs) {
    return dayjs(date).format('MM/DD')
  }
}

const styles = (theme: Theme) => ({
  root: {
    '& .MuiInput-underline:before': {
      borderBottomColor: theme.palette.warning.main,
    },
    '& .MuiFormLabel-root': {
      color: theme.palette.warning.main,
    },
  },
})

const AccentTextField = withStyles(styles)(TextField)

const AccentInput: React.FC<TextFieldProps> = (props: TextFieldProps): any => {
  return (
    <AccentTextField
      type="text"
      label={props.label}
      onClick={props.onClick}
      value={props.value}
      onChange={props.onChange}
      fullWidth
    />
  )
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  onChange,
  value,
  accent,
}) => {
  return (
    <MuiPickersUtilsProvider utils={ExtendedUtils} locale={ja}>
      <DatePickerMUI
        label={label}
        format="YYYY/MM/DD"
        value={value}
        onChange={onChange}
        fullWidth
        TextFieldComponent={accent ? AccentInput : undefined}
      />
    </MuiPickersUtilsProvider>
  )
}

export interface DatePickerProps {
  label: string
  onChange: (date: dayjs.Dayjs | null) => void
  value: dayjs.Dayjs
  accent?: boolean
}

export default React.memo(DatePicker)
