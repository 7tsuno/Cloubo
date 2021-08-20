import {
  Button,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import { LibraryAdd } from '@material-ui/icons'
import Modal from 'components/elements/display/Modal'
import React, { ChangeEventHandler } from 'react'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  input: {
    margin: theme.spacing(2, 0),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))

const RegularItemRegisterModal: React.FC<RegularItemRegisterModalProps> = ({
  targetDay,
  title,
  changeTargetDay,
  changeTitle,
  clearClick,
  register,
  handleOpen,
  handleClose,
  open,
  registerDisabled,
}) => {
  const classes = useStyles()
  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <LibraryAdd />
      </IconButton>
      <Modal
        onClose={handleClose}
        open={open}
        content={
          <>
            <TextField
              label="定期項目のタイトル(必須)"
              onChange={changeTitle}
              value={title}
              fullWidth
              className={classes.input}
            />
            <TextField
              label="毎月の登録日(1-31)"
              onChange={changeTargetDay}
              value={targetDay}
              fullWidth
              className={classes.input}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">日</InputAdornment>
                ),
              }}
            />
            <Typography variant="caption" color="primary">
              定期項目のタイトルと一致するメモかカテゴリを持つ明細が月中に存在するかを判定します。
            </Typography>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                onClick={clearClick}
                className={classes.button}
              >
                クリア
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={registerDisabled}
                onClick={register}
                className={classes.button}
              >
                登録
              </Button>
            </div>
          </>
        }
      />
    </>
  )
}

interface RegularItemRegisterModalProps {
  targetDay: string
  title: string
  changeTargetDay: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  changeTitle: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  clearClick: () => void
  register: () => void
  handleOpen: () => void
  handleClose: () => void
  open: boolean
  registerDisabled: boolean
}

export default React.memo(RegularItemRegisterModal)
