import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper as PaperMUI } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2)
  }
}))

const Paper = (props) => {
  const classes = useStyles()
  return <PaperMUI className={classes.paper}>{props.children}</PaperMUI>
}

export default Paper
