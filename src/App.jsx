import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import { PAGE } from 'constants/page'
import Input from 'components/pages/Input'
import Calculation from 'components/pages/Calculation'
import Calendar from 'components/pages/Calendar'
import Report from 'components/pages/Report'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeContext } from 'contexts/ThemeContext'
import Error from 'components/pages/Error'
import { useAuth0 } from '@auth0/auth0-react'
import Loading from 'components/elements/display/Loading'

const App = () => {
  const [theme] = useContext(ThemeContext)
  const { error, isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

  if (error) {
    return <Error message={error.message} />
  }

  if (isLoading) {
    return <Loading />
  }

  if (!isAuthenticated) {
    loginWithRedirect()
    return <div></div>
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
        <Route>
          <Error message={'This is Unhandled Error.'} />
        </Route>
      </Switch>
    </ThemeProvider>
  )
}

export default App
