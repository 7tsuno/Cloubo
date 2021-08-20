import MainTemplate from 'components/templates/MainTemplate'
import { PAGE } from 'constants/page'
import React from 'react'
import { Repeat } from '@material-ui/icons'
import RegularItemList from 'containers/organisms/groups/RegularItemList'
const RegularItem: React.FC = () => {
  return (
    <MainTemplate page={PAGE.regularItem} icon={<Repeat />}>
      <RegularItemList />
    </MainTemplate>
  )
}

export default RegularItem
