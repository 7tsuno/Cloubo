import React, { ChangeEvent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Create from '@material-ui/icons/Create'
import EventNote from '@material-ui/icons/EventNote'
import PieChart from '@material-ui/icons/PieChart'
import AttachMoney from '@material-ui/icons/AttachMoney'
import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
} from '@material-ui/core'
import { Page, PAGE } from 'constants/page'
import { Repeat } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: 'auto',
  },
  footerInner: {
    height: '80px',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  },
  button: {
    minWidth: '0',
  },
}))

const FooterArea: React.FC<FooterAreaProps> = ({ page, onChange }) => {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      <Divider />
      <BottomNavigation
        value={page.path}
        onChange={onChange}
        showLabels
        className={classes.footerInner}
      >
        <BottomNavigationAction
          value={PAGE.input.path}
          icon={<Create />}
          className={classes.button}
        />
        <BottomNavigationAction
          value={PAGE.calender.path}
          icon={<EventNote />}
          className={classes.button}
        />
        <BottomNavigationAction
          value={PAGE.report.path}
          icon={<PieChart />}
          className={classes.button}
        />
        <BottomNavigationAction
          value={PAGE.calculation.path}
          icon={<AttachMoney />}
          className={classes.button}
        />
        <BottomNavigationAction
          value={PAGE.regularItem.path}
          icon={<Repeat />}
          className={classes.button}
        />
      </BottomNavigation>
    </footer>
  )
}

export interface FooterAreaProps {
  page: Page
  onChange: (event: ChangeEvent<unknown>, value: any) => void
}

export default React.memo(FooterArea)
