import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  content: {
    minWidth: '250px',
    padding: theme.spacing(2),
  },
  action: {
    padding: theme.spacing(2),
  },
}))

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  content,
  action,
}) => {
  const classes = useStyles()
  return (
    <Dialog open={open} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent className={classes.content}>{content}</DialogContent>
      {action && (
        <DialogActions className={classes.action}>{action}</DialogActions>
      )}
    </Dialog>
  )
}

export interface ModalProps {
  open: boolean
  onClose: (event: unknown, reason: 'backdropClick' | 'escapeKeyDown') => void
  title?: string
  content?: React.ReactNode
  action?: React.ReactNode
}

export default React.memo(Modal)
