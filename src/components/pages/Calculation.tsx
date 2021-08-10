import AttachMoney from '@material-ui/icons/AttachMoney'
import CalculationView from 'containers/organisms/groups/CalculationView'
import MainTemplate from 'components/templates/MainTemplate'
import { PAGE } from 'constants/page'
import React from 'react'
const Calculation: React.FC = () => {
  return (
    <MainTemplate page={PAGE.calculation} icon={<AttachMoney />}>
      <CalculationView />
    </MainTemplate>
  )
}

export default Calculation
