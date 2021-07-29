import React, { useContext } from 'react'
import { AppBar, createTheme, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from 'components/elements/buttons/IconButton'
import ColorIcon from 'components/elements/icons/ColorIcon'
import Dialog from 'components/elements/modals/Dialog'
import Switch from 'components/elements/form/Switch'
import { ThemeContext } from 'contexts/ThemeContext'
import { COLORS, TYPE } from 'constants/theme'
import ColorPalette from 'components/elements/form/ColorPalette'
// import FormLine from 'components/elements/layout/FormLine'

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(2)
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const HeaderArea = ({ title, icon }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [theme, setTheme] = useContext(ThemeContext)
  const [type, setType] = React.useState(theme.palette.type)
  const [color, setColor] = React.useState(theme.palette.color)
  const [shade, setShade] = React.useState(Number(theme.palette.shade))

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const changeType = () => {
    const afterType = type === TYPE.LIGHT ? TYPE.DARK : TYPE.LIGHT
    setTheme(
      createTheme({
        palette: {
          primary: {
            main: color[shade]
          },
          type: afterType,
          color: color,
          shade: shade
        }
      })
    )
    localStorage.setItem('themeType', afterType)
    setType(afterType)
  }

  const changeColor = (newColor) => {
    setColor(newColor)
  }

  const changeShade = (event, newShade) => {
    setShade(newShade)
  }

  const register = () => {
    setTheme(
      createTheme({
        palette: {
          primary: {
            main: color[shade]
          },
          type: type,
          color: color,
          shade: shade
        }
      })
    )
    localStorage.setItem(
      'themeColor',
      COLORS.find((listColor) => listColor.color[shade] === color[shade]).name
    )
    localStorage.setItem('themeColorShade', shade)
  }

  return (
    <AppBar position="relative">
      <Toolbar>
        <div className={classes.icon}>{icon}</div>
        <Typography variant="h6" color="inherit" className={classes.title}>
          {title}
        </Typography>
        <IconButton color="inherit" onClick={handleClickOpen}>
          <ColorIcon />
        </IconButton>
        <Dialog
          handleClose={handleClose}
          open={open}
          content={
            <>
              <Switch
                title="モード選択"
                checked={type !== TYPE.LIGHT}
                onChange={changeType}
                label={type}
              />
              <ColorPalette
                label="カラー選択"
                onChangeColor={changeColor}
                onChangeShade={changeShade}
                onClickRegister={register}
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

export default HeaderArea
