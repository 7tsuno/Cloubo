import { useAppDispatch, useAppSelector } from 'app/hooks'
import HeaderArea from 'components/organisms/areas/HeaderArea'
import { Color, isShade } from 'constants/theme'
import React, { useCallback } from 'react'
import { selectTheme, changeMode, setColor, setShade } from 'stores/theme'

const HeaderAreaContainer: React.FC<HeaderAreaContainerProps> = ({
  title,
  icon,
}) => {
  const dispatch = useAppDispatch()
  const { mode, color, shade } = useAppSelector(selectTheme)
  const [open, setOpen] = React.useState(false)
  const [tempColor, setTempColor] = React.useState(color)
  const [tempShade, setTempShade] = React.useState(shade)

  const onChangeColor = useCallback((color: Color) => {
    setTempColor(color)
  }, [])

  const onChangeShade = useCallback(
    (event: React.ChangeEvent<unknown>, value: number | number[]) => {
      isShade(value) && setTempShade(value)
    },
    []
  )

  const onChangeMode = useCallback(() => {
    dispatch(changeMode())
  }, [])

  const onClickRegister = useCallback(() => {
    dispatch(setColor(tempColor))
    dispatch(setShade(tempShade))
  }, [tempColor, tempShade])

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const props = {
    title,
    icon,
    changeMode: onChangeMode,
    mode,
    color: tempColor,
    shade: tempShade,
    onChangeColor,
    onChangeShade,
    onClickRegister,
    open,
    handleOpen,
    handleClose,
  }

  return <HeaderArea {...props} />
}

export interface HeaderAreaContainerProps {
  title: string
  icon: React.ReactNode
}

export default HeaderAreaContainer
