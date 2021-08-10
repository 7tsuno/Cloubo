import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: 'auto',
    padding: theme.spacing(4),
  },
}))

const ErrorFooterArea: React.FC<ErrorFooterAreaProps> = ({ backToTop }) => {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      <Button color="primary" onClick={backToTop} variant="contained" fullWidth>
        トップへ
      </Button>
    </footer>
  )
}

export interface ErrorFooterAreaProps {
  backToTop: () => void
}

export default React.memo(ErrorFooterArea)
