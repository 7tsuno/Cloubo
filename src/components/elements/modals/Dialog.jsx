import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  content: {
    minWidth: '80vw'
  }
}))

const QuestionModal = ({ open, handleClose, title, content, action }) => {
  const classes = useStyles()
  return (
    <Dialog open={open} onClose={handleClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent className={classes.content}>{content}</DialogContent>
      {action && <DialogActions>{action}</DialogActions>}
    </Dialog>
  )
}

export default QuestionModal
