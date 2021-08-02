import { Typography } from '@material-ui/core'
import ErrorTemplate from 'components/templates/ErrorTemplate'
import React from 'react'
const Error = ({ message }) => {
  return (
    <ErrorTemplate>
      <Typography variant="h2">Error</Typography>
      <Typography variant="body1">{message}</Typography>
    </ErrorTemplate>
  )
}

export default Error
