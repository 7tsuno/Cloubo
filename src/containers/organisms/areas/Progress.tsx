import { useAppSelector } from 'app/hooks'
import Progress from 'components/organisms/areas/Progress'
import React from 'react'
import { selectProgress } from 'stores/progress'

const ProgressContainer: React.FC = () => {
  const { progress } = useAppSelector(selectProgress)

  const props = {
    progress,
  }

  return <Progress {...props} />
}

export default ProgressContainer
