import FooterArea from 'components/organisms/areas/FooterArea'
import { Page } from 'constants/page'
import React, { useCallback } from 'react'
import { useHistory } from 'react-router'

const FooterAreaContainer: React.FC<FooterAreaContainerProps> = ({ page }) => {
  const history = useHistory()
  const onChange = useCallback((event, newValue) => {
    history.push(newValue)
  }, [])
  const props = { onChange, page }

  return <FooterArea {...props} />
}

export interface FooterAreaContainerProps {
  page: Page
}

export default FooterAreaContainer
