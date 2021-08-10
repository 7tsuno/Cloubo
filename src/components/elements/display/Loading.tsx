import { makeStyles } from '@material-ui/core'
import React from 'react'
import ReactLoading from 'react-loading'

const useStyles = makeStyles(() => ({
  loading: {
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    position: 'fixed',
    background: '#303030',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const Loading: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.loading}>
      <ReactLoading type="cylon" color="#fff" width={100} />
    </div>
  )
}

export default React.memo(Loading)
