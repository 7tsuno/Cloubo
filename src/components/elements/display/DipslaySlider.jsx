import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import ForwardIcon from '../icons/ForwardIcon'
import BackIcon from '../icons/BackIcon'
import IconButton from '../buttons/IconButton'

const useStyles = makeStyles((theme) => ({
  sliderContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  label: {
    padding: theme.spacing(2)
  }
}))

const DipslaySlider = ({ changeBack, changeForward, value }) => {
  const classes = useStyles()

  return (
    <div className={classes.sliderContainer}>
      <IconButton color="inherit" onClick={changeBack}>
        <BackIcon />
      </IconButton>
      <Typography className={classes.label}>{value}</Typography>
      <IconButton color="inherit" onClick={changeForward}>
        <ForwardIcon />
      </IconButton>
    </div>
  )
}

export default React.memo(DipslaySlider)
