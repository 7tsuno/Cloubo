import ErrorFooterArea from 'components/organisms/areas/ErrorFooterArea'
import { PAGE } from 'constants/page'
import React, { useCallback } from 'react'
import { useHistory } from 'react-router'

const ErrorFooterAreaContainer: React.FC = () => {
  const history = useHistory()
  const backToTop = useCallback(() => {
    history.push(PAGE.input.path)
  }, [])

  const props = { backToTop }

  return <ErrorFooterArea {...props} />
}
export default ErrorFooterAreaContainer
