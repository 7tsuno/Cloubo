import React from 'react'
import { IconButton as IconButtonMUI } from '@material-ui/core'

const IconButton = (props) => {
  return <IconButtonMUI {...props} />
}

export default React.memo(IconButton)
