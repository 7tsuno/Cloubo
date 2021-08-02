import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ErrorFooterArea from 'components/areas/ErrorFooterArea'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  content: {
    padding: theme.spacing(4)
  }
}))

const ErrorTemplate = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.content}>{children}</div>
      <ErrorFooterArea />
    </div>
  )
}

export default ErrorTemplate
