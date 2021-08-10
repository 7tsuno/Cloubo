import React from 'react'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import App from 'App'
import { Auth0Provider } from '@auth0/auth0-react'
import { AUTH } from 'constants/auth'
import Error from 'components/pages/Error'
import { useAppSelector } from 'app/hooks'
import { selectTheme } from 'stores/theme'

const AppWrapper: React.FC = () => {
  const { mode, color, shade } = useAppSelector(selectTheme)

  const theme = createTheme({
    palette: {
      primary: {
        main: color.colorList[shade],
      },
      type: mode,
    },
  })

  if (!AUTH.domain || !AUTH.clientId || !AUTH.audience) {
    return <Error message="必要な設定がありません" />
  }

  const providerConfig = {
    domain: AUTH.domain,
    clientId: AUTH.clientId,
    audience: AUTH.audience,
    redirectUri: window.location.origin,
  }

  return (
    <ThemeProvider theme={theme}>
      <Auth0Provider {...providerConfig}>
        <App />
      </Auth0Provider>
    </ThemeProvider>
  )
}

export default AppWrapper
