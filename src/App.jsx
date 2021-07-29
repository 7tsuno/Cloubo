import React, { useContext, useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { PAGE } from 'constants/page'
import Input from 'components/pages/Input'
import Calculation from 'components/pages/Calculation'
import Calendar from 'components/pages/Calendar'
import Report from 'components/pages/Report'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeContext } from 'contexts/ThemeContext'
// import Error from 'components/pages/Error'
import { JwtContext } from 'contexts/JwtContext'
import Error from 'components/pages/Error'

const App = () => {
  const [theme] = useContext(ThemeContext)
  const [storageJwt, setStorageJwt] = useContext(JwtContext)
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const jwt = params.get('jwt') || storageJwt || localStorage.getItem('token')
    if (!jwt) {
      if (location.pathname !== PAGE.error.path) {
        window.location.href = PAGE.error.path
      }
    } else {
      setStorageJwt(jwt)
      localStorage.setItem('token', jwt)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {storageJwt ? (
        <Switch>
          <Route path={PAGE.input.path} exact>
            <Input />
          </Route>
          <Route path={PAGE.calender.path} exact>
            <Calendar />
          </Route>
          <Route path={PAGE.calculation.path} exact>
            <Calculation />
          </Route>
          <Route path={PAGE.report.path} exact>
            <Report />
          </Route>
          <Route path={PAGE.error.path}>
            <Error />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path={PAGE.error.path}>
            <Error />
          </Route>
        </Switch>
      )}
    </ThemeProvider>
  )
}

export default App
