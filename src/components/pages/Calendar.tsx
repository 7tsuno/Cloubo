import EventNote from '@material-ui/icons/EventNote'
import RecordList from 'containers/organisms/groups/RecordList'
import MainTemplate from 'components/templates/MainTemplate'
import { PAGE } from 'constants/page'
import React from 'react'
import RecordCalender from 'containers/organisms/groups/RecordCalender'
import MonthRegisterItem from 'containers/organisms/groups/MonthRegisterItem'
const Calendar: React.FC = () => {
  return (
    <MainTemplate page={PAGE.calender} icon={<EventNote />}>
      <RecordCalender />
      <MonthRegisterItem />
      <RecordList />
    </MainTemplate>
  )
}

export default Calendar
