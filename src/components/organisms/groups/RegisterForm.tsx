import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import { Update } from '@material-ui/icons'
import Accordion from 'components/elements/display/Accordion'
import DataList from 'components/elements/display/DataList'
import Modal from 'components/elements/display/Modal'
import DatePicker from 'components/elements/input/DatePicker'
import SelectItem from 'components/elements/input/SelectItem'
import { Category } from 'constants/category'
import dayjs from 'dayjs'
import React, { ChangeEventHandler } from 'react'
import { Record } from 'stores/records'
import { priceFormat } from 'utils/format'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  category: {
    marginTop: theme.spacing(2),
  },
  memo: {
    marginTop: theme.spacing(2),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  resetDate: {
    marginLeft: theme.spacing(-14),
    marginTop: theme.spacing(1.5),
  },
}))

const RegisterForm: React.FC<RegisterFormProps> = ({
  date,
  notToday,
  category,
  price,
  memo,
  dayItems,
  categoryItems,
  open,
  changeDate,
  changeCategory,
  changePrice,
  changeMemo,
  handleOpen,
  handleClose,
  register,
  clearClick,
  toToday,
}) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <DatePicker
        label="日付"
        onChange={changeDate}
        value={date}
        accent={notToday}
      />
      {notToday && (
        <Button
          variant="outlined"
          size="small"
          color="default"
          className={classes.resetDate}
          startIcon={<Update />}
          onClick={toToday}
        >
          今日に設定
        </Button>
      )}
      <div className={classes.category}>
        <SelectItem
          label="カテゴリ"
          onChange={changeCategory}
          items={categoryItems}
          value={category}
        />
      </div>
      <TextField label="金額" onChange={changePrice} value={price} />
      <TextField
        label="メモ"
        onChange={changeMemo}
        fullWidth
        value={memo}
        className={classes.memo}
      />

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
          onClick={handleOpen}
          className={classes.button}
        >
          登録
        </Button>
      </div>
      <Modal
        onClose={handleClose}
        open={open}
        content={
          <>
            <DataList
              variant="body1"
              datas={[
                [
                  { type: 'boldText', value: '日付' },
                  { type: 'text', value: date.format('YYYY/MM/DD') },
                ],
                [
                  { type: 'boldText', value: 'メモ' },
                  { type: 'text', value: memo || 'なし' },
                ],
                [
                  { type: 'boldText', value: 'カテゴリ' },
                  { type: 'text', value: category },
                ],
                [
                  { type: 'boldText', value: '金額' },
                  { type: 'text', value: `${priceFormat(price)}円` },
                ],
              ]}
            />
            {dayItems.length > 0 && (
              <Accordion
                title="指定日に登録済みの項目があります"
                titleVariant="caption"
                content={
                  <DataList
                    titleVariant="overline"
                    variant="caption"
                    dense
                    datas={dayItems.map((item, index) => {
                      return [
                        { type: 'text', value: `${index + 1}.` },
                        { type: 'text', value: item.user },
                        { type: 'text', value: item.category },
                        { type: 'text', value: item.memo },
                        { type: 'text', value: `${priceFormat(item.price)}円` },
                      ]
                    })}
                  />
                }
              />
            )}
            {notToday && (
              <Typography variant="caption" color="error">
                ※登録日付が今日ではありません
              </Typography>
            )}
          </>
        }
        action={
          <Button variant="contained" color="primary" onClick={register}>
            この内容で登録する
          </Button>
        }
      />
    </Paper>
  )
}

interface RegisterFormProps {
  date: dayjs.Dayjs
  notToday: boolean
  category: Category
  price: string
  memo: string
  dayItems: Array<Record>
  categoryItems: Array<Category>
  open: boolean
  changeDate: (date: dayjs.Dayjs | null) => void
  changeCategory: (value: string) => void
  changePrice: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  changeMemo: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  handleOpen: () => void
  handleClose: () => void
  register: () => void
  clearClick: () => void
  toToday: () => void
}

export default React.memo(RegisterForm)
