import React, { useCallback, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Text from 'components/elements/form/Text'
import { useSender } from 'utils/axios'
import { API } from 'constants/api'
import { PAGE } from 'constants/page'
import { useHistory } from 'react-router'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const Login = () => {
  const classes = useStyles()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [login] = useSender(API.LOGIN)
  const history = useHistory()

  const changeUser = useCallback((event) => {
    setUser(event.target.value)
  }, [])

  const changePass = useCallback((event) => {
    setPass(event.target.value)
  }, [])

  const next = async () => {
    const result = await login({ user, pass })
    if (result.data) {
      localStorage.setItem('token', result.data.token)
      history.push(PAGE.input.path)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Kakeibow
        </Typography>
        <Text
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="user"
          onChange={changeUser}
        />
        <Text
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={changePass}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={next}
        >
          Sign In
        </Button>
      </div>
    </Container>
  )
}

export default Login
