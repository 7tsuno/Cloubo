import React from 'react'
import { IconButton, makeStyles, Typography } from '@material-ui/core'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'

const useStyles = makeStyles((theme) => ({
  sliderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  label: {
    padding: theme.spacing(2),
  },
}))

const DipslaySlider: React.FC<DisplaySliderProps> = ({
  changeBack,
  changeForward,
  value,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.sliderContainer}>
      <IconButton color="inherit" onClick={changeBack}>
        <ArrowBackIos />
      </IconButton>
      <Typography className={classes.label}>{value}</Typography>
      <IconButton color="inherit" onClick={changeForward}>
        <ArrowForwardIos />
      </IconButton>
    </div>
  )
}

export interface DisplaySliderProps {
  value: string
  changeBack: () => void
  changeForward: () => void
}

export default React.memo(DipslaySlider)
