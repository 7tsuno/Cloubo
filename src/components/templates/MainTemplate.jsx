import React from 'react'
import HeaderArea from 'components/areas/HeaderArea'
import FooterArea from 'components/areas/FooterArea'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  content: {
    padding: theme.spacing(2)
  }
}))

const MainTemplate = ({ page, children, icon }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <HeaderArea title={page.name} icon={icon} />
      <div className={classes.content}>{children}</div>
      <FooterArea page={page} />
    </div>
  )
}

export default MainTemplate
