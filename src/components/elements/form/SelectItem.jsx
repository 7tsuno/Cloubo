import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Button, InputLabel } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    textAlign: 'center',
    padding: theme.spacing(1, 0)
  },
  itemLine: {
    padding: theme.spacing(1)
  }
}))

const SelectItem = ({ label, items, value, onChange }) => {
  const classes = useStyles()
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Grid container className={classes.itemContainer}>
        {items.map((item) => (
          <Grid item xs={4} key={item.name} className={classes.itemLine}>
            <Button
              variant="contained"
              disableElevation
              color={value === item.value ? 'primary' : 'default'}
              onClick={() => {
                onChange(item.value)
              }}
              fullWidth
            >
              {item.value}
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default React.memo(SelectItem)
