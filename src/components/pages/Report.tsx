import PieChart from '@material-ui/icons/PieChart'
import ReportView from 'containers/organisms/groups/ReportView'
import MainTemplate from 'components/templates/MainTemplate'
import { PAGE } from 'constants/page'
import React from 'react'
const Report: React.FC = () => {
  return (
    <MainTemplate page={PAGE.report} icon={<PieChart />}>
      <ReportView />
    </MainTemplate>
  )
}

export default Report
