import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputIcon from 'components/elements/icons/InputIcon'
import CalenderIcon from 'components/elements/icons/CalenderIcon'
import ReportIcon from 'components/elements/icons/ReportIcon'
import CalculationIcon from 'components/elements/icons/CalculationIcon'
import { BottomNavigation, BottomNavigationAction, Divider } from '@material-ui/core'
import { PAGE } from 'constants/page'
import { useHistory } from 'react-router'

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: 'auto'
  },
  footerInner: {
    height: '80px',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4)
  }
}))

const FooterArea = ({ page }) => {
  const classes = useStyles()
  const history = useHistory()
  return (
    <footer className={classes.footer}>
      <Divider />
      <BottomNavigation
        value={page.path}
        onChange={(event, newValue) => {
          history.push(newValue)
        }}
        showLabels
        className={classes.footerInner}
      >
        <BottomNavigationAction value={PAGE.input.path} icon={<InputIcon />} />
        <BottomNavigationAction value={PAGE.calender.path} icon={<CalenderIcon />} />
        <BottomNavigationAction value={PAGE.report.path} icon={<ReportIcon />} />
        <BottomNavigationAction value={PAGE.calculation.path} icon={<CalculationIcon />} />
      </BottomNavigation>
    </footer>
  )
}

export default FooterArea
