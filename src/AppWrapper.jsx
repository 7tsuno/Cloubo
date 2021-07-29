import React, { useState } from 'react'
import { createTheme } from '@material-ui/core/styles'
import { ThemeContext } from 'contexts/ThemeContext'
import App from 'App'
import { COLORS, TYPE } from 'constants/theme'
import { JwtContext } from 'contexts/JwtContext'
import { CashRecordsContext } from 'contexts/CashRecordsContext'

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
  const cashRecordsContext = useState([])

  return (
    <JwtContext.Provider value={jwtContexts}>
      <ThemeContext.Provider value={themeContext}>
        <CashRecordsContext.Provider value={cashRecordsContext}>
          <App />
        </CashRecordsContext.Provider>
      </ThemeContext.Provider>
    </JwtContext.Provider>
  )
}

export default AppWrapper
