import { LinearProgress } from '@material-ui/core'
import React from 'react'
const Progress: React.FC<ProgressProps> = ({ progress }) => {
  return <>{progress && <LinearProgress color="secondary" />}</>
}

interface ProgressProps {
  progress: boolean
}

export default React.memo(Progress)
