import React from 'react'
import { FormControlLabel, InputLabel, Switch } from '@material-ui/core'
import FormLine from '../layout/FormLine'

const Text = (props) => {
  return (
    <>
      <InputLabel>{props.title}</InputLabel>
      <FormLine>
        <FormControlLabel control={<Switch {...props} />} label={props.label} />
      </FormLine>
    </>
  )
}

export default React.memo(Text)
