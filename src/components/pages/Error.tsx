import { Typography } from '@material-ui/core'
import ErrorTemplate from 'components/templates/ErrorTemplate'
import React from 'react'
const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <ErrorTemplate>
      <Typography variant="h2">Error</Typography>
      <Typography variant="body1">{message}</Typography>
    </ErrorTemplate>
  )
}

export interface ErrorProps {
  message: string
}

export default Error
