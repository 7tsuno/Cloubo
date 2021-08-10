import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
} from '@material-ui/core/colors'

export const MODE = ['light', 'dark'] as const
export type Mode = typeof MODE[number]
export const initialMode: Mode = 'dark'

export const COLORS: Array<Color> = [
  { name: 'red', colorList: red },
  { name: 'pink', colorList: pink },
  { name: 'purple', colorList: purple },
  { name: 'deepPurple', colorList: deepPurple },
  { name: 'indigo', colorList: indigo },
  { name: 'blue', colorList: blue },
  { name: 'lightBlue', colorList: lightBlue },
  { name: 'cyan', colorList: cyan },
  { name: 'teal', colorList: teal },
  { name: 'green', colorList: green },
  { name: 'lightGreen', colorList: lightGreen },
  { name: 'lime', colorList: lime },
  { name: 'yellow', colorList: yellow },
  { name: 'amber', colorList: amber },
  { name: 'orange', colorList: orange },
  { name: 'deepOrange', colorList: deepOrange },
]
export type Color = {
  name: string
  colorList: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
    A100: string
    A200: string
    A400: string
    A700: string
  }
}
export const initialColor: Color = { name: 'blue', colorList: blue }

export const Shades = [200, 300, 400, 500, 600, 700, 800, 900] as const
export type Shade = typeof Shades[number]

export const isShade = (param: unknown): param is Shade => {
  return (
    typeof param === 'number' &&
    [200, 300, 400, 500, 600, 700, 800, 900].includes(param)
  )
}

export const initialShade = 500
