import Create from '@material-ui/icons/Create'
import RegisterForm from 'containers/organisms/groups/RegisterForm'
import MainTemplate from 'components/templates/MainTemplate'
import { PAGE } from 'constants/page'
import React from 'react'
const Input: React.FC = () => {
  return (
    <MainTemplate page={PAGE.input} icon={<Create />}>
      <RegisterForm />
    </MainTemplate>
  )
}

export default Input
