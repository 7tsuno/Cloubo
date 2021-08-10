import { Button } from '@material-ui/core'
import Modal from 'components/elements/display/Modal'
import React from 'react'
const CommonModal: React.FC<CommonModalProps> = ({
  title,
  open,
  handleClose,
}) => {
  return (
    <Modal
      onClose={handleClose}
      open={open}
      title={title}
      action={
        <Button variant="contained" color="primary" onClick={handleClose}>
          OK
        </Button>
      }
    />
  )
}

interface CommonModalProps {
  title: string
  open: boolean
  handleClose: () => void
}

export default React.memo(CommonModal)
