import React, { useState } from 'react'
import { createTheme } from '@material-ui/core/styles'
import { ThemeContext } from 'contexts/ThemeContext'
import App from 'App'
import { COLORS, TYPE } from 'constants/theme'
import { CashRecordsContext } from 'contexts/CashRecordsContext'
import { Auth0Provider } from '@auth0/auth0-react'
import { AUTH } from 'constants/auth'

const AppWrapper = () => {
  const type = localStorage.getItem('themeType') || TYPE.LIGHT
  const colorName = localStorage.getItem('themeColor') || COLORS[0].name
  const color = COLORS.find((color) => color.name === colorName).color
  const shade = localStorage.getItem('themeColorShade') || 500
  const initialTheme = createTheme({
    palette: {
      primary: {
        main: color[shade]
      },
      type: type,
      color: color,
      shade: shade
    }
  })
  const themeContext = useState(initialTheme)
  const cashRecordsContext = useState([])

  const providerConfig = {
    domain: AUTH.domain,
    clientId: AUTH.clientId,
    audience: AUTH.audience,
    redirectUri: window.location.origin
  }

  return (
    <ThemeContext.Provider value={themeContext}>
      <Auth0Provider {...providerConfig}>
        <CashRecordsContext.Provider value={cashRecordsContext}>
          <App />
        </CashRecordsContext.Provider>
      </Auth0Provider>
    </ThemeContext.Provider>
  )
}

export default AppWrapper
