import React from 'react'
import { COLORS } from 'constants/theme'
import { makeStyles } from '@material-ui/core/styles'
import { Button, ButtonBase, Grid, InputLabel, Paper, Slider } from '@material-ui/core'
import CheckIcon from '../icons/CheckIcon'
import FormLine from '../layout/FormLine'

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    textAlign: 'center',
    padding: theme.spacing(1, 0)
  },
  itemWrap: {
    margin: theme.spacing(1, 0)
  },
  item: {
    height: 50,
    width: 50
  },
  icon: {
    marginTop: 13
  }
}))

const ColorPalette = ({ label, color, shade, onChangeColor, onChangeShade, onClickRegister }) => {
  const classes = useStyles()
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Slider value={shade} onChange={onChangeShade} min={200} max={900} step={100} />
      <Grid container className={classes.itemContainer}>
        {COLORS.map((item, index) => (
          <Grid xs={3} key={index} className={classes.itemWrap}>
            <ButtonBase>
              <Paper
                onClick={() => {
                  onChangeColor(item.color, item.name)
                }}
                className={classes.item}
                style={{
                  background: item.color[shade]
                }}
              >
                {color[shade] === item.color[shade] && <CheckIcon className={classes.icon} />}
              </Paper>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
      <FormLine>
        <Button variant="contained" fullWidth onClick={onClickRegister} color="primary">
          カラー変更
        </Button>
      </FormLine>
    </>
  )
}

export default React.memo(ColorPalette)
