import React, { useContext, useEffect, useState } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
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
import Login from 'components/pages/Login'

const App = () => {
  const [theme] = useContext(ThemeContext)
  const [storageJwt, setStorageJwt] = useContext(JwtContext)
  const [load, setLoad] = useState(false)
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const jwt = params.get('jwt') || storageJwt || localStorage.getItem('token')
    if (!jwt) {
      if (location.pathname !== PAGE.error.path && location.pathname !== PAGE.login.path) {
        history.push(PAGE.login.path)
      }
      setLoad(true)
    } else {
      setStorageJwt(jwt)
      localStorage.setItem('token', jwt)
      setLoad(true)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {load && (
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
          <Route>
            <Login path={PAGE.login.path} />
          </Route>
        </Switch>
      )}
    </ThemeProvider>
  )
}

export default App
