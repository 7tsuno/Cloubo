import React from 'react'
import {
  FormControlLabel,
  InputLabel,
  makeStyles,
  Switch as SwitchMUI,
  SwitchProps as SwitchMUIProps,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(2),
  },
}))

const Text: React.FC<SwitchProps> = (props) => {
  const classes = useStyles()
  return (
    <>
      <InputLabel>{props.title}</InputLabel>
      <FormControlLabel
        control={<SwitchMUI {...props} />}
        label={props.label}
        className={classes.control}
      />
    </>
  )
}

export type SwitchProps = SwitchMUIProps & {
  title: string
  label: string
}

export default React.memo(Text)
