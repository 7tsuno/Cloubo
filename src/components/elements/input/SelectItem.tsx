import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Button, InputLabel } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    textAlign: 'center',
    padding: theme.spacing(1, 0),
  },
  itemLine: {
    padding: theme.spacing(1),
  },
}))

const SelectItem: React.FC<SelectItemProps> = ({
  label,
  items,
  value,
  onChange,
}) => {
  const classes = useStyles()
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Grid container className={classes.itemContainer}>
        {items.map((item, index) => (
          <Grid item xs={4} key={index} className={classes.itemLine}>
            <Button
              variant="contained"
              disableElevation
              color={value === item ? 'primary' : 'default'}
              onClick={() => {
                onChange(item)
              }}
              fullWidth
            >
              {item}
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export interface SelectItemProps {
  label: string
  items: Array<string>
  value: string
  onChange: (value: string) => void
}

export default React.memo(SelectItem)
