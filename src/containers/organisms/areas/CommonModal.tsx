import { useAppDispatch, useAppSelector } from 'app/hooks'
import CommonModal from 'components/organisms/areas/CommonModal'
import React, { useCallback } from 'react'
import { closeModal, selectCommonModal } from 'stores/commonModal'

const CommonModalContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const { title, open } = useAppSelector(selectCommonModal)

  const handleClose = useCallback(() => {
    dispatch(closeModal())
  }, [])

  const props = {
    title,
    open,
    handleClose,
  }

  return <CommonModal {...props} />
}

export default CommonModalContainer
