import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { PAGE } from 'constants/page'
import { useHistory } from 'react-router'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: 'auto',
    padding: theme.spacing(4)
  }
}))

const ErrorFooterArea = () => {
  const classes = useStyles()
  const history = useHistory()

  const toTop = useCallback(() => {
    history.push(PAGE.input.path)
  }, [])

  return (
    <footer className={classes.footer}>
      <Button color="primary" onClick={toTop} variant="contained" fullWidth>
        トップへ
      </Button>
    </footer>
  )
}

export default ErrorFooterArea
