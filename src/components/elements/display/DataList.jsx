import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  line: {
    margin: theme.spacing(1, 0),
    display: 'flex'
  },
  denseLine: {
    display: 'flex'
  },
  item: {
    padding: theme.spacing(1)
  },
  boldItem: {
    padding: theme.spacing(1),
    fontWeight: 'bold'
  }
}))

const DataList = ({ datas, title, titleVariant, variant, dense }) => {
  const classes = useStyles()
  return (
    <div>
      {title && <Typography variant={titleVariant}>{title}</Typography>}
      {datas.map((record, index) => (
        <div key={index} className={dense ? classes.denseLine : classes.line}>
          {record.map((data, indexRecord) =>
            data.type === 'bold' ? (
              <Typography
                variant={variant}
                key={`${index}_${indexRecord}`}
                className={classes.boldItem}
              >
                {data.value}
              </Typography>
            ) : data.type === 'obj' ? (
              <div key={`${index}_${indexRecord}`}>{data.value}</div>
            ) : (
              <Typography
                variant={variant}
                key={`${index}_${indexRecord}`}
                className={classes.item}
              >
                {data}
              </Typography>
            )
          )}
        </div>
      ))}
    </div>
  )
}

export default DataList
