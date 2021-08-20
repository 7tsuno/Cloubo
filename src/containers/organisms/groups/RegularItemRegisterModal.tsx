import { useAppDispatch, useAppSelector } from 'app/hooks'
import RegularItemRegisterModal from 'components/organisms/groups/RegularItemRegisterModal'
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { addRegularItem } from 'stores/regularItems'
import {
  setTitle,
  setTargetDay,
  clear,
  selectInputRegularItem,
} from 'stores/inputRegularItem'

const RegularItemRegisterModalContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const { title, targetDay } = useAppSelector(selectInputRegularItem)

  const registerDisabled = useMemo(() => {
    return !title
  }, [title])

  const changeTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(event.target.value))
  }, [])

  const changeTargetDay = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const day = event.target.value
      if (
        '' === day ||
        !new RegExp(/^([1-9]\d*)$/).test(day) ||
        31 < Number(day)
      ) {
        dispatch(setTargetDay(''))
      } else {
        dispatch(setTargetDay(day))
      }
    },
    []
  )

  const clearClick = useCallback(() => {
    dispatch(clear())
  }, [])

  const register = useCallback(() => {
    const payload = { targetDay, title }
    dispatch(addRegularItem(payload))
    dispatch(clear())
    setOpen(false)
  }, [targetDay, title])

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const props = {
    targetDay,
    title,
    changeTargetDay,
    changeTitle,
    clearClick,
    register,
    open,
    handleOpen,
    handleClose,
    registerDisabled,
  }

  return <RegularItemRegisterModal {...props} />
}

export default RegularItemRegisterModalContainer
