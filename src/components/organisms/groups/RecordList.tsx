import React from 'react'
import dayjs from 'dayjs'
import DataList, { DataListData } from 'components/elements/display/DataList'
import { Button, makeStyles } from '@material-ui/core'
import { Record } from 'stores/records'
import { priceFormat } from 'utils/format'
import Modal from 'components/elements/display/Modal'

const useStyles = makeStyles((theme) => ({
  listArea: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  deleteButton: {
    color: theme.palette.primary.light,
  },
}))

const RecordList: React.FC<RecordListProps> = ({
  date,
  dayItems,
  open,
  handleOpen,
  handleClose,
  target,
  deleteTarget,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.listArea}>
      <DataList
        title={dayjs(date).format('YYYY/MM/DD')}
        titleVariant="body1"
        variant="caption"
        dense
        datas={dayItems.map((item, index) => {
          const line: Array<DataListData> = [
            { type: 'text', value: `${index + 1}.` },
            { type: 'text', value: item.user },
            { type: 'text', value: item.category },
            { type: 'text', value: item.memo },
            { type: 'text', value: `${priceFormat(item.price)}円` },
          ]
          if (item.mine) {
            line.push({
              type: 'object',
              value: (
                <Button
                  className={classes.deleteButton}
                  onClick={() => handleOpen({ ...item })}
                >
                  削除
                </Button>
              ),
            })
          }
          return line
        })}
      />
      <Modal
        onClose={handleClose}
        open={open}
        content={
          <>
            {target && (
              <DataList
                variant="body1"
                datas={[
                  [
                    { type: 'boldText', value: '日付' },
                    {
                      type: 'text',
                      value: dayjs()
                        .year(target.year)
                        .month(target.month - 1)
                        .date(target.day)
                        .format('YYYY/MM/DD'),
                    },
                  ],
                  [
                    { type: 'boldText', value: 'メモ' },
                    { type: 'text', value: target.memo },
                  ],
                  [
                    { type: 'boldText', value: 'カテゴリ' },
                    { type: 'text', value: target.category },
                  ],
                  [
                    { type: 'boldText', value: '金額' },
                    { type: 'text', value: `${priceFormat(target.price)}円` },
                  ],
                ]}
              />
            )}
          </>
        }
        action={
          <Button variant="contained" color="primary" onClick={deleteTarget}>
            この内容を削除する
          </Button>
        }
      />
    </div>
  )
}

interface RecordListProps {
  date: dayjs.Dayjs
  dayItems: Array<Record>
  open: boolean
  handleOpen: (target: Record) => void
  handleClose: () => void
  target?: Record
  deleteTarget: () => void
}

export default React.memo(RecordList)
