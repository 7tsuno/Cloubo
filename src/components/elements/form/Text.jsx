import React from 'react'
import { TextField } from '@material-ui/core'

const Text = (props) => {
  return <TextField {...props} />
}

export default React.memo(Text)
