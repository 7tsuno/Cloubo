import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import InvertColors from '@material-ui/icons/InvertColors'
import Switch from 'components/elements/input/Switch'
import ColorPalette from 'components/elements/input/ColorPalette'
import Modal from 'components/elements/display/Modal'
import { Color, Mode, initialMode, Shade } from 'constants/theme'

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  mode: {
    margin: theme.spacing(1, 0),
  },
}))

const HeaderArea: React.FC<HeaderAreaProps> = ({
  title,
  icon,
  changeMode,
  mode,
  color,
  shade,
  onChangeColor,
  onChangeShade,
  onClickRegister,
  open,
  handleOpen,
  handleClose,
}) => {
  const classes = useStyles()

  return (
    <AppBar position="relative">
      <Toolbar>
        <div className={classes.icon}>{icon}</div>
        <Typography variant="h6" color="inherit" className={classes.title}>
          {title}
        </Typography>
        <IconButton color="inherit" onClick={handleOpen}>
          <InvertColors />
        </IconButton>
        <Modal
          onClose={handleClose}
          open={open}
          content={
            <>
              <div className={classes.mode}>
                <Switch
                  title="モード選択"
                  checked={mode === initialMode}
                  onChange={changeMode}
                  label={mode}
                />
              </div>
              <ColorPalette
                label="カラー選択"
                onChangeColor={onChangeColor}
                onChangeShade={onChangeShade}
                onClickRegister={onClickRegister}
                color={color}
                shade={shade}
              />
            </>
          }
        />
      </Toolbar>
    </AppBar>
  )
}

export interface HeaderAreaProps {
  title: string
  icon: React.ReactNode
  changeMode: () => void
  mode: Mode
  color: Color
  shade: Shade
  onChangeColor: (color: Color) => void
  onChangeShade: (
    event: React.ChangeEvent<unknown>,
    value: number | number[]
  ) => void
  onClickRegister: () => void
  open: boolean
  handleOpen: () => void
  handleClose: () => void
}

export default React.memo(HeaderArea)
