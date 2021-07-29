import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  formLine: {
    margin: theme.spacing(3, 0)
  }
}))

const FormLine = ({ children }) => {
  const classes = useStyles()

  return <div className={classes.formLine}>{children}</div>
}

export default FormLine
