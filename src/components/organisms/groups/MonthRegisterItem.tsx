import React from 'react'
import {
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { Repeat } from '@material-ui/icons'
import Modal from 'components/elements/display/Modal'

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
  caption: {
    margin: theme.spacing(2, 0),
  },
  list: {
    padding: theme.spacing(1),
  },
}))

const MonthRegisterItem: React.FC<MonthRegisterItemProps> = ({
  repeatRegisterd,
  open,
  handleOpen,
  handleClose,
  registerItems,
}) => {
  const classes = useStyles()
  return (
    <>
      <Button
        size="small"
        color={repeatRegisterd ? 'primary' : 'secondary'}
        startIcon={<Repeat />}
        onClick={handleOpen}
        className={classes.button}
      >
        定期項目 {repeatRegisterd ? 'すべて登録済み' : '未登録あり'}
      </Button>
      <Modal
        onClose={handleClose}
        open={open}
        content={
          <>
            <Typography>定期項目リスト</Typography>
            <div className={classes.caption}>
              <Typography variant="caption" color="inherit">
                ※その月に支払いの必要がない場合など、定期項目を確認済みとする場合にはチェックをしてください。
              </Typography>
            </div>
            <div className={classes.list}>
              {registerItems.map((registerItem, index) => (
                <div key={index}>
                  {registerItem.registerd ? (
                    <FormControlLabel
                      control={
                        <Checkbox checked={true} disabled color="primary" />
                      }
                      label={`${registerItem.title} ${registerItem.targetDate}`}
                    />
                  ) : (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={registerItem.confirmed}
                          onChange={registerItem.handleChange}
                          color="primary"
                        />
                      }
                      label={`${registerItem.title} ${registerItem.targetDate}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </>
        }
      />
    </>
  )
}

interface MonthRegisterItemProps {
  registerItems: Array<{
    title: string
    targetDate: string
    confirmed: boolean
    registerd: boolean
    handleChange: () => void
  }>
  repeatRegisterd: boolean
  open: boolean
  handleOpen: () => void
  handleClose: () => void
}

export default React.memo(MonthRegisterItem)
