import React, { ChangeEventHandler } from 'react'
import dayjs from 'dayjs'
import DipslaySlider from 'components/elements/display/DipslaySlider'
import DataTable from 'components/elements/display/DataTable'
import { makeStyles, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  payPrice: {
    marginTop: theme.spacing(3),
  },
}))

const CalculationView: React.FC<CalculationViewProps> = ({
  date,
  changeBackMonth,
  changeForwardkMonth,
  dispUserRecords,
  dispCalclationRecords,
  payPrice,
  changePayPrice,
}) => {
  const classes = useStyles()

  return (
    <>
      <DipslaySlider
        value={date.format('YYYY年M月')}
        changeBack={changeBackMonth}
        changeForward={changeForwardkMonth}
      />
      {dispUserRecords && (
        <DataTable title="支払額" contents={dispUserRecords} />
      )}
      {dispCalclationRecords && (
        <DataTable title="精算" contents={dispCalclationRecords} />
      )}
      <TextField
        label="支払額"
        value={payPrice}
        onChange={changePayPrice}
        className={classes.payPrice}
      />
    </>
  )
}

interface CalculationViewProps {
  date: dayjs.Dayjs
  changeBackMonth: () => void
  changeForwardkMonth: () => void
  dispUserRecords: Array<Array<string>>
  dispCalclationRecords: Array<Array<string>>
  payPrice: string
  changePayPrice: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
}

export default React.memo(CalculationView)
