import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2)
  }
}))

const ErrorTemplate = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.content}>{children}</div>
}

export default ErrorTemplate
