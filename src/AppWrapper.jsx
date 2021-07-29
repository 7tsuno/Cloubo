import React, { useState } from 'react'
import { createTheme } from '@material-ui/core/styles'
import { ThemeContext } from 'contexts/ThemeContext'
import App from 'App'
import { COLORS, TYPE } from 'constants/theme'
import { JwtContext } from 'contexts/JwtContext'

const AppWrapper = () => {
  const type = localStorage.getItem('themeType') || TYPE.LIGHT
  const colorName = localStorage.getItem('themeColor') || COLORS[0].name
  const color = COLORS.find((color) => color.name === colorName).color
  const shade = localStorage.getItem('themeColorShade') || 500
  const initialTheme = createTheme({
    palette: {
      primary: {
        main: color[shade]
      },
      type: type,
      color: color,
      shade: shade
    }
  })
  const themeContext = useState(initialTheme)
  const jwtContexts = useState('')

  return (
    <JwtContext.Provider value={jwtContexts}>
      <ThemeContext.Provider value={themeContext}>
        <App />
      </ThemeContext.Provider>
    </JwtContext.Provider>
  )
}

export default AppWrapper
