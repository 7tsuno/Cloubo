import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { Variant } from '@material-ui/core/styles/createTypography'

const useStyles = makeStyles((theme) => ({
  line: {
    margin: theme.spacing(1, 0),
    display: 'flex',
  },
  denseLine: {
    display: 'flex',
  },
  item: {
    padding: theme.spacing(1),
  },
  boldItem: {
    padding: theme.spacing(1),
    fontWeight: 'bold',
  },
}))

const DataList: React.FC<DataListProps> = ({
  datas,
  title,
  titleVariant,
  variant,
  dense,
}) => {
  const classes = useStyles()
  return (
    <div>
      {title && <Typography variant={titleVariant}>{title}</Typography>}
      {datas.map((record, index) => (
        <div key={index} className={dense ? classes.denseLine : classes.line}>
          {record.map((data, indexRecord) =>
            data.type === 'boldText' ? (
              <Typography
                variant={variant}
                key={`${index}_${indexRecord}`}
                className={classes.boldItem}
              >
                {data.value}
              </Typography>
            ) : data.type === 'object' ? (
              <div key={`${index}_${indexRecord}`}>{data.value}</div>
            ) : (
              <Typography
                variant={variant}
                key={`${index}_${indexRecord}`}
                className={classes.item}
              >
                {data.value}
              </Typography>
            )
          )}
        </div>
      ))}
    </div>
  )
}

export interface DataListData {
  type: 'object' | 'boldText' | 'text'
  value: React.ReactNode | string
}

export interface DataListProps {
  datas: Array<Array<DataListData>>
  title?: string
  titleVariant?: 'inherit' | Variant
  variant?: 'inherit' | Variant
  dense?: boolean
}

export default React.memo(DataList)
