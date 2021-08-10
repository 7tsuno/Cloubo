import React from 'react'
import { Color, COLORS, Shade } from 'constants/theme'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  ButtonBase,
  Grid,
  InputLabel,
  Paper,
  Slider,
} from '@material-ui/core'
import Check from '@material-ui/icons/Check'

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    textAlign: 'center',
    padding: theme.spacing(1, 0),
  },
  itemWrap: {
    margin: theme.spacing(1, 0),
  },
  item: {
    height: 50,
    width: 50,
  },
  icon: {
    marginTop: 13,
  },
  registerButton: {
    marginTop: theme.spacing(2),
  },
}))

const ColorPalette: React.FC<ColorPaletteProps> = ({
  label,
  color,
  shade,
  onChangeColor,
  onChangeShade,
  onClickRegister,
}) => {
  const classes = useStyles()

  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Slider
        value={shade}
        onChange={onChangeShade}
        min={200}
        max={900}
        step={100}
      />
      <Grid container className={classes.itemContainer}>
        {COLORS.map((item: Color, index) => (
          <Grid xs={3} key={index} className={classes.itemWrap}>
            <ButtonBase>
              <Paper
                onClick={() => {
                  onChangeColor(item)
                }}
                className={classes.item}
                style={{
                  background: item.colorList[shade],
                }}
              >
                {color.colorList[shade] === item.colorList[shade] && (
                  <Check className={classes.icon} />
                )}
              </Paper>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        fullWidth
        onClick={onClickRegister}
        color="primary"
        className={classes.registerButton}
      >
        カラー変更
      </Button>
    </>
  )
}

export interface ColorPaletteProps {
  label: string
  color: Color
  shade: Shade
  onChangeColor: (color: Color) => void
  onChangeShade: (
    event: React.ChangeEvent<unknown>,
    value: number | number[]
  ) => void
  onClickRegister: () => void
}

export default React.memo(ColorPalette)
