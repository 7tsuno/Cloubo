import React from 'react'
import dayjs from 'dayjs'
import Calender from 'components/elements/display/Calender'

const RecordCalender: React.FC<RecordCalenderProps> = ({
  date,
  changeDate,
  changeMonth,
  checkedDate,
}) => {
  return (
    <Calender
      date={date}
      changeDate={changeDate}
      changeMonth={changeMonth}
      checkedDate={checkedDate}
    />
  )
}

interface RecordCalenderProps {
  date: dayjs.Dayjs
  changeDate: (date: dayjs.Dayjs | null) => void
  changeMonth: (date: dayjs.Dayjs | null) => void
  checkedDate: Array<string>
}

export default React.memo(RecordCalender)
