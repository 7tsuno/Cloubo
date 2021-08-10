import React from 'react'
import HeaderArea from 'containers/organisms/areas/HeaderArea'
import FooterArea from 'containers/organisms/areas/FooterArea'
import { makeStyles } from '@material-ui/core/styles'
import { Page } from 'constants/page'
import CommonModal from 'containers/organisms/areas/CommonModal'
import Progress from 'containers/organisms/areas/Progress'
import AppContainer from 'containers/organisms/areas/AppContainer'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    padding: theme.spacing(2),
  },
}))

const MainTemplate: React.FC<MainTemplateProps> = ({
  page,
  children,
  icon,
}) => {
  const classes = useStyles()
  return (
    <AppContainer>
      <div className={classes.root}>
        <Progress />
        <HeaderArea title={page.name} icon={icon} />
        <div className={classes.content}>{children}</div>
        <FooterArea page={page} />
        <CommonModal />
      </div>
    </AppContainer>
  )
}

export interface MainTemplateProps {
  page: Page
  children: React.ReactNode
  icon: React.ReactNode
}

export default MainTemplate
