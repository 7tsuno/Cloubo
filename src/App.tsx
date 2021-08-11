import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { PAGE } from 'constants/page'
import Error from 'components/pages/Error'
import Calendar from 'components/pages/Calendar'
import Calculation from 'components/pages/Calculation'
import Report from 'components/pages/Report'
import Input from 'components/pages/Input'
import { useAuth0 } from '@auth0/auth0-react'
import { CssBaseline } from '@material-ui/core'
import Loading from 'components/elements/display/Loading'

const App: React.FC = () => {
  const { error, isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

  if (error) {
    return <Error message={error.message} />
  }
  if (isLoading) {
    return (
      <>
        <CssBaseline />
        <Loading />
      </>
    )
  }
  if (!isAuthenticated) {
    loginWithRedirect()
    return (
      <>
        <CssBaseline />
        <Loading />
      </>
    )
  }

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default App
